import { createContext, useState , useEffect } from "react";

import { onAuthStateChangedListener,createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
//context is two pieces 1> storage
//we need to give it the default value
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


//actull functional component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

   
    //run only once on component mounts
    //this part always knows when the user signs in or signs out
    useEffect(() => {

      // return a function that can be used to stop it from listening when it unmounts
      const unsubscirbe = onAuthStateChangedListener((user) => {
        if(user){
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user)
      })
      return unsubscirbe
    },[])
    // all the children of this provider will be able to access currentUser
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};