import { BarChart3, TrendingUp, Users, Zap, Shield, Globe } from 'lucide-react';
const features = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Dive deep into your data with powerful visualization tools and customizable dashboards.'
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Reporting',
    description: 'Get instant insights with live data updates and automated report generation.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share insights and collaborate seamlessly with your team members.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized data processing engine.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is protected with bank-level encryption and compliance certifications.'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Scale your operations globally with our distributed infrastructure.'
  }
];
function WorkSmarter() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Work Smarter, Not Harder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to turn data into your competitive advantage
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WorkSmarter;