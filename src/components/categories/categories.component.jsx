
import DirectoryItem from '../directory-item/directory-item.component'
import './categories.styles.scss'

const Categories = ({categories}) => {
    //the values that are different are in the array
  // arrays that contains the various objext that are to be displayed
  

    return (
        //contains all the categories on the homepage into one single container
        <div className="categories-container">
        {
            // de structure title here as that is the required field
            categories.map((category) => (
            <DirectoryItem key={category.id} category = {category}/>
        ))}
    </div>
    )
}

export default Categories;
