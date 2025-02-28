import { FaFacebook, FaLinkedin, FaInstagram, FaFacebookMessenger, FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col space-y-8 justify-center p-10 bg-slate-900/90 text-white">
      {/* Links de navegação */}
      <nav className="flex justify-center flex-wrap gap-6 text-gray-300 font-medium">
        {["Home", "About", "Services", "Media", "Gallery", "Contact"].map((item) => (
          <a key={item} className="hover:text-gray-100 transition" href="#">
            {item}
          </a>
        ))}
      </nav>

      {/* Ícones de redes sociais */}
      <div className="flex justify-center space-x-5 text-gray-300 text-2xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="hover:text-blue-500 transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-400 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500 transition" />
        </a>
        <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookMessenger className="hover:text-blue-400 transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-blue-300 transition" />
        </a>
      </div>

      {/* Grid com duas logos, menores no mobile */}
      <div className="flex justify-center items-center gap-8">
        <Image 
          src="/logo.png" 
          alt="Logo 1" 
          width={128} height={128} 
          className="w-24 h-20 sm:w-44 sm:h-32 object-contain" 
        />
        <Image 
          src="/footer-1.png" 
          alt="Logo 2" 
          width={128} height={128} 
          className="w-24 h-20 sm:w-44 sm:h-32 object-contain" 
        />
      </div>

      {/* Direitos autorais */}
      <p className="text-center text-gray-400 font-medium">
        &copy; {new Date().getFullYear()} Celebrer Ltda. <br /> Todos os direitos reservados.
      </p>
    </footer>
  );
}
