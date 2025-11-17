import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import ProductsSection from './components/ProductsSection';
import SecuritySection from './components/SecuritySection';
import PrioritySection from './components/PrioritySection';
import Footer from './components/Footer';
import EcommercePage from './pages/EcommercePage';
import './globals.css';
function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <ProductsSection />
      <SecuritySection />
      <PrioritySection />
    </>
  );
}
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/industry/ecommerce" element={<EcommercePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;