import { Button } from './ui/button';
export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#2d1810]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-white/60 text-sm mb-4">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/accept-logo-dark-bg.svg" 
                alt="Plastiq Accept" 
                className="h-8 mb-6"
              />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Accept credit cards with zero merchant fees.
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Build strong customer relationships with more ways to pay. Maintain your margins and get paid on time with zero merchant fees.
            </p>
            <Button 
              size="lg"
              className="bg-[#ff6b35] hover:bg-[#ff5520] text-white px-8"
            >
              Get Started
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1e3a52] to-[#0f2537] rounded-2xl p-8 shadow-2xl">
              <div className="flex gap-4 mb-6">
                <button className="px-6 py-2 bg-[#ff6b35] text-white rounded-lg font-medium">
                  Pay Request
                </button>
                <button className="px-6 py-2 text-white/60 hover:text-white">
                  Adhoc link
                </button>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-2 block">
                    AMOUNT
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800">
                      $
                    </span>
                    <input 
                      type="text" 
                      value="12,500.00 USD" 
                      readOnly
                      className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-gray-800 bg-gray-50 rounded-lg"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-2 block">
                    To
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <span className="font-medium text-gray-800">Surplus Co.</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg font-medium"
                >
                  Continue
                </Button>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <img src="https://www.plastiq.com/wp-content/uploads/2022/11/smartpay-accept-hero-logos.svg" alt="" className="h-6" />
                </div>
              </div>
              <p className="text-center text-white/60 text-sm mt-4">
                3% customer convenience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}