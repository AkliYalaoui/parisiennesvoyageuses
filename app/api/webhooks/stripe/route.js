import Stripe from "stripe";
import { guideDetails } from "@/app/data/guide";
import { createClient } from "@/app/config/supabaseServerClient";
import { NextResponse } from "next/server";
import { generateDownloadLink } from "@/app/lib/generateDownloadLink";
import sendEmail from "@/app/lib/downloadEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const stripeSessionId = request.nextUrl.searchParams.get("stripeSessionId");
  let redirectUrl = "/en/guide/purchase-failure";
  if (stripeSessionId == null)
    return NextResponse.redirect(new URL(redirectUrl, request.url));

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      stripeSessionId,
      { expand: ["line_items"] }
    );
    const  {guideId, downloadUrl} = await processStripeCheckout(checkoutSession);
    redirectUrl = `/en/guide/${guideId}/purchase-success?link=${downloadUrl}`;
  } catch (error) {
    console.error(error);
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url));
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
  console.log(checkoutSession);
  
  const userCountry = checkoutSession.customer_details?.address?.country ?? "";
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

  const supabase = await createClient();

  // Generate a secure one-time download link
  const { token, expiresAt } = generateDownloadLink(guideId);
  const downloadUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/download?token=${token}`;

  // Save download link in Supabase
  const { error: downloadError } = await supabase.from("downloads").insert({
    guide_id: guideId,
    download_token: token,
    expires_at: expiresAt.toISOString(),
    used: false,
  });
  if (downloadError) throw downloadError;

  // Send the guide via email
  await sendEmail(
    `${userLastName} ${userFirstName}`,
    userEmail,
    "Your Guide is Ready!",
    downloadUrl
  );

  // Add history to supabase
  const { error } = await supabase.from("purchases").upsert(
    {
      session_id: checkoutSession.id,
      price_paid_in_cents: checkoutSession.amount_total ?? guide.price * 100,
      guide: guide.title,
      user_email: userEmail,
      user_last_name: userLastName,
      user_first_name: userFirstName,
      user_country: userCountry
    },

    { onConflict: "session_id" }
  );
  if (error) throw error;

  return {guideId, downloadUrl};
}
