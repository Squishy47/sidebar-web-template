import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import Stripe from "npm:stripe";
import z from "npm:zod";

const createPaymentSchema = z.object({
  email: z.string().email(),
});

const sessionIdSchema = z.object({
  session_id: z.string(),
});

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const app = new Hono();

const APP_DOMAIN = Deno.env.get("APP_DOMAIN")!;

app.use("/api/*", cors());

app.post("/api/create-payment-intent", async ({ req }) => {
  const body = await req.json();

  const validationOutput = createPaymentSchema.safeParse(body);

  if (validationOutput.error) {
    return new Response(validationOutput.error.message, {
      status: 400,
    });
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer_email: validationOutput.data.email,
    customer_creation: "always",
    metadata: {},
    line_items: [
      {
        price: "### {{PRICE_ID}} ###",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${APP_DOMAIN}/{{RETURN URL}}?session_id={CHECKOUT_SESSION_ID}`,
  });

  return new Response(JSON.stringify({ clientSecret: session.client_secret }));
});

app.get("/api/session-status", async ({ req }) => {
  const session_id = await getSessionId(req.query());

  const session = await getStripeSession(session_id);

  return new Response(
    JSON.stringify({
      status: session.status,
      customer_email: session.customer_details?.email,
    })
  );
});

async function getStripeSession(session_id: string) {
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (!session) {
    throw new Error("Session not found");
  }

  return session;
}

function getSessionId(data: any) {
  const validationOutput = sessionIdSchema.safeParse(data);

  if (validationOutput.error) {
    throw new Error(validationOutput.error?.message);
  }

  return validationOutput.data?.session_id;
}

Deno.serve(app.fetch);

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/api' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
