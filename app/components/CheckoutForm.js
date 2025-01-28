"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!email) {
      setMessage("Email is required.");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/buy/success",
        receipt_email: email, // Send the receipt to the provided email
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full py-2 px-4 bg-amber-900 text-white rounded-md hover:bg-amber-700 focus:ring focus:ring-amber-500 disabled:opacity-50"
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
