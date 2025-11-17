import { Button } from '@/components/ui/button';
export default function EcommercePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-[#1a2332] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://www.plastiq.com/wp-content/uploads/2022/03/ecommerce-hero.jpg" 
            alt="E-commerce professional"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Payments<br />
              Deep Dive:<br />
              Retail and<br />
              Ecommerce
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Take a closer look at the state of payments, the challenges retail brands face, and the areas where you can attain the opportunity and power up business.
            </p>
            <Button className="bg-white text-black hover:bg-gray-100">
              Learn more
            </Button>
          </div>
        </div>
      </section>
      {/* Challenges Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a2332] mb-4">
              Retailers are facing some common challenges.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/03/Low_margins_icon.svg"
                  alt="Low Margins"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2332] mb-3">
                Inventory<br />management
              </h3>
              <p className="text-gray-600">
                Forecasting inventory and flow of what you're making large investments upfront in inventory that may not sell until next quarter or beyond.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/03/Complex_Payment_Processes_Icon.svg"
                  alt="Complex Payment Process"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2332] mb-3">
                Complex payment<br />process
              </h3>
              <p className="text-gray-600">
                Retailers must find ways to pay a variety of domestic and overseas suppliers and have these varying on different schedules.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/03/Global_Procurement_Costs_Icon.svg"
                  alt="Global Procurement Costs"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2332] mb-3">
                Global<br />procurement costs
              </h3>
              <p className="text-gray-600">
                Many sources of expenses, hidden costs and a lack of transparency on payment delivery and errors in international payments.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Plastiq Pay Solutions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a2332] mb-4">
              Plastiq Pay meets the challenges.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/03/Cash_flow_predictability_icon.svg"
                  alt="Cash Flow Predictability"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2332] mb-3">
                Inventory & cash<br />flow visibility
              </h3>
              <p className="text-gray-600">
                Use Plastiq Pay to reconcile secure payment order history, so you can plan what's due when and improve your cash flow forecasting.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/02/streamline_payments_icon.svg"
                  alt="Streamline Payments"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2332] mb-3">
                Streamlined<br />payment collection
              </h3>
              <p className="text-gray-600">
                Plastiq Pay is a single point of payment for all your suppliers — domestic and international.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/03/Global_Payment_Management_Icon.svg"
                  alt="Global Payment Management"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2332] mb-3">
                Global payment<br />management
              </h3>
              <p className="text-gray-600">
                Plastiq Pay works to move from 45 countries in 22 currencies.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1a2332] mb-8">
              Use Plastiq Pay and<br />get more from your<br />payments.
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Automated approvals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Streamlined payment process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Pay suppliers faster</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Extend cash on hand</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Easy international payments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Cash flow monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Earns bulk miles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" alt="" className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Greater expense visibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Evolve Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/02/getpaid_phone_2x.png.webp"
                alt="Plastiq Pay Mobile App"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a2332] mb-6">
                Evolve the way you pay<br />with Plastiq Pay.
              </h2>
              <p className="text-gray-600 mb-6">
                As a small business, you need ongoing short-term fix to each new customer and keep working customers coming back. You also have to balance your inventory and cash flow. Use Plastiq Pay with your business credit card and pay back what you can afford the time to pay off your supplier purchases ahead on the loan when the time is right and with credit card rewards back to you personally.
              </p>
              <p className="text-gray-600 mb-8">
                Get the flexibility of a short-term loan without all the hassle and more efficiently with Plastiq.
              </p>
              <div className="flex gap-4 items-center">
                <Button className="bg-[#00d4ff] text-black hover:bg-[#00c4ef]">
                  Get Started
                </Button>
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay.svg"
                  alt="Plastiq"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Case Study Section */}
      <section className="py-20 bg-gradient-to-r from-[#4a90e2] to-[#5ba3d0] text-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Universal Standard grows their brand<br />with Plastiq Pay.
          </h2>
          <p className="text-lg mb-4 max-w-3xl mx-auto">
            The challenger Digital aims to disrupt requires a new way to scale — and Universal Standard was not making payments.
          </p>
          <p className="text-base mb-8 max-w-3xl mx-auto opacity-90">
            The Plastiq Pay solution: Universal Standard was able to ease the strain of growing a business and covering a large expense. He shipped supplier payments ahead online. As a bonus, he also earned credit card points on payments that would have been made by ACH or check. We helped them grow out their supply chain while navigating an industry that had up to 90-day terms. They needed a fast way to pay, to pay who they wanted and how they wanted.
          </p>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-[#1a2332] text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Think Plastiq Pay is right for your business?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            See how our comprehensive solutions can fit into your workflow.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-100">
              Get started
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Already a customer? Log in
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}