import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Challenges } from './components/Challenges';
import { Solutions } from './components/Solutions';
import { Features } from './components/Features';
import { PhoneShowcase } from './components/PhoneShowcase';
import { CaseStudy } from './components/CaseStudy';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import './globals.css';
function App() {
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
export default App;