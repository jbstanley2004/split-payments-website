import { Header } from '@/components/ecom/Header';
import { Hero } from '@/components/ecom/Hero';
import { Challenges } from '@/components/ecom/Challenges';
import { Solutions } from '@/components/ecom/Solutions';
import { Features } from '@/components/ecom/Features';
import { PhoneShowcase } from '@/components/ecom/PhoneShowcase';
import { CaseStudy } from '@/components/ecom/CaseStudy';
import { CTA } from '@/components/ecom/CTA';
import { Footer } from '@/components/ecom/Footer';

export default function EcomPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Challenges />
      <Solutions />
      <Features />
      <PhoneShowcase />
      <CaseStudy />
      <CTA />
      <Footer />
    </div>
  );
}
