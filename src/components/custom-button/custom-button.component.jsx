import {BaseButton,GoogleSignInButton,InvertedButton} from './custom-button.styles.jsx'

// there are 3 button, google signin inverted deault
//change the styles depending on the button type
export const BUTTON_TYPES_CLASSES = {
    base:'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => (
    {
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google] : GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted] : InvertedButton
    }[buttonType]
)

const CustomButton = ({children, buttonType, ...otherProps}) => {

    const ButtonType = getButton(buttonType)
    return (
        <ButtonType className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
        {...otherProps}>
            {children}
        </ButtonType>
    )

}

export default CustomButton;