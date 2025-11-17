export function LogosSection() {
  const logos = [
    { src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"%3E%3Ctext x="10" y="25" fill="%236b7280" font-family="sans-serif" font-size="20" font-weight="bold"%3EE%3C/text%3E%3C/svg%3E', alt: 'E' },
    { src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"%3E%3Ctext x="10" y="25" fill="%236b7280" font-family="monospace" font-size="16"%3E[STOCK]%3C/text%3E%3C/svg%3E', alt: 'Stock' },
    { src: 'https://www.plastiq.com/wp-content/uploads/2022/11/surplus-co-logo-blue.svg', alt: 'Surplus Co.' },
    { src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"%3E%3Ctext x="10" y="25" fill="%236b7280" font-family="sans-serif" font-size="18"%3Eb%3C/text%3E%3C/svg%3E', alt: 'b' },
    { src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"%3E%3Ctext x="10" y="25" fill="%236b7280" font-family="sans-serif" font-size="14"%3EMOLAN LANE%3C/text%3E%3C/svg%3E', alt: 'Molan Lane' },
    { src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"%3E%3Ctext x="10" y="25" fill="%236b7280" font-family="sans-serif" font-size="16"%3EUNIVER$%3C/text%3E%3C/svg%3E', alt: 'Univers' },
  ];
  return (
    <section className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
          {logos.map((logo, index) => (
            <img 
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
}