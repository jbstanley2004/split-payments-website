export default function FeaturesGrid() {
  return (
    <section className="py-20 bg-[#1a2332]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simplify your invoices & extend cash flow at same time
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pay suppliers, vendors, and contractors in one place while they receive payment in the method they prefer.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-[#2d3748] rounded-lg flex items-center justify-center">
                <img 
                  src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2022/11/cash-payment-person-money-payments-icon.svg" 
                  alt="Add vendors"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Add your vendors</h3>
            <p className="text-gray-400">
              Import or upload vendors, then assign them to users. Set permissions and spending limits by user.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-[#2d3748] rounded-lg flex items-center justify-center">
                <img 
                  src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/08/Pay-How-You-Like.png" 
                  alt="Pay how you want"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Pay how you want</h3>
            <p className="text-gray-400">
              Pay by credit card, ACH, or wire. Earn rewards and extend your cash flow while vendors get paid their way.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-[#2d3748] rounded-lg flex items-center justify-center">
                <img 
                  src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/08/Saving-Wallet-International-by-Streamlinehq.png" 
                  alt="Pay vendor their way"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Pay your vendor their way preffr</h3>
            <p className="text-gray-400">
              Vendors get paid in their preferred method: check, ACH, wire, or virtual card — at no cost to them.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#2d3748] rounded-2xl p-8">
            <h3 className="text-white text-2xl font-bold mb-4">Same day delivery available</h3>
            <p className="text-gray-400 mb-6">
              Need to get a payment out fast? Choose from a variety of expedited delivery options when scheduling your payment.
            </p>
            <div className="space-y-3">
              <div className="bg-[#1a2332] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded"></div>
                  <span className="text-white">Pay Smith Property Rentals</span>
                </div>
                <span className="text-white font-semibold">$2,000.00</span>
              </div>
              <div className="bg-[#1a2332] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded"></div>
                  <span className="text-white">Pay ABC Rentals</span>
                </div>
                <span className="text-white font-semibold">$5,000.00</span>
              </div>
              <div className="bg-[#1a2332] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded"></div>
                  <span className="text-white">Pay XYZ Corp</span>
                </div>
                <span className="text-white font-semibold">$3,500.00</span>
              </div>
            </div>
          </div>
          <div className="bg-[#2d3748] rounded-2xl p-8">
            <h3 className="text-white text-2xl font-bold mb-4">Extend your cash flow</h3>
            <p className="text-gray-400 mb-6">
              Schedule payments in advance and choose when funds are withdrawn from your account — giving you more control over your cash flow.
            </p>
            <div className="relative">
              <img 
                src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/08/Calendar-Illustration.png" 
                alt="Calendar"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-[#2d3748] rounded-2xl p-8">
            <h3 className="text-white text-2xl font-bold mb-4">Reconciliation made easy</h3>
            <p className="text-gray-400 mb-6">
              Sync your payments to QuickBooks automatically. Export payment data to Excel or integrate with your accounting software.
            </p>
            <div className="flex justify-center">
              <img 
                src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/08/Frame-5479-1.png" 
                alt="Reconciliation"
                className="w-48"
              />
            </div>
          </div>
          <div className="bg-[#2d3748] rounded-2xl p-8">
            <h3 className="text-white text-2xl font-bold mb-4">You're always in control</h3>
            <p className="text-gray-400 mb-6">
              Set user permissions, spending limits, and approval workflows. Track all payments in one dashboard.
            </p>
            <div className="bg-white rounded-lg p-4">
              <img 
                src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/08/Persmissions-Illustration.png" 
                alt="Permissions"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">No need for vendor action</h4>
            <p className="text-gray-400 text-sm">
              Vendors don't need to change a thing. They get paid in their preferred method automatically.
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Streamlined AP process</h4>
            <p className="text-gray-400 text-sm">
              Eliminate the hassle of cutting checks and mailing payments. Pay all vendors from one platform.
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Streamlined payments</h4>
            <p className="text-gray-400 text-sm">
              Make secure domestic and international payments with built-in fraud protection.
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Keep your financial record</h4>
            <p className="text-gray-400 text-sm">
              Maintain complete payment history and documentation in one secure location.
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Protection for you</h4>
            <p className="text-gray-400 text-sm">
              Advanced security features and fraud protection to keep your business safe.
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Earn rewards</h4>
            <p className="text-gray-400 text-sm">
              Maximize rewards by paying business expenses with your credit card.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}