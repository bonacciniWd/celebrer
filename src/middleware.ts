import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const needsAuth = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  if (!needsAuth) return NextResponse.next()

  // If we've already marked a successful Basic Auth session, allow
  const adminBasic = req.cookies.get('admin_basic')?.value
  if (adminBasic === '1') {
    return NextResponse.next()
  }

  // Primeiro, tentamos o método atual (Basic Auth)
  const authHeader = req.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Basic ')) {
    const [, token] = authHeader.split(' ')
    try {
      const [user, pass] = atob(token).split(':')
      const adminUser = process.env.ADMIN_USER
      const adminPass = process.env.ADMIN_PASS
      if (user === adminUser && pass === adminPass) {
        const res = NextResponse.next()
        // Mark that Basic Auth passed for client-side guards
        res.cookies.set('admin_basic', '1', {
          path: '/',
          maxAge: 60 * 60 * 8, // 8 hours
          sameSite: 'lax',
          // Not HttpOnly so client components can read and avoid redirect loops
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
        })
        return res
      }
    } catch (_) {
      // ignore parse errors
    }
  }

  // Se Basic Auth falhar, tentamos o token do Supabase
  const token = req.cookies.get('sb-access-token')?.value

  if (token) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (!error && user) {
        const { data: adminData } = await supabase
          .from('admin_users')
          .select()
          .eq('id', user.id)
          .single()

        if (adminData) {
          return NextResponse.next()
        }
      }
    } catch (error) {
      // ignore supabase errors
    }
  }

  // Se nenhum método de autenticação funcionar
  const res = new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
  })
  // Clear any stale cookie
  res.cookies.set('admin_basic', '', { path: '/', maxAge: 0 })
  return res
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}