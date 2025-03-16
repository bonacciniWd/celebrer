import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">Entre em Contato</h2>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-10">
            {/* Endereço */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all p-6 bg-white rounded-lg shadow-sm">
              <FiMapPin className="text-gray-700 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Nosso Endereço</h3>
                <p className="text-gray-600 text-lg">
                  Rua Exemplo, 123<br />
                  Vale do Itajaí, SC - Brasil<br />
                  CEP: 89000-000
                </p>
              </div>
            </div>

            {/* Telefone */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all p-6 bg-white rounded-lg shadow-sm">
              <FiPhone className="text-gray-700 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Telefone</h3>
                <p className="text-gray-600 text-lg">+55 (47) 99999-9999</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all p-6 bg-white rounded-lg shadow-sm">
              <FiMail className="text-gray-700 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Email</h3>
                <p className="text-gray-600 text-lg">contato@empresa.com</p>
              </div>
            </div>
          </div>

          {/* Mapa do Vale do Itajaí */}
          <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221493.52931814926!2d-49.3624381!3d-27.019588000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df3380a2b6e7a5%3A0xb2f91db6fd6633df!2sVale%20do%20Itaja%C3%AD%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1709136000000!5m2!1spt-BR!2sbr"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
        </div>

        {/* Cidades Atendidas */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-center">
            <FiMapPin className="text-gray-700 text-2xl mr-3" />
            Cidades Atendidas
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Itajaí",
              "Balneário Camboriú",
              "Itapema",
              "Blumenau",
              "Pomerode",
              "Gaspar",
              "Navegantes",
              "Barra velha",
              "Porto belo",
              "Bombinhas",
              "Governador Celso Ramos",
              "São José",
              "Florianópolis",
              "Palhoça",
              "Camboriú",
              "Brusque"
            ].map((cidade) => (
              <span
                key={cidade}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-base font-medium hover:bg-gray-200 hover:transform hover:scale-105 transition-all cursor-pointer"
              >
                {cidade}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
