import { Menu, Search } from 'lucide-react';
import { Button } from './ui/button';
export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img 
            src="https://www.shift4.com/images/icons/nav-main-logo.svg" 
            alt="Shift4 Logo" 
            className="h-6"
          />
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-gray-300">Industries</a>
            <a href="#" className="hover:text-gray-300">Solutions</a>
            <a href="#" className="hover:text-gray-300">Products</a>
            <a href="#" className="hover:text-gray-300">Technology</a>
            <a href="#" className="hover:text-gray-300">Pricing</a>
            <a href="#" className="hover:text-gray-300">Support</a>
            <a href="#" className="hover:text-gray-300">About</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 hidden md:block" />
          <Button variant="outline" className="bg-white text-black hover:bg-gray-100 text-sm">
            Get Started
          </Button>
          <Menu className="w-6 h-6 cursor-pointer lg:hidden" />
        </div>
      </div>
    </header>
  );
}