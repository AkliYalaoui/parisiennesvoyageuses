"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MdWarning } from "react-icons/md";
import StripeCheckoutForm from "@/app/components/CheckoutForm";

export default function BuyGuide() {
  const { guide } = useParams();
  const [step, setStep] = useState(1); // Track form step
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value?.trim() ?? "" });
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.firstName || !user.lastName || !user.email) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError(""); // Clear errors
    setStep(2); // Move to payment step
  };

  return (
    <section className="md:pt-16 px-6">
      {step === 1 ? (
        // Step 1: User Info Form
        <form
          onSubmit={handleNextStep}
          className="space-y-4 max-w-lg mx-auto p-8 rounded-lg shadow-lg bg-white"
        >
          <h2 className="text-2xl font-bold text-coffee">Your Details</h2>
          <p className="text-warmbrown">
            Please enter your details before proceeding to payment.
          </p>

          {/* Warning Message */}
          <div className="flex items-center gap-2 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-md">
            <MdWarning className="text-yellow-600 text-xl" />
            <p className="text-sm text-yellow-700">
              Make sure to enter a valid email, as your guide will be sent there.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Continue to Payment
          </button>
        </form>
      ) : (
        // Step 2: Checkout Form
        <div className="container mx-auto">
          <StripeCheckoutForm guideId={guide} user={user} />
        </div>
      )}
    </section>
  );
}
