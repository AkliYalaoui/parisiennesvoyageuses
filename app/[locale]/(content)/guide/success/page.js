"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/routing";

const Success = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const status = searchParams.get("redirect_status");

    if (!paymentIntent || !clientSecret || status !== "succeeded") {
      router.push("/guide/cancel"); // Redirect if missing or failed
      return;
    }

    // Verify payment with API
    fetch(`/api/validate-payment?payment_intent=${paymentIntent}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) {
          setIsVerified(true);
        } else {
          router.push("/guide"); // Redirect if not verified
        }
      })
      .catch(() => router.push("/guide"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center md:pt-20">Loading...</div>;
  }

  if (!isVerified) {
    return null;
  }

  return (
    <div className="flex items-center justify-center px-6  md:pt-20">
      <div className="bg-peach shadow-lg rounded-lg p-8 max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-coffee"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-coffee">
          Purchase Successful!
        </h1>
        <p className="text-coffee mt-2">
          Thank you for your purchase. Your guide is on its way!
        </p>
        <Link
          href="/guide"
          className="mt-6 inline-block bg-softpink text-white px-6 py-2 rounded-lg text-lg hover:bg-pink-600 transition"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Success;
