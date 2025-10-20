'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Algo deu errado!</h2>
        <p className="mb-8 text-gray-600">{error.message}</p>
        
        <div className="flex gap-6">
          <button
            onClick={reset}
            className="bg-[#C1A87D] text-black px-6 py-3 rounded-lg hover:bg-[#D4BC8C] transition-colors font-semibold"
          >
            Tentar novamente
          </button>
          
          <Link 
            href="/blog"
            className="border border-[#C1A87D] text-[#C1A87D] px-6 py-3 rounded-lg hover:bg-[#C1A87D]/10 transition-colors font-semibold"
          >
            Voltar para o Blog
          </Link>
        </div>
      </div>
    </div>
  )
} 