export default function WorkSmarter() {
  const features = [
    {
      title: "Access Real-Time Transaction Data",
      description: "Get a deeper understanding of your customer payment behavior and operational data to guide key business decisions.",
      image: "https://cdn.sanity.io/images/bx0g0zqk/production/358036cf2d0d38c4dd3158f681aa932034052247-501x301.webp",
      alt: "Business intelligence real-time transaction data bar graph icon"
    },
    {
      title: "Leverage Business Analytics for Deeper Insights",
      description: "Use current and historical transaction, sale, performance, liability, and business level data to better understand the ebbs and flows of your business.",
      image: "https://cdn.sanity.io/images/bx0g0zqk/production/12a4e6066023638f2f7bee6a455d5a6e0cf0a2ef-501x301.webp",
      alt: "Business intelligence ebbs and flows icon with data points"
    },
    {
      title: "Get A Complete View of Your Customers",
      description: "Gain a deeper understanding of customer payment behavior and operational data to help guide your business.",
      image: "https://cdn.sanity.io/images/bx0g0zqk/production/fb92142a401a6d184cef1273a99b6f3e82782b7c-501x301.webp",
      alt: "business intelligence customer data icon"
    },
    {
      title: "Unlock Unified Payments Data",
      description: "Seamlessly integrate payment data from all your gateway and POS (point of sale) data into a single view in your own data warehouse.",
      image: "https://cdn.sanity.io/images/bx0g0zqk/production/37d8c148fc5847e83d033fca708092693e0c1a6a-501x301.webp",
      alt: "business intelligence unified payments data circular icon"
    },
    {
      title: "API Integration",
      description: "Simply integrate Shift4 data into your existing or new technology stack. All Shift4 payment, merchant, and transaction data can connect with other 3rd-party applications.",
      image: "https://cdn.sanity.io/images/bx0g0zqk/production/75ac00a79418a560251a51cc0662f127efbe066e-501x301.webp",
      alt: "business intelligence API integration icon for integrated reporting"
    },
    {
      title: "Generate Reports",
      description: "Stay up-to-date with the latest merchant activity, including transaction data, interchange information, customer insights, and more.",
      image: "https://cdn.sanity.io/images/bx0g0zqk/production/c27649f5b4349a9f1f81f9b1d54e555393e3b768-501x301.webp",
      alt: "Business intelligence reporting clipboard icon"
    }
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            Work Smarter, Not Harder
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Empower teams with data-driven analytics and reporting on unified data to help make more time for the work that truly matters.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <img 
                  src={feature.image} 
                  alt={feature.alt}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="inline-block bg-[#2563eb] text-white px-8 py-3 rounded-md">
            <p className="text-lg font-semibold">Want to Learn More?</p>
          </div>
        </div>
      </div>
    </section>
  );
}