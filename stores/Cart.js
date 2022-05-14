import { createContext, useState } from "react";
import { StatusCodes } from "http-status-codes";
const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, _setCartItems] = useState([]);

  const getInitialCartItems = async () => {
    let result = await fetch("/api/cart");
    let json = await result.json();
    if (result.status === StatusCodes.OK) {
      if (json.configs.length > 0) {
        setCartItems(json.configs);
      } else {
        setCartItems(["placeholder"]);
      }
    }

    // console.log(json);
  };

  if (typeof window !== "undefined" && (!cartItems || cartItems.length === 0)) {
    getInitialCartItems();
  }

  const setCartItems = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    _setCartItems(items);
  };

  const addCartItem = async ({config, id}) => {
    let _id;
    if(!id) {
      _id = config._id;
    } else {
      _id = id;
    }
    let result = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id
      }),
    });

    let json = await result.json();
    if (result.status === StatusCodes.OK) {
      setCartItems([...cartItems, config]);
    }
    return {data: json, status: result.status};
  }

  const removeCartItem = async (id) => {
    let result = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    let json = await result.json();
    if (result.status === StatusCodes.OK) {
      setCartItems(cartItems.filter((config) => config._id !== id));
    }
    return { data: json, status: result.status };
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, removeCartItem, addCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
export { CartContext };
