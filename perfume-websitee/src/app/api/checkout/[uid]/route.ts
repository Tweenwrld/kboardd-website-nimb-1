
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await context.params;

    if (!uid) {
      return NextResponse.json(
        { error: "Missing Product UID" },
        { status: 400 },
      );
    }

    const prismicClient = createClient();
    const product = await prismicClient.getByUID("product", uid);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      );
    }

    if (!product.data.name || !product.data.price) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 },
      );
    }

    const name = product.data.name as string;
    const price = Math.round((product.data.price as number) * 100); // Convert to cents
    const image = product.data.image?.url;
    const description = asText(product.data.description);

    const origin = request.headers.get("origin") || request.nextUrl.origin;
    
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name,
              ...(description ? { description } : {}),
              ...(image ? { images: [image] } : {}),
            },
            unit_amount: price, // Price is already in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation error", error);
    return NextResponse.json(
      { error: "Failed to create Stripe Session" },
      { status: 500 },
    );
  }
}
