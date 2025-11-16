import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { WhyChoose } from './components/WhyChoose';
import { SalesMetrics } from './components/SalesMetrics';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import './globals.css';
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <WhyChoose />
      <SalesMetrics />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
export default App;