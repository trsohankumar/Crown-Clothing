import { useContext } from 'react';


import CustomButton from '../custom-button/custom-button.component';
import { CartContext } from '../../contexts/cart.context';
import { ProductContext } from '../../contexts/product.context';
import { UserContext } from '../../contexts/user.context';
import './product-card.styles.scss'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const {name , price ,imageUrl} = product
    const {addItemToCart} = useContext(CartContext)
    const {currentUser} = useContext(UserContext)

    const {setProductName ,setProductPrice , setProductImage} = useContext(ProductContext);

    const navigate = useNavigate();

    const addProductToCart = () => {
        if(!currentUser){
            alert("You must sign in first")
            return
        }
        addItemToCart(product,currentUser)

    }

    const goToProductPage = () => {
        
        setProductName(name)
        setProductPrice(price)
        setProductImage(imageUrl)
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
            <CustomButton buttonType='inverted' onClick={addProductToCart}>Add to cart</CustomButton>
        </div>
    );
}

export default ProductCard;