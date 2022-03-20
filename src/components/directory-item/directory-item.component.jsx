import './directory-item.styles.scss'

const DirectoryItem = ({category}) => {
    const {imageUrl, title} = category
    return (
        /*container for each individual category like hats jackets etc */
        <div  className='directory-item-container'>
          {/*image that is displayed in the background */}
          {/*Dynamically chaning styles can be given in react using style object
            key is the css property to be modified and value is the 
            actualy value to be passed int
          */}
          <div className='background-image' style={{
            backgroundImage: `url(${imageUrl})`
          }}/>
          <div className='body'>
            {/* Displays the  text to be displayed on the image */}
            {/* syntax to display variable values in react*/}  
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
    )
}

export default DirectoryItem