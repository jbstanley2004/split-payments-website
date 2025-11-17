import { Button } from './ui/button';
export function PhoneShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img 
              src="https://www.plastiq.com/wp-content/uploads/2022/02/getpaid_phone_2x.png.webp" 
              alt="Plastiq Pay Mobile App" 
              className="max-w-sm w-full"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#0f1f2e] mb-6">
              Evolve the way you pay with Plastiq Pay.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              As a small business, you need ongoing shortfunding to reach new customers and keep existing customers coming back. You always need to extend cash to build out inventory, pay new suppliers or add new team members. But instead of just trying to scrape together the cash you need to extend the time to pay all your payments, business closer to the free invoice date you need to have it done with Plastiq Pay. With Plastiq Pay with your suppliers get more efficient with Plastiq.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-[#00b8d9] text-white hover:bg-[#00a0c0]">
                Get Started
              </Button>
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay.svg" 
                alt="Plastiq Pay" 
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}