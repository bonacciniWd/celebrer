"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones do menu mobile
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado do menu mobile

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/90 shadow-md z-50">
      <nav className="max-w-4xl xl:max-w-5xl mx-auto px-5 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo com link para a Home */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={90}
              className="w-[160px] h-auto lg:w-[280px]" // Ajuste para mobile e desktop
            />
          </Link>

          {/* Menu desktop */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-white">
              {["Home", "Our services", "About", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:underline hover:underline-offset-4 transition-all duration-100 ease-linear"
                >
                  <Link href="#">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Botões Login / Signup (Desktop) */}
          <div className="hidden lg:flex lg:items-center gap-x-2">
            <button className="text-white px-6 py-2.5 font-semibold">
              Sign up
            </button>
            <button className="rounded-md bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200">
              Login
            </button>
          </div>

          {/* Botão menu mobile */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="text-3xl text-white" />
              ) : (
                <FiMenu className="text-3xl text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="lg:hidden mt-4 flex flex-col space-y-3 text-center text-white">
            {["Inicio", "Serviços", "Sobre", "Contato"].map((item) => (
              <Link key={item} href="#" className="text-lg font-semibold">
                {item}
              </Link>
            ))}
            <button className="text-white px-6 py-2.5 font-semibold">
              Sign up
            </button>
            <button className="rounded-md bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200">
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
