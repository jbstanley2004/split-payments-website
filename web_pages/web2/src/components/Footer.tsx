export function Footer() {
  return (
    <footer className="bg-[#0a1929] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              PRODUCTS
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Pay</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Connect</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Accept</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Mobile App</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white text-sm">E-commerce</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Vendors</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Manufacturing</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Construction</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Accounting Firms</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Membership Clubs</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Schools & Education</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              DEVELOPERS
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Quick Start</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">API Reference</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Code Samples</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Resources</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">FAQ / Help</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Legal</a></li>
              <li><a href="#" className="text-white/70 hover:text-white text-sm">Get Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
              alt="Plastiq Logo" 
              className="h-6"
            />
            <a href="#" className="text-white/50 hover:text-white">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2021/04/li-logo-white.svg" 
                alt="LinkedIn" 
                className="h-5"
              />
            </a>
          </div>
          <div className="text-sm text-white/50 text-center md:text-right">
            <p>© 2024 Plastiq. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="hover:text-white">Privacy Policy</a> · 
              <a href="#" className="hover:text-white ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
        <div className="mt-8 text-xs text-white/40 leading-relaxed">
          <p className="mb-4">
            Important information: Plastiq charges a 3% fee on all transactions. Funds are typically available within 2-3 business days. Some restrictions apply. Please review our terms of service for complete details.
          </p>
          <p>
            This website is operated by Plastiq LLC, which is not a bank. Banking services provided by Evolve Bank & Trust, Member FDIC. The Plastiq Visa® Commercial Credit Card is issued by Evolve Bank & Trust pursuant to a license from Visa U.S.A. Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}