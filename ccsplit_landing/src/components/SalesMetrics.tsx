export function SalesMetrics() {
  const metrics = [
    { label: 'AVG FUNDING', value: '1K+', unit: 'USD' },
    { label: 'APPROVAL RATE', value: '4', unit: '%' },
    { label: 'MERCHANTS FUNDED', value: '41M+', unit: '' },
    { label: 'CUSTOMER SATISFACTION', value: '32', unit: '%' },
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            PROVEN RESULTS
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Repayments that move with your sales — not<br />against your cash flow.
          </h3>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-2">
                {metric.value}
                <span className="text-2xl ml-1">{metric.unit}</span>
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <img 
            src="https://www.creditcardsplits.com/static/NoCollateral.png"
            alt="Happy Business Owner"
            className="rounded-lg shadow-2xl max-w-md"
          />
        </div>
      </div>
    </section>
  );
}