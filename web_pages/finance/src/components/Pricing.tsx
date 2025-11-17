export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a2332]">
              Affordable, more transparent financing
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Rates from 2.7% - 10.65% on any payment payments. 12 hour credit decisions, no surprises.
            </p>
            <p className="text-gray-600">
              Credit approval and underwriting powered by Slope.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/12/STF-Module-12.19.22-Take-2.png"
              alt="Short term financing pricing"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}