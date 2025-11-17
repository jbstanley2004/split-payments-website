export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm text-mid-gray uppercase tracking-widest mb-4">TESTIMONIAL</p>
          <h2 className="text-5xl font-bold tracking-tight">
            "A total game-changer for our cash flow."
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-light rounded-card shadow-soft p-12">
            <p className="text-2xl text-dark mb-8">
              "We used to struggle with unpredictable lulls in revenue, which made paying for inventory a nightmare. With Split, we get instant access to our sales revenue without the stress of a traditional loan. The automated payback system is brilliant—it adjusts to our daily sales, so we’re never overextended. It’s been a total game-changer for our cash flow."
            </p>
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="John Doe"
                className="w-16 h-16 rounded-full mr-6"
              />
              <div>
                <div className="font-sans text-xl font-bold">John Doe</div>
                <div className="text-mid-gray">Owner, The Corner Cafe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}