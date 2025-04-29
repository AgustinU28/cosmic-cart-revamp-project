
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Asegúrate de que la clave secreta de Stripe esté disponible
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("La clave secreta de Stripe no está configurada");
    }

    // Inicializar Stripe con la clave secreta
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Parse the request body
    const { cartItems, successUrl, cancelUrl } = await req.json();
    
    // Validate the required fields
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Invalid or empty cart items");
    }

    if (!successUrl || !cancelUrl) {
      throw new Error("Missing success or cancel URLs");
    }

    // Create line items for Stripe checkout
    const lineItems = cartItems.map(item => {
      const price = item.product.discount > 0 
        ? item.product.discount 
        : item.product.price;
      
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            description: item.product.description || "",
            images: item.product.image ? [item.product.image] : [],
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "MX", "ES"],
      },
    });

    // Return the session ID and URL
    return new Response(JSON.stringify({ 
      sessionId: session.id, 
      url: session.url 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
