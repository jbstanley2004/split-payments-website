import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      question: 'What are Credit Card Splits and how do they work?',
      answer: 'Credit Card Splits is a financing solution that provides working capital to businesses. Instead of fixed monthly payments, repayments are automatically deducted as a small percentage of your daily credit card sales. This means payments adjust with your revenue - you pay more when sales are high and less when sales are slow.',
    },
    {
      question: 'Is this a loan or a HELOC?',
      answer: 'Neither. Credit Card Splits is a merchant cash advance, not a traditional loan. We provide you with upfront capital in exchange for a percentage of your future credit card sales. There\'s no interest rate, just a fixed fee based on the total amount funded.',
    },
    {
      question: 'How much can I qualify for?',
      answer: 'Funding amounts typically range from $5,000 to $500,000, depending on your monthly credit card processing volume. Most businesses qualify for 1-2 times their average monthly card sales.',
    },
    {
      question: 'Will applying impact my credit score?',
      answer: 'No, we do not perform hard credit checks. Our approval process focuses primarily on your business sales history and credit card processing volume, not your personal credit score.',
    },
    {
      question: 'How are repayments calculated and when do they occur?',
      answer: 'Repayments are automatically deducted as a small percentage of your daily credit card sales (typically 10-20%). For example, if you process $1,000 in card sales and have a 15% repayment rate, $150 would be deducted that day. On slow days, you pay less; on busy days, you pay more.',
    },
    {
      question: 'How fast can I receive funds?',
      answer: 'Once approved, funds are typically deposited into your business account within 24-48 hours. The entire process from application to funding usually takes 3-5 business days.',
    },
    {
      question: 'What do I need to apply?',
      answer: 'You\'ll need: 3-6 months of bank statements, proof of business ownership, valid ID, and at least $5,000 in monthly credit card sales. The application takes about 10 minutes to complete.',
    },
    {
      question: 'What are the typical fees and how are business costs?',
      answer: 'Fees typically range from 10-30% of the total funded amount, depending on your business profile and risk factors. For example, on a $10,000 advance with a 20% fee, you\'d repay $12,000 total. There are no hidden fees or prepayment penalties.',
    },
    {
      question: 'Who is a good fit for our Credit Card Splits?',
      answer: 'This solution works best for established businesses with consistent credit card sales, including restaurants, retail stores, salons, auto repair shops, and service businesses. You should process at least $5,000 monthly in card transactions and have been in business for at least 6 months.',
    },
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            FAQ
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            Questions About Credit Card Splits
          </h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}