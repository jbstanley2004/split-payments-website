export default function Footer() {
  return (
    <footer className="bg-[#0a0e1a] text-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Our story</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Compliance</a></li>
              <li><a href="#" className="hover:text-white">Card Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Guides</a></li>
              <li><a href="#" className="hover:text-white">API Docs</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-[#1a2332] rounded flex items-center justify-center hover:bg-[#2d3748]">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/li-logo-white.svg" 
                  alt="LinkedIn"
                  className="w-4 h-4"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
                alt="Plastiq"
                className="h-6"
              />
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Plastiq. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white">Accessibility</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500 text-center">
          <p>
            Plastiq is a financial technology company, not a bank. Banking services provided by Priority Commercial Payments, LLC, Member FDIC. 
            The Plastiq Mastercard® is issued by Priority Commercial Payments, LLC pursuant to a license by Mastercard International Incorporated.
          </p>
        </div>
      </div>
    </footer>
  );
}