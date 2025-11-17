import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { WhyChoose } from './components/WhyChoose';
import { WhySwitch } from './components/WhySwitch';
import { Testimonials } from './components/Testimonials';
import './globals.css';

function App() {
  return (
    <div className="min-h-screen bg-light">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <WhySwitch />
        <WhyChoose />
        <Testimonials />
      </main>
    </div>
  );
}

export default App;