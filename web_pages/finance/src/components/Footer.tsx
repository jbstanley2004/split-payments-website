export default function Footer() {
  return (
    <footer className="bg-[#0f1419] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Pay</a></li>
              <li><a href="#" className="hover:text-white">Accept</a></li>
              <li><a href="#" className="hover:text-white">Connect</a></li>
              <li><a href="#" className="hover:text-white">Mobile App</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">E-commerce</a></li>
              <li><a href="#" className="hover:text-white">Accounting</a></li>
              <li><a href="#" className="hover:text-white">Manufacturing</a></li>
              <li><a href="#" className="hover:text-white">Construction</a></li>
              <li><a href="#" className="hover:text-white">Freight & Logistics</a></li>
              <li><a href="#" className="hover:text-white">Individual</a></li>
              <li><a href="#" className="hover:text-white">Healthcare</a></li>
              <li><a href="#" className="hover:text-white">Schools & Education</a></li>
              <li><a href="#" className="hover:text-white">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Quick Start</a></li>
              <li><a href="#" className="hover:text-white">Embed Guides</a></li>
              <li><a href="#" className="hover:text-white">API Reference Docs</a></li>
              <li><a href="#" className="hover:text-white">Code Samples</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Resources</a></li>
              <li><a href="#" className="hover:text-white">Customer Stories</a></li>
              <li><a href="#" className="hover:text-white">Card Partners</a></li>
              <li><a href="#" className="hover:text-white">FAQ / Help</a></li>
              <li><a href="#" className="hover:text-white">Legal</a></li>
              <li><a href="#" className="hover:text-white">File a Complaint</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
              alt="Plastiq Logo" 
              className="h-6 mb-4 md:mb-0"
            />
            <p className="text-xs text-gray-500 text-center md:text-right max-w-2xl">
              Plastiq technologies and certain Plastiq services are provided by Web Bank, Member FDIC. Plastiq services with other Banks and Affiliated Entities. Not all services available in every jurisdiction. Registration required in all cases. Plastiq and the Plastiq logo are either registered trademarks or trademarks of Plastiq in the United States and/or other countries.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}