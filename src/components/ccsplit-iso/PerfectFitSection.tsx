import { Button } from './ui/button';
export function PerfectFitSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#c5ff00] rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Perfect Fit for Your Clients
            </h2>
            <p className="text-gray-800 mb-8">
              CreditCardSplits was built to address the unique challenges ISOs face in the lending industry. We provide flexible, tailored solutions that cater to a wide range of businesses, ensuring your clients get the support they need to thrive.
            </p>
            <Button className="bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] font-semibold">
              View Our Impact
            </Button>
          </div>
          <div className="bg-gray-900 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It Works
            </h2>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Step 1: Sign Up</h3>
                <p className="text-gray-300 text-sm">
                  Join the network — Register and get your personalized ISO portal to track clients and commissions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Step 2: Refer</h3>
                <p className="text-gray-300 text-sm">
                  Send in the lead — Submit clients with your personalized link from our team.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Step 3: Earn</h3>
                <p className="text-gray-300 text-sm">
                  Get Paid — Earn commissions on every approved application with transparent, timely payments.
                </p>
              </div>
            </div>
            <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600] font-semibold">
              Discover More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}