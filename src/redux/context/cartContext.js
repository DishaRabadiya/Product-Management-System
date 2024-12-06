import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const cartData = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(state.cart));
  // }, [state.cart]);

  const addToCart = (productData) => {
    dispatch({ type: "ADD_TO_CART", payload: { productData } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
