const Stats = () => {
  const stats = [
    { value: "75+", label: "Years Combined Experience" },
    { value: "$260+ Billion", label: "Payment Volume Processed" },
    { value: "200,000+", label: "Merchants Worldwide" },
    { value: "1,200+", label: "Team Members" },
    { value: "5+ Billion", label: "Transactions Annually" },
    { value: "100+", label: "Countries Supported" }
  ];
  return (
    <section className="py-20 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-[#0066FF]">A GLOBAL LEADER IN FINANCIAL</span>
          <br />
          <span className="text-[#0066FF]">TECHNOLOGY</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                {stat.value}
              </div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stats;