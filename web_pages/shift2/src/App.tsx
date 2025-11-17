import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FlexiblePayments from './components/FlexiblePayments';
import CallToAction from './components/CallToAction';
import CustomForms from './components/CustomForms';
import SecuritySection from './components/SecuritySection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './globals.css';
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FlexiblePayments />
      <CallToAction />
      <CustomForms />
      <SecuritySection />
      <ContactForm />
      <Footer />
    </div>
  );
}
export default App;