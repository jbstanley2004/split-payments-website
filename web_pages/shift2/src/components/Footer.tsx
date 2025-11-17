export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4">OUR COMPANY</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About Shift4</a></li>
              <li><a href="#" className="hover:text-white">Newsroom</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Partners</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">SOLUTIONS</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Payment Processing</a></li>
              <li><a href="#" className="hover:text-white">Point of Sale</a></li>
              <li><a href="#" className="hover:text-white">eCommerce</a></li>
              <li><a href="#" className="hover:text-white">Business Intelligence</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
              <li><a href="#" className="hover:text-white">Support Center</a></li>
              <li><a href="#" className="hover:text-white">Developer Portal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Sales</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">Partners</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://www.shift4.com/images/icons/blue-circle-4-rev.svg" 
                alt="blue circle with 4 in center" 
                className="w-8 h-8"
              />
              <p className="text-sm text-gray-400">
                © 2024 Shift4 Payments, LLC. | All Rights Reserved | Privacy & Terms of Use
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80">
                <img 
                  src="https://www.shift4.com/images/icons/social-facebook.svg" 
                  alt="facebook logo" 
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <img 
                  src="https://www.shift4.com/images/icons/twitter-x-white.svg" 
                  alt="twitter logo" 
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <img 
                  src="https://www.shift4.com/images/icons/social-instagram.svg" 
                  alt="instagram logo" 
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <img 
                  src="https://www.shift4.com/images/icons/social-linkedin.svg" 
                  alt="Linkedin logo" 
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80">
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