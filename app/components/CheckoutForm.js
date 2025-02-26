"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams } from "next/navigation";


export default function CheckoutForm() {
  const { locale } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${locale}/guide/success`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        id="payment-element"
        options={{ layout: "tabs", fields: { billingDetails: "auto" } }}
      />

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full py-2 px-4 bg-coffee text-white rounded-md hover:bg-warmbrown focus:ring focus:ring-warmbrown disabled:opacity-50"
      >
        {isLoading ? <span>Loading...</span> : <span>Pay Now</span>}
      </button>

      {message && (
        <div id="payment-message" className="text-red-500 mt-2">
          {message}
        </div>
      )}
    </form>
  );
}
