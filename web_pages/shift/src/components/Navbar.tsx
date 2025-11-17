import { Button } from '@/components/ui/button';
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <img 
              src="https://www.shift4.com/images/icons/nav-main-logo.svg" 
              alt="Shift4 Logo" 
              className="h-8"
            />
            <div className="hidden md:flex items-center gap-6">
              <button className="text-white text-sm hover:text-gray-300 transition">Solutions</button>
              <button className="text-white text-sm hover:text-gray-300 transition">Industries</button>
              <button className="text-white text-sm hover:text-gray-300 transition">Developers</button>
              <button className="text-white text-sm hover:text-gray-300 transition">Company</button>
              <button className="text-white text-sm hover:text-gray-300 transition">Support</button>
              <button className="text-white text-sm hover:text-gray-300 transition">About Us</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Login
            </Button>
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}