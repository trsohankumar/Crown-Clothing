import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import { ProductContext } from '../../contexts/product.context';

import './product-card.styles.scss'


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
        <div className='product-card-container' >
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton buttonType='inverted' onClick={goToProductPage}>View Product</CustomButton>
        </div>
    );
}

export default ProductCard;