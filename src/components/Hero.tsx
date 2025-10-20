"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BiSolidDrink } from "react-icons/bi";
import React from "react";
import MagicButton from "@/components/interface/MagicButton";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => console.log("Erro ao reproduzir:", err));
      }
    };

    playVideo();

    document.addEventListener("click", playVideo);
    document.addEventListener("touchstart", playVideo);

    return () => {
      document.removeEventListener("click", playVideo);
      document.removeEventListener("touchstart", playVideo);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Video de fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="min-w-full min-h-full absolute object-cover"
          src="https://res.cloudinary.com/dmzyxoy2o/video/upload/v1740709184/Design_sem_nome_tmsii0.mp4"
          typeof="video/mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>

      <div className="absolute inset-0 bg-black opacity-65 z-0"></div>

  {/* Conteúdo centralizado (limitado em desktops) */}
  <div className="relative z-10 text-center px-4 md:px-6 space-y-6 max-w-6xl mx-auto">

        {/* Subtítulo animado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-base font-montserrat sm:text-lg md:text-xl -mt-24 mb-16 lg:text-xl xl:text-2xl max-w-4xl drop-shadow-md mx-auto"
        >
          Oferecemos soluções completas para seus momentos mais especiais.
        </motion.p>

        <motion.a
          href="#partners" // Link para o id do componente até o qual você quer rolar
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-10 flex items-center justify-center md:max-w-[600px] max-w-[220px] gap-2 mx-auto px-0 py-0 sm:px-8 sm:py-4 md:px-10 md:py-3 lg:px-12 lg:py-5 transition-all text-white font-semibold rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
        >
          <MagicButton
            title="Saiba mais"
            icon={<BiSolidDrink />}
            position="right"
          />
        </motion.a>


      </div>
    </section>
  );
};

export default Hero;
