import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import {CartDropDownContainer,EmptyMessage,CartItems} from "./cart-dropdown.styles.jsx";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage> Your Cart is empty </EmptyMessage>
        )}
      </CartItems>
      <CustomButton onClick={goToCheckout}>GO TO CHECKOUT</CustomButton>
    </CartDropDownContainer>
  );
};

export default CartDropDown;
