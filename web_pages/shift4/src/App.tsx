import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Solutions from './components/Solutions';
import Features from './components/Features';
import Stats from './components/Stats';
import Ecosystem from './components/Ecosystem';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import './globals.css';
function App() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />
      <Hero />
      <Brands />
      <Solutions />
      <Features />
      <Stats />
      <Ecosystem />
      <CallToAction />
      <Footer />
    </div>
  );
}
export default App;