"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones do menu mobile
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado do menu mobile

  // Definindo os itens do menu com seus respectivos caminhos
  const menuItems = [
    { name: "Carta de Drinks", path: "/carta-de-drinks" },
    { name: "Sobre", path: "/quem-somos" },
    { name: "Contato", path: "/contato" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/90 shadow-md z-50">
      <nav className="max-w-4xl xl:max-w-5xl mx-auto px-4 py-2.5 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo com link para a Inicio */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={100}
              className="w-[150px] h-auto lg:w-[260px]" // Ajustado para um tamanho intermediário
            />
          </Link>

          {/* Menu desktop */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-white">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear"
                >
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Botão menu mobile */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="text-2xl text-white" />
              ) : (
                <FiMenu className="text-2xl text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="lg:hidden mt-3 flex flex-col space-y-3 text-center text-white pb-3">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path} className="text-lg font-semibold">
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
