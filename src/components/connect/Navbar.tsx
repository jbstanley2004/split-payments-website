import { Button } from './ui/button';
import { Menu } from 'lucide-react';
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
              alt="Plastiq Logo"
              className="h-6"
            />
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-white text-sm">Products</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Solutions</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Developers</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Resources</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-300 hover:text-white text-sm hidden md:block">Log in</a>
            <Button className="bg-[#00d9b8] hover:bg-[#00c4a7] text-[#0a1929] font-medium">
              Sign up
            </Button>
            <button className="md:hidden text-gray-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}