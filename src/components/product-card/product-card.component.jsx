import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton,{ BUTTON_TYPES_CLASSES } from '../custom-button/custom-button.component';

import { ProductContext } from '../../contexts/product.context';

import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
  } from './product-card.styles';

const ProductCard = ({product}) => {
    const {name , price ,imageUrl} = product

    const {setProduct} = useContext(ProductContext);

    const navigate = useNavigate();

    const goToProductPage = () => {
        
        setProduct(product)
        // to remove white spaces from the name the following regex syntax is used 
        navigate(`/product/${name.replace(/\s+/g, '')}`)
    }

    return(
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <CustomButton buttonType={ BUTTON_TYPES_CLASSES.inverted } onClick={goToProductPage}>View Product</CustomButton>
        </ProductCartContainer>
    );
}

export default ProductCard;