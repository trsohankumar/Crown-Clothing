import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { UserContext } from '../../contexts/user.context';   

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
  } from './checkout-card.styles';



const CheckoutCard = ({checkoutItem}) => {
    const {name, quantity,imageUrl,price} = checkoutItem;

    const {addItemToCart,removeItemFromCart,deleteItemFromCart} = useContext(CartContext)

    const {currentUser} = useContext(UserContext)

    const incrementCheckoutItem = () => addItemToCart(checkoutItem,currentUser)

    const decrementCheckoutItem = () => removeItemFromCart(checkoutItem ,currentUser)
    
    const removeItem = () => deleteItemFromCart(checkoutItem,currentUser)
    return(
        <CheckoutItemContainer>
        <ImageContainer>
            <img src={imageUrl} alt={`${name}`}/>
        </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
            <Arrow onClick={incrementCheckoutItem}>
                &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={decrementCheckoutItem}>
                &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            {/* display the x  */}
            <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutCard;