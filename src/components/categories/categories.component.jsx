
import CategoryItem from '../category-item/category-item.component'
import './categories.styles.scss'

const Categories = () => {
    //the values that are different are in the array
  // arrays that contains the various objext that are to be displayed
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
   ]

    return (
        //contains all the categories on the homepage into one single container
        <div className="categories-container">
        {
            // de structure title here as that is the required field
            categories.map((category) => (
            <CategoryItem key={category.id} category = {category}/>
        ))}
    </div>
    )
}

export default Categories;
