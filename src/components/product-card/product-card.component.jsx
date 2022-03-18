import './product-card.styles.scss'
import CustomButton from '../custom-button/custom-button.component';


const ProductCard = ({product}) => {
    const {name , price ,imageUrl} = product
    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton buttonType='inverted'>Add to cart</CustomButton>
        </div>
    );
}

export default ProductCard;