interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}
const testimonials: Testimonial[] = [
  {
    quote: "Documenting was weak revascularisations are finally clean, and automated payment processes have reduced manual entry and streamlined our operations considerably!",
    author: "Sarah Chen",
    role: "ISO Manager",
    avatar: "https://picsum.photos/id/64/100/100"
  },
  {
    quote: "We as ISO, I appreciate the transparency and speed. We submit the deal. My agent notified immediately when we get approved, there's really no downtime in communication since fast.",
    author: "Michael Lee",
    role: "Sales Director",
    avatar: "https://picsum.photos/id/65/100/100"
  },
  {
    quote: "Processor-agnostic splits were the game with quick turnaround. We worked with various client and the overall sales increased significantly, and accurate feedback.",
    author: "Ryan Bennett",
    role: "Senior Agent",
    avatar: "https://picsum.photos/id/66/100/100"
  }
];
export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our ISOs Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#1a3a3a] rounded-3xl p-8 text-white"
            >
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}