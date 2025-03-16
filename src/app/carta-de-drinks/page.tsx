"use client"
import { FaWhatsapp, FaCocktail, FaWineGlassAlt, FaBeer, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';
import Header from '@/components/Header';

export default function CartaDeDrinks() {
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);

  const toggleRecipe = (drinkName: string) => {
    if (openRecipe === drinkName) {
      setOpenRecipe(null);
    } else {
      setOpenRecipe(drinkName);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-12 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Nossa Carta de Drinks</h1>
          <p className="text-gray-300 text-lg">Descubra nossa seleção exclusiva de drinks clássicos e autorais</p>
        </div>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Drinks Clássicos */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaCocktail className="text-3xl text-amber-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Drinks Clássicos</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <div className="flex justify-between items-center">
                  <span>Mojito</span>
                  <button onClick={() => toggleRecipe('mojito')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'mojito' && (
                    <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-amber-400 mb-2">MOJITO (drink montado - long drink):</h4>
                          <ul className="space-y-1">
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 8~10 folhas de hortelã</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 10ml limão espremido</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 10ml xarope de açúcar</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 60ml rum</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Completar com sprite</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: topo de hortelã</li>
                          </ul>
                        </div>
                        <div className="w-full md:w-1/3">
                          <img 
                            src="/mojito.png" 
                            alt="Mojito" 
                            className="rounded-lg shadow-lg w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                    <span>Gin Tônica</span>
                    <button onClick={() => toggleRecipe('gintonica')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                  {openRecipe === 'gintonica' && (
                    <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-amber-400 mb-2">GIN TÔNICA (drink montado - taça de gin):</h4>
                          <ul className="space-y-1">
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 2 rodelas de limão siciliano</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 60ml gin</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Completar com tônica</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: topo de alecrim</li>
                          </ul>
                        </div>
                        <div className="w-full md:w-1/3">
                          <img 
                            src="/gin-tonica.png" 
                            alt="Gin Tônica" 
                            className="rounded-lg shadow-lg w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Sex on the Beach</span>
                  <button onClick={() => toggleRecipe('sexonthebeach')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'sexonthebeach' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">SEX ON THE BEACH (drink montado - taça escandinava):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 40ml vodka</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 20ml licor de pêssego</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Completar com suco de laranja</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 5ml xarope grenadine entre o gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: meia lua de laranja</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/sex-on.png" 
                          alt="Sex on the Beach" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Moscow Mule</span>
                  <button onClick={() => toggleRecipe('moscowmule')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'moscowmule' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">MOSCOW MULE (drink montado - caneca de cobre):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 40ml de vodka</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 20ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Espuma cítrica de gengibre</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: limão Taiti ralado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/moscow.png" 
                          alt="Moscow Mule" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Negroni</span>
                  <button onClick={() => toggleRecipe('negroni')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'negroni' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">NEGRONI (drink mexido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Mixing glass</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 30ml gin</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 30ml vermouth rosso</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 30ml Campari</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Mexer por 15s</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Coar</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: zest de laranja Bahia</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/negroni.png" 
                          alt="Negroni" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Daiquiri de Morango</span>
                  <button onClick={() => toggleRecipe('daiquiri')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'daiquiri' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">DAIQUIRI DE MORANGO (drink batido - taça martini):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 4 ~ 6 morangos</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 20ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml rum</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Coagem dupla</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: um morango</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/daiquiri.png" 
                          alt="Daiquiri de Morango" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Aperol Spritz</span>
                  <button onClick={() => toggleRecipe('aperol')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'aperol' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">APEROL SPRITZ (drink montado - taça de água):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 2 meia lua de laranja</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 70ml aperol</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Completar o restante com espumante e por último água com gás</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/aperol.png" 
                          alt="Aperol Spritz" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Fitzgerald</span>
                  <button onClick={() => toggleRecipe('fitzgerald')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'fitzgerald' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">FITZGERALD (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml gin</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 30ml limão espremido</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 15ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 2 dash angostura</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: limão desidratado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/fitzgerald.png" 
                          alt="Fitzgerald" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Cosmopolitan</span>
                  <button onClick={() => toggleRecipe('cosmopolitan')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'cosmopolitan' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">COSMOPOLITAN (drink batido - taça martini):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml vodka</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 10ml de limão</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 30ml licor de laranja</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 20ml xarope de cranberry</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: zest de limão</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/cosmopolitan.png" 
                          alt="Cosmopolitan" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Campari Fresh</span>
                  <button onClick={() => toggleRecipe('camparifresh')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'camparifresh' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">CAMPARI FRESH (drink batido - copo alto):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml campari</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 30ml xarope de tangerina</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Coar e completar com tônica</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: laranja Bahia desidratada</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/campari-fresh.png" 
                          alt="Campari Fresh" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Carajillo</span>
                  <button onClick={() => toggleRecipe('carajillo')} className="text-amber-500 hover:text-amber-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'carajillo' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-400 mb-2">CARAJILLO (drink montado - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Gelo cubo</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml licor 43</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> 50ml café expresso</li>
                          <li className="flex items-center"><span className="text-amber-500 mr-2">•</span> Guarnição: grãos de café</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/carajillo.png" 
                          alt="Carajillo" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Drinks Autorais */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaWineGlassAlt className="text-3xl text-pink-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Drinks Autorais</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <div className="flex justify-between items-center">
                  <span>Gangu</span>
                  <button onClick={() => toggleRecipe('gangu')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'gangu' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">GANGU (drink montado - taça de gin):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 60ml de gin</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Tônica (até restar um dedo da taça)</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espuma cítrica de hibisco</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: flor comestível</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/gangu.png" 
                          alt="Gangu" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Passion Mule</span>
                  <button onClick={() => toggleRecipe('passionmule')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'passionmule' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">PASSION MULE (drink montado - caneca de cobre):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml wisky bourbon</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 40ml maracujá</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espuma cítrica de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: uma bailarina de maracujá natura</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/passion-mule.png" 
                          alt="Passion Mule" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Amaterasu</span>
                  <button onClick={() => toggleRecipe('amaterasu')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'amaterasu' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">AMATERASU (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 40ml de rum carta ouro</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 40ml jagermeister</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml xarope de abacaxi</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 2 dash angostura</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: topo de alecrim</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/amaterasu.png" 
                          alt="Amaterasu" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>The Green</span>
                  <button onClick={() => toggleRecipe('thegreen')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'thegreen' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">THE GREEN (drink batido - copo alto):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml gin</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 40ml xarope de maçã verde</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml albumina</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 5 folhas de hortelã</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: 3 luas de maçã e topo de hortelã</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/the-green.png" 
                          alt="The Green" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Cajuína</span>
                  <button onClick={() => toggleRecipe('cajuina')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'cajuina' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">CAJUÍNA (drink batido - copo alto):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml vermouth de caju</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 40ml vodka</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml albumina</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: limão desidratado e canela em pau</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/cajuina.png" 
                          alt="Cajuína" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Gin Tropical</span>
                  <button onClick={() => toggleRecipe('gintropical')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'gintropical' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">GIN TROPICAL (drink montado - taça de gin):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 2 meia lua de laranja</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 4 folhas de hortelã</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 60ml gin</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Completar com energético tropical</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: topo de hortelã</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/gin-tropical.png" 
                          alt="Gin Tropical" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Tsuki</span>
                  <button onClick={() => toggleRecipe('tsuki')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'tsuki' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">TSUKI (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml wisky borboun</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 10ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espuma cítrica de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: limão Taiti desidratado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/tsuki.png" 
                          alt="Tsuki" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Caribean Mule</span>
                  <button onClick={() => toggleRecipe('caribeanmule')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'caribeanmule' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">CARIBEAN MULE (drink montado - caneca de cobre):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml Malibu</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 25ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espuma cítrica de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: coco queimado ralado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/caribean-mule.png" 
                          alt="Caribean Mule" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>My Cazah</span>
                  <button onClick={() => toggleRecipe('mycazah')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'mycazah' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">MY CAZAH (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml rum carta ouro</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml contreau</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 5ml xarope de hibisco</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: grape fruit desidratada</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/my-cazah.png" 
                          alt="My Cazah" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Bananinha</span>
                  <button onClick={() => toggleRecipe('bananinha')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'bananinha' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">BANANINHA (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 60ml bananinha</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 40ml maracujá</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml albumina</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 4 folhas de manjericão</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: folha de manjericão e banana desidratada</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/bananinha.png" 
                          alt="Bananinha" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Spring Things</span>
                  <button onClick={() => toggleRecipe('springthings')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'springthings' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">SPRING THINGS (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml vodka</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope de tangerina</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml xarope de hibisco</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limoncello</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: grape fruit desidratada</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/spring-things.png" 
                          alt="Spring Things" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Peach Mule</span>
                  <button onClick={() => toggleRecipe('peachmule')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'peachmule' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">PEACH MULE (drink montado - caneca de cobre):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml purê de pêssego</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml saque</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espuma cítrica de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: Pimenta rosa</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/peach-mule.png" 
                          alt="Peach Mule" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Lemon Mule</span>
                  <button onClick={() => toggleRecipe('lemonmule')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'lemonmule' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">LEMON MULE (drink montado - taça de vinho):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 2 rodelas de limão siciliano</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml limoncello</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espumante brut</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Espuma cítrica de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: limão siciliano ralado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/lemon-mule.png" 
                          alt="Lemon Mule" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Penicilin</span>
                  <button onClick={() => toggleRecipe('penicilin')} className="text-pink-500 hover:text-pink-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'penicilin' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-pink-400 mb-2">PENICILIN (drink batido - copo baixo):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 50ml wisky borboun</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 30ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 20ml xarope de açúcar</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> 10ml de mel</li>
                          <li className="flex items-center"><span className="text-pink-500 mr-2">•</span> Guarnição: gengibre maçaricado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/penicilin.png" 
                          alt="Penicilin" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Sem Álcool */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaBeer className="text-3xl text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Sem Álcool</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <div className="flex justify-between items-center">
                  <span>Lemon Fresh</span>
                  <button onClick={() => toggleRecipe('lemonfresh')} className="text-blue-500 hover:text-blue-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'lemonfresh' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-400 mb-2">LEMON FRESH (drink montado - copo alto):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 50ml xarope de gengibre</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 30ml limão espremido</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Água com gás</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Guarnição: limão Taiti desidratado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/lemon-fresh.png" 
                          alt="Lemon Fresh" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Pink Lemonade</span>
                  <button onClick={() => toggleRecipe('pinklemonade')} className="text-blue-500 hover:text-blue-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'pinklemonade' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-400 mb-2">PINK LEMONADE (drink montado - taça de água):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 25ml xarope grenadine</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 25ml xarope de morango</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 25ml limão espremido</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Água com gás</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Guarnição: morango e topo de hortelã</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/pink-lemonade.png" 
                          alt="Pink Lemonade" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Mar Vermelho</span>
                  <button onClick={() => toggleRecipe('marvermelho')} className="text-blue-500 hover:text-blue-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'marvermelho' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-400 mb-2">MAR VERMELHO (drink montado - copo alto):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 20ml limão espremido</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 50ml xarope de toranja</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Sprite</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Guarnição: grape fruit desidratado</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/mar-vermelho.png" 
                          alt="Mar Vermelho" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Tsunami Sea</span>
                  <button onClick={() => toggleRecipe('tsunami')} className="text-blue-500 hover:text-blue-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'tsunami' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-400 mb-2">TSUNAMI SEA (drink batido - copo alto):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 150g melancia</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 30ml limão espremido</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 20ml xarope de hortelã</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Coar</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Água com gás</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Guarnição: topo de hortelã</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/tsunami-sea.png" 
                          alt="Tsunami Sea" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <span>Blue Hawaiian</span>
                  <button onClick={() => toggleRecipe('bluehawaiian')} className="text-blue-500 hover:text-blue-400">
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                {openRecipe === 'bluehawaiian' && (
                  <div className="mt-3 text-sm text-gray-300 pl-4 border-l border-gray-600">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-400 mb-2">BLUE HAWAIIAN (drink batido - taça escandinava):</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Gelo</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 30ml xarope de curaçau blue</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 50ml suco de abacaxi</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 50ml leite de coco</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> 50ml água filtrada</li>
                          <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Guarnição: triângulo de abacaxi</li>
                        </ul>
                      </div>
                      <div className="w-full md:w-1/3">
                        <img 
                          src="/blue-hawaiian.png" 
                          alt="Blue Hawaiian" 
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Botão WhatsApp */}
        <div className="text-center">
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <FaWhatsapp className="text-2xl mr-2" />
            Contato via WhatsApp
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
