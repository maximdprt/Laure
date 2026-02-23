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
      console.error("Invalid payload:", payload)
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
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
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", record.user_id)
      .single()

    if (userError || !user) {
      console.error("User not found:", record.user_id, userError)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    // Récupérer le service
    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("*")
      .eq("id", record.service_id)
      .single()

    if (serviceError || !service) {
      console.error("Service not found:", record.service_id, serviceError)
      return new Response(JSON.stringify({ error: "Service not found" }), {
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
            
            <!-- RÉCAPITULATIF SOIN -->
            <div style="background: #f7efe2; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <div style="display: grid; gap: 12px;">
                <div>
                  <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 4px;">💆 SOIN</span>
                  <span style="font-size: 16px; font-weight: 700; color: #3c3c3c;">${escapeHtml(service.nom)}</span>
                  <span style="display: block; color: #d4a574; font-size: 14px; margin-top: 2px;">${service.duree} minutes</span>
                </div>
                
                <div style="border-top: 1px solid #e8dcc6; padding-top: 12px;">
                  <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 4px;">📅 DATE ET HEURE</span>
                  <span style="font-size: 15px; font-weight: 600; color: #3c3c3c;">${dateFormatted}</span>
                  <span style="display: block; color: #3c3c3c; font-size: 15px; margin-top: 2px;">à ${escapeHtml(record.heure)}</span>
                </div>
                
                <div style="border-top: 1px solid #e8dcc6; padding-top: 12px;">
                  <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 4px;">📍 LIEU</span>
                  <span style="font-size: 15px; color: #3c3c3c;">${escapeHtml(lieuText)}</span>
                </div>
              </div>
            </div>

            <!-- RÉCAPITULATIF FINANCIER -->
            <div style="background: #fff9ef; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #f1e3d2;">
              <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 12px;">💰 RÉCAPITULATIF FINANCIER</span>
              
              <div style="display: grid; gap: 8px; font-size: 14px; color: #3c3c3c;">
                <div style="display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid #e8dcc6;">
                  <span>Prix total du soin :</span>
                  <strong>${(record.total_amount_cents / 100).toFixed(2)}€</strong>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid #e8dcc6;">
                  <span>Acompte versé aujourd'hui :</span>
                  <span style="color: #2d8659; font-weight: 600;">+ ${(record.deposit_amount_cents / 100).toFixed(2)}€</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding-top: 8px; background: #f7efe2; padding: 12px; border-radius: 8px; font-weight: 700;">
                  <span>Reste à payer sur place :</span>
                  <strong style="color: #d4a574;">${((record.total_amount_cents - record.deposit_amount_cents) / 100).toFixed(2)}€</strong>
                </div>
              </div>
            </div>

            ${record.notes ? `
              <div style="background: #fff9ef; border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid #f1e3d2;">
                <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 8px;">📝 NOTES</span>
                <p style="margin: 0; font-size: 14px; color: #3c3c3c; white-space: pre-wrap;">${escapeHtml(record.notes)}</p>
              </div>
            ` : ''}

            <!-- INFORMATIONS CLIENT -->
            <div style="background: #f0f0f0; border-radius: 12px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #d4a574;">
              <span style="display: block; color: #6f7f7a; font-size: 13px; font-weight: 600; margin-bottom: 8px;">👤 VOS INFORMATIONS</span>
              <p style="margin: 0; font-size: 14px; color: #3c3c3c; line-height: 1.6;">
                <strong>${escapeHtml(user.nom)}</strong><br>
                ${user.email}<br>
                ${escapeHtml(user.telephone)}
              </p>
            </div>

            <!-- POLITIQUE D'ANNULATION -->
            <div style="background: #6f7f7a; color: #fff; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6;">
                <strong>⚠️ Politique d'annulation :</strong><br>
                Toute annulation doit être effectuée au moins 24h avant le rendez-vous. 
                En cas d'annulation tardive ou d'absence, l'acompte versé ne sera pas remboursé.
              </p>
            </div>

            <!-- CONTACT -->
            <p style="margin: 20px 0 0; font-size: 14px; color: #6d5c45; text-align: center;">
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

    // Envoyer l'email au client via Resend
    // NOTE: En mode test/free, Resend ne peut envoyer qu'à massage.auraperformance@gmail.com
    // Une fois un domaine vérifié sur Resend, changer "to" par user.email pour envoyer au client
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Aura Massage <onboarding@resend.dev>",
        to: "massage.auraperformance@gmail.com",
        replyTo: user.email,
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
