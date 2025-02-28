import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Entre em Contato</h2>

        {/* Endereço */}
        <div className="mb-8 flex items-center space-x-3">
          <FiMapPin className="text-gray-700 text-xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Nosso Endereço</h3>
            <p className="text-gray-600">
              Rua Exemplo, 123<br />
              Vale do Itajaí, SC - Brasil<br />
              CEP: 89000-000
            </p>
          </div>
        </div>

        {/* Telefone */}
        <div className="mb-8 flex items-center space-x-3">
          <FiPhone className="text-gray-700 text-xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Telefone</h3>
            <p className="text-gray-600">+55 (47) 99999-9999</p>
          </div>
        </div>

        {/* Email */}
        <div className="mb-8 flex items-center space-x-3">
          <FiMail className="text-gray-700 text-xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">contato@empresa.com</p>
          </div>
        </div>

        {/* Mapa do Vale do Itajaí */}
        <div className="relative h-0 overflow-hidden mb-6" style={{ paddingBottom: "56.25%" }}>
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
    </section>
  );
};

export default Contact;
