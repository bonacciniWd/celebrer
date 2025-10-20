'use client'
import { useState, useRef, useEffect } from 'react';
import { 
  BiDrink, 
  BiMapAlt, 
  BiBuildings, 
  BiCalendarEvent, 
  BiX,
  BiMessageDetail,
  BiPhone,
  BiLogoWhatsapp,
  BiRefresh,
  BiLogoGoogle,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin
} from 'react-icons/bi';
import { FaInstagram } from 'react-icons/fa';
import { mainCities, getPartnersByCity } from '@/data/partners';
import { PartnerCard } from './PartnerCard';
import {  FiAlertTriangle } from "react-icons/fi";


// Interfaces para as mensagens e opções rápidas
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

// Interfaces para os drinks
interface Drink {
  name: string;
  description: string;
  image: string; // URL da imagem no Cloudinary
}

interface DrinkCategory {
  name: string;
  drinks: Drink[];
}

// Interfaces para a galeria de fotos
interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  image: string; // URL da imagem no Cloudinary
}



// Definindo o componente CategoryDrinksList ANTES de usá-lo
const CategoryDrinksList = ({ 
  category
}: { 
  category: DrinkCategory;
}) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
  };

  const handleCloseDrink = () => {
    setSelectedDrink(null);
  };

  return (
    <div className="space-y-4">
      {!selectedDrink ? (
        <>
          <h3 className="text-white font-medium mb-3">{category.name}</h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            {category.drinks.map((drink, index) => (
              <button
                key={index}
                onClick={() => handleSelectDrink(drink)}
                className="flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all duration-200 border border-gray-600 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-medium mr-2">{drink.name}</span>
                <span className="text-gray-300 text-sm">Ver detalhes →</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-medium">{category.name} - {selectedDrink.name}</h3>
            <button
              onClick={handleCloseDrink}
              className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1 rounded-full transition-colors"
            >
              <BiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-300 text-sm mb-4 max-w-40">{selectedDrink.description}</p>
          <img
            src={selectedDrink.image}
            alt={selectedDrink.name}
            className="w-64 h-auto object-cover rounded-lg shadow-lg"
          />
        </>
      )}
    </div>
  );
};

// Dados dos drinks - Precisam ser definidos ANTES do CHAT_FLOWS mas DEPOIS do componente CategoryDrinksList
const DRINK_CATEGORIES: DrinkCategory[] = [
  {
    name: "Clássicos",
    drinks: [
      {
        name: "Negroni",
        description: "Mixing glass, 30ml gin, 30ml vermouth rosso, 30ml Campari, Gelo, Mexer por 15s, Coar, Guarnição: zest de laranja Bahia",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742653248/_03_17_25_Celebrer_Drinks2564939_mkkesw.jpg"
      },
      {
        name: "Mojito",
        description: "8~10 folhas de hortelã, 10ml limão espremido, 10ml xarope de açúcar, Gelo, 60ml rum, Completar com sprite, Guarnição: topo de hortelã",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742601194/mojito_mhaq5b.jpg"
      },
      {
        name: "Gin Tônica",
        description: "2 rodelas de limão siciliano, Gelo, 60ml gin, Completar com tônica, Guarnição: topo de alecrim",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604880/gintonica_axhi3x.jpg"
      },
      {
        name: "Moscow Mule",
        description: "Gelo, 40ml vodka, 50ml xarope de gengibre, 20ml xarope de açúcar, 20ml limão espremido, Espuma cítrica de gengibre, Guarnição: limão Taiti ralado",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742601194/moscow_apb43r.jpg"
      },
      {
        name: "Sex on the Beach",
        description: "Gelo, 40ml vodka, 20ml licor de pêssego, Completar com suco de laranja, 5ml xarope grenadine entre o gelo, Guarnição: meia lua de laranja",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604721/aperol_f92jby.jpg"
      },
      {
        name: "Cosmopolitan",
        description: "Gelo, 50ml vodka, 10ml limão, 30ml licor de laranja, 20ml xarope de cranberry, Guarnição: zest de limão",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604723/daiquieiii_atuxlp.jpg"
      },
      {
        name: "Campari Fresh",
        description: "Gelo, 50ml campari, 30ml xarope de tangerina, Guarnição: Laranja Bahia desidatrada.",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604723/drink3_lhfpbj.jpg"
      },
      {
        name: "Carajillo",
        description: "Gelo cubo, 50ml licor 43, 50ml café expresso, Guarnição: grãos de café",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604723/drink4_vlvpep.jpg"
      },
      {
        name: "Aperol Spritz",
        description: "2 meia lua de laranja, Gelo, 70ml aperol, Completar o restante com espumante e por último água com gás",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604722/aperol1_kk54om.jpg"
      },
      {
        name: "Caipiroska de Limão Siciliano",
        description: "1 limão siciliano, 2 colheres de açúcar, Gelo, 60ml vodka, Guarnição: limão siciliano",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477482/_03_17_25_Celebrer_Drinks2565407_copiar_w40j2w.jpg"
      },
      {
        name: "Caipiroska de Morango",
        description: "4~6 morangos, 2 colheres de açúcar, Gelo, 60ml vodka, Guarnição: morango",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477544/_03_17_25_Celebrer_Drinks2565423_copiar_t46ugq.jpg"
      },
      {
        name: "Caipiroska Uva com Manjericão",
        description: "6~8 uvas verdes, 4 folhas de manjericão, 2 colheres de açúcar, Gelo, 60ml vodka, Guarnição: uva e manjericão",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477543/_03_17_25_Celebrer_Drinks2565439_copiar_tx6vml.jpg"
      }
    ]
  },
  {
    name: "Autorais",
    drinks: [
      {
        name: "Gangu",
        description: "Gelo, 60ml de gin, Tônica (até restar um dedo da taça), Espuma cítrica de hibisco, Guarnição: flor comestível",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742604722/drink2_u3yqtj.jpg"
      },
      {
        name: "Gin Tropical",
        description: "2 meia lua de laranja, 4 folhas de hortelã, Gelo, 60ml gin, Completar com energético tropical, Guarnição: topo de hortelã",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742653578/_03_17_25_Celebrer_Drinks2565160_ykc9ze.jpg"
      },
      {
        name: "Amaterasu",
        description: "Gelo, 40ml de rum carta ouro, 40ml jagermeister, 30ml xarope de abacaxi, 20ml limão espremido, 2 dash angostura, Guarnição: topo de alecrim",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744471760/amaterasu_pt6qxm.jpg"
      },
      {
        name: "Celebrer",
        description: "Gelo, 50ml gin, 30ml xarope de hibisco, 20ml limão espremido, 10ml xarope de açúcar, Espuma cítrica de hibisco, Guarnição: flor comestível",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477422/_03_17_25_Celebrer_Drinks2565236_copiar_jvcwpi.jpg"
      },
      {
        name: "Tsunami Sea",
        description: "Gelo, 50ml rum, 30ml xarope de blue curaçao, 20ml limão espremido, 10ml xarope de açúcar, Espuma cítrica de blue curaçao, Guarnição: limão siciliano",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477423/_03_17_25_Celebrer_Drinks2565377_copiar_k8ala4.jpg"
      },
      {
        name: "Peach Mule",
        description: "Gelo, 50ml purê de pêssego, 50ml saque, 50ml xarope de gengibre, 20ml limão espremido, 20ml xarope açúcar, Espuma cítrica de gengibre, Guarnição: Pimenta rosa",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477537/_03_17_25_Celebrer_Drinks2565458_copiar_h7c0bi.jpg"
      },
      {
        name: "Tsuki",
        description: "Gelo, 50ml wisky bourbon, 30ml xarope de gengibre, 20ml limão espremido, 10ml xarope de açúcar, Espuma cítrica de gengibre, Guarnição: limão Taiti desidratado",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477542/tsuki_xsg0em.jpg"
      },
      {
        name: "Penicillin",
        description: "Gelo, 50ml wisky bourbon, 30ml xarope de gengibre, 20ml limão espremido, 20ml xarope de açúcar, 10ml de mel, Guarnição: gengibre maçaricado",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477415/_03_17_25_Celebrer_Drinks2565130_copiar_qugfae.jpg"
      }
    ]
  },
  {
    name: "Sem Álcool",
    drinks: [
      {
        name: "Pink Lemonade",
        description: "Limonada rosa, refrescante e doce, perfeita para dias quentes.",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477420/_03_17_25_Celebrer_Drinks2565285_copiar_nhebrb.jpg"
      },
      {
        name: "Mar Vermelho",
        description: "Gelo, 20ml limão espremido, 50ml xarópe de toranja, sprite, Guarnição: grape fruit desidratada.",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477420/_03_17_25_Celebrer_Drinks2565315_copiar_jgkwuj.jpg"
      },
      {
        name: "Blue Hawaiian",
        description: "Gelo, 30ml xarópe de curaçau blue, 50ml suco de abacaxi, 50ml leite de coco, 50ml água, Guarnição: triangulo de abacaxi.",
        image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1744477422/_03_17_25_Celebrer_Drinks2565348_copiar_fzdiym.jpg"
      }
    ]
  }
];

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ATENDIMENTO_OPTIONS: QuickOption[] = [
  {
    label: "WhatsApp",
    value: "whatsapp",
    Icon: BiLogoWhatsapp,
    action: () => window.open('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Celebrer%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20servi%C3%A7o.', '_blank')
  },
  {
    label: "Fale Conosco",
    value: "contato",
    Icon: BiPhone,
    action: () => window.location.href = '/contato'
  }
];

// Adicione uma interface para definir a estrutura dos fluxos de chat
interface ChatFlow {
  response: string;
  options?: QuickOption[];
  images?: string[];
  component?: React.ReactNode;
}

// Dados da galeria - Lista única de fotos sem categorias
const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "wedding1",
    title: "Casamentos",
    description: "Evento realizado em Itapema com serviço de bar completo",
    image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742659688/foto_itapema_ulvxws.jpg"
  },
  {
    id: "wedding2",
    title: "Aniversários",
    description: "Serviço de bar, com toda estrutura para aniversários.",
    image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742659688/Screenshot_20220618-072638_Instagram_enskka.jpg"
  },
  {
    id: "wedding3",
    title: "Empresas",
    description: "Jantar corporativo de alto padrão, com todo o preparo de bar da Celebrer.",
    image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742659689/WhatsApp_Image_2022-10-25_at_09.15.42_brmgvh.jpg"
  },
  {
    id: "corp1",
    title: "Formaturas",
    description: "Evento para formandos e familiares com drinks e bebidas premium",
    image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742659688/IMG_20210806_163545_nom99w.jpg"
  },
  {
    id: "corp2",
    title: "Celebrações Culturais",
    description: "Serviço de bar celebração da cultura Gaúcha.",
    image: "https://res.cloudinary.com/dmzyxoy2o/image/upload/v1742659687/churrasco-gar%C3%A7om-itapema-balneario-camburiu-porto-belo-bombinhas_aozwyr.jpg"
  },
];

