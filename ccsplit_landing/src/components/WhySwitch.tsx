const metrics = [
  { value: "92%", label: "Approval Rate", color: "text-blue" },
  { value: "2 min", label: "Application", color: "text-green" },
  { value: "24-Hour", label: "Deposits", color: "text-purple" },
  { value: "100+", label: "Integrations", color: "text-blue" },
];

export function WhySwitch() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm text-mid-gray uppercase tracking-widest mb-4">WHY SWITCH?</p>
          <h2 className="text-5xl font-bold tracking-tight">
            Stop waiting for your revenue
          </h2>
        </div>
        <div className="grid md:grid-cols-4 divide-x divide-light-gray">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center px-8">
              <div className={`font-sans text-6xl font-bold mb-2 ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-mid-gray uppercase text-sm tracking-widest">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}