import { createClient } from '@supabase/supabase-js'

const url =
  (process.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
  (process.env.SUPABASE_URL as string) ||
  (process.env.SUPABASE_URL_PUBLIC as string)

const anonKey =
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
  (process.env.SUPABASE_ANON_KEY as string) ||
  (process.env.SUPABASE_KEY as string)

const serviceKey =
  (process.env.SUPABASE_SERVICE_ROLE_KEY as string) ||
  (process.env.SUPABASE_SERVICE_KEY as string) ||
  (process.env.SUPABASE_SERVICE_ROLE as string)

// Client público (uso no browser e rotas públicas)
export const supabase = createClient(url!, anonKey!)

// Client admin só deve existir no servidor (evita erro no browser)
let admin: any = null
if (typeof window === 'undefined') {
  admin = createClient(url!, serviceKey!)
}
export const supabaseAdmin = admin


