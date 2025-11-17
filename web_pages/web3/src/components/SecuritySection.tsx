export default function SecuritySection() {
  return (
    <section className="py-20 bg-[#1a2332]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">INSIGHTS INTO OUR CAPABILITIES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Protect your business with best-in-class security
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2 text-sm">PCI DSS Level 1 Service Provider</h4>
            <p className="text-gray-400 text-xs">
              Highest level of payment card industry security compliance
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2 text-sm">Bank-level encryption</h4>
            <p className="text-gray-400 text-xs">
              256-bit SSL encryption protects all data transmission
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2 text-sm">SOC 2 Type II Certified</h4>
            <p className="text-gray-400 text-xs">
              Independent verification of security controls
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2 text-sm">Fraud monitoring</h4>
            <p className="text-gray-400 text-xs">
              24/7 monitoring and advanced fraud detection systems
            </p>
          </div>
          <div className="bg-[#2d3748] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2 text-sm">Compliance certified</h4>
            <p className="text-gray-400 text-xs">
              Full regulatory compliance and data protection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}