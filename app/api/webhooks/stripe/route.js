import Stripe from "stripe";
import { guideDetails } from "@/app/data/guide";
import { createClient } from "@/app/config/supabaseServerClient";
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const stripeSessionId = request.nextUrl.searchParams.get("stripeSessionId");
  let redirectUrl = "/en/guide/purchase-failure";
  if (stripeSessionId == null) return NextResponse.redirect(new URL(redirectUrl, request.url))

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      stripeSessionId,
      { expand: ["line_items"] }
    );
    const guideId = await processStripeCheckout(checkoutSession);
    redirectUrl = `/en/guide/${guideId}/purchase-success`;
  } catch (error) {
    console.error(error);
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

export async function POST(request) {
  const event = await stripeServerClient.webhooks.constructEvent(
    await request.text(),
    request.headers.get("stripe-signature"),
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      try {
        await processStripeCheckout(event.data.object);
      } catch {
        return new Response(null, { status: 500 });
      }
    }
  }
  return new Response(null, { status: 200 });
}

async function processStripeCheckout(checkoutSession) {
  const userEmail = checkoutSession.metadata?.userEmail;
  const userLastName = checkoutSession.metadata?.userLastName;
  const userFirstName = checkoutSession.metadata?.userFirstName;
  const guideId = checkoutSession.metadata?.guideId;

  if (
    userEmail == null ||
    userLastName == null ||
    userFirstName == null ||
    guideId == null
  ) {
    throw new Error("Missing metadata");
  }

  const guide = guideDetails[guideId];
  if (guide == null) throw new Error("Guide not found");

  // send guide by email

  // Add history to supabase
  const supabase = await createClient();
  const {error } = await supabase.from("purchases").upsert(
    {
      session_id: checkoutSession.id,
      price_paid_in_cents: checkoutSession.amount_total || guide.price * 100,
      guide: guide.title,
      user_email: userEmail,
      user_last_name: userLastName,
      user_first_name: userFirstName,
    },

    { onConflict: "session_id" }
  );
  if (error) throw error;

  return guideId;
}
