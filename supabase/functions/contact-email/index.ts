/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    const { record } = payload

    if (!record || !record.id) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const name = record.name?.trim()
    const email = record.email?.trim()
    const phone = record.phone?.trim()
    const message = record.message?.trim()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY")
    
    if (!resendApiKey) {
      console.error("Missing Resend API key")
      return new Response(JSON.stringify({ error: "Missing Resend API key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; background: #f8f1e6; padding: 24px;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #f1e3d2;">
          <div style="background: #6f7f7a; color: #fff; padding: 20px 24px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">Nouveau message – Aura Massage</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.85;">Reçu depuis le formulaire de contact</p>
          </div>
          <div style="padding: 24px; color: #3c3c3c;">
            <div style="display: grid; gap: 12px; margin-bottom: 20px;">
              <div style="padding: 12px 16px; background: #f7efe2; border-radius: 12px;">
                <strong>Nom :</strong> ${escapeHtml(name)}
              </div>
              <div style="padding: 12px 16px; background: #f7efe2; border-radius: 12px;">
                <strong>Email :</strong> ${escapeHtml(email)}
              </div>
              <div style="padding: 12px 16px; background: #f7efe2; border-radius: 12px;">
                <strong>Téléphone :</strong> ${escapeHtml(phone || "Non renseigné")}
              </div>
            </div>
            <div style="padding: 16px; background: #fff9ef; border-radius: 12px; border: 1px solid #f1e3d2;">
              <strong>Message :</strong>
              <p style="margin: 8px 0 0; white-space: pre-wrap; word-break: break-word;">${escapeHtml(message)}</p>
            </div>
          </div>
          <div style="background: #f7efe2; padding: 14px 24px; font-size: 12px; color: #6d5c45;">
            Envoyé automatiquement depuis aura-massage.fr
          </div>
        </div>
      </div>
    `

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Aura Massage <contact@aura-massage.fr>",
        to: "massage.auraperformance@gmail.com",
        reply_to: email,
        subject: `Nouveau message de ${name}`,
        html: html
      })
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text()
      console.error("Resend API error:", error)
      return new Response(JSON.stringify({ error }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    // Marquer le message comme envoyé
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      await supabase
        .from("contact_messages")
        .update({ sent: true })
        .eq("id", record.id)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})


