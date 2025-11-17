import { Button } from './ui/button';
export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">WHY CREDITCARDSPLITS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why ISOs Choose Us</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 mb-8">
              At CreditCardSplits, we understand what ISOs need to succeed. With our comprehensive support, competitive commission structures, and state-of-the-art technology, we make it easy for you to grow your business while offering your clients the best payment solutions.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <img 
                  src="https://www.creditcardsplits.com/static/icon_check.svg" 
                  alt="Check" 
                  className="w-6 h-6 mt-1"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">High Approval Rates</h3>
                  <p className="text-gray-600 text-sm">Speed for approval. All Done!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img 
                  src="https://www.creditcardsplits.com/static/icon_check.svg" 
                  alt="Check" 
                  className="w-6 h-6 mt-1"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Funding</h3>
                  <p className="text-gray-600 text-sm">Instant Access - Speed set in 3 business days</p>
                </div>
              </div>
            </div>
            <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600] font-semibold">
              Apply with Us
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8">
              <img 
                src="https://www.creditcardsplits.com/static/WhyISOsChooseUs.png" 
                alt="Financial Analyst" 
                className="w-full h-auto"
              />
              <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-lg p-6 max-w-[200px]">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">40%</div>
                    <div className="text-sm text-gray-600">High Approval Rates</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">3Days</div>
                    <div className="text-sm text-gray-600">Fast Funding</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">5+</div>
                    <div className="text-sm text-gray-600">Years of Experience</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500">CALL US 24/7 365 SUPPORT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}