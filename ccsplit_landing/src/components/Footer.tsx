import { Mail, Phone, MapPin } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img 
              src="https://www.creditcardsplits.com/static/Credit%20card.png"
              alt="Site Logo White"
              className="h-8 mb-6"
            />
            <p className="text-gray-400 text-sm mb-6">
              Working capital that flows with your sales. Get funded fast with flexible repayments.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#c4ff1a]" />
                <span className="text-sm">support@creditcardsplits.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#c4ff1a]" />
                <span className="text-sm">Call Us: 1-800-SPLITS</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#c4ff1a]" />
                <span className="text-sm">New York, USA</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">About CCS</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Apply Now</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-[#c4ff1a] transition-colors">Your All Pages</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © Copyright 2025, All Rights Reserved by Credit Card Splits
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#c4ff1a] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#c4ff1a] transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}