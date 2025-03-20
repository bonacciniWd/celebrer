import { Partner } from '@/data/partners';
import { BiPhone, BiLogoInstagram } from 'react-icons/bi';

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard = ({ partner }: PartnerCardProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-3 w-full max-w-lg mx-auto">
      <img 
        src={partner.image} 
        alt={partner.name} 
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-white font-medium text-sm lg:text-lg">{partner.name}</h3>
      <div className="flex gap-1 lg:gap-2">
        <a
          href={`https://wa.me/55${partner.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 lg:gap-2 text-white bg-gradient-to-r from-green-400 to-green-600 px-2 py-1 lg:px-3 lg:py-2 rounded-lg hover:from-green-500 hover:to-green-700 transition-colors flex-1"
        >
          <BiPhone className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="text-xs lg:text-base">WhatsApp</span>
        </a>
        <a
          href={`https://instagram.com/${partner.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 lg:gap-2 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-2 py-1 lg:px-3 lg:py-2 rounded-lg hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-colors flex-1"
        >
          <BiLogoInstagram className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="text-xs lg:text-base">Instagram</span>
        </a>
      </div>
    </div>
  );
};
