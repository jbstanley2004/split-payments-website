import { Button } from './ui/button';
const Ecosystem = () => {
  return (
    <section className="py-20 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-[#0066FF]">A COMPLETE END-TO-END</span>
        </h2>
        <p className="text-2xl text-[#0066FF] text-center mb-16">COMMERCE ECOSYSTEM</p>
        <div className="space-y-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://cdn.sanity.io/images/bx0g0zqk/production/2e0ca81d53ff550d6482f13ff4be4a3a4d6cc49f-1530x1629.png"
                alt="Mobile Technology"
                className="rounded-lg"
              />
            </div>
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4">Mobile and Contactless Technology</h3>
              <p className="text-gray-400 mb-6">
                Accept payments anywhere with our mobile and contactless payment solutions. 
                Enable tap, chip, and swipe payments with ease.
              </p>
              <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
                Learn More
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white md:order-2">
              <h3 className="text-3xl font-bold mb-4">Point of Sale Solutions</h3>
              <p className="text-gray-400 mb-6">
                Transform your checkout experience with our state-of-the-art POS systems 
                designed for speed, security, and ease of use.
              </p>
              <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
                Explore POS Systems
              </Button>
            </div>
            <div className="md:order-1">
              <img 
                src="https://picsum.photos/id/180/600/400"
                alt="POS Solutions"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://picsum.photos/id/1015/600/400"
                alt="Online Payments"
                className="rounded-lg"
              />
            </div>
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4">Robust Online Payments</h3>
              <p className="text-gray-400 mb-6">
                Power your e-commerce business with secure online payment processing, 
                subscription management, and fraud prevention tools.
              </p>
              <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
                Get Started Online
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white md:order-2">
              <h3 className="text-3xl font-bold mb-4">Business Intelligence and Analytics</h3>
              <p className="text-gray-400 mb-6">
                Make data-driven decisions with powerful analytics and reporting tools 
                that give you insights into your business performance.
              </p>
              <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
                View Analytics
              </Button>
            </div>
            <div className="md:order-1">
              <img 
                src="https://picsum.photos/id/431/600/400"
                alt="Analytics"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Ecosystem;