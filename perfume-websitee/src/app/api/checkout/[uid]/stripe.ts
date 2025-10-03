// import { createClient } from "@/prismicio";
// import { asText } from "@prismicio/client";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";




// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: "2023-10-16" // Use current stable version instead of future date
// })

// export async function POST(
//     request: NextRequest,
//     { params }: { params: { uid: string } }
// ) {
//     try {
//         const { uid } = params;
//         if (!uid) {
//             return NextResponse.json({ error: "Missing Product UID" }, { status: 400 });
//         }

//         const prismicClient = createClient();
//         const product = await prismicClient.getByUID("product", uid);

//         if (!product) {
//             return NextResponse.json({ error: "Product not found" }, { status: 404 });
//         }

//         const name = product.data.name as string;
//         const price = product.data.price as number;
//         const image = product.data.image?.url;
//         const description = asText(product.data.description);

//         const sessionParams: Stripe.Checkout.SessionCreateParams = {
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "usd", // Fixed currency code
//                         product_data: {
//                             name,
//                             ...(description ? { description } : {}),
//                             ...(image ? { images: [image] } : {})
//                         },
//                         unit_amount: Math.round(price * 100) // Convert to cents and ensure integer
//                     },
//                     quantity: 1
//                 }
//             ],
//             mode: "payment",
//             success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`, // Fixed URL and removed space
//             cancel_url: `${request.nextUrl.origin}/`
//         }

//         const session = await stripe.checkout.sessions.create(sessionParams);
//         return NextResponse.json({ url: session.url})
//     } catch (error) {
//         console.error("Stripe session creation error", error);
//         return NextResponse.json(
//             { error: "Failed to create Stripe Session" },
//             { status: 500 },
//         );
//     }
// }
