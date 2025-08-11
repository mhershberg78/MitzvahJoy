import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });
export function platformFeeAmount(totalCents: number) {
  const bps = Number(process.env.STRIPE_PLATFORM_FEE_BPS || 0);
  return Math.round((bps / 10000) * totalCents);
}
