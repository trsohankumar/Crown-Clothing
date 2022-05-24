import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { UserContext } from '../../contexts/user.context';   

import './checkout-card.styles.scss'



const CheckoutCard = ({checkoutItem}) => {
    const {name, quantity,imageUrl,price} = checkoutItem;

    const {addItemToCart,removeItemFromCart,deleteItemFromCart} = useContext(CartContext)

    const {currentUser} = useContext(UserContext)

    const incrementCheckoutItem = () => addItemToCart(checkoutItem,currentUser)

    const decrementCheckoutItem = () => removeItemFromCart(checkoutItem ,currentUser)
    
    const removeItem = () => deleteItemFromCart(checkoutItem,currentUser)
    return(
        <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={`${name}`}/>
        </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
            <div className='arrow' onClick={incrementCheckoutItem}>
                &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={decrementCheckoutItem}>
                &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            {/* display the x  */}
            <div className='remove-button' onClick={removeItem}>&#10005;</div>
        </div>
    )
}

export default CheckoutCard;