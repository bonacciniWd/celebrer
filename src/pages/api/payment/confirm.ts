import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe-server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const { session_id } = req.query as { session_id?: string }
    if (!session_id) return res.status(400).json({ error: 'session_id is required' })

    const authHeader = req.headers.authorization || ''
    const [, token] = authHeader.split(' ')
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const { data: userData } = await supabase.auth.getUser(token)
    const userId = userData?.user?.id
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    // Find the partner for this user
    const { data: partner, error: partnerErr } = await supabaseAdmin
      .from('partners')
      .select('*')
      .eq('auth_user_id', userId)
      .maybeSingle()

    if (partnerErr) return res.status(400).json({ error: partnerErr.message })
    if (!partner?.id) return res.status(404).json({ error: 'Partner not found' })

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)

    // Basic ownership/consistency checks
    const metaPartnerId = session?.metadata?.partnerId ? parseInt(session.metadata.partnerId, 10) : null
    if (!metaPartnerId || metaPartnerId !== partner.id) {
      return res.status(400).json({ error: 'Session does not belong to this partner' })
    }

    const paid = session.payment_status === 'paid' || session.status === 'complete'
    if (!paid) {
      return res.status(200).json({ activated: false, status: session.status, payment_status: session.payment_status })
    }

    // Mark partner as paid (idempotent)
    const subscriptionId = typeof session.subscription === 'string' ? session.subscription : (session.subscription as any)?.id
    const { error: upErr } = await supabaseAdmin
      .from('partners')
      .update({
        paid: true,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        license_start_date: new Date().toISOString(),
        license_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq('id', partner.id)

    if (upErr) return res.status(500).json({ error: upErr.message })

    // Mark any pending payment as completed
    await supabaseAdmin
      .from('payments')
      .update({ status: 'completed', payment_date: new Date().toISOString() })
      .eq('partner_id', partner.id)
      .eq('status', 'pending')

    return res.status(200).json({ activated: true })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Internal error' })
  }
}
