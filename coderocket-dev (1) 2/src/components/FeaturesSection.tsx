export function FeaturesSection() {
  const features = [
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/11/anyway_to_pay_icon.svg',
      title: 'Any way they want to pay.',
      description: 'Offer convenient payment options with different credit cards, debit cards, and bank accounts.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/11/payment_data_icon.svg',
      title: 'Detailed payment data.',
      description: 'Get visibility into payment details including cardholder information, card type, and payment confirmation.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/11/payment_requests_icon.svg',
      title: 'Payment requests made easy.',
      description: 'Send payment requests with a QR code or share link straight to customers' phones and inboxes.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/11/accept_payments_icon.svg',
      title: 'Accept payments on-the-go.',
      description: 'Accept in-person payments anywhere with our user-friendly mobile application.'
    }
  ];
  return (
    <section className="py-20 px-6 bg-[#0f1f2e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#ff6b35] text-sm font-semibold mb-4 uppercase tracking-wide">
            THE SMARTPAY DIFFERENCE
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            No code, no hassle, no merchant fees. Just payment.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <img src={feature.icon} alt="" className="w-16 h-16" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}