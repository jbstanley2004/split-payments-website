import { CheckCircle } from 'lucide-react';

const benefits = [
  "No fixed payments",
  "No interest rates",
  "No credit checks",
  "No collateral",
];

export function WhyChoose() {
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2487&auto=format&fit=crop"
              alt="Merchant using a payment terminal"
              className="rounded-card"
            />
          </div>
          <div>
            <p className="text-sm text-mid-gray uppercase tracking-widest mb-4">THE BENEFITS</p>
            <h2 className="text-5xl font-bold tracking-tight mb-8">
              Funding that moves with your business
            </h2>
            <p className="text-mid-gray mb-8">
              Traditional loans demand fixed payments, regardless of your sales. We do it differently. Our advances are repaid as a small percentage of your daily sales, so you pay less when business is slow.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green" />
                  <span className="font-sans font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}