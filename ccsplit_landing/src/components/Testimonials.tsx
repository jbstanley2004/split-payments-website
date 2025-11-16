import { Star } from 'lucide-react';
export function Testimonials() {
  const testimonials = [
    {
      name: 'James Mitchell',
      business: 'Mitchell\'s Auto Repair',
      text: 'I was able to get funded within a week, and the repayments automatically adjust with my sales. It\'s been a game-changer for managing cash flow during slow months.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      business: 'Bella\'s Boutique',
      text: 'The application was so easy, and I loved that I didn\'t need collateral. The split payments work perfectly with my business model.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      business: 'Chen\'s Restaurant',
      text: 'Best financing decision I\'ve made. The flexible repayments mean I\'m not stressed about fixed monthly payments when business is slower.',
      rating: 5,
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            WHAT CUSTOMERS SAY
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Rated 4.9/5 by<br />1,200+ merchants
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thousands of businesses have improved their funding growth with Credit Card Splits
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#c4ff1a] text-[#c4ff1a]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.business}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <img 
              src="https://www.creditcardsplits.com/static/trust.png"
              alt="Trust Logo"
              className="h-8"
            />
          </div>
          <div className="flex items-center space-x-2">
            <img 
              src="https://www.creditcardsplits.com/static/googlelo.png"
              alt="Google Logo"
              className="h-8"
            />
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c4ff1a] text-[#c4ff1a]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}