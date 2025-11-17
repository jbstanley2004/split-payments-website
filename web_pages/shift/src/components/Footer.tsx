export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Payment Processing</a></li>
              <li><a href="#" className="hover:text-white transition">Point of Sale</a></li>
              <li><a href="#" className="hover:text-white transition">eCommerce</a></li>
              <li><a href="#" className="hover:text-white transition">Mobile Payments</a></li>
              <li><a href="#" className="hover:text-white transition">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Restaurants</a></li>
              <li><a href="#" className="hover:text-white transition">Retail</a></li>
              <li><a href="#" className="hover:text-white transition">Hotels & Lodging</a></li>
              <li><a href="#" className="hover:text-white transition">Healthcare</a></li>
              <li><a href="#" className="hover:text-white transition">Sports & Entertainment</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Partner Program</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">About Shift4</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Company</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">News</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://www.shift4.com/images/icons/nav-main-logo.svg" 
                alt="Shift4 Logo" 
                className="h-8"
              />
              <p className="text-gray-400 text-sm">
                © 2024 Shift4 Payments. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-80 transition">
                <img 
                  src="https://www.shift4.com/images/icons/social-facebook.svg" 
                  alt="facebook logo"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <img 
                  src="https://www.shift4.com/images/icons/twitter-x-white.svg" 
                  alt="twitter logo"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <img 
                  src="https://www.shift4.com/images/icons/social-instagram.svg" 
                  alt="instagram logo"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <img 
                  src="https://www.shift4.com/images/icons/social-linkedin.svg" 
                  alt="Linkedin logo"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <img 
                  src="https://www.shift4.com/images/icons/social-viemo.svg" 
                  alt="Vimeo logo"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}