import { headers } from 'next/headers'
async function getPartner(username: string) {
  const hdrs = await headers()
  const host = hdrs.get('host') || 'localhost:3000'
  const proto = hdrs.get('x-forwarded-proto') || 'http'
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`
  const res = await fetch(`${base}/api/partners?username=${encodeURIComponent(username)}`, { cache: 'no-store' })
  const data = await res.json()
  return (data.partners || [])[0] || null
}

export default async function PartnerPublicPage(props: { params: Promise<{ username: string }> }) {
  const { username } = await props.params
  const partner = await getPartner(username)
  if (!partner) {
    return <main className="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4">Fornecedor não encontrado.</main>
  }
  const gallery: string[] = partner.gallery || []
  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 container max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{partner.name}</h1>
        <p className="text-gray-600">{partner.city}/{partner.state} · {partner.segment}</p>
      </header>
      {partner.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={partner.cover_image} alt={partner.name} className="w-full h-64 object-cover rounded mb-6" />
      )}
      <div className="rounded-lg border bg-card p-6 shadow mb-6">
        {partner.description && <p className="text-gray-100 leading-relaxed">{partner.description}</p>}
        <div className="flex gap-2 mt-4 text-sm">
          <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full">Responde em ~24h</span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">Promoções</span>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Top parceiro</span>
        </div>
      </div>
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="galeria" className="w-full h-40 object-cover rounded" />
          ))}
        </div>
      )}
      <div id="contato" className="mt-6 text-sm text-gray-700 space-x-4">
        {partner.website && <a className="text-white bg-gray-800/80 p-2 rounded-full hover:underline" href={partner.website} target="_blank" rel="noreferrer">Website</a>}
        {partner.instagram && <a className="text-pink-600 hover:underline rounded-full p-2 bg-amber-500/20" href={partner.instagram} target="_blank" rel="noreferrer">Instagram</a>}
      </div>
    </main>
  )}


