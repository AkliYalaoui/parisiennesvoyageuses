import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { guide } = await req.json();
    
  const guides = {
    "essential-paris-guide": { name: "Essential Paris Guide", price: 1999 },
    "hidden-paris-guide": { name: "Hidden Paris Guide", price: 2499 },
    "luxury-paris-guide": { name: "Luxury Paris Guide", price: 3999 },
  };  
  const selectedGuide = guides[guide];

  if (!selectedGuide) {
    return NextResponse.json({ error: "Invalid guide" });
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: selectedGuide.price,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent);
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret});
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
