"use server";

import Stripe from "stripe";
import { guideDetails } from "../data/guide";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function getClientSessionSecret(guideId, user) {
  try {
    // Validate user details
    if (
      !user ||
      typeof user !== "object" ||
      !user.firstName ||
      !user.lastName ||
      !user.email
    ) {
      throw new Error("Invalid user details provided.");
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      throw new Error("Invalid email format.");
    }

    // Validate guideId
    const guide = guideDetails[guideId];
    if (!guide) {
      throw new Error("Invalid guide selected.");
    }

    // Validate price and title existence
    if (!guide.price || !guide.title) {
      throw new Error("Guide details are incomplete.");
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            product_data: {
              name: guide.title,
                images: [
                  new URL(guide.imageUrl, env.NEXT_PUBLIC_SERVER_URL).href,
                ],
              description: guide.description,
            },
            unit_amount: guide.price * 100, // Convert to cents
          },
        },
      ],
      ui_mode: "embedded",
      mode: "payment",
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/stripe?stripeSessionId={CHECKOUT_SESSION_ID}`,
      customer_email: user.email,
      payment_intent_data: {
        receipt_email: user.email,
      },
      metadata: {
        guideId,
        userEmail: user.email,
        userLastName: user.lastName,
        userFirstName: user.firstName,
      },
    });

    if (!session.client_secret) {
      throw new Error("Stripe client secret is null.");
    }

    return session.client_secret;
  } catch (error) {
    console.error("Stripe session creation failed:", error.message);
    throw new Error("Unable to process payment. Please try again later.");
  }
}
