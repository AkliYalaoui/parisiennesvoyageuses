"use client";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSessionSecret } from "../lib/getClientSessionSecret";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckoutForm({ guideId, user }) {
  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: getClientSessionSecret.bind(null, guideId, user),
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
