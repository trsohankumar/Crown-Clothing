
import { initializeApp,} from 'firebase/app'
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'
//initializeApp creates an app instance based on some config instance
//basically this instance should refer to the one created on firebase console
// config tells us that this is the crwn-clothing firebase instance that was created on the console
const firebaseConfig = {
  apiKey: "AIzaSyCvoT7g4xE6cNWj0IsCjFUUKeoqlhMwRoI",
  authDomain: "crwn-clothing-720ea.firebaseapp.com",
  projectId: "crwn-clothing-720ea",
  storageBucket: "crwn-clothing-720ea.appspot.com",
  messagingSenderId: "984889859054",
  appId: "1:984889859054:web:8855fc3eb17286da2a0cff",
  measurementId: "G-YW9BE28E97"
};


// Initialize Firebase by passing all the config
//crud operations can be performed using this app instance
const app = initializeApp(firebaseConfig);

//create an object. This is basically for authentication
const provider = new GoogleAuthProvider();
// basically for  various provider you may need to create many different providers
provider.setCustomParameters({
    prompt:"select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider)

//used to access the database, used for setting and getting documents
export const db = getFirestore()

//code to store the images and various clothes to the firestore database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  //basically data and the collection key
  const collectionRef  = collection(db,collectionKey)
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit();

  console.log('done')
}


export const setUserCart = async (
  cartInformation,
  userAuth
) => {

  if (!userAuth) return;

  const userDocRef = doc(db, 'carts', userAuth.uid);


  setDoc(userDocRef,{
    cart:cartInformation,
  })

}

export const getUserCart = async (userAuth) => {

  const userDocRef = doc(db,'carts',userAuth.uid)

  const cartDoc = await getDoc(userDocRef)

  if(cartDoc.exists()){
    
    return cartDoc.data()
  }else{
    return null
  }
}

export const getCategoriesAndDocument  = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}


export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //check if a document already exists
    //doc takes 3 arguments first -> database , second -> collection, third -> unique id or identifier
    //basically means go to the database under the users collection get the user with reference id that is provided

  const userDocRef = doc(db, 'users', userAuth.uid);
   //get doc gets data related to a document
    //get the document for the user doc ref

  const userSnapshot = await getDoc(userDocRef);

  //check if user data exist
  //if user data does not exit then create / set the doc with the data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //if email and password are not received then code should not run
  if (!email || !password) return;

  //run the method for creating a user with email and password
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);