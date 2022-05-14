import { useContext } from "react";
import { CartContext } from "stores/Cart";

export default function About() {
  const {cartItems, setCartItems} = useContext(CartContext);
  return <>
    <button onClick={() => console.log(cartItems)}></button>
  </>;
}
