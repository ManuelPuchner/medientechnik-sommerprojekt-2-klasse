import { useContext } from "react";
import { CartContext } from "stores/Cart";
import styled from "styled-components";
import ConfigBox from "components/account_additions/ConfigBox";
import ConfigLink from "components/account_additions/ConfigLink";
import { BsTrash } from "react-icons/bs";
import CheckoutForm from "components/cart_additions/CheckoutForm";



const CartPageWrapper = styled.div`
  display: flex;
`

const CartList = styled.ul`
  padding: 0;
  width: 66.66666667%;
`;

const CartListItem = styled.li`
  display: flex;
  margin-top: 1rem;
`;

const CheckOutField = styled.div`
  width: 33.33333333%;
`

const RemoveFromCartButton = styled(ConfigLink)`
  & > * {
    pointer-events: none;
  }
`;

export default function Cart() {
  const {cartItems, setCartItems, removeCartItem} = useContext(CartContext);
  
  const removeItemFromCart = async (itemId) => {
    // console.log(itemId);
    let result = await removeCartItem(itemId);
    console.log(result)
  }

  if (cartItems[0] === "placeholder") {
    cartItems.shift();
  }
  return (
    <CartPageWrapper>
      <CartList>
        {cartItems && cartItems.map((item, index) => (
          <CartListItem key={index}>
            <ConfigBox config={item} />
            <RemoveFromCartButton title="Remove from Cart" onClick={() => removeItemFromCart(item._id)}>
              <BsTrash />
            </RemoveFromCartButton>
          </CartListItem>
        ))}
      </CartList>
      <CheckOutField>
        <CheckoutForm />
      </CheckOutField>
      {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
    </CartPageWrapper>
  );
}
