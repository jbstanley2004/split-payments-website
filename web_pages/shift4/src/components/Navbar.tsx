import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="https://www.shift4.com/images/icons/nav-main-logo.svg" 
              alt="Shift4 Logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Solutions</a>
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Industries</a>
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Technology</a>
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Company</a>
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Partners</a>
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Support</a>
            <a href="#" className="text-white hover:text-[#0066FF] text-sm font-medium">Resources</a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-[#0066FF]">
              Login
            </Button>
            <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
              Contact
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#0066FF]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#000000] border-t border-[#1a1a1a]">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Solutions</a>
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Industries</a>
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Technology</a>
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Company</a>
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Partners</a>
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Support</a>
            <a href="#" className="block px-3 py-2 text-white hover:text-[#0066FF]">Resources</a>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;