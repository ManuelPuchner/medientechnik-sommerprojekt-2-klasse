import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutForm(props) {
  let publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if(!publishableKey) {
    return <p>No stripe key found</p>
  }

  const stripe = loadStripe(publishableKey);

  
  return <> {publishableKey}</>
}