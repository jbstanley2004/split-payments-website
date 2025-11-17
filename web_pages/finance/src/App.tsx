import Header from './components/Header';
import Hero from './components/Hero';
import MakeBigBets from './components/MakeBigBets';
import Pricing from './components/Pricing';
import HowToGetStarted from './components/HowToGetStarted';
import Testimonial from './components/Testimonial';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import './globals.css';
function App() {
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
export default App;