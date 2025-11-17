export function CaseStudy() {
  return (
    <section className="py-20 bg-[#4a7c9e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://picsum.photos/id/1015/1920/600" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Universal Standard grows their brand with Plastiq Pay.
          </h2>
          <p className="text-lg mb-4 leading-relaxed">
            The challenge: Digital direct-to-consumer requires a strong online footprint with top-notch payment capabilities.
          </p>
          <p className="text-base leading-relaxed opacity-90">
            The Plastiq Pay solution: Universal used Plastiq business-to-business payment and clearing services to improve invoice management and payment options. They wanted their buyers to get paid automatically. We have our payments grow as thousands of suppliers receive their money on time because of a transparent and secure experience.
          </p>
        </div>
      </div>
    </section>
  );
}