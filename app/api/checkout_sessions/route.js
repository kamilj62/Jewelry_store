import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe"; // Import Stripe directly

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure you have this in your .env file

export async function POST(req) {
  try {
    const { items } = await req.json(); // Extract cart items from request body
    const headersList = headers();
    const origin = headersList.get("origin"); // Get website origin

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid items format" },
        { status: 400 }
      );
    }

    // Convert cart items to Stripe line_items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Convert price from dollars to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
