import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const prices = {
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { plan } = await req.json()

    if (!prices[plan as keyof typeof prices]) {
      return new Response("Invalid plan", { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: "user@example.com", // Replace with actual user email
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices[plan as keyof typeof prices],
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      metadata: {
        userId,
      },
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
