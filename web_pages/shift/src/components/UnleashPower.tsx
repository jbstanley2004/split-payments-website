export default function UnleashPower() {
  const capabilities = [
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/0da0b3ede852d425b85ba64e4ec98f4eac937608-200x200.webp",
      alt: "Reporting icon",
      title: "Reporting",
      description: "Access merchant transaction data to improve customer payment experience through advanced reporting capabilities."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/20dc0828ce521dcb5180b0cee1cb5be2cb535dbe-200x200.webp",
      alt: "Accounting icon",
      title: "Accounting & Auditing",
      description: "Access historical transaction data and custom reports to better understand transactions including transaction lifecycle and cardholder data."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/9931b77d06e384e565ddb6f12c10d5f5562a8bd8-200x200.webp",
      alt: "Batch settlement icon",
      title: "Batch Settlement",
      description: "Maintain continuous access to current and historical settlement data to ensure all transactions are properly accounted for."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/6bc9b08dd368fb59ba736f1d35ac6b163d0fcec6-200x200.webp",
      alt: "Fraud monitoring icon",
      title: "Fraud Monitoring",
      description: "Access real-time payment data through advanced fraud monitoring and risk management capabilities."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/46a47963bf6091c128e762ab05f5ce9c84957b24-200x200.webp",
      alt: "Employee scheduling icon",
      title: "Employee Scheduling",
      description: "Leverage reporting data to track employee sales and commissions for better workforce management."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/0b81aeccfb5d189bc7bc289efe136029c2e66b2a-200x200.webp",
      alt: "Customer engagement icon",
      title: "Customer Engagement",
      description: "Integrate payment data and customer engagement tools to understand customer purchasing patterns."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/7e92114f77d1444f719d0376bc4fd38ba2245612-200x200.webp",
      alt: "Online reputation icon",
      title: "Online Reputation",
      description: "Manage online reputation and brand awareness using data captured throughout the entire transaction lifecycle."
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/fe6dd704f05b1e3d6d78d78dc1f838aedd361e66-200x200.webp",
      alt: "Social media icon",
      title: "Social Media",
      description: "Leverage transaction data to better understand customers and measure social media campaign effectiveness."
    }
  ];
  return (
    <section className="bg-gradient-to-b from-[#000000] to-[#0a0a1a] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Unleash the Power of Data
            <br />
            at Your Fingertips
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Empower your integrators and developers to connect and take advantage of all your payments data to increase better intelligence reporting and operational efficiencies.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition duration-300"
            >
              <div className="mb-6 flex justify-center">
                <img 
                  src={capability.icon}
                  alt={capability.alt}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}