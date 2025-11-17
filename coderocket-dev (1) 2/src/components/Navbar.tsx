import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
              alt="Plastiq Logo" 
              className="h-6"
            />
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button className="text-white/90 hover:text-white flex items-center gap-1">
                Products <ChevronDown className="w-4 h-4" />
              </button>
              <button className="text-white/90 hover:text-white flex items-center gap-1">
                Solutions <ChevronDown className="w-4 h-4" />
              </button>
              <button className="text-white/90 hover:text-white flex items-center gap-1">
                Developers <ChevronDown className="w-4 h-4" />
              </button>
              <button className="text-white/90 hover:text-white">
                Pricing
              </button>
              <button className="text-white/90 hover:text-white flex items-center gap-1">
                Resources <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              Log In
            </Button>
            <Button 
              className="bg-[#ff6b35] hover:bg-[#ff5520] text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}