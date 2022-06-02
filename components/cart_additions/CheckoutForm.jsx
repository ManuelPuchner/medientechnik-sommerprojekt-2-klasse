import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import styled from "styled-components"
import Link from "next/link";


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const NewCheckoutButton = styled(CheckoutButton)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    cursor: pointer;
    transform: translateX(-50%);
  }
`;


export default function CheckoutForm(props) {
  let publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if(!publishableKey) {
    return <p>No stripe key found</p>
  }

  const stripe = loadStripe(publishableKey);

  
  return (
    <Wrapper>
      <Link passHref href="/checkout">
        <NewCheckoutButton>Go to Checkout</NewCheckoutButton>
      </Link>
    </Wrapper>
  );
}