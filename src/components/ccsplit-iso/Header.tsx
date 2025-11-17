"use client";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="https://www.creditcardsplits.com/static/Credit%20card.png" 
              alt="Site Logo White" 
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm hover:text-[#c5ff00] transition-colors">Home</a>
            <a href="#" className="text-sm hover:text-[#c5ff00] transition-colors">ISOs</a>
            <a href="#" className="text-sm hover:text-[#c5ff00] transition-colors">Ready to Join?</a>
            <a href="#" className="text-sm hover:text-[#c5ff00] transition-colors">Blogs</a>
            <a href="#" className="text-sm hover:text-[#c5ff00] transition-colors">About</a>
            <a href="#" className="text-sm hover:text-[#c5ff00] transition-colors">Connect</a>
          </nav>
          <div className="hidden md:block">
            <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600] font-semibold">
              Apply Now
            </Button>
          </div>
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-sm hover:text-[#c5ff00]">Home</a>
              <a href="#" className="text-sm hover:text-[#c5ff00]">ISOs</a>
              <a href="#" className="text-sm hover:text-[#c5ff00]">Ready to Join?</a>
              <a href="#" className="text-sm hover:text-[#c5ff00]">Blogs</a>
              <a href="#" className="text-sm hover:text-[#c5ff00]">About</a>
              <a href="#" className="text-sm hover:text-[#c5ff00]">Connect</a>
              <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600] font-semibold w-full mt-2">
                Apply Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}