"use client"
import { useState, useTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { supabase } from '@/lib/supabase'

type Partner = { id: number; name: string; email?: string | null; partner_type?: string | null; created_at?: string | null }

export default function ApprovalsTable({ partners: initial }: { partners: Partner[] }) {
  const [rows, setRows] = useState<Partner[]>(initial)
  const [isPending, startTransition] = useTransition()

  const updateApproval = async (id: number, approved: boolean) => {
    startTransition(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (token) headers.Authorization = `Bearer ${token}`
        const res = await fetch('/api/admin/partners/approve', {
          method: 'POST',
          headers,
          body: JSON.stringify({ id, approved })
        })
        if (!res.ok) throw new Error('Falha ao atualizar aprovação')
        setRows((prev) => prev.filter(p => p.id !== id))
      } catch (e) {
        // handle error UI later
        console.error(e)
      }
    })
  }

  return (
    <div className="rounded-md border border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Tipo</TableHead>
            <TableHead className="text-gray-300">Criado em</TableHead>
            <TableHead className="text-right text-gray-300">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id} className="hover:bg-gray-800/50">
              <TableCell className="text-white">{p.name || '—'}</TableCell>
              <TableCell className="text-gray-300">{p.email || '—'}</TableCell>
              <TableCell>
                {p.partner_type ? (
                  p.partner_type === 'fornecedor' ? (
                    <Badge className="bg-blue-600 text-white capitalize">{p.partner_type}</Badge>
                  ) : p.partner_type === 'espaco' ? (
                    <Badge className="bg-purple-600 text-white capitalize">{p.partner_type}</Badge>
                  ) : (
                    <Badge className="bg-gray-600 text-white capitalize">{p.partner_type}</Badge>
                  )
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell className="text-gray-300">{p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : '—'}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="secondary" disabled={isPending} onClick={() => updateApproval(p.id, true)}>
                    {isPending ? <span className="animate-spin mr-2 inline-block h-3 w-3 rounded-full border-2 border-white/60 border-t-transparent" /> : null}
                    Aprovar
                  </Button>
                  <Button size="sm" variant="destructive" disabled={isPending} onClick={() => updateApproval(p.id, false)}>
                    {isPending ? <span className="animate-spin mr-2 inline-block h-3 w-3 rounded-full border-2 border-white/60 border-t-transparent" /> : null}
                    Rejeitar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-6">Sem aprovações pendentes.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
