export function TestimonialsSection() {
  const badges = [
    { src: 'https://www.plastiq.com/wp-content/uploads/2022/11/forbes_fintech50-logo.svg', alt: 'Forbes Fintech 50' },
    { src: 'https://www.plastiq.com/wp-content/uploads/2022/11/world-changing-ideas.svg', alt: 'World Changing Ideas' },
    { src: 'https://www.plastiq.com/wp-content/uploads/2022/11/US_FinTech_Badge.png', alt: 'US FinTech Badge' },
    { src: 'https://www.plastiq.com/wp-content/uploads/2022/11/great-places-to-work-badge.svg', alt: 'Great Places to Work' }
  ];
  return (
    <section className="py-20 px-6 bg-[#0a1929]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-white/60 text-sm mb-8 uppercase tracking-wide">
          AWARDS
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-16">
          Take their word for it.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-16">
          {badges.map((badge, index) => (
            <img 
              key={index}
              src={badge.src} 
              alt={badge.alt}
              className="h-16 opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}