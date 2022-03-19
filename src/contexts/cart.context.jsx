import { createContext,useEffect,useState } from "react";

const addCartItem = (cartItems,productToAdd) => {
    //find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    //if found increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem,quantity:cartItem.quantity + 1}
            : cartItem
        )
    }
    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd,quantity: 1}]
}

const removeCartItem = (cartItems,productToRemove) => {
    //find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
    
    if(existingCartItem.quantity === 1){
        //return new array with modified after removing the cartitem
        return cartItems.filter((cartItem) => (
            cartItem.id !== productToRemove.id
           ));
    }
    
    //if found decrement quantity as long as it is not the only item
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
            {...cartItem,quantity:cartItem.quantity - 1}
            : cartItem
    )
}

const deleteCartItem = (cartItems,productToRemove) => {
    //return new array with modified after removing the cartitem
    return cartItems.filter((cartItem) => (
        cartItem.id !== productToRemove.id
    ));
    
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    setCartCount: () => {},
    cartTotal:0,
    deleteItemFromCart: () => {}
})


export const CartProvider  = ({children}) => {
    //for cart icon open and close
    const [isCartOpen, setIsCartOpen] = useState(false)

    //used to keep track of items in the cart
    const [cartItems,setCartItems] = useState([])

    //keep track of count of cart items that is displayed in the cart icon
    const [cartCount,setCartCount] = useState(0)

    // to display total in the checkout page
    const [cartTotal,setCartTotal] = useState(0);

    //do something whenever the cartitems array changes
    useEffect(() => {
        const newCartCount = cartItems.reduce((total,cartItem) => total+ cartItem.quantity,0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total,cartItem)=> total + cartItem.quantity*cartItem.price ,
            0
        );
        setCartTotal(newCartTotal)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove))
    }

    const deleteItemFromCart = (productToRemove) => {
        setCartItems(deleteCartItem(cartItems,productToRemove))
    }





    const value = {isCartOpen,setIsCartOpen, addItemToCart , cartItems , cartCount,setCartCount, removeItemFromCart,cartTotal,setCartTotal, deleteItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}