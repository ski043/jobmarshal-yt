import Stripe from "stripe";

export const stripe = new Stripe(process.env.SECRET_STRIPE_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
