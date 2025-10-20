"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// Removido Select do shadcn/ui - usando select nativo

type PartnerType = 'fornecedor' | 'espaco'

const fornecedorSegments = [
  'buffet de casamento',
  'convites de casamento',
  'lembranças de casamento',
  'fotógrafo de casamento',
  'música de casamento',
  'carros de casamento',
  'decoração de casamento',
  'tendas de casamento',
  'animação de festa',
  'florista de casamento',
  'lista de casamento',
  'cerimonialista',
  'filmagem de casamento',
  'lua de mel',
  'bolo de casamento',
  'doces de casamento',
  'celebrante',
  'cabine de fotos'
]

const espacoSegments = [
  'fazenda de casamento',
  'chácara de casamento',
  'hotel de casamento',
  'restaurante de casamento',
  'salão de casamento',
  'sítio casamento',
  'casa para casamento'
]

const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
]

export default function ParceirosPage() {
  const [partnerType, setPartnerType] = useState<PartnerType>('fornecedor')
  const [segment, setSegment] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const currentSegments = partnerType === 'fornecedor' ? fornecedorSegments : espacoSegments

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (!segment) {
      setMessage('Selecione um segmento')
      return
    }
    if (!name || !state || !city || !email || !phone || !username || !password) {
      setMessage('Preencha todos os campos obrigatórios')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerType, segment, name, state, city, email, phone, username, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erro ao registrar')
      setMessage('Cadastro enviado! Aguarde aprovação e pagamento para publicação.')
      setName(''); setState(''); setCity(''); setEmail(''); setPhone(''); setUsername(''); setPassword('')
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[url('/fundo1.jpg')] bg-cover bg-center min-h-screen flex">
      <div className="container max-w-7xl mx-auto flex">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 w-full">
          {/* Logo e texto fixos */}
          <div className="hidden xl:flex xl:flex-col xl:justify-center xl:items-center xl:min-h-screen xl:sticky xl:top-0">
            <div className="text-center max-w-lg">
              <Image
                src="/logo.png"
                alt="Celebrer"
                width={500}
                height={500}
                className="w-full max-w-md mx-auto h-auto"
              />
              <h2 className="text-3xl font-bold text-white mt-6 mb-4">Conecte-se com casais</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Faça parte da maior plataforma de casamentos do Brasil e alcance milhares de casais em busca dos melhores fornecedores e espaços para seu grande dia.
              </p>
            </div>
          </div>

          {/* Formulário com rolagem */}
          <div className="w-full max-w-2xl mx-auto py-8 xl:py-12">
            <div className="max-h-screen overflow-y-auto pr-2">
              <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-white mb-2">Seja Parceiro</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Cadastre-se para aparecer para casais de todo o Brasil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <FieldGroup>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="partnerType" className="text-white font-medium mb-2 block">Tipo</FieldLabel>
                    <select
                      id="partnerType"
                      value={partnerType}
                      onChange={(e) => { setPartnerType(e.target.value as PartnerType); setSegment('') }}
                      className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-800 text-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      <option value="fornecedor">Fornecedor</option>
                      <option value="espaco">Espaço de casamento</option>
                    </select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="segment" className="text-white font-medium mb-2 block">Segmento</FieldLabel>
                    <select
                      id="segment"
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-800 text-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      <option value="">Selecione o segmento</option>
                      {currentSegments.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="name" className="text-white font-medium mb-2 block">Nome do prestador ou empresa</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ex.: Celebrer Bartenders"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Field>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="state" className="text-white font-medium mb-2 block">Estado</FieldLabel>
                    <select
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-800 text-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      <option value="">Selecione o estado</option>
                      {brazilianStates.map((stateOption) => (
                        <option key={stateOption.value} value={stateOption.value}>
                          {stateOption.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="city" className="text-white font-medium mb-2 block">Cidade ou bairro</FieldLabel>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Itajaí / Centro"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="email" className="text-white font-medium mb-2 block">E-mail</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FieldDescription>
                      Usaremos este e-mail para contato. Não compartilharemos com terceiros.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone" className="text-white font-medium mb-2 block">Telefone</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(47) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="username" className="text-white font-medium mb-2 block">Nome de usuário</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="celebrer_bartenders"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <FieldDescription>
                      Este será seu nome de usuário único na plataforma.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password" className="text-white font-medium mb-2 block">Senha</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Crie uma senha forte"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FieldDescription>
                      Deve ter pelo menos 8 caracteres.
                    </FieldDescription>
                  </Field>
                </div>

                {message && (
                  <div className="text-sm text-red-300 bg-red-900/30 border border-red-500/50 p-4 rounded-lg">
                    {message}
                  </div>
                )}

                <Field>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Registrar'}
                  </Button>
                </Field>

                <FieldSeparator>ou</FieldSeparator>

                <Field>
                  <FieldDescription className="text-center text-gray-300">
                    Já tem uma conta?{" "}
                    <a href="/parceiros/login" className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors">
                      Faça login
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
