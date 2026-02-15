/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

declare const Deno: {
  env: { get: (key: string) => string | undefined }
  serve: (handler: (req: Request) => Response | Promise<Response>) => void
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

interface GoogleCalendarEvent {
  summary: string
  description: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  location?: string
  attendees?: Array<{ email: string }>
}

const CALENDAR_ID_CABINET = "massage.auraperformance@gmail.com"
const CALENDAR_ID_DOMICILE = "fd6f1289ef6490250327457224e6c71936471cae5f39b4456443e26bd8c6a1f9@group.calendar.google.com"

const getCalendarIdForLieu = (lieu: string): string => {
  if (lieu === "domicile") {
    return CALENDAR_ID_DOMICILE
  }

  return CALENDAR_ID_CABINET
}

// Obtenir access token via Service Account
const getAccessToken = async (): Promise<string> => {
  const serviceAccountKey = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY")
  
  if (!serviceAccountKey) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY")
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey)
    
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    }

    const header = {
      alg: "RS256",
      typ: "JWT",
      kid: serviceAccount.private_key_id
    }

    const headerEncoded = btoa(JSON.stringify(header))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")

    const payloadEncoded = btoa(JSON.stringify(payload))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")

    const signatureInput = `${headerEncoded}.${payloadEncoded}`

    // Sign JWT
    // Convertir la clé PEM en format binaire PKCS8
    const pemLines = serviceAccount.private_key
      .split('\n')
      .filter((line: string) => !line.startsWith('-----') && line.trim())
      .join('')
    
    const binaryString = atob(pemLines)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const key = await crypto.subtle.importKey(
      "pkcs8",
      bytes,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    )

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signatureInput)
    )

    const signatureEncoded = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")

    const jwt = `${signatureInput}.${signatureEncoded}`

    // Exchange JWT for access token
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OAuth error: ${error}`)
    }

    const data = await response.json() as { access_token: string }
    return data.access_token
  } catch (error) {
    console.error("Token generation error:", error)
    throw error
  }
}

// Créer événement Google Calendar
const createGoogleCalendarEvent = async (
  accessToken: string,
  calendarId: string,
  event: GoogleCalendarEvent
): Promise<string> => {
  const calendarIdEncoded = encodeURIComponent(calendarId)
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarIdEncoded}/events?sendNotifications=true`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Create event error:", error)
    throw new Error(`Failed to create event: ${error}`)
  }

  const data = await response.json() as { id: string }
  return data.id
}

// Mettre à jour événement Google Calendar
const updateGoogleCalendarEvent = async (
  accessToken: string,
  eventId: string,
  calendarId: string,
  event: GoogleCalendarEvent
): Promise<void> => {
  const calendarIdEncoded = encodeURIComponent(calendarId)
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarIdEncoded}/events/${eventId}?sendNotifications=true`,
    {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Update event error:", error)
    throw new Error(`Failed to update event: ${error}`)
  }
}

// Supprimer événement Google Calendar
const deleteGoogleCalendarEvent = async (
  accessToken: string,
  eventId: string,
  calendarId: string
): Promise<void> => {
  const calendarIdEncoded = encodeURIComponent(calendarId)
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarIdEncoded}/events/${eventId}?sendNotifications=true`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Delete event error:", error)
    throw new Error(`Failed to delete event: ${error}`)
  }
}

// Handler principal
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    const { type, record, old_record } = payload

    console.log("Webhook received:", { type, reservationId: record?.id })

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials")
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Récupérer les données du client et du service
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", record.user_id)
      .single()

    const { data: service } = await supabase
      .from("services")
      .select("*")
      .eq("id", record.service_id)
      .single()

    if (!user || !service) {
      console.error("User or service not found")
      throw new Error("Missing user or service data")
    }

    console.log(`Processing: ${user.prenom} ${user.nom} - ${service.nom}`)

    const accessToken = await getAccessToken()

    // Convertir la date et heure
    const [year, month, day] = record.date.split("-")
    const [hour, minute] = record.heure.split(":")
    
    const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute))
    const endDate = new Date(startDate.getTime() + record.duree * 60000)

    const lieuText = record.lieu === "cabinet"
      ? "7 rue Jean Michel, 33680 Lacanau"
      : "À domicile"

    const eventData: GoogleCalendarEvent = {
      summary: `${service.nom} - ${user.prenom} ${user.nom}`,
      description: `Client: ${user.prenom} ${user.nom}\nEmail: ${user.email}\nTéléphone: ${user.telephone}\nDurée: ${record.duree} minutes\nNotes: ${record.notes || "Aucune"}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "Europe/Paris"
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Europe/Paris"
      },
      location: lieuText
    }

    if (type === "INSERT") {
      const calendarId = getCalendarIdForLieu(record.lieu)
      const eventId = await createGoogleCalendarEvent(accessToken, calendarId, eventData)
      console.log(`✅ Created event: ${eventId}`)
      
      // Sauvegarder l'ID dans Supabase
      await supabase
        .from("reservations")
        .update({ google_event_id: eventId })
        .eq("id", record.id)
      
      console.log(`✅ Saved event ID to database`)
    } else if (type === "UPDATE" && old_record?.google_event_id) {
      if (old_record.lieu !== record.lieu) {
        const oldCalendarId = getCalendarIdForLieu(old_record.lieu)
        const newCalendarId = getCalendarIdForLieu(record.lieu)

        await deleteGoogleCalendarEvent(accessToken, old_record.google_event_id, oldCalendarId)
        const newEventId = await createGoogleCalendarEvent(accessToken, newCalendarId, eventData)

        await supabase
          .from("reservations")
          .update({ google_event_id: newEventId })
          .eq("id", record.id)

        console.log(`✅ Moved event: ${old_record.google_event_id} -> ${newEventId}`)
      } else {
        const calendarId = getCalendarIdForLieu(record.lieu)
        await updateGoogleCalendarEvent(accessToken, old_record.google_event_id, calendarId, eventData)
        console.log(`✅ Updated event: ${old_record.google_event_id}`)
      }
    } else if (type === "DELETE" && record?.google_event_id) {
      const calendarId = getCalendarIdForLieu(record.lieu)
      await deleteGoogleCalendarEvent(accessToken, record.google_event_id, calendarId)
      console.log(`✅ Deleted event: ${record.google_event_id}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("❌ Error:", error)
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})
