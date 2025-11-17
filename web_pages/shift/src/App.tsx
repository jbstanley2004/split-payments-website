import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkSmarter from './components/WorkSmarter';
import UnleashPower from './components/UnleashPower';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './globals.css';
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WorkSmarter />
      <UnleashPower />
      <ContactForm />
      <Footer />
    </div>
  );
}
export default App;