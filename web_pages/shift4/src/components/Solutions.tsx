const Solutions = () => {
  const solutions = [
    { image: "https://picsum.photos/id/292/400/300", title: "Restaurants" },
    { image: "https://picsum.photos/id/1015/400/300", title: "Retail" },
    { image: "https://picsum.photos/id/429/400/300", title: "Hotels" },
    { image: "https://picsum.photos/id/431/400/300", title: "Stadiums" },
    { image: "https://picsum.photos/id/164/400/300", title: "Gaming" },
    { image: "https://picsum.photos/id/180/400/300", title: "Non-Profit" },
    { image: "https://picsum.photos/id/244/400/300", title: "Specialty Retail" },
    { image: "https://picsum.photos/id/401/400/300", title: "Enterprise" },
    { image: "https://picsum.photos/id/1/400/300", title: "E-Commerce" },
  ];
  return (
    <section className="py-20 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-[#0066FF]">TAILORED SOLUTIONS</span>
        </h2>
        <p className="text-xl text-white text-center mb-12">FOR EVERY BUSINESS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
            >
              <img 
                src={solution.image}
                alt={solution.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Solutions;