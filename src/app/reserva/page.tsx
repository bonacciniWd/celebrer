"use client"
import Header from "@/components/Header"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"
import { useState } from "react"

export default function Reserva() {
  const [selectedDate] = useState(new Date())
  
  // Formata a data para o formato YYYY-MM-DD para usar no link do Google Calendar
  const formattedDate = selectedDate.toISOString().split('T')[0]
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="relative pt-20">
        <Image 
          src="/fundo.png"
          alt="Fundo"
          fill
          className="object-cover opacity-20"
        />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Reservas e Contato
            </h1>
            <p className="text-xl text-gray-600">
              Veja nossos horários disponíveis e faça sua reserva
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Horários Disponíveis
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Consulte nossa agenda para ver os horários disponíveis antes de fazer sua reserva.
            </p>
            
            {/* Iframe do Google Calendar para mostrar disponibilidade */}
            <div className="w-full overflow-hidden rounded-lg mb-8" style={{ height: "500px" }}>
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=SEU_EMAIL_AQUI%40gmail.com&ctz=America%2FSao_Paulo&mode=WEEK&showPrint=0&showTabs=1&showCalendars=0&showTz=0" 
                style={{ border: 0 }} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no"
                title="Calendário de Disponibilidade"
              ></iframe>
            </div>
            
            <div className="flex flex-col space-y-3">
              <a
                href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=Reserva+no+Restaurante&details=Reserva+para+visita&dates=${formattedDate}T180000/${formattedDate}T200000&location=Seu+Restaurante`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm0 16.5h-15V7.5h15v12z"/>
                </svg>
                Agendar no Google Calendar
              </a>
              <a 
                href="https://wa.me/5511999999999?text=Olá! Gostaria de fazer uma reserva após verificar a disponibilidade no calendário"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                Contato via WhatsApp
              </a>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Precisa de Ajuda?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Para outras informações, eventos especiais ou dúvidas, entre em contato conosco.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              <FaWhatsapp className="text-2xl mr-2" />
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
