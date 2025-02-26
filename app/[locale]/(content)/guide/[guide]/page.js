"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "next/navigation";
import CheckoutForm from "@/app/components/CheckoutForm";
import Loading from "./loading";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyGuide() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const { guide } = useParams();

  useEffect(() => {
    fetch("/api/checkout-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guide }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#ff6b6b",
      colorBackground: "#ffffff",
      colorText: "#333333",
      borderRadius: "8px",
    },
  };
  const options = { clientSecret, appearance };

  const guideDetails = {
    "essential-paris-guide": {
      title: "Essential Paris Guide",
      description: "Perfect for first-time visitors. Includes must-see attractions, tips on transportation, and sample itineraries.",
      price: "€19.99",
      highlights: ["Step-by-step itineraries for 1-3 days", "Tips to avoid crowds", "Affordable food and transport recommendations"],
    },
    "hidden-paris-guide": {
      title: "Hidden Paris Guide",
      description: "Explore hidden gems, local cafes, and off-the-beaten-path neighborhoods.",
      price: "€24.99",
      highlights: ["Secret gardens and vibrant street art", "Unique walking tours", "Cultural experiences without tourists"],
    },
    "luxury-paris-guide": {
      title: "Luxury Paris Guide",
      description: "Indulge in luxury dining, shopping, and exclusive experiences.",
      price: "€39.99",
      highlights: ["Exclusive hotel and spa recommendations", "Michelin-star dining", "Private museum and landmark tours"],
    },
  };

  const guideInfo = guideDetails[guide] || {};

  return (
    <section className="px-6 md:pt-10 flex items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-lg rounded-lg border-4 border-peach ">
          <div className="flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold text-coffee mb-4">Payment Details</h2>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
          <div className="flex flex-col p-6 border-l border-peach bg-softyellow">
            <h1 className="text-4xl font-extrabold text-coffee mb-4">{guideInfo.title}</h1>
            <p className="text-lg text-warmbrown mb-6">{guideInfo.description}</p>
            <ul className="list-disc pl-5 text-warmbrown">
              {guideInfo.highlights?.map((highlight, index) => (
                <li key={index} className="mb-2">{highlight}</li>
              ))}
            </ul>
            <p className="text-2xl font-semibold text-coffee mt-4">Price: {guideInfo.price}</p>
          </div>
        </div>
      )}
    </section>
  );
}
