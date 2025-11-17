import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LogosSection } from './components/LogosSection';
import { CookieBanner } from './components/CookieBanner';
import { FeaturesSection } from './components/FeaturesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PaymentTermsSection } from './components/PaymentTermsSection';
import { CustomerStorySection } from './components/CustomerStorySection';
import { ExpandSection } from './components/ExpandSection';
import { Footer } from './components/Footer';
import './globals.css';
function App() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Navbar />
      <HeroSection />
      <LogosSection />
      <CookieBanner />
      <FeaturesSection />
      <TestimonialsSection />
      <PaymentTermsSection />
      <CustomerStorySection />
      <ExpandSection />
      <Footer />
    </div>
  );
}
export default App;