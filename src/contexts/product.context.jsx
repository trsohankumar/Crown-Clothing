import { createContext,useState } from "react";

export const ProductContext = createContext({
    product:null,
    setProduct: () => null,
})

const defaultProduct = {
    "id":0,
    "imageUrl":null,
    "name":null,
    "price":0,
    "quantity":0
}

export const ProductProvider = ({children}) =>{

 

    const [product,setProduct] = useState(defaultProduct)

    const value = {product , setProduct}

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}