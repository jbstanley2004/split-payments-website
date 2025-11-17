import { Header } from '@/components/ccsplit-iso/Header';
import { HeroSection } from '@/components/ccsplit-iso/HeroSection';
import { ClientLogos } from '@/components/ccsplit-iso/ClientLogos';
import { WhyChooseUs } from '@/components/ccsplit-iso/WhyChooseUs';
import { SmallBusinessSupport } from '@/components/ccsplit-iso/SmallBusinessSupport';
import { PerfectFitSection } from '@/components/ccsplit-iso/PerfectFitSection';
import { Testimonials } from '@/components/ccsplit-iso/Testimonials';
import { GrowTogether } from '@/components/ccsplit-iso/GrowTogether';
import { Footer } from '@/components/ccsplit-iso/Footer';

export default function CcsplitIsoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ClientLogos />
      <WhyChooseUs />
      <SmallBusinessSupport />
      <PerfectFitSection />
      <Testimonials />
      <GrowTogether />
      <Footer />
    </div>
  );
}
