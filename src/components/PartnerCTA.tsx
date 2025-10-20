import Link from 'next/link'
import { Button } from './ui/button'

export default function PartnerCTA() {
  return (
    <section className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 rounded-2xl">
      <div className="mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-3">Seja nosso parceiro</h2>
          <p className="text-gray-300 text-sm md:text-base mb-3 sm:mb-4 md:mb-5 max-w-2xl">
            Cadastre seu serviço ou espaço de casamento e seja encontrado por casais em todo o Brasil.<br />
            Aprovação rápida e publicação após pagamento único.
          </p>
          <ul className="text-gray-300 list-disc ml-5 space-y-1 text-xs md:text-sm">
            <li>Fornecedores e Espaços de casamento</li>
            <li>Perfil com dados de contato e localização</li>
            <li>Divulgação dentro do nosso site Celebrer</li>
          </ul>

          <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <Link href="/parceiros">
              <Button size="sm">Cadastre-se agora</Button>
            </Link>
            <div className="text-xs text-gray-400">Pagamento único após aprovação.</div>
          </div>
        </div>
      </div>
    </section>
  )
}


