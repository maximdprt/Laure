/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

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
    const payload = await req.json().catch(() => null) as {
      name?: string
      text?: string
      rating?: number
      date?: string
    } | null

    if (!payload) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const name = (payload.name || "").trim()
    const text = (payload.text || "").trim()
    const rating = payload.rating ?? 5
    const date = (payload.date || "").trim()

    if (!name || !text) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY")

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY in environment")
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const stars = "★".repeat(Math.max(1, Math.min(5, rating))) +
      "☆".repeat(5 - Math.max(1, Math.min(5, rating)))

    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; background: #f8f1e6; padding: 24px;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #f1e3d2;">
          <div style="background: #6f7f7a; color: #fff; padding: 20px 24px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">Nouvel avis client – Aura Massage</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.85;">Reçu depuis le formulaire d'avis du site</p>
          </div>
          <div style="padding: 24px; color: #3c3c3c;">
            <div style="display: grid; gap: 12px; margin-bottom: 20px;">
              <div style="padding: 12px 16px; background: #f7efe2; border-radius: 12px;">
                <strong>Nom (affiché sur le site) :</strong> ${escapeHtml(name)}
              </div>
              <div style="padding: 12px 16px; background: #f7efe2; border-radius: 12px;">
                <strong>Note :</strong> ${escapeHtml(String(rating))} / 5 &nbsp; <span style="color:#d4a574;">${stars}</span>
              </div>
              ${date ? `
              <div style="padding: 12px 16px; background: #f7efe2; border-radius: 12px;">
                <strong>Date souhaitée d'affichage :</strong> ${escapeHtml(date)}
              </div>` : ""}
            </div>
            <div style="padding: 16px; background: #fff9ef; border-radius: 12px; border: 1px solid #f1e3d2;">
              <strong>Texte de l'avis :</strong>
              <p style="margin: 8px 0 0; white-space: pre-wrap; word-break: break-word;">${escapeHtml(text)}</p>
            </div>
          </div>
          <div style="background: #f7efe2; padding: 14px 24px; font-size: 12px; color: #6d5c45;">
            Avis reçu automatiquement depuis aura-massage-lacanau.fr
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
        subject: `Nouvel avis client : ${name}`,
        html
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

