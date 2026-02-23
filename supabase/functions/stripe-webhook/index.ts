/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"
import Stripe from "npm:stripe@14.25.0"

declare const Deno: {
  env: { get: (key: string) => string | undefined }
  serve: (handler: (req: Request) => Response | Promise<Response>) => void
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    })
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")

  if (!stripeKey || !webhookSecret) {
    return new Response(JSON.stringify({ error: "Missing Stripe configuration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }

  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing Stripe signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    })
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" })
  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature error:", error)
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    })
  }

  const data = event.data.object
  if (data.object !== "payment_intent") {
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  }

  const paymentIntent = data as Stripe.PaymentIntent
  const reservationIds = paymentIntent.metadata?.reservation_ids
    ? paymentIntent.metadata.reservation_ids.split(",").map((id) => id.trim()).filter(Boolean)
    : []

  if (reservationIds.length === 0) {
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase credentials" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  if (event.type === "payment_intent.succeeded") {
    await supabase
      .from("reservations")
      .update({
        payment_status: "paid",
        stripe_payment_intent_id: paymentIntent.id,
        statut: "confirmée"
      })
      .in("id", reservationIds)
  }

  if (event.type === "payment_intent.payment_failed") {
    await supabase
      .from("reservations")
      .update({
        payment_status: "failed",
        stripe_payment_intent_id: paymentIntent.id,
        statut: "annulée"
      })
      .in("id", reservationIds)
  }

  if (event.type === "payment_intent.canceled") {
    await supabase
      .from("reservations")
      .update({
        payment_status: "canceled",
        stripe_payment_intent_id: paymentIntent.id,
        statut: "annulée"
      })
      .in("id", reservationIds)
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
})
