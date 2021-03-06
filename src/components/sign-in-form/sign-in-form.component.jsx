import { useState, useContext} from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton,{ BUTTON_TYPES_CLASSES } from "../custom-button/custom-button.component";
import { CartContext } from "../../contexts/cart.context";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  getUserCart,
} from "../../utils/firebase/firebase.utils";

import {SignUpContainer} from  "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const { setCartItems } = useContext(CartContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    if (user) {
      const data = await getUserCart(user);

      setCartItems(data.cart);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //sign in with redirect is using a different approach because once we redirect to another page
    // all the previous details will be unmounted

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        const data = await getUserCart(user);

        setCartItems(data.cart);
      }

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
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
    <SignUpContainer>
      <h2>I Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </CustomButton>
        </div>
      </form>
      {}
    </SignUpContainer>
  );
};

export default SignInForm;
