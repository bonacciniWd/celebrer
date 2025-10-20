import type { NextApiRequest, NextApiResponse } from 'next'
import { createCheckoutSession } from '@/lib/stripe-server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }

  try {
    console.log('Request body:', req.body) // Debug
    const { partnerId } = req.body

    // Buscar o parceiro usando o auth_user_id do token
    const authHeader = req.headers.authorization
    if (!authHeader) {
      console.log('No auth header') // Debug
      return res.status(401).json({ error: 'Authorization header required' })
    }

    const token = authHeader.split(' ')[1]
    console.log('Token found') // Debug

    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError) {
      console.error('User error:', userError) // Debug
      return res.status(401).json({ error: 'Invalid token' })
    }

    if (!user?.id) {
      console.log('No user ID') // Debug
      return res.status(401).json({ error: 'Invalid token' })
    }

    console.log('User ID:', user.id) // Debug

    // Buscar o parceiro pelo auth_user_id
    console.log('Searching for partner with auth_user_id:', user.id)

    const { data: partner, error: partnerError } = await supabaseAdmin
      .from('partners')
      .select('id, email, approved, paid')
      .eq('auth_user_id', user.id)
      .maybeSingle()

    console.log('Partner query result:', { partner, error: partnerError }) // Debug

    if (partnerError) {
      console.error('Partner lookup error:', partnerError)
      return res.status(404).json({ error: `Erro ao buscar parceiro: ${partnerError.message}` })
    }

    if (!partner) {
      console.log('No partner found for user:', user.id)
      return res.status(404).json({ error: 'Parceiro não encontrado' })
    }

    if (!partner.id) {
      return res.status(404).json({ error: 'Partner not found' })
    }

    // Verificar se o parceiro está aprovado e não pagou
    if (!partner.approved) {
      return res.status(400).json({ error: 'Partner not approved yet' })
    }

    if (partner.paid) {
      return res.status(400).json({ error: 'Partner already paid' })
    }

    // Criar sessão de checkout e pegar a URL
    const { sessionId, url } = await createCheckoutSession(partner.id, partner.email)

    // Registrar tentativa de pagamento
    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        partner_id: partner.id,
        amount: 1558.80,
        status: 'pending'
      })

    if (paymentError) {
      console.error('Error registering payment:', paymentError)
    }

  return res.status(200).json({ sessionId, url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return res.status(500).json({ error: error.message })
  }
}