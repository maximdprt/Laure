/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"
import Stripe from "npm:stripe@14.25.0"

declare const Deno: {
  env: { get: (key: string) => string | undefined }
  serve: (handler: (req: Request) => Response | Promise<Response>) => void
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }

  try {
    const payload = await req.json()
    const { reservation_ids, amount_cents, total_amount_cents, currency, customer_email } = payload

    if (!Array.isArray(reservation_ids)) {
      return new Response(JSON.stringify({ error: "Invalid reservation_ids format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    if (!Number.isInteger(amount_cents) || amount_cents <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount_cents" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    if (!customer_email || !customer_email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid customer_email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount_cents,
      currency: currency || "eur",
      receipt_email: customer_email,
      automatic_payment_methods: { enabled: true },
      metadata: {
        reservation_ids: reservation_ids.join(","),
        total_amount_cents: typeof total_amount_cents === "number" ? String(total_amount_cents) : "",
        flow: "deposit"
      }
    })

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (supabaseUrl && supabaseServiceKey && reservation_ids.length > 0) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      await supabase
        .from("reservations")
        .update({
          payment_status: "pending",
          stripe_payment_intent_id: paymentIntent.id,
          deposit_amount_cents: amount_cents,
          total_amount_cents: typeof total_amount_cents === "number" ? total_amount_cents : null
        })
        .in("id", reservation_ids)
    }

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Stripe create payment intent error:", error)
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})
