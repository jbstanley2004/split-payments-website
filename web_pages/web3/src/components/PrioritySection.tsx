import { Button } from './ui/button';
export default function PrioritySection() {
  return (
    <section className="py-20 bg-[#0a0e1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plastiq is backed by the power of Priority
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Priority Technology Holdings, Inc. is a leading financial technology company that provides integrated fintech solutions to businesses and organizations.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-100 px-8">
              Get Started
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <img 
            src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2024/09/Priority-Plastiq-Light-2X.png" 
            alt="Priority Plastiq"
            className="max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}