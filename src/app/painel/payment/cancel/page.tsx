"use client"
import { useRouter } from 'next/navigation'

export default function PaymentCancelPage() {
  const router = useRouter()
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold text-white">Pagamento cancelado</h1>
        <p className="text-gray-300">Você cancelou o processo de pagamento. Se foi um engano, você pode tentar novamente.</p>
        <button
          onClick={() => router.push('/painel/payment')}
          className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-500 text-white"
        >
          Voltar ao pagamento
        </button>
      </div>
    </main>
  )
}
