"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function ConfiguracoesPage() {
  const [token, setToken] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', phone: '', city: '', state: '',
    description: '', website: '', instagram: '', cover_image: '', profile_image: '', gallery: ''
  })
  const [message, setMessage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [status, setStatus] = useState<{ approved: boolean; paid: boolean } | null>(null)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const t = session?.access_token
      if (!t) return
      setToken(t)
      const u = await supabase.auth.getUser(t)
      setUserId(u.data.user?.id || null)
      const res = await fetch(`/api/partner/profile?ts=${Date.now()}`, { headers: { Authorization: `Bearer ${t}` }, cache: 'no-store' })
      const data = await res.json()
      if (data?.partner) {
        const p = data.partner
        setStatus({ approved: !!p.approved, paid: !!p.paid })
        setForm({
          name: p.name || '',
          phone: p.phone || '',
          city: p.city || '',
          state: p.state || '',
          description: p.description || '',
          website: p.website || '',
          instagram: p.instagram || '',
          cover_image: p.cover_image || '',
          profile_image: p.profile_image || '',
          gallery: (p.gallery || []).join(',')
        })
      }
    }
    init()
  }, [])

  async function save() {
    if (!token) { setMessage('Faça login'); return }
    if (!status?.approved) { setMessage('Seu cadastro ainda está em análise'); return }
    if (!status?.paid) { window.location.href = '/painel/payment'; return }
    setMessage(null)
    const payload = { ...form, gallery: form.gallery ? form.gallery.split(',').map(s => s.trim()) : [] }
    const res = await fetch('/api/partner/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (!res.ok) { setMessage(data?.error || 'Erro ao salvar'); return }
    setMessage('Salvo com sucesso!')
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !token) return
    setUploading(true)
    setProgress(0)
    try {
      const basePath = `${userId || 'anon'}`
      const path = `${basePath}/cover-${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
      if (error) { setMessage(error.message); return }
      const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
      setForm({ ...form, cover_image: pub.publicUrl })
      setMessage('Capa enviada!')
      setProgress(100)
    } finally { setUploading(false) }
  }

  async function onUploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !token) return
    setUploading(true)
    setProgress(0)
    try {
      const basePath = `${userId || 'anon'}`
      const path = `${basePath}/avatar-${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
      if (error) { setMessage(error.message); return }
      const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
      setForm({ ...form, profile_image: pub.publicUrl })
      setMessage('Avatar enviado!')
      setProgress(100)
    } finally { setUploading(false) }
  }

  async function onUploadGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !token) return
    setUploading(true)
    setProgress(0)
    try {
      const urls: string[] = []
      const basePath = `${userId || 'anon'}`
      const all = Array.from(files)
      for (let i = 0; i < all.length; i++) {
        const file = all[i]
        const path = `${basePath}/gallery-${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`
        const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
        if (!error) {
          const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
          urls.push(pub.publicUrl)
        }
        setProgress(Math.round(((i + 1) / all.length) * 100))
      }
      const current = form.gallery ? form.gallery.split(',').map(s => s.trim()).filter(Boolean) : []
      const merged = [...current, ...urls]
      setForm({ ...form, gallery: merged.join(',') })
      setMessage('Galeria atualizada!')
    } finally { setUploading(false) }
  }

  function extractPathFromPublicUrl(url: string): string | null {
    try {
      const u = new URL(url)
      const idx = u.pathname.indexOf('/object/public/')
      if (idx === -1) return null
      const after = u.pathname.substring(idx + '/object/public/'.length)
      const parts = after.split('/')
      parts.shift()
      return parts.join('/')
    } catch { return null }
  }

  async function removeImage(url: string) {
    const path = extractPathFromPublicUrl(url)
    if (!path) {
      const arr = (form.gallery || '').split(',').map(s=>s.trim()).filter(Boolean).filter(x => x !== url)
      setForm({ ...form, gallery: arr.join(',') })
      return
    }
    setUploading(true)
    try {
      await supabase.storage.from('images').remove([path])
      const arr = (form.gallery || '').split(',').map(s=>s.trim()).filter(Boolean).filter(x => x !== url)
      setForm({ ...form, gallery: arr.join(',') })
      setMessage('Imagem removida')
    } finally { setUploading(false) }
  }

  return (
    <main className="min-h-screen">
      <section className="max-w-full mx-auto">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 md:p-6 shadow">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-100">Configurações do Perfil</h1>
            {status && status.approved && status.paid ? (
              <Badge className="bg-emerald-600 text-white">Publicado</Badge>
            ) : (
              <Badge className="bg-amber-600 text-white">Em aprovação</Badge>
            )}
          </div>
          {status && (!status.approved || !status.paid) && (
            <div className="mb-4 p-3 rounded bg-amber-900/30 border border-amber-700 text-amber-200 text-sm">
              Seu perfil ainda não está publicado. {status.approved ? '' : 'Aguardando aprovação.'} {status.paid ? '' : 'Pagamento pendente.'}
            </div>
          )}

          <div className="mb-4 text-sm text-gray-300">
            Seu perfil público será em <code className="bg-gray-700 px-2 py-1 rounded">/fornecedores/[seu_username]</code>
          </div>

          <h2 className="text-lg font-semibold mb-2 text-gray-100">Informações gerais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Nome</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Telefone</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Cidade</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Estado</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.state} onChange={(e)=>setForm({...form,state:e.target.value})} />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Descrição</label>
            <textarea className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" rows={5} value={form.description || ''} onChange={(e)=>setForm({...form,description:e.target.value})} />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-100">Links e imagens</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Website</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.website} onChange={(e)=>setForm({...form,website:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Instagram</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.instagram} onChange={(e)=>setForm({...form,instagram:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Capa (URL)</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.cover_image} onChange={(e)=>setForm({...form,cover_image:e.target.value})} />
              <input type="file" className="mt-2" onChange={onUpload} disabled={uploading} />
            </div>
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.profile_image || '/avatars/shadcn.jpg'}
                  alt="avatar"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-gray-700"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-gray-300">Avatar (URL)</label>
                  <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.profile_image} onChange={(e)=>setForm({...form,profile_image:e.target.value})} />
                  <input type="file" className="mt-2" onChange={onUploadAvatar} disabled={uploading} />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-100">Galeria</h2>
          <div>
            <input type="file" multiple className="block" onChange={onUploadGallery} disabled={uploading} />
            <label className="block text-sm font-medium mb-1 mt-3 text-gray-300">Ou cole URLs (se preferir)</label>
            <input className="w-full border rounded px-3 py-2 bg-gray-900 border-gray-700 text-gray-100" value={form.gallery || ''} onChange={(e)=>setForm({...form,gallery:e.target.value})} />
            {uploading && <Progress value={progress} className="mt-2" />}
            {/* Mobile swiper (scroll-snap) */}
            <div className="mt-3 md:hidden -mx-4 px-4">
              <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory pb-1">
                {(form.gallery ? form.gallery.split(',').map(s=>s.trim()).filter(Boolean) : []).map((url) => (
                  <div key={url} className="snap-start shrink-0 w-[80vw] h-48 relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="galeria" className="absolute inset-0 w-full h-full object-cover rounded" />
                    <button type="button" onClick={() => removeImage(url)} className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded opacity-100">remover</button>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop grid */}
            <div className="mt-3 hidden md:grid grid-cols-4 gap-3">
              {(form.gallery ? form.gallery.split(',').map(s=>s.trim()).filter(Boolean) : []).map((url) => (
                <div key={url} className="relative group aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="galeria" className="absolute inset-0 w-full h-full object-cover rounded" />
                  <button type="button" onClick={() => removeImage(url)} className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100">remover</button>
                </div>
              ))}
            </div>
          </div>

          {message && <div className="text-sm mt-3 text-emerald-300">{message}</div>}
          <div className="mt-4 flex justify-end">
            <button onClick={save} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Salvar</button>
          </div>
        </div>
      </section>
    </main>
  )
}
