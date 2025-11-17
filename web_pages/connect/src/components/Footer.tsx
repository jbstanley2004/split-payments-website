export default function Footer() {
  const sections = [
    {
      title: "PRODUCTS",
      links: ["Pay", "Accept", "Connect", "Virtual Cards"]
    },
    {
      title: "SOLUTIONS",
      links: ["E-commerce", "Accounting", "Corporate", "Freight & Logistics", "Healthcare", "Real Estate", "Schools & Education", "Small Business"]
    },
    {
      title: "DEVELOPERS",
      links: ["Quick Start", "API Docs", "Guides & Tutorials", "Code Samples"]
    },
    {
      title: "RESOURCES",
      links: ["Resources", "Security", "Help", "FAQs", "Contact"]
    }
  ];
  return (
    <footer className="bg-[#0a1929] border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay-white.svg" 
                alt="Plastiq Logo"
                className="h-6"
              />
              <a href="#" className="text-gray-400 hover:text-white">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/li-logo-white.svg"
                  alt="LinkedIn"
                  className="h-5"
                />
              </a>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>© 2024 Plastiq. All rights reserved.</p>
              <p className="mt-2">
                Plastiq is a financial technology company, not a bank. Banking services provided by Evolve Bank & Trust, Member FDIC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}