export function Challenges() {
  const challenges = [
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/03/Low_margins_icon.svg',
      title: 'Inventory management',
      description: 'Maintaining inventory can affect flow and cost making large investments upfront in inventory that may not sell until next quarter.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/03/Complex_Payment_Processes_Icon.svg',
      title: 'Complex payment process',
      description: 'Retailers must find ways to pay a variety of domestic and overseas suppliers and have varying jet payment schedules.'
    },
    {
      icon: 'https://www.plastiq.com/wp-content/uploads/2022/03/Global_Procurement_Costs_Icon.svg',
      title: 'Global procurement costs',
      description: 'Many popular ecommerce sellers costs and a lack of transparency on payment delivery and taxes on inventory.'
    }
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f1f2e] mb-4">
            Retailers are facing some common challenges.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {challenges.map((challenge, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <img src={challenge.icon} alt={challenge.title} className="w-20 h-20" />
              </div>
              <h3 className="text-xl font-bold text-[#0f1f2e] mb-4">{challenge.title}</h3>
              <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}