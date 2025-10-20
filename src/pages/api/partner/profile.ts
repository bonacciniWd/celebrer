import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// Autenticação por Bearer: Authorization: Bearer <access_token>
async function getUserIdFromBearer(req: NextApiRequest) {
  const auth = req.headers.authorization || ''
  const [, token] = auth.split(' ')
  if (!token) return null
  const { data } = await supabase.auth.getUser(token)
  return data?.user?.id || null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Disable caching so polling clients always get fresh data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  const userId = await getUserIdFromBearer(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('partners')
      .select('*')
      .eq('auth_user_id', userId)
      .maybeSingle()
    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ partner: data })
  }

  if (req.method === 'PUT') {
    const { description, website, instagram, cover_image, profile_image, gallery, name, phone, city, state } = req.body || {}
    const { data, error } = await supabaseAdmin
      .from('partners')
      .update({ description, website, instagram, cover_image, profile_image, gallery, name, phone, city, state })
      .eq('auth_user_id', userId)
      .select()
      .single()
    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ partner: data })
  }

  res.setHeader('Allow', ['GET', 'PUT'])
  return res.status(405).end('Method Not Allowed')
}



