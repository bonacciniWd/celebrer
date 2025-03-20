'use client'
import { useState, useRef, useEffect, FormEvent } from 'react';
import { CohereClient } from 'cohere-ai';
import { 
  BiDrink, 
  BiMapAlt, 
  BiBuildings, 
  BiCalendarEvent, 
  BiX,
  BiMessageDetail,
  BiBot,
  BiPhone,
  BiLogoWhatsapp,
  BiRefresh
} from 'react-icons/bi';
import { FaInstagram } from 'react-icons/fa';
import { mainCities, getPartnersByCity } from '@/data/partners';
import { PartnerCard } from './PartnerCard';

// Inicialização do cliente Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
});

interface Message {
  content: string;
  isUser: boolean;
  options?: QuickOption[];
  image?: string;
  component?: React.ReactNode;
}

interface QuickOption {
  label: string;
  value: string;
  Icon: React.ElementType;
  action?: () => void;
}

const systemPrompt = `Você é um assistente virtual da Celebrer especializado em eventos.
Siga estas regras RIGOROSAMENTE:
1. Responda SEMPRE em português brasileiro formal
2. Use emojis relevantes em suas respostas
3. Mantenha respostas curtas e objetivas
4. NÃO inclua opções na sua resposta, apenas responda a pergunta

Exemplo de resposta correta:
"Olá! Seja bem-vindo à Celebrer! 🎉 Como posso ajudar você hoje?"`;

const DEFAULT_OPTIONS: QuickOption[] = [
  { 
    label: "Carta de Drinks",
    value: "drinks",
    Icon: BiDrink
  },
  { 
    label: "Área de atuação",
    value: "area",
    Icon: BiMapAlt
  },
  { 
    label: "Locais",
    value: "locais",
    Icon: BiBuildings
  },
  { 
    label: "Agendar",
    value: "agendar",
    Icon: BiCalendarEvent
  },
  { 
    label: "Galeria",
    value: "galeria",
    Icon: BiMessageDetail
  },
  { 
    label: "Contato",
    value: "contato",
    Icon: BiPhone
  }
];

const ATENDIMENTO_OPTIONS: QuickOption[] = [
  {
    label: "WhatsApp",
    value: "whatsapp",
    Icon: BiLogoWhatsapp,
    action: () => window.open('https://wa.me/5511999999999', '_blank')
  },
  {
    label: "Fale Conosco",
    value: "contato",
    Icon: BiPhone,
    action: () => window.location.href = '/contato'
  }
];

