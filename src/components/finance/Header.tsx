import { Menu } from 'lucide-react';
import { Button } from './ui/button';
export default function Header() {
  return (
    <header className="bg-[#1a2332] text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img 
            src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
            alt="Plastiq Logo" 
            className="h-6"
          />
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-sm hover:text-gray-300">Products</a>
            <a href="#" className="text-sm hover:text-gray-300">Solutions</a>
            <a href="#" className="text-sm hover:text-gray-300">Developers</a>
            <a href="#" className="text-sm hover:text-gray-300">Pricing</a>
            <a href="#" className="text-sm hover:text-gray-300">Resources</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm hover:text-gray-300 hidden md:block">Log in</a>
          <Button variant="outline" className="bg-white text-[#1a2332] hover:bg-gray-100">
            Sign up
          </Button>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}