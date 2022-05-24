import { createContext,useEffect,useState } from "react";

import { setUserCart } from "../utils/firebase/firebase.utils";

const addCartItem = (cartItems,productToAdd , currentUser) => {
    /*
    desc: Used to add a particular item into the cart or just increment its count

    return : cartItems with productToadd's quantity incremented or newly added into the cart
    */

    //find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    //if found increment quantity
    if(existingCartItem){
        const items =  cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem,quantity:cartItem.quantity + 1}
            : cartItem
        )

        setUserCart(items, currentUser)

        return items
    }
    //return new array with modified cartItems/ new cart item
    const items =  [...cartItems, {...productToAdd,quantity: 1}]

    setUserCart(items, currentUser)

    return items
}

const removeCartItem = (cartItems,productToRemove,currentUser) => {
    /*
    desc: Used to reduce the count of a particular item in the cart 

    return : cartItems with productToRemove reduced or delted from the cart
    */

    //find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
    
    if(existingCartItem.quantity === 1){
        //return new array with modified after removing the cartitem
        const items =  cartItems.filter((cartItem) => (
            cartItem.id !== productToRemove.id
           ));

        setUserCart(items, currentUser)

        return items
    }
    
    //if found decrement quantity as long as it is not the only item
    const items =  cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
            {...cartItem,quantity:cartItem.quantity - 1}
            : cartItem
    )

    setUserCart(items,currentUser)

    return items;
}

const deleteCartItem = (cartItems,productToRemove , currentUser) => {
    /*
    desc: return new array with modified after removing the cartitem

    return : cartItems with productToRemove delted from the cart
    */
    const items = cartItems.filter((cartItem) => (
        cartItem.id !== productToRemove.id
    ));

    //function to call the firestore database to update the cart items
    setUserCart(items, currentUser)

    return items;
    
}


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems: [],
    setCartItems:() => {},
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

    const addItemToCart = (productToAdd,currentUser) => {
        setCartItems(addCartItem(cartItems, productToAdd , currentUser))
    }

    const removeItemFromCart = (productToRemove, currentUser) => {
        setCartItems(removeCartItem(cartItems,productToRemove,currentUser))
    }

    const deleteItemFromCart = (productToRemove, currentUser) => {
        setCartItems(deleteCartItem(cartItems,productToRemove , currentUser))
    }

  
    const value = {isCartOpen,setIsCartOpen, addItemToCart , cartItems , cartCount,setCartCount, removeItemFromCart,cartTotal,setCartTotal, deleteItemFromCart ,setCartItems};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}