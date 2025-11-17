const Footer = () => {
  return (
    <footer className="bg-[#000000] border-t border-[#1a1a1a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold mb-4">SOLUTIONS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Payment Processing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Point of Sale</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Mobile Payments</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">E-Commerce</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Business Analytics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">INDUSTRIES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Restaurants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Retail</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Hotels</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Stadiums & Venues</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Gaming</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Investors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0066FF]">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1a1a1a] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 Shift4 Payments. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#0066FF]">
                <img src="https://www.shift4.com/images/icons/social-facebook.svg" alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF]">
                <img src="https://www.shift4.com/images/icons/twitter-x-white.svg" alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF]">
                <img src="https://www.shift4.com/images/icons/social-instagram.svg" alt="Instagram" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF]">
                <img src="https://www.shift4.com/images/icons/social-linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF]">
                <img src="https://www.shift4.com/images/icons/social-viemo.svg" alt="Vimeo" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;