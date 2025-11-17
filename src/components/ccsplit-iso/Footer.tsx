import { Input } from './ui/input';
import { Button } from './ui/button';
export function Footer() {
  return (
    <footer className="bg-[#0a1a0a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="https://www.creditcardsplits.com/static/Credit%20card.png" 
              alt="Logo" 
              className="h-8 mb-4"
            />
            <p className="text-sm text-gray-400 mb-4">
              finance@creditcardsplits.com
            </p>
            <p className="text-sm text-gray-400">
              +1 (555) 123 4567
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#c5ff00] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#c5ff00] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#c5ff00] transition-colors">Apply for ISOs</a></li>
              <li><a href="#" className="hover:text-[#c5ff00] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#c5ff00] transition-colors">Apply Now</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#c5ff00] transition-colors">View All Blogs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Sign up for exclusive business funding insights!
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-[#1a2a1a] border-gray-700 text-white"
              />
              <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600]">
                →
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>Copyright 2025 creditcardsplits.com. All rights reserved. Designed by HintlinkAI</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c5ff00] transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-[#c5ff00] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}