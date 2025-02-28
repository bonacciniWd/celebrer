import React from 'react'

export const Partners = () => {
    return (
        <div id="partners">
            <section className="pt-10 overflow-hidden bg-gray-100 md:pt-0 sm:pt-16 2xl:pt-16">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid items-center grid-cols-1 md:grid-cols-2">

                        {/* Imagem (aparece primeiro no desktop e por último no mobile) */}
                        <div className="relative order-last md:order-first">
                            <img className="relative -mt-10 w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="/fundo1.png" alt="..." />
                        </div>

                        {/* Conteúdo de texto */}
                        <div className="order-first md:order-last">
                            <h2 className="text-2xl py-4 font-montserrat leading-tight text-black dark:text-slate-900 sm:text-4xl lg:text-5xl">
                                Nós somos a Celebrer! 🥂
                            </h2>
                            <div className='md:mb-32 mb-0'>
                                <p className="max-w-lg font-montserrat mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-800 md:mt-8 md:text-2xl">
                                    Transforme seu evento com nossa experiência única em coquetéis e serviço de bartender profissional! <br/>
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
