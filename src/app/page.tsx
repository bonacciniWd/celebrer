import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { Partners } from "@/components/Partners";
import Services from "@/components/Services";
import { Separador } from "@/components/interface/Separador";
import Accordion from "@/components/Accordion";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatAI from "@/components/ChatAI";
import PartnerCTA from "@/components/PartnerCTA";
import FeaturedGrid from "./fornecedores/components/FeaturedGrid";
import PageContainer from "@/components/PageContainer";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <div className="relative w-full h-auto font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Hero />
      <Separador />
      <PageContainer>
        <Partners />
      </PageContainer>
      <PageContainer>
        <Services />
      </PageContainer>
      <PageContainer>
        <PartnerCTA />
      </PageContainer>
      <PageContainer>
        <FeaturedGrid />
      </PageContainer>
      <Separador />
      <PageContainer>
        <Blog/>
      </PageContainer>
      <PageContainer>
        <Accordion />
      </PageContainer>
      <Separador />
      <PageContainer>
        <Contact />
      </PageContainer>
      <ChatAI />
      <Footer />

    </div>
  );
}