const CHAT_FLOWS = {
  drinks: {
    response: `Nossa carta premium inclui: 🍸
- Drinks autorais exclusivos
- Clássicos da coquetelaria
- Opções zero álcool
- Drinks temáticos personalizados

Estamos à disposição para oferecer uma experiência única e personalizada para o seu evento.`,
    options: [
      {
        label: "Ver cardápio completo",
        value: "drinks_menu",
        Icon: BiDrink
      }
    ]
  },

  drinks_menu: {
    response: `Aqui está nosso cardápio 📋
1. Clássicos
   - Mojito
   - Gin Tônica
   - Sex on the Beach
   - Moscow Mule
   - Negroni
   - Daiquiri de Morango
   - Aperol Spritz
   - Fitzgerald
   - Cosmopolitan
   - Campari Fresh
   - Carajillo

2. Autorais
   - Cangu
   - Passion Mule
   - Amaterasu
   - The Green
   - Cajuína
   - Gin Tropical
   - Tsuki
   - Caribean Mule
   - My Cazah
   - Bananinha
   - Spring Things
   - Peach Mule
   - Lemon Mule
   - Penicilin
   
3. Sem Álcool
   - Lemon Fresh
   - Pink Lemonade
   - Mar Vermelho
   - Tsunami Sea
   - Blue Hawaiian

Para mais detalhes sobre cada drink, incluindo descrições e imagens, visite nossa página completa da carta de drinks.`,
    options: [
      {
        label: "Falar com Sommelier",
        value: "sommelier",
        Icon: BiMessageDetail,
        action: () => window.open('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Celebrer%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20servi%C3%A7o.', '_blank')
      },
      {
        label: "WhatsApp",
        value: "whatsapp",
        Icon: BiLogoWhatsapp,
        action: () => window.open('https://wa.me/5511999999999', '_blank')
      },
      {
        label: "Instagram",
        value: "instagram",
        Icon: FaInstagram,
        action: () => window.open('https://instagram.com/seu_perfil', '_blank')
      },
      {
        label: "Formulário de Contato",
        value: "contato_form",
        Icon: BiMessageDetail,
        action: () => window.open('/contato', '_blank')
      }
    ]
  },

  area: {
    response: `Atuamos com os seguintes eventos: 🎉
- Casamentos
- Formaturas
- Eventos corporativos
- Festas de 15 anos
- Confraternizações`,
    options: [
      {
        label: "Ver fotos",
        value: "area_fotos",
        Icon: BiMessageDetail
      }
    ]
  },

  locais: {
    response: `Atendemos: 📍
- Vale do Itajaí:
  - Blumenau
  - Brusque
  - Gaspar
  - Indaial
  - Itajaí
  - Navegantes
  - Pomerode
  - Timbó
  - Balneário Camboriú
  - Camboriú
  - Ilhota
  - Penha
  - Piçarras
  - Rio do Sul
  - Ibirama
  - Ascurra
  - Apiúna
  - Rodeio
  - Lontras
  - Presidente Getúlio
  - Presidente Nereu
  - Taió
  - Salete
  - Witmarsum
  - Doutor Pedrinho
  - Benedito Novo
  - Rio dos Cedros`,
    options: [
      {
        label: "Outra Região",
        value: "outra_regiao",
        Icon: BiMapAlt,
        action: () => window.open('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20Celebrer%2C%20por%C3%A9m%20notei%20que%20minha%20regi%C3%A3o%20n%C3%A3o%20est%C3%A1%20na%20lista%20de%20cidades%2C%20gostaria%20de%20saber%20mais%20sobre%20outras%20%C3%A1reas...', '_blank')
      },
      {
        label: "Parceiros",
        value: "parceiros",
        Icon: BiBuildings
      }
    ]
  },

  agendar: {
    response: `Caso queira agendar uma reunião ou orçamento, você poderá consultar através de:`,
    options: [
      {
        label: "WhatsApp",
        value: "whatsapp",
        Icon: BiLogoWhatsapp,
        action: () => window.open('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20diretamente%20do%20site%20da%20Celebrer%2C%20gostaria%20de%20saber%20sobre%20sua%20agenda...', '_blank')
      },
      {
        label: "Agenda",
        value: "form",
        Icon: BiMessageDetail,
        action: () => window.location.href = '/agendar'
      }
    ]
  },

  area_fotos: {
    response: `Aqui estão algumas fotos dos nossos eventos: 📸`,
    options: [
      {
        label: "Falar com Sommelier",
        value: "sommelier",
        Icon: BiMessageDetail,
        action: () => window.open('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Celebrer%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20servi%C3%A7o.', '_blank')
      },
      {
        label: "WhatsApp",
        value: "whatsapp",
        Icon: BiLogoWhatsapp,
        action: () => window.open('https://wa.me/5511999999999', '_blank')
      },
      {
        label: "Instagram",
        value: "instagram",
        Icon: FaInstagram,
        action: () => window.open('https://instagram.com/seu_perfil', '_blank')
      },
      {
        label: "Formulário de Contato",
        value: "contato_form",
        Icon: BiMessageDetail,
        action: () => window.open('/contato', '_blank')
      }
    ],
    images: [
      "/1.jpg",
      "/2.jpg",
      "/3.jpg"
    ]
  },

  parceiros: {
    response: "Aqui está uma lista de alguns parceiros da Celebrer, em qual cidade você precisa?",
    options: mainCities.map(city => ({
      label: city,
      value: `parceiros_${city.toLowerCase().replace(' ', '_')}`,
      Icon: BiBuildings
    }))
  },

  ...Object.fromEntries(
    mainCities.map(city => [
      `parceiros_${city.toLowerCase().replace(' ', '_')}`,
      {
        response: `Parceiros em ${city}:`,
        options: [],
        component: (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {getPartnersByCity(city).map(partner => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )
      }
    ])
  )
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "bom dia";
  if (hour < 18) return "boa tarde";
  return "boa noite";
};

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [hasOpened, setHasOpened] = useState<boolean>(false);
  const [showExclamation, setShowExclamation] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const popupShown = document.cookie.split('; ').find(row => row.startsWith('popupShown='));
    if (!popupShown) {
      setShowPopup(true);
      document.cookie = "popupShown=true; max-age=86400"; // 1 dia
    }

    const exclamationTimer = setTimeout(() => {
      setShowExclamation(true);
    }, 20000); // 20 segundos

    return () => clearTimeout(exclamationTimer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getGreeting();
      const welcomeMessage = `Olá, ${greeting}! Sou a Celly, a assistente virtual da Celebrer. Como sou uma assistente virtual, vou guiar você no atendimento.`;
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < welcomeMessage.length) {
          setMessages(prev => [
            {
              content: welcomeMessage.slice(0, index + 1),
              isUser: false,
              options: undefined // Não exibe opções durante a digitação
            }
          ]);
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            let optionIndex = 0;
            const optionsTypingInterval = setInterval(() => {
              if (optionIndex < DEFAULT_OPTIONS.length) {
                setMessages(prev => [
                  {
                    content: welcomeMessage,
                    isUser: false,
                    options: DEFAULT_OPTIONS.slice(0, optionIndex + 1) // Adiciona opções gradualmente
                  }
                ]);
                optionIndex++;
              } else {
                clearInterval(optionsTypingInterval);
                setShowOptions(true); // Exibe todas as opções após a digitação
              }
            }, 100); // Ajuste o tempo conforme necessário
          }, 400); // Atraso de 2 segundos
        }
      }, 20); // Ajuste o tempo conforme necessário
    }
  }, [isOpen]);

  const handleOptionClick = async (option: QuickOption) => {
    if (option.action) {
      option.action();
      return;
    }

    const userMessage: Message = {
      content: option.label,
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);

    const flow = CHAT_FLOWS[option.value as keyof typeof CHAT_FLOWS];
    if (flow) {
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage: Message = {
          content: flow.response,
          isUser: false,
          options: flow.options || DEFAULT_OPTIONS,
          component: flow.component
        };
        setMessages(prev => [...prev, aiMessage]);

        if (flow.images) {
          flow.images.forEach(image => {
            setMessages(prev => [
              ...prev,
              {
                content: '',
                isUser: false,
                image: image
              }
            ]);
          });
        }

        setIsTyping(false);
      }, 1000);
    } else {
      const aiMessage: Message = {
        content: "Desculpe, não entendi sua escolha. Como posso ajudar? 😕",
        isUser: false,
        options: DEFAULT_OPTIONS
      };
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const isAtendimentoRequest = (text: string): boolean => {
    const keywords = ['atendente', 'atendimento', 'falar', 'contato', 'whatsapp', 'ajuda'];
    return keywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      content: inputMessage,
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (isAtendimentoRequest(inputMessage)) {
        const aiMessage: Message = {
          content: "Como você prefere ser atendido? 👋",
          isUser: false,
          options: ATENDIMENTO_OPTIONS
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const response = await cohere.chat({
          message: inputMessage,
          model: 'command',
          preamble: systemPrompt,
          temperature: 0.3,
          maxTokens: 200,
        });

        const aiMessage: Message = {
          content: response.text,
          isUser: false,
          options: DEFAULT_OPTIONS
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages(prev => [...prev, {
        content: "Desculpe, ocorreu um erro. Tente novamente mais tarde. 😕",
        isUser: false,
        options: DEFAULT_OPTIONS
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    const greeting = getGreeting();
    const welcomeMessage = `Olá, ${greeting}! Sou a Celly, a assistente virtual da Celebrer. Como sou uma assistente virtual, vou guiar você no atendimento.`;
    
    setMessages([
      {
        content: welcomeMessage,
        isUser: false,
        options: DEFAULT_OPTIONS
      }
    ]);
    setShowOptions(true);
    setIsTyping(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasOpened(true);
    setShowPopup(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-[340px] sm:w-[420px] md:w-[500px] lg:w-[600px] xl:w-[700px]">
          <div className="flex flex-col h-[570px] sm:h-[600px] md:h-[650px] lg:h-[700px] bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl border border-gray-700">
            <div className="p-4 sm:p-5 border-b border-gray-600 bg-gray-800 rounded-t-xl flex justify-between items-center">
              <h3 className="text-white font-medium flex items-center gap-2 text-sm sm:text-base md:text-lg">
                <span className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full shadow-[0_0_5px_1px_rgba(34,197,94,0.6),0_0_10px_2px_rgba(34,197,94,0.4)]"></span>
                Assistente Celebrer
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="text-white hover:text-gray-400 transition-all duration-200"
                >
                  <BiRefresh className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-400 transition-all duration-200"
                >
                  <BiX className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gray-900 bg-opacity-90">
              {messages.map((message, index) => (
                <div key={index} className="space-y-3">
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 sm:p-4 rounded-2xl ${
                      message.isUser 
                        ? 'bg-gray-800 text-white rounded-br-none' 
                        : 'bg-gray-700 text-white rounded-bl-none'
                    }`}>
                      {message.content && (
                        <p className="text-sm sm:text-base whitespace-pre-line">{message.content}</p>
                      )}
                      {message.image && (
                        <img 
                          src={message.image} 
                          alt="Evento" 
                          className="w-full h-auto mt-2 rounded-lg"
                        />
                      )}
                      {message.component && (
                        <div className="mt-2">
                          {message.component}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!message.isUser && showOptions && message.options && message.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2">
                      {message.options.map((option, optIndex) => {
                        const IconComponent = option.Icon;
                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleOptionClick(option)}
                            className="flex items-center gap-2 p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl border border-gray-600 transition-all duration-200 hover:scale-105"
                          >
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            <span className="text-xs sm:text-sm md:text-base font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 p-4 rounded-2xl rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="relative">
          <button
            onClick={handleOpenChat}
            className="bg-gray-800/30 hover:bg-gray-700 text-white rounded-full p-1 sm:p-5 shadow-lg mb-2 ml-auto block transition-all duration-200 hover:scale-105"
          >
            <img src="/bot.png" alt="Assistente Virtual" className="w-20 h-20 sm:w-28 sm:h-28" />
            {!hasOpened && showExclamation && (
              <div className="absolute top-[5px] right-[5px] w-6 h-6 md:w-10 md:h-10 bg-yellow-500 rounded-full flex items-center justify-center" style={{ animation: 'shakeWithPause 2s infinite' }}>
                <span className="text-black text-xs md:text-lg">!</span>
              </div>
            )}
          </button>
          {showPopup && !hasOpened && (
            <div className="absolute bottom-full left-0 mb-2 bg-white text-gray-800 p-2 rounded-lg shadow-lg text-xs">
              <div className="relative">
                <div className="absolute -bottom-2 left-4 w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent"></div>
                Conheça a Celly, a assistente virtual da Celebrer.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatAI;


