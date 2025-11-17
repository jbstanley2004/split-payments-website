import Header from '@/components/finance/Header';
import Hero from '@/components/finance/Hero';
import MakeBigBets from '@/components/finance/MakeBigBets';
import Pricing from '@/components/finance/Pricing';
import HowToGetStarted from '@/components/finance/HowToGetStarted';
import Testimonial from '@/components/finance/Testimonial';
import CallToAction from '@/components/finance/CallToAction';
import Footer from '@/components/finance/Footer';

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <MakeBigBets />
      <Pricing />
      <HowToGetStarted />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
}
