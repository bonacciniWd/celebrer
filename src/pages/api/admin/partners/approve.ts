import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { id, approved } = req.body || {}
    if (!id || typeof approved !== 'boolean') {
      return res.status(400).json({ error: 'Parâmetros inválidos: id e approved são obrigatórios' })
    }

    if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase admin não disponível no cliente' })

    // Try to also set activatedUser when approving, but be resilient if column doesn't exist
    let update = approved ? { approved: true, activatedUser: true } : { approved: false }
    let resp = await supabaseAdmin.from('partners').update(update).eq('id', id).select().single()
    if (resp.error && /activateduser|column/i.test(resp.error.message)) {
      // Retry without activatedUser column
      update = approved ? { approved: true } : { approved: false }
      resp = await supabaseAdmin.from('partners').update(update).eq('id', id).select().single()
    }

    if (resp.error) return res.status(400).json({ error: resp.error.message })
    return res.status(200).json({ partner: resp.data })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Erro interno' })
  }
}
