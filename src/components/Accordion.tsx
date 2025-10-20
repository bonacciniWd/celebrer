import Image from "next/image";

export default function Accordion() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-12">
      <div className="max-w-7xl mt-20 md:mt-28 h-auto mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Accordion */}
        <div className="space-y-4 col-span-1 md:col-span-1">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion1" className="peer hidden" />
            <label
              htmlFor="accordion1"
              className="flex items-center justify-between p-4 bg-slate-800 text-white transition-colors"
            >
              <span className="text-lg font-semibold">Como funciona o serviço?</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-200 leading-relaxed">
                  Oferecemos serviço completo de bar para eventos, incluindo bartenders profissionais, drinks personalizados e toda estrutura necessária.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion2" className="peer hidden" />
            <label
              htmlFor="accordion2"
              className="flex items-center justify-between p-4 bg-slate-800 text-white transition-colors"
            >
              <span className="text-lg font-semibold">Qual o tempo de duração?</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-200 leading-relaxed">
                  O serviço padrão é de 4 horas, podendo ser estendido conforme necessidade do cliente.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion3" className="peer hidden" />
            <label
              htmlFor="accordion3"
              className="flex items-center justify-between p-4 bg-slate-800 text-white transition-colors"
            >
              <span className="text-lg font-semibold">Quantos drinks são servidos?</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-200 leading-relaxed">
                  A quantidade varia conforme o pacote escolhido, mas geralmente calculamos 3-4 drinks por pessoa.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion4" className="peer hidden" />
            <label
              htmlFor="accordion4"
              className="flex items-center justify-between p-4 bg-slate-800 text-white transition-colors"
            >
              <span className="text-lg font-semibold">Quais drinks são oferecidos?</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-200 leading-relaxed">
                  Temos uma carta variada com drinks clássicos e autorais, incluindo opções com e sem álcool. <a href="/carta-de-drinks" className="text-rose-400 hover:text-rose-300 underline">Confira nossa carta completa aqui</a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion5" className="peer hidden" />
            <label
              htmlFor="accordion5"
              className="flex items-center justify-between p-4 bg-slate-800 text-white transition-colors"
            >
              <span className="text-lg font-semibold">Qual estrutura é necessária?</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-200 leading-relaxed">
                  Apenas um ponto de energia e água. Todo o restante é fornecido por nós.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion6" className="peer hidden" />
            <label
              htmlFor="accordion6"
              className="flex items-center justify-between p-4 bg-slate-800 text-white transition-colors"
            >
              <span className="text-lg font-semibold">Como fazer reserva?</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-200 leading-relaxed">
                  Entre em contato via WhatsApp ou email para verificar disponibilidade e fazer seu orçamento. <a href="/reserva" className="text-rose-400 hover:text-rose-300 underline">Faça sua reserva aqui</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem (para Desktop) */}
        <div className="hidden md:block col-span-1 relative">
          {/* Imagem de fundo */}
          <Image
            src="/vercel.svg"
            alt="Imagem de fundo"
            width={500} // Defina um tamanho adequado
            height={500}
            className="w-[90%] animate-spin ml-20 h-auto object-cover rounded-lg sticky top-0 z-0"
          />

          {/* Segunda imagem sobreposta */}
          <Image
            src="/next.svg"
            alt="Imagem sobreposta"
            width={400} // Ajuste conforme necessário
            height={400}
            className="w-[80%] ml-16 h-auto object-cover rounded-lg absolute top-10 left-10 z-10"
          />
        </div>

      </div>

    </div>
  );
}
