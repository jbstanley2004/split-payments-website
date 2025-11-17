import { Edit, Building, CreditCard } from 'lucide-react';
export default function HowToGetStarted() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1a2332]">
          How to get started with Plastiq Short-Term Financing
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#1a2332] flex items-center justify-center">
              <Edit className="w-10 h-10 text-[#1a2332]" />
            </div>
            <p className="text-gray-700 max-w-xs mx-auto">
              Register for your free Plastiq account.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#1a2332] flex items-center justify-center">
              <Building className="w-10 h-10 text-[#1a2332]" />
            </div>
            <p className="text-gray-700 max-w-xs mx-auto">
              From your Plastiq wallet, connect your bank account to pre-qualify for a line of credit.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#1a2332] flex items-center justify-center">
              <CreditCard className="w-10 h-10 text-[#1a2332]" />
            </div>
            <p className="text-gray-700 max-w-xs mx-auto">
              When selecting a payment method, choose Short-Term Financing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}