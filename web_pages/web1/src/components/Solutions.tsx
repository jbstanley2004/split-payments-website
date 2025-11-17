export function Solutions() {
  const solutions = [
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/03/Cash_flow_predictability_icon.svg',
      title: 'Inventory & cash flow visibility',
      description: 'Use Plastiq Pay to reconcile dozens of vendors while knowing exactly what payments are coming when.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/02/streamline_payments_icon.svg',
      title: 'Streamlined payment collection',
      description: 'Plastiq Pay is a single point of payment for all your supplier invoices.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/03/Global_Payment_Management_Icon.svg',
      title: 'Global payment management',
      description: 'Plastiq Pay works to move than 45 countries in 22 currencies.'
    }
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#00b8d9] font-semibold mb-2">Plastiq Pay Solutions</p>
          <h2 className="text-4xl font-bold text-[#0f1f2e] mb-4">
            Plastiq Pay meets the challenges.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {solutions.map((solution, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <img src={solution.icon} alt={solution.title} className="w-20 h-20" />
              </div>
              <h3 className="text-xl font-bold text-[#0f1f2e] mb-4">{solution.title}</h3>
              <p className="text-gray-600 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}