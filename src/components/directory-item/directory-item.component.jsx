import {DirectoryItemContainer,Body,BackgroundImage} from './directory-item.styles'
import { useNavigate } from 'react-router-dom'

// contains the code for the homepage that is Shown 

const DirectoryItem = ({category}) => {

    const {imageUrl, title} = category
    const navigate = useNavigate();

    const goToShopPage = () => {
      navigate(`/shop/${title}`)
    }
    return (
        /*container for each individual category like hats jackets etc */
        <DirectoryItemContainer onClick={goToShopPage}>
          {/*image that is displayed in the background */}
          {/*Dynamically chaning styles can be given in react using style object
            key is the css property to be modified and value is the 
            actualy value to be passed int
          */}
          <BackgroundImage imageUrl={imageUrl} />
          <Body>
            {/* Displays the  text to be displayed on the image */}
            {/* syntax to display variable values in react*/}  
            <h2>{title.toUpperCase()}</h2>
            <p>ShOP NOW</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem