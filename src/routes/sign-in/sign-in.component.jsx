
import {
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils.js'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

const SignIn = () => {

    //empty array means that run this function once when the compnonent mounts
    // this part is used as once the user signs and then returns back to this sign in page
    // aka the sign in page mounts and we get the response
    // useEffect(async() => {
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user)
    //     }
    // },[])

    //sign in with redirect is using a different approach because once we redirect to another page 
    // all the previous details will be unmounted
    const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={signInWithGoogle}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;