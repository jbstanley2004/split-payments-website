export default function SecuritySection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Make it Simple. Make it Secure.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Worry free and at a PCI compliant, secure, and protected solution friendly to accommodate virtually all businesses everywhere in the process.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="https://cdn.sanity.io/images/bx0g0zqk/production/b21275ff88ce2725ab6093e41368affa6f1645d2-124x124.png" 
                alt="icon" 
                className="w-24 h-24"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Limited Scoping</h3>
            <p className="text-gray-600">
              Use a validated payment system to integrate payments into any online environment. PCI Level 1 compliant and protects business from fraud.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="https://cdn.sanity.io/images/bx0g0zqk/production/e5d00385fe6aaf7f651e1158c95de683401abd55-124x124.png" 
                alt="icon" 
                className="w-24 h-24"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Effortless Checkout</h3>
            <p className="text-gray-600">
              Checkout integration that includes rules for fraud. Made for safety of customers and business. Accept payments without hassle of maintaining systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}