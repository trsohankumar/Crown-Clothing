import { createContext,useState } from "react";

export const ProductContext = createContext({
    productName: null,
    setProductName: () => null,
    productPrice:null,
    setProductPrice: () => null,
    productImage: null,
    setProductImage: () => null,
})

export const ProductProvider = ({children}) =>{

    const [productName ,setProductName] = useState(null);
    const [productPrice, setProductPrice] = useState(null)
    const [productImage, setProductImage] = useState(null)

    const value = {productName, setProductName ,productPrice , productImage , setProductPrice , setProductImage}

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}