import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Página não encontrada</h2>
      <p className="text-xl mb-10 text-gray-600">O conteúdo que você está procurando não existe ou foi removido.</p>
      
      <Link 
        href="/blog" 
        className="bg-[#C1A87D] text-black px-6 py-3 rounded-lg hover:bg-[#D4BC8C] transition-colors font-semibold"
      >
        Voltar para o Blog
      </Link>
    </div>
  )
} 