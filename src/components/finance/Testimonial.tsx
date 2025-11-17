export default function Testimonial() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="https://www.plastiq.com/wp-content/uploads/2021/08/open-quote-lg-blue.svg"
            alt="quote"
            className="w-16 h-16 mx-auto mb-8"
          />
          <blockquote className="text-2xl md:text-3xl font-light mb-8 text-[#1a2332]">
            It's quick and easy to use financing through Plastiq. I've been burned before when lenders weren't straightforward. I appreciate the transparency of the Plastiq - Slope solution.
          </blockquote>
          <div>
            <p className="font-semibold text-[#1a2332]">Adelle Starin, CEO</p>
            <p className="text-gray-600">Baby's on Broadway</p>
          </div>
        </div>
      </div>
    </section>
  );
}