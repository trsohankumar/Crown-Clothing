import {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
        }

        try {
        const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
        );

        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
        } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
        } else {
            console.log('user creation encountered an error', error);
        }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };


    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                {/* required->if inputs are empty then it is invalid */}
                <input required type="text" onChange={handleChange} name="displayName" value={displayName}/>
                <label>Email</label>
                {/* Name is used so that in handleChange we can identify which field value has changed */}
                <input  type="email" required onChange={handleChange} name="email" value={email}/>
                <label>Password</label>
                <input type ="password" required onChange={handleChange} name="password" value={password}/>
                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;

