export default function TrustedBy() {
  const logos = [
    { src: "https://www.plastiq.com/wp-content/uploads/2022/11/Billfire.svg", alt: "Billfire" },
    { src: "https://content-pq2021.pantheonsite.io/wp-content/uploads/2022/11/payground-logo-connect.svg", alt: "Payground" },
    { src: "https://www.plastiq.com/wp-content/uploads/2022/11/Brex.svg", alt: "Brex" }
  ];
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
          {logos.map((logo, index) => (
            <img 
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </div>
  );
}