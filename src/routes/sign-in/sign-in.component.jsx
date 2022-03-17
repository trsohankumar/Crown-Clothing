import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js'


const SignIn = () => {
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
        </div>
    )
}

export default SignIn;