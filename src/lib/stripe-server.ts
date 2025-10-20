import Stripe from 'stripe'

// Stripe server-side instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
 
})

// Helpers server-side
export async function createCheckoutSession(partnerId: number, email: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_ANNUAL_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_URL}/painel/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/painel/payment/cancel`,
      metadata: {
        partnerId: partnerId.toString(),
      },
    })

    return { sessionId: session.id, url: session.url as string }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function createCustomerPortalSession(customerId: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/painel`,
    })

    return { url: session.url }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Tipos
export type StripeEvent = Stripe.Event
export type CheckoutSession = Stripe.Checkout.Session
export type SubscriptionStatus = Stripe.Subscription.Status