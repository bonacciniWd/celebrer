"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle, XCircle, CreditCard, Users, Building, MapPin } from 'lucide-react'

type Partner = {
  id: number
  name: string
  partner_type: string
  segment: string
  city: string
  state: string
  email: string
  phone: string
  approved: boolean
  paid: boolean
}

export default function AdminParceirosPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendentes' | 'aprovados' | 'publicados'>('todos')

  async function fetchAll() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/partners')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erro ao carregar')
      setPartners(data.partners || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  async function act(id: number, action: 'approve' | 'mark_paid') {
    const res = await fetch('/api/admin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action })
    })
    const data = await res.json()
    if (!res.ok) {
      alert(data?.error || 'Erro')
      return
    }
    await fetchAll()
  }

  const filtered = partners.filter((p) => {
    const matchesQuery = [p.name, p.segment, p.city, p.state].join(' ').toLowerCase().includes(query.toLowerCase())
    if (!matchesQuery) return false
    if (statusFilter === 'pendentes') return !p.approved || !p.paid
    if (statusFilter === 'aprovados') return p.approved && !p.paid
    if (statusFilter === 'publicados') return p.approved && p.paid
    return true
  })

  const stats = {
    total: partners.length,
    pendentes: partners.filter(p => !p.approved || !p.paid).length,
    aprovados: partners.filter(p => p.approved && !p.paid).length,
    publicados: partners.filter(p => p.approved && p.paid).length,
  }

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Parceiros</h1>
        <p className="text-gray-300">
          Gerencie aprovações e publicações de parceiros
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-xs text-gray-400">Parceiros cadastrados</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pendentes</CardTitle>
            <XCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendentes}</div>
            <p className="text-xs text-gray-400">Aguardando aprovação</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.aprovados}</div>
            <p className="text-xs text-gray-400">Aguardando pagamento</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Publicados</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.publicados}</div>
            <p className="text-xs text-gray-400">Ativos na plataforma</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, cidade, segmento..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="todos" className="text-white hover:bg-gray-700">Todos</SelectItem>
                  <SelectItem value="pendentes" className="text-white hover:bg-gray-700">Pendentes</SelectItem>
                  <SelectItem value="aprovados" className="text-white hover:bg-gray-700">Aprovados</SelectItem>
                  <SelectItem value="publicados" className="text-white hover:bg-gray-700">Publicados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Parceiros</CardTitle>
          <CardDescription className="text-gray-400">
            {filtered.length} parceiro(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
      {loading ? (
            <div className="text-center py-8">Carregando...</div>
          ) : (
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700 hover:bg-gray-700">
                    <TableHead className="text-gray-200">Nome</TableHead>
                    <TableHead className="text-gray-200">Tipo</TableHead>
                    <TableHead className="text-gray-200">Segmento</TableHead>
                    <TableHead className="text-gray-200">Localização</TableHead>
                    <TableHead className="text-gray-200">Status</TableHead>
                    <TableHead className="text-right text-gray-200">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750">
                      <TableCell className="font-medium text-white">{p.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize border-gray-600 text-gray-300">
                          {p.partner_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{p.segment}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-300">{p.city}/{p.state}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant={p.approved ? "default" : "secondary"} className={p.approved ? "bg-green-600" : "bg-gray-600"}>
                            {p.approved ? 'Aprovado' : 'Pendente'}
                          </Badge>
                          <Badge variant={p.paid ? "default" : "outline"} className={p.paid ? "bg-blue-600" : "border-gray-600 text-gray-300"}>
                            {p.paid ? 'Pago' : 'Em aberto'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!p.approved && (
                            <Button
                              size="sm"
                              onClick={() => act(p.id, 'approve')}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Aprovar
                            </Button>
                          )}
                          {p.approved && !p.paid && (
                            <Button
                              size="sm"
                              onClick={() => act(p.id, 'mark_paid')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              Marcar Pago
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
      )}
        </CardContent>
      </Card>
    </div>
  )
}


