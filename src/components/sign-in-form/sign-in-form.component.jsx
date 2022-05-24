import { useState , useContext, useEffect} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { CartContext } from '../../contexts/cart.context';

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  getUserCart
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const {setCartItems} = useContext(CartContext)

  const {currentUser} = useContext(UserContext)

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();

    if(user){
      const data = await getUserCart(user)
      

      setCartItems(data.cart)
    }    

    

    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    try {
        const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>I Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </CustomButton>
        </div>
      </form>
      {}
    </div>
  );
};

export default SignInForm;