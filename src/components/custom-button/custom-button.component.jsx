import './custom-button.styles.scss'

// there are 3 button, google signin inverted deault
//change the styles depending on the button type
export const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const CustomButton = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
        {...otherProps}>
            {children}
        </button>
    )

}

export default CustomButton;