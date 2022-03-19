import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { CartContext } from '../../contexts/cart.context';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss'

const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <CustomButton onClick={goToCheckout}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

export default CartDropDown;