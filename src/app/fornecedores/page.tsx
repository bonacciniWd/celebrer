import { headers } from 'next/headers'
async function getPartners(searchParams: { q?: string | string[]; city?: string | string[]; state?: string | string[]; segment?: string | string[] }) {
  const hdrs = await headers()
  const host = hdrs.get('host') || 'localhost:3000'
  const proto = hdrs.get('x-forwarded-proto') || 'http'
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`
  const sp = new URLSearchParams()
  Object.entries(searchParams || {}).forEach(([k, v]) => {
    if (typeof v === 'string' && v) sp.set(k, v)
  })
  const params = sp.toString()
  const res = await fetch(`${base}/api/partners${params ? `?${params}` : ''}`, { cache: 'no-store' })
  const data = await res.json()
  return data.partners || []
}

export default async function FornecedoresPage(props: { searchParams: Promise<{ q?: string | string[]; city?: string | string[]; state?: string | string[]; segment?: string | string[] }> }) {
  const searchParams = await props.searchParams
  const partners = await getPartners(searchParams)
  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 container max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Fornecedores</h1>
  <form className="bg-gray-100 shadow rounded p-4 grid md:grid-cols-5 gap-3 mb-4">
        <input name="q" placeholder="Buscar..." defaultValue={typeof searchParams.q === 'string' ? searchParams.q : ''} className="border-input border rounded px-3 py-2" />
        <input name="city" placeholder="Cidade" defaultValue={typeof searchParams.city === 'string' ? searchParams.city : ''} className="border-input border rounded px-3 py-2" />
        <input name="state" placeholder="UF" defaultValue={typeof searchParams.state === 'string' ? searchParams.state : ''} className="border-input border rounded px-3 py-2" />
        <input name="segment" placeholder="Segmento" defaultValue={typeof searchParams.segment === 'string' ? searchParams.segment : ''} className="border-input border rounded px-3 py-2" />
        <button className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded">Pesquisar</button>
      </form>
      <div className="grid gap-4">
        {partners.map((p: any) => (
          <article key={p.id} className="bg-gray-100 shadow rounded overflow-hidden">
            {p.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.cover_image} alt={p.name} className="w-full h-96 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <a className="text-lg font-semibold hover:underline" href={`/fornecedores/${encodeURIComponent(p.username)}`}>{p.name}</a>
                  <p className="text-sm text-gray-600">{p.city}/{p.state} · {p.segment}</p>
                </div>
                <a className="bg-rose-500 hover:bg-rose-600 text-white text-sm px-3 py-1 rounded" href={`/fornecedores/${encodeURIComponent(p.username)}#contato`}>Pedir orçamento</a>
              </div>
              {p.description && <p className="mt-2 text-sm text-gray-700 line-clamp-2">{p.description}</p>}
            </div>
          </article>
        ))}
        {partners.length === 0 && <div className="text-gray-600">Nenhum fornecedor publicado ainda.</div>}
      </div>
    </main>
  )
}


