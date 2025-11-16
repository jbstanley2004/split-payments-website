export function Stats() {
  const partners = [
    { name: 'firstdata', logo: 'https://www.creditcardsplits.com/static/firstdata.png' },
    { name: 'worldplay', logo: 'https://www.creditcardsplits.com/static/worldplay.png' },
    { name: 'clover', logo: 'https://www.creditcardsplits.com/static/clover.png' },
    { name: 'square', logo: 'https://www.creditcardsplits.com/static/square.png' },
    { name: 'stripe', logo: 'https://www.creditcardsplits.com/static/stripe.png' },
    { name: 'pcj', logo: 'https://www.creditcardsplits.com/static/pcj.png' },
  ];
  return (
    <section className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white text-xl font-semibold mb-8">
            TRUSTED BY PROCESSORS
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div key={partner.name} className="bg-white rounded-lg p-4 w-32 h-20 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}