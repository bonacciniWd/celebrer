import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe-server'
import { supabaseAdmin } from '@/lib/supabase'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return res.status(400).json({ error: `Webhook Error: ${err.message}` })
    }

    const session = event.data.object as any

    switch (event.type) {
      case 'checkout.session.completed': {
        const partnerId = parseInt(session.metadata.partnerId)

        // Atualizar o parceiro
        const { error: partnerError } = await supabaseAdmin
          .from('partners')
          .update({
            paid: true,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            license_start_date: new Date().toISOString(),
            license_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 ano
          })
          .eq('id', partnerId)

        if (partnerError) {
          console.error('Error updating partner:', partnerError)
          return res.status(500).json({ error: 'Error updating partner' })
        }

        // Atualizar o pagamento
        const { error: paymentError } = await supabaseAdmin
          .from('payments')
          .update({
            status: 'completed',
            payment_date: new Date().toISOString()
          })
          .eq('partner_id', partnerId)
          .eq('status', 'pending')

        if (paymentError) {
          console.error('Error updating payment:', paymentError)
        }

        break
      }

      case 'customer.subscription.deleted': {
        // Quando a assinatura é cancelada
        const { error } = await supabaseAdmin
          .from('partners')
          .update({
            paid: false,
            license_end_date: new Date().toISOString() // Encerra imediatamente
          })
          .eq('stripe_subscription_id', session.id)

        if (error) {
          console.error('Error updating partner subscription:', error)
          return res.status(500).json({ error: 'Error updating partner subscription' })
        }

        break
      }
    }

    return res.status(200).json({ received: true })
  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }
}