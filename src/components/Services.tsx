import React from 'react';
import Image from 'next/image';

const Services = () => {
  return (
    <div className="bg-gray-100 rounded-2xl">
      <div className="mx-auto px-4 pb-14 md:pb-20"> {/* Adicionando padding vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">

          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src="https://res.cloudinary.com/dmzyxoy2o/image/upload/v1740756273/Design_sem_nome_zxun5t.jpg"
              alt="Nature"
              width={600}  // Ajuste conforme necessário
              height={400} // Ajuste conforme necessário
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-2xl font-bold text-white">Nossa Equipe</h3>
                <p className="text-white">Colaboradores experientes e capacitados</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src="https://res.cloudinary.com/dmzyxoy2o/image/upload/v1740756853/Design_sem_nome_sdnbny.jpg"
              alt="Food"
              width={600} // Ajuste conforme necessário
              height={400} // Ajuste conforme necessário
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-xl font-bold text-white">Drinks Selecionados</h4>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src="https://res.cloudinary.com/dmzyxoy2o/image/upload/v1740757374/Design_sem_nome_juuetg.jpg"
              alt="Technology"
              width={600} // Ajuste conforme necessário
              height={400} // Ajuste conforme necessário
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-xl font-bold text-white">Casamentos</h4>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src="https://res.cloudinary.com/dmzyxoy2o/image/upload/v1740757709/Design_sem_nome_nq6fro.jpg"
              alt="Travel"
              width={600} // Ajuste conforme necessário
              height={400} // Ajuste conforme necessário
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-xl font-bold text-white">Serviço de bar</h4>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src="https://res.cloudinary.com/dmzyxoy2o/image/upload/v1740759509/Design_sem_nome_faym9a.jpg"
              alt="Art"
              width={600} // Ajuste conforme necessário
              height={400} // Ajuste conforme necessário
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-xl font-bold text-white">Serviços de catering</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;
