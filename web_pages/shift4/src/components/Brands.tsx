const Brands = () => {
  const brands = [
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/4e159a13f81c34a1a6ec5e54cd9689c6ce35923a-94x94.svg", alt: "logo" },
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/bdd2d0410fc22efeef5aea2251757adceffa26ce-200x168.png", alt: "logo" },
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/81c98179dab424713cee7e8da0fff9413f619aa1-205x60.png", alt: "logo" },
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/cb9dbb3f60512dc845ffe7c0bab07ed155ab689e-1280x631.png", alt: "logo" },
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/78ce9de4b8efe8c9ae4a53620ed19cd4b57665dd-1277x639.png", alt: "logo" },
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/dff40f170c58d192eabf55b0225a6dade49682b7-200x145.png", alt: "logo" },
    { src: "https://cdn.sanity.io/images/bx0g0zqk/production/d4d1dc2d07ae76c52facdec71c173956bdad3164-175x29.svg", alt: "logo" },
  ];
  return (
    <section className="py-20 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-[#0066FF]">POWERING THE TOP BRANDS</span>
        </h2>
        <p className="text-xl text-white text-center mb-12">IN EVERY INDUSTRY</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img 
                src={brand.src} 
                alt={brand.alt}
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Brands;