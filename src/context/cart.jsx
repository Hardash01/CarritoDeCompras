import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";

export const CartContext = createContext()

function useCartReducer () {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    
    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAN_CART'})

    return { state, addToCart, removeFromCart, clearCart }
}

//La dependencia de usar React Context es minima, solo lo necesario.
export function CartProvider ({ children }) {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}