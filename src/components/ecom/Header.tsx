import { Menu } from 'lucide-react';
import { Button } from './ui/button';
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1f2e] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
              alt="Plastiq Logo" 
              className="h-8"
            />
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white text-sm hover:text-gray-300">Products</a>
              <a href="#" className="text-white text-sm hover:text-gray-300">Solutions</a>
              <a href="#" className="text-white text-sm hover:text-gray-300">Developers</a>
              <a href="#" className="text-white text-sm hover:text-gray-300">Pricing</a>
              <a href="#" className="text-white text-sm hover:text-gray-300">Resources</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white text-sm hover:text-gray-300">Log In</a>
            <Button className="bg-white text-[#0f1f2e] hover:bg-gray-100">Sign up</Button>
            <button className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}