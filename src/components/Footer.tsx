import { FaInstagram, FaGoogle } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col space-y-8 justify-center p-10 bg-slate-900/90 text-white">
      {/* Links de navegação */}
      

      {/* Ícones de redes sociais */}
      <div className="flex justify-center space-x-5 text-gray-300 text-2xl">
        <a href="https://g.co/kgs/6BUqhfQ" target="_blank" rel="noopener noreferrer">
          <FaGoogle className="hover:text-blue-400 transition" />
        </a>
        <a href="https://instagram.com/celebreraeb" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500 transition" />
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
      </div>

      {/* Direitos autorais */}
      <p className="text-center text-gray-400 font-medium ">
        &copy; {new Date().getFullYear()} Celebrer Ltda. <br />Todos os direitos reservados.<br /> <span className="font-thin">Powered by <span className="text-emerald-500">Visione Rifatta</span></span>
      </p>
    </footer>
  );
}