// IMPORTANTE: Definir o componente GalleryViewer ANTES de usá-lo em CHAT_FLOWS
const GalleryViewer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentPhoto = GALLERY_PHOTOS[currentIndex];
  
  const handleNext = () => {
    if (currentIndex < GALLERY_PHOTOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-medium">{currentPhoto.title}</h3>
      </div>
      <div className="relative">
        <img
          src={currentPhoto.image}
          alt={currentPhoto.title}
          className="w-full h-auto rounded-lg"
        />
        {GALLERY_PHOTOS.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/70'}`}
            >
              &larr;
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentIndex === GALLERY_PHOTOS.length - 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white ${currentIndex === GALLERY_PHOTOS.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/70'}`}
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-300 text-sm mt-2">{currentPhoto.description}</p>
      <p className="text-gray-400 text-xs">Foto {currentIndex + 1} de {GALLERY_PHOTOS.length}</p>
    </div>
  );
};

// Agora podemos definir CHAT_FLOWS usando GalleryViewer
const CHAT_FLOWS: Record<string, ChatFlow> = {
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
    response: `Aqui está nosso cardápio de drinks. Escolha uma categoria:`,
    options: [
      { 
        label: "Clássicos",
        value: "drinks_classic",
        Icon: BiDrink
      },
      { 
        label: "Autorais",
        value: "drinks_signature",
        Icon: BiDrink
      },
      { 
        label: "Sem Álcool",
        value: "drinks_nonalcoholic",
        Icon: BiDrink
      },
      {
        label: "Falar com Sommelier",
        value: "sommelier",
        Icon: BiMessageDetail,
        action: () => window.open('https://wa.me/5547999525722?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Celebrer%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20servi%C3%A7o.', '_blank')
      }
    ]
  },

  drinks_classic: {
    response: `Aqui estão nossos drinks:`,
    component: <CategoryDrinksList
      category={DRINK_CATEGORIES.find(cat => cat.name === "Clássicos")!}
    />,
    options: [
      { 
        label: "Voltar ao Menu",
        value: "drinks_menu",
        Icon: BiDrink
      }
    ]
  },

  drinks_signature: {
    response: `Aqui estão nossos drinks:`,
    component: <CategoryDrinksList 
      category={DRINK_CATEGORIES.find(cat => cat.name === "Autorais")!} 
    />,
    options: [
      { 
        label: "Voltar ao Menu",
        value: "drinks_menu",
        Icon: BiDrink
      }
    ]
  },

  drinks_nonalcoholic: {
    response: `Aqui estão nossos drinks:`,
    component: <CategoryDrinksList 
      category={DRINK_CATEGORIES.find(cat => cat.name === "Sem Álcool")!} 
    />,
    options: [
      { 
        label: "Voltar ao Menu",
        value: "drinks_menu",
        Icon: BiDrink
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
        action: () => window.open('https://wa.me/5547999525722?text=Olá,%20vim%20do%20site%20da%20Celebrer%20e%20estou%20procurando%20saber%20sobre%20a%20agenda.', '_blank')
      },
      {
        label: "Agenda",
        value: "form",
        Icon: BiLogoGoogle,
        action: () => window.open('https://wa.me/5547999525722?text=Olá,%20vim%20do%20site%20da%20Celebrer%20e%20estou%20procurando%20saber%20sobre%20a%20agenda.', '_blank') // Apenas abre o caminho /reserva em nova aba
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
        action: () => window.open('https://wa.me/5547999525722?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Celebrer%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20servi%C3%A7o.', '_blank')
      },
      {
        label: "WhatsApp",
        value: "whatsapp",
        Icon: BiLogoWhatsapp,
        action: () => window.open('https://wa.me/5547999525722', '_blank')
      },
      {
        label: "Instagram",
        value: "instagram",
        Icon: FaInstagram,
        action: () => window.open('https://instagram.com/celebreraeb', '_blank')
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
  ),

  galeria: {
    response: `Aqui está nossa galeria de eventos:`,
    component: <GalleryViewer />,
    options: [
      {
        label: "Solicitar Orçamento",
        value: "agendar",
        Icon: BiCalendarEvent
      },
      {
        label: "Voltar ao Menu",
        value: "welcome",
        Icon: BiMessageDetail
      }
    ]
  },

  contato: {
    response: `Aqui estão as opções para você entrar em contato conosco:`,
    options: [
      { 
        label: "Facebook",
        value: "facebook",
        Icon: BiLogoFacebook,
        action: () => window.open("https://www.facebook.com/celebreraeb", "_blank")
      },
      { 
        label: "Instagram",
        value: "instagram",
        Icon: BiLogoInstagram,
        action: () => window.open("https://www.instagram.com/celebreraeb", "_blank")
      },
      { 
        label: "Google",
        value: "google",
        Icon: BiLogoGoogle,
        action: () => window.open("https://g.co/kgs/81d6Eee", "_blank")
      },
      { 
        label: "WhatsApp",
        value: "whatsapp",
        Icon: BiLogoWhatsapp,
        action: () => window.open("https://wa.me/5547999525722", "_blank")
      },
      { 
        label: "LinkedIn",
        value: "linkedin",
        Icon: BiLogoLinkedin,
        action: () => window.open("https://www.linkedin.com/in/celebreraeb", "_blank")
      },
      { 
        label: "Telefone",
        value: "telefone",
        Icon: BiPhone,
        action: () => window.open("tel:+5547999525722")
      }
    ]
  },

  welcome: {
    response: `Estou aqui para ajudar! Como posso ser útil hoje?`,
    options: DEFAULT_OPTIONS
  }
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
  }, [messages, messages.length]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getGreeting();
      const welcomeMessage = `Olá, ${greeting}! Sou a Celly, a assistente virtual da Celebrer. Como sou uma assistente virtual, vou guiar você no atendimento.`;
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < welcomeMessage.length) {
          setMessages([
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
                setMessages([
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
          <div className="flex flex-col h-[80vh] sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl border border-gray-700">
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
            <div className='flex py-2 justify-center mx-auto text-xs'>
              <a 
                href="https://vrzstudio.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-transparent bg-clip-text bg-gradient-animation sm:text-sm md:text-base"
              >
                Desenvolvido por Visione Riffata
              </a>
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
                <FiAlertTriangle className="text-black text-xs md:text-lg" />
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

