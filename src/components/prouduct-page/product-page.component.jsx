import React, { useContext } from 'react'

import CustomButton from '../custom-button/custom-button.component';
import { ProductContext } from '../../contexts/product.context'
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

const ProductPage = () => {

    const {productName,productImage , product} = useContext(ProductContext);

    const {addItemToCart} = useContext(CartContext)
    const {currentUser} = useContext(UserContext)

    const {name, imageUrl} = product

    const addProductToCart = () => {
      if(!currentUser){
          alert("You must sign in first")
          return
      }
     
      addItemToCart(product,currentUser)

    }

  return (
    <div>
        <h1>{name}</h1>
        <img src={imageUrl} alt={`${name}`} />
        {/* to add
        add to cart button
        user reviews
        user star ratings */}


        <CustomButton buttonType='inverted' onClick={addProductToCart}>Add to cart</CustomButton>
    </div>
  )
}

export default ProductPage