import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const paymentIntentId = searchParams.get("payment_intent");

  if (!paymentIntentId) {
    return NextResponse.json({ verified: false, error: "No payment intent found" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false });
    }
  } catch (error) {
    return NextResponse.json({ verified: false, error: error.message });
  }
}
