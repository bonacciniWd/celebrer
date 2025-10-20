import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Rotas admin: aprovar e marcar pagamento
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE) as string)
  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin.from('partners').select('*').order('created_at', { ascending: false })
    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ partners: data })
  }

  const { id, action } = req.body || {}
  if (!id || !action) return res.status(400).json({ error: 'id e action são obrigatórios' })

  try {
    if (action === 'approve') {
      // tenta com activatedUser; se falhar por coluna ausente, tenta sem
      let resp = await supabaseAdmin.from('partners').update({ approved: true, activatedUser: true }).eq('id', id).select().single()
      if (resp.error && /activateduser|column/i.test(resp.error.message)) {
        resp = await supabaseAdmin.from('partners').update({ approved: true }).eq('id', id).select().single()
      }
      if (resp.error) return res.status(400).json({ error: resp.error.message })
      return res.status(200).json({ partner: resp.data })
    }

    if (action === 'mark_paid') {
      const { data, error } = await supabaseAdmin.from('partners').update({ paid: true }).eq('id', id).select().single()
      if (error) return res.status(400).json({ error: error.message })
      return res.status(200).json({ partner: data })
    }

    return res.status(400).json({ error: 'Ação inválida' })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Erro interno' })
  }
}



