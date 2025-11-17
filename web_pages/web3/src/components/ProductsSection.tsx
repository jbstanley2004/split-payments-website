import { Button } from './ui/button';
export default function ProductsSection() {
  return (
    <section className="py-20 bg-[#1a2332]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plastiq offers more than bill pay —<br />
            credit card acceptance or scale your platform with embedded payments
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Whether you need to accept credit cards, scale your platform, or embed payment capabilities, Plastiq has a solution for your business needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-[#2d3748] rounded-2xl p-8">
            <div className="mb-6">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqaccept.svg" 
                alt="Plastiq Accept"
                className="h-8"
              />
            </div>
            <h3 className="text-white text-2xl font-bold mb-4">
              Zero Merchant Fees. Easy Sign Up for Vendors Who Accept Payments.
            </h3>
            <p className="text-gray-400 mb-6">
              Accept credit card payments at no cost. Plastiq Accept makes it easy for vendors to get paid faster while offering customers payment flexibility.
            </p>
            <div className="mb-6">
              <img 
                src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2022/11/accept-logos-partners.svg" 
                alt="Accept partners"
                className="w-full max-w-md"
              />
            </div>
            <div className="flex gap-3">
              <Button className="bg-[#00d4ff] text-black hover:bg-[#00c4ef]">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">New Payment</span>
                <span className="text-xs text-gray-500">Reference Code</span>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded p-3 shadow-sm">
                  <div className="text-sm text-gray-600">Payment amount</div>
                  <div className="text-2xl font-bold">$2,500.00</div>
                </div>
                <div className="bg-white rounded p-3 shadow-sm">
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="text-sm">john@example.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2d3748] rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-6">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqconnect.svg" 
                  alt="Plastiq Connect"
                  className="h-8"
                />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Embedded payments & easy onboarding for high-volume platforms that scale
              </h3>
              <p className="text-gray-400 mb-6">
                Power your platform with Plastiq Connect. Embedded payment capabilities that grow with your business and seamless onboarding for your users.
              </p>
              <div className="mb-6">
                <img 
                  src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2022/11/connect-logos-partners.svg" 
                  alt="Connect partners"
                  className="w-full max-w-md"
                />
              </div>
              <div className="flex gap-3">
                <Button className="bg-[#00d4ff] text-black hover:bg-[#00c4ef]">
                  Get Started
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600">Invoice #1234</div>
                  <div className="text-xl font-bold">$5,000.00</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing fee</span>
                    <span>$50.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold">$5,050.00</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Process Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}