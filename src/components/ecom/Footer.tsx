export function Footer() {
  return (
    <footer className="bg-[#0a1419] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Pay</a></li>
              <li><a href="#" className="hover:text-white">Accept</a></li>
              <li><a href="#" className="hover:text-white">Plastiq App</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">E-commerce</a></li>
              <li><a href="#" className="hover:text-white">Wholesale</a></li>
              <li><a href="#" className="hover:text-white">Manufacturing</a></li>
              <li><a href="#" className="hover:text-white">Construction</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Developers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Quick Start</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
              <li><a href="#" className="hover:text-white">API Reference Docs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Resources</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
              <li><a href="#" className="hover:text-white">FAQ / Help</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
                alt="Plastiq Logo" 
                className="h-8"
              />
              <a href="#" className="text-gray-400 hover:text-white">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/li-logo-white.svg" 
                  alt="LinkedIn" 
                  className="h-6"
                />
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>© 2024 Plastiq. All rights reserved. Plastiq is a registered trademark of Plastiq Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}