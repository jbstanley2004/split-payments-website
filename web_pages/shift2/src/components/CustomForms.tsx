export default function CustomForms() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Optimize Your Conversions
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0066ff] mb-4">
            With Custom Payment Forms
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Choose from pre-configured templates to quickly get up and running, or build your own customized checkout experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-4">Frictionless Checkout</h3>
            <p className="text-gray-400 mb-6">
              Deliver a frictionless checkout process that keeps customers moving through your sales funnel. Our streamlined forms reduce cart abandonment and increase conversion rates.
            </p>
            <img 
              src="https://cdn.sanity.io/images/bx0g0zqk/production/b87f166d06d83ad01d8b50cafbcf5736dad3a368-1080x935.webp" 
              alt="Image of checkout screen" 
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <img 
              src="https://cdn.sanity.io/images/bx0g0zqk/production/89d482ebfbaac2e01e9ed0cc18548e42af348489-500x468.webp" 
              alt="Simple one-line card payment" 
              className="w-full rounded-lg shadow-2xl mb-8"
            />
            <h3 className="text-2xl font-bold mb-4">Simplicity is Key</h3>
            <p className="text-gray-400">
              Our simple one-line payment integration makes it easy to accept payments anywhere in your application. Just a few lines of code and you're ready to go.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://cdn.sanity.io/images/bx0g0zqk/production/3a59a05b6aa737c2134f566092c15e8033edbb3b-671x732.webp" 
              alt="Examples of custom payment forms" 
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl font-bold mb-4">A Custom Solution</h3>
            <p className="text-gray-400 mb-6">
              Build completely custom payment forms that match your brand and business needs. Our flexible API gives you full control over the checkout experience while maintaining PCI compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}