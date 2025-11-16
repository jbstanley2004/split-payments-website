import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-[#1a1a1a] text-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://www.creditcardsplits.com/static/Credit%20card.png" 
              alt="Site Logo White" 
              className="h-8"
            />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-[#c4ff1a] transition-colors">Home</a>
            <a href="#why" className="hover:text-[#c4ff1a] transition-colors">Why</a>
            <a href="#benefits" className="hover:text-[#c4ff1a] transition-colors">Benefits & FAQ</a>
            <a href="#pricing" className="hover:text-[#c4ff1a] transition-colors">Pricing</a>
            <a href="#about" className="hover:text-[#c4ff1a] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#c4ff1a] transition-colors">Contact</a>
          </div>
          <div className="hidden md:block">
            <Button className="bg-[#c4ff1a] text-black hover:bg-[#b3e617] font-semibold">
              Apply Now
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#home" className="block hover:text-[#c4ff1a] transition-colors">Home</a>
            <a href="#why" className="block hover:text-[#c4ff1a] transition-colors">Why</a>
            <a href="#benefits" className="block hover:text-[#c4ff1a] transition-colors">Benefits & FAQ</a>
            <a href="#pricing" className="block hover:text-[#c4ff1a] transition-colors">Pricing</a>
            <a href="#about" className="block hover:text-[#c4ff1a] transition-colors">About</a>
            <a href="#contact" className="block hover:text-[#c4ff1a] transition-colors">Contact</a>
            <Button className="w-full bg-[#c4ff1a] text-black hover:bg-[#b3e617] font-semibold">
              Apply Now
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}