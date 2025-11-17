const Features = () => {
  const features = [
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/1aa22b4d8b5c2e4648f5b9fdc8b1c8f26f11eb70-200x200.svg",
      title: "Simple",
      description: "Easy to use payment solutions designed for businesses of all sizes"
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/87121234d28b4914a22ef1d95de06a83973583ba-200x200.svg",
      title: "Secure",
      description: "Industry-leading security and compliance to protect your business"
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/c220d1adb029d7bcb12ec84d5929f86405c53dc7-200x200.svg",
      title: "Scalable",
      description: "Solutions that grow with your business from startup to enterprise"
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/0cbaa7337ad605cddb632cea8fb1b2cf2c3821cf-200x200.svg",
      title: "State-Of-The-Art",
      description: "Cutting-edge technology to keep you ahead of the competition"
    },
    {
      icon: "https://cdn.sanity.io/images/bx0g0zqk/production/8647ace92f90d5f27d16362fe4d1fcea6aec5f65-200x200.svg",
      title: "Smart",
      description: "Intelligent analytics and insights to optimize your business"
    }
  ];
  return (
    <section className="py-20 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-[#0066FF]">FOR COMPLEX COMMERCE</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <img src={feature.icon} alt={feature.title} className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <img src={feature.icon} alt={feature.title} className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;