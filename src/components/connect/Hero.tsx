import { Button } from './ui/button';
export default function Hero() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqconnect.svg" 
                alt="Plastiq Connect"
                className="h-8 mb-8"
              />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Increase revenue with expanded B2B payment options
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Launch embedded payments in your software platform or marketplace. 
              Give your customers an easier way to pay and get paid with cards. 
              Increase revenue with an entirely new revenue stream.
            </p>
            <Button className="bg-[#00d9b8] hover:bg-[#00c4a7] text-[#0a1929] font-medium px-8 py-6 text-base">
              Get started
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1a3a52] to-[#0a1929] rounded-lg p-8 shadow-2xl">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/connect-hero-code-screenshot-opt.png"
                alt="Plastiq Connect Dashboard"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}