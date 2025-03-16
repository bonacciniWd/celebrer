"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contato() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      title: "WhatsApp",
      description: "Resposta rápida para orçamentos e dúvidas",
      action: "https://wa.me/5511999999999",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      hoverColor: "hover:from-green-600 hover:to-green-800",
      shadowColor: "shadow-green-500/30"
    },
    {
      id: "instagram",
      icon: FaInstagram,
      title: "Instagram",
      description: "Acompanhe nosso trabalho e envie mensagens",
      action: "https://instagram.com/seuinstagram",
      color: "bg-gradient-to-br from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700",
      shadowColor: "shadow-pink-500/30"
    },
    {
      id: "email",
      icon: FaEnvelope,
      title: "Email",
      description: "Para contatos comerciais e parcerias",
      action: "mailto:seu@email.com",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      hoverColor: "hover:from-blue-600 hover:to-blue-800",
      shadowColor: "shadow-blue-500/30"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Entre em <span className="text-amber-400">Contato</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Estamos prontos para atender suas necessidades e criar experiências inesquecíveis para seu evento
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="bg-amber-500/20 p-4 rounded-full">
                <FaClock className="text-amber-400 text-3xl" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Atendimento 24 Horas</h3>
                <p className="text-gray-300 text-lg">
                  Nossa equipe está disponível 24 horas por dia, 7 dias por semana, para garantir o melhor atendimento para seu evento.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${
                  selectedMethod === method.id ? "ring-2 ring-white/50" : ""
                } rounded-xl p-8 ${method.color} cursor-pointer transition-all duration-300 shadow-xl ${method.shadowColor} backdrop-blur-sm`}
                onClick={() => {
                  setSelectedMethod(method.id);
                  window.open(method.action, "_blank");
                }}
              >
                <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <method.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-white/90 text-lg">{method.description}</p>
                <button className="mt-6 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-300">
                  Contatar agora
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
