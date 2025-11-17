import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import LaunchPayments from './components/LaunchPayments';
import ModernAPIs from './components/ModernAPIs';
import Testimonials from './components/Testimonials';
import Documentation from './components/Documentation';
import ConsumerGrade from './components/ConsumerGrade';
import Footer from './components/Footer';
import './globals.css';
function App() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <LaunchPayments />
      <ModernAPIs />
      <Testimonials />
      <Documentation />
      <ConsumerGrade />
      <Footer />
    </div>
  );
}
export default App;