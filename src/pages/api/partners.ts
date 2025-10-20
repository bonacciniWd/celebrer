import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

// Cadastro de parceiro (Fornecedor ou Espaço) e listagem pública
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Checagem de envs para mensagens de erro mais claras
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Supabase URL/Anon Key ausentes. Verifique .env.local e reinicie o servidor.' })
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE
  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey as string)
  if (req.method === 'POST') {
    try {
      const {
        partnerType, // 'fornecedor' | 'espaco'
        segment,     // segmento específico
        name,
        state,
        city,
        email,
        phone,
        username,
        password
      } = req.body || {}

      if (!partnerType || !segment || !name || !state || !city || !email || !phone || !username || !password) {
        return res.status(400).json({ error: 'Dados obrigatórios ausentes' })
      }

      const hasService = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE)

      // Verifica se já existe registro de parceiro com este e-mail (service role ignora RLS)
      const { data: existing, error: existingError } = await supabaseAdmin
        .from('partners')
        .select('id, auth_user_id, email')
        .eq('email', email)
        .maybeSingle()

      if (existingError) return res.status(400).json({ error: existingError.message })

      let authUserId = existing?.auth_user_id as string | null

      // Tenta criar o usuário de autenticação, apenas se não houver userId e se existir service role
      if (!authUserId && hasService) {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true
        })
        if (authError) {
          const msg = (authError as any)?.message || ''
          const already = msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('user already')
          if (!already) {
            return res.status(400).json({ error: msg || 'Falha ao criar usuário' })
          }
          // se já existe no Auth, seguimos sem auth_user_id (ou você pode preencher manualmente depois)
        } else {
          authUserId = authData?.user?.id ?? null
        }
      }

      // Inserir registro do parceiro
      let data, error
      if (existing?.id) {
        const upd = await supabaseAdmin
          .from('partners')
          .update({
            auth_user_id: authUserId ?? existing.auth_user_id ?? null,
            partner_type: partnerType,
            segment,
            name,
            state,
            city,
            phone,
            username
          })
          .eq('id', existing.id)
          .select()
          .single()
        data = upd.data; error = upd.error
      } else {
        // tenta inserir com activatedUser; se coluna não existir, insere sem
        let ins = await supabaseAdmin
          .from('partners')
          .insert({
            auth_user_id: authUserId,
            partner_type: partnerType,
            segment,
            name,
            state,
            city,
            email,
            phone,
            username,
            activatedUser: false,
            approved: false,
            paid: false
          })
          .select()
          .single()

        if (ins.error && /activateduser|column/i.test(ins.error.message)) {
          ins = await supabaseAdmin
            .from('partners')
            .insert({
              auth_user_id: authUserId,
              partner_type: partnerType,
              segment,
              name,
              state,
              city,
              email,
              phone,
              username,
              approved: false,
              paid: false
            })
            .select()
            .single()
        }

        data = ins.data; error = ins.error
      }

      if (error) return res.status(400).json({ error: error.message })
      return res.status(existing?.id ? 200 : 201).json({ partner: data })
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || 'Erro interno' })
    }
  }

  if (req.method === 'GET') {
    // Listagem pública com filtros
    const { q, city, state, segment, username, featured, limit } = req.query as Record<string, string>

    const buildQuery = (includeFeatured: boolean) => {
      let qy = supabase.from('partners').select('*').eq('approved', true).eq('paid', true)
      if (username) qy = qy.eq('username', username)
      if (city) qy = qy.ilike('city', `%${city}%`)
      if (state) qy = qy.ilike('state', `%${state}%`)
      if (segment) qy = qy.ilike('segment', `%${segment}%`)
      if (q) qy = qy.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
      if (includeFeatured && (featured === 'true' || featured === '1')) qy = qy.eq('is_featured', true)
      if (limit && !isNaN(Number(limit))) qy = qy.limit(Number(limit))
      return qy.order('created_at', { ascending: false })
    }

    let { data, error } = await buildQuery(true)
    if (error && /is_featured|column/i.test(error.message)) {
      // coluna pode não existir; refaz sem o filtro de destaque
      const fallback = await buildQuery(false)
      data = fallback.data as any
      error = fallback.error as any
    }

    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ partners: data })
  }

  res.setHeader('Allow', ['POST', 'GET'])
  return res.status(405).end('Method Not Allowed')
}


