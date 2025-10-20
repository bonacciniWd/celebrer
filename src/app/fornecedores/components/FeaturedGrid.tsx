import { headers } from 'next/headers'

async function getFeatured() {
  const hdrs = await headers()
  const host = hdrs.get('host') || 'localhost:3000'
  const proto = hdrs.get('x-forwarded-proto') || 'http'
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`
  const res = await fetch(`${base}/api/partners?featured=true&limit=6`, { cache: 'no-store' })
  const data = await res.json()
  return data.partners || []
}

export default async function FeaturedGrid() {
  const partners = await getFeatured()
  if (!partners.length) return null
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl text-slate-800 font-bold mb-6">Melhores parceiros</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {partners.map((p: any) => (
          <a key={p.id} href={`/fornecedores/${encodeURIComponent(p.username)}`} className="bg-gray-100 shadow rounded overflow-hidden block">
            {p.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.cover_image} alt={p.name} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gray-200" />
            )}
            <div className="p-3">
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-gray-600">{p.city}/{p.state} · {p.segment}</div>
            </div>
          </a>
        ))}
        </div>
      </div>
    </section>
  )
}


