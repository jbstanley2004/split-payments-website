import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ClientLogos } from './components/ClientLogos';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SmallBusinessSupport } from './components/SmallBusinessSupport';
import { PerfectFitSection } from './components/PerfectFitSection';
import { Testimonials } from './components/Testimonials';
import { GrowTogether } from './components/GrowTogether';
import { Footer } from './components/Footer';
import './globals.css';
function App() {
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
export default App;