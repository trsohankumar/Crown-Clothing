import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/product.context'

const ProductPage = () => {

    const {productName,productImage} = useContext(ProductContext);


  return (
    <div>
        <h2>{productName}</h2>
        <img src={productImage} alt={`${productName}`} />
        {/* to add
        add to cart button
        user reviews
        user star ratings */}
    </div>
  )
}

export default ProductPage