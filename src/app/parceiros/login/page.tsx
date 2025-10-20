"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LoginForm } from '@/components/login-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginParceiros() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      })
      
      if (authError) throw authError

      // Verificar se é admin
      const { data: adminData } = await supabase
        .from('admin_users')
        .select()
        .eq('id', authData.user?.id)
        .single()

      // guarda o access_token em memória local para usar na API
      const token = authData.session?.access_token
      if (token) localStorage.setItem('sb-access-token', token)

      // Redireciona baseado no tipo de usuário
      if (adminData) {
        router.push('/admin/parceiros')
      } else {
        router.push('/painel')
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[url('/fundo-reg.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="w-[120px] h-auto mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-white mb-2">Login do Parceiro</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Acesse sua conta para gerenciar seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white font-medium mb-2 block">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-white font-medium mb-2 block">Senha</Label>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      className="h-12 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  {message && (
                    <div className="text-sm text-red-300 bg-red-900/30 border border-red-500/50 p-4 rounded-lg">
                      {message}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-300">
                  Não tem uma conta?{" "}
                  <a href="/parceiros" className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors">
                    Cadastre-se
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


