import React from 'react';
import Image from 'next/image';

export const Partners = () => {
    return (
        <div id="partners">
            <section className="pt-10 overflow-hidden bg-gray-100 md:pt-0 sm:pt-16 2xl:pt-16">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-6xl">
                    <div className="grid items-center grid-cols-1 md:grid-cols-2">

                        <div className="relative order-last md:order-first">
                            <Image
                                src="/fundo1.png"
                                alt="Imagem de fundo"
                                width={600} // Ajuste conforme necessário
                                height={400}
                                className="relative -mt-10 w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                            />
                        </div>

                        {/* Conteúdo de texto */}
                        <div className="order-first md:order-last">
                            <h2 className="text-2xl py-4 font-extrabold leading-tight text-slate-800 dark:text-slate-900 sm:text-3xl lg:text-4xl">
                                Nós somos a Celebrer! 🥂
                            </h2>
                            <div className='md:mb-32 mb-0'>
                                <p className="max-w-2xl font-montserrat mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-800 md:mt-8 md:text-lg lg:text-xl">
                                    Transforme seu evento com nossa experiência única em coquetéis e serviço de bartender profissional! <br />
                                    Nossa equipe está pronta para criar drinks exclusivos, garantir uma experiência inesquecível e manter o clima animado do início ao fim.<br />
                                    De casamentos a eventos corporativos, temos tudo o que você precisa para impressionar seus convidados!
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
