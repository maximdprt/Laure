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

    const resendApiKey = Deno.env.get("RESEND_API_KEY")
    
    if (!resendApiKey) {
      console.error("Missing Resend API key")
      return new Response(JSON.stringify({ error: "Missing Resend API key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    // Récupérer les détails de la réservation
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials")
      return new Response(JSON.stringify({ error: "Missing Supabase credentials" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Récupérer l'utilisateur
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", record.user_id)
      .single()

    // Récupérer le service
    const { data: service } = await supabase
      .from("services")
      .select("*")
      .eq("id", record.service_id)
      .single()

    if (!user || !service) {
      console.error("User or service not found")
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const dateFormatted = new Date(record.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const lieuText = record.lieu === 'cabinet' 
      ? 'Cabinet HEAL LO LACANAU, 7 rue Jean Michel, 33680 Lacanau'
      : 'À votre domicile'

    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; background: #f8f1e6; padding: 24px;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #f1e3d2;">
          <div style="background: #6f7f7a; color: #fff; padding: 20px 24px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">Confirmation de réservation – Aura Massage</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.85;">Votre rendez-vous a bien été enregistré</p>
          </div>
          <div style="padding: 24px; color: #3c3c3c;">
            <p style="margin: 0 0 20px; font-size: 15px;">Bonjour <strong>${escapeHtml(user.prenom)}</strong>,</p>
            <p style="margin: 0 0 20px; font-size: 15px;">Votre réservation a bien été confirmée :</p>
            
            <div style="background: #f7efe2; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <div style="display: grid; gap: 12px;">
                <div>
                  <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 4px;">SOIN</span>
                  <span style="font-size: 16px; font-weight: 700; color: #3c3c3c;">${escapeHtml(service.nom)}</span>
                  <span style="display: block; color: #d4a574; font-size: 14px; margin-top: 2px;">${service.duree} minutes - ${service.prix}€</span>
                </div>
                
                <div style="border-top: 1px solid #e8dcc6; padding-top: 12px;">
                  <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 4px;">DATE ET HEURE</span>
                  <span style="font-size: 15px; font-weight: 600; color: #3c3c3c;">${dateFormatted}</span>
                  <span style="display: block; color: #3c3c3c; font-size: 15px; margin-top: 2px;">à ${escapeHtml(record.heure)}</span>
                </div>
                
                <div style="border-top: 1px solid #e8dcc6; padding-top: 12px;">
                  <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 4px;">LIEU</span>
                  <span style="font-size: 15px; color: #3c3c3c;">${escapeHtml(lieuText)}</span>
                </div>
              </div>
            </div>

            ${record.notes ? `
              <div style="background: #fff9ef; border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid #f1e3d2;">
                <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 8px;">NOTES</span>
                <p style="margin: 0; font-size: 14px; color: #3c3c3c; white-space: pre-wrap;">${escapeHtml(record.notes)}</p>
              </div>
            ` : ''}

            <div style="background: #6f7f7a; color: #fff; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6;">
                <strong>Politique d'annulation :</strong><br>
                Toute annulation doit être effectuée au moins 24h avant le rendez-vous. 
                En cas d'annulation tardive ou d'absence, l'acompte versé ne sera pas remboursé.
              </p>
            </div>

            <p style="margin: 20px 0 0; font-size: 14px; color: #6d5c45;">
              Pour toute question, contactez-moi au <strong>07 59 70 19 41</strong> ou par email à 
              <a href="mailto:massage.auraperformance@gmail.com" style="color: #d4a574; text-decoration: none;">massage.auraperformance@gmail.com</a>
            </p>
          </div>
          <div style="background: #f7efe2; padding: 14px 24px; font-size: 12px; color: #6d5c45; text-align: center;">
            À très bientôt,<br>
            <strong>Laure - Aura Massage</strong>
          </div>
        </div>
      </div>
    `

    // Envoyer l'email au client
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Aura Massage <reservation@aura-massage.fr>",
        to: user.email,
        subject: `Confirmation de réservation - ${dateFormatted} à ${record.heure}`,
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

    // Marquer comme envoyé dans la base de données (optionnel)
    await supabase
      .from("reservations")
      .update({ statut: "confirmée" })
      .eq("id", record.id)

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
