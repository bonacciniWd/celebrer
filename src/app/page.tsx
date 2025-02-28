import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { Partners } from "@/components/Partners";
import Services from "@/components/Services";
import { Separador } from "@/components/interface/Separador";
import Accordion from "@/components/Accordion";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="relative w-full h-auto font-[family-name:var(--font-geist-sans)] ">
      <Header />
      <Hero />
      <Separador />
      <Partners />
      <Services />
      <Separador />
      <Accordion />
      <Separador />
      <Contact />
      <Footer />

    </div>
  );
}
