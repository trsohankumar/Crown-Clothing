import React, { useContext } from 'react'

import CustomButton from '../custom-button/custom-button.component';
import { ProductContext } from '../../contexts/product.context'
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';


import {ProductInfoContainer,ProductPageContainer,ProductPageDescription,ProductPageImage} from './product-page.styles.jsx'

const ProductPage = () => {

    const {product} = useContext(ProductContext);

    const {addItemToCart} = useContext(CartContext)
    const {currentUser} = useContext(UserContext)

    const {name, imageUrl, price ,description} = product

    const addProductToCart = () => {
      if(!currentUser){
          alert("You must sign in first")
          return
      }
     
      addItemToCart(product,currentUser)

    }

  return (
    <ProductPageContainer>
      <ProductInfoContainer>
        <ProductPageImage src={imageUrl} alt={`${name}`}/>
        <div>
          <h1>{name}</h1>
          <ProductPageDescription>{description}</ProductPageDescription>
          <span>Cost: {price}$</span>
        </div>
        
      </ProductInfoContainer>
        
        {/* to add
        add to cart button
        user reviews
        user star ratings */}


        <CustomButton buttonType='inverted' onClick={addProductToCart} style={{marginLeft:"70vw"}}>Add to cart</CustomButton>
    </ProductPageContainer>
  )
}

export default ProductPage