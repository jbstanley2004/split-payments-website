export function ClientLogos() {
  const logos = [
    { src: 'https://www.creditcardsplits.com/static/stripe.png', alt: 'Stripe' },
    { src: 'https://www.creditcardsplits.com/static/pcj.png', alt: 'PCJ' },
    { src: 'https://www.creditcardsplits.com/static/firstdata.png', alt: 'First Data' },
    { src: 'https://www.creditcardsplits.com/static/worldplay.png', alt: 'Worldpay' },
    { src: 'https://www.creditcardsplits.com/static/clover.png', alt: 'Clover' },
    { src: 'https://www.creditcardsplits.com/static/square.png', alt: 'Square' },
  ];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}