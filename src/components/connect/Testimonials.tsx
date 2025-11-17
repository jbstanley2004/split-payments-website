export default function Testimonials() {
  const awards = [
    { src: "https://www.plastiq.com/wp-content/uploads/2022/11/Brex.svg", alt: "Brex" },
    { src: "https://www.plastiq.com/wp-content/uploads/2022/11/forbes_fintech50-logo.svg", alt: "Forbes Fintech 50" },
    { src: "https://www.plastiq.com/wp-content/uploads/2022/11/world-changing-ideas.svg", alt: "World Changing Ideas" }
  ];
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f2137]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-12">
            Take their word for it.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16">
            {awards.map((award, index) => (
              <img 
                key={index}
                src={award.src}
                alt={award.alt}
                className="h-12 opacity-70"
              />
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#1a2f45] rounded-lg overflow-hidden">
              <img 
                src="https://picsum.photos/id/20/400/300"
                alt="Team collaboration"
                className="w-full h-64 object-cover"
              />
            </div>
            <div>
              <div className="mb-6">
                <img 
                  src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/09/Priority-Plastiq-Light-2X.png"
                  alt="Priority Plastiq"
                  className="h-8"
                />
              </div>
              <blockquote className="text-lg text-gray-300 mb-6 italic">
                "We highly recommend the Connect platform. The team has been super responsive and helpful in getting us set up. The API is intuitive, well documented, and flexible for use within our applications. Since its launch we've had great adoption from our end users, opening a new revenue stream for us."
              </blockquote>
              <div>
                <p className="text-white font-semibold">Adam Gonzales, CEO</p>
                <p className="text-gray-400">Read Customer Story →</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}