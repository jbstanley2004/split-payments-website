import { Book, FileCode, Code, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
export default function Documentation() {
  const docs = [
    {
      icon: Book,
      title: "Quick Start",
      description: "Get up and running in minutes with our quick start guide.",
      link: "Learn More"
    },
    {
      icon: FileCode,
      title: "Developer Guide",
      description: "Comprehensive documentation for all our APIs and SDKs.",
      link: "Learn More"
    },
    {
      icon: Code,
      title: "API Reference Docs",
      description: "Detailed API reference with examples and use cases.",
      link: "Learn More"
    },
    {
      icon: CreditCard,
      title: "Code Samples",
      description: "Ready-to-use code samples in multiple languages.",
      link: "Learn More"
    }
  ];
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1929]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything you need to embed payments.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {docs.map((doc, index) => (
            <div key={index} className="bg-[#1a2f45] rounded-lg p-8 hover:bg-[#1f3651] transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-[#00d9b8]/10 p-3 rounded-lg shrink-0">
                    <doc.icon className="w-6 h-6 text-[#00d9b8]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{doc.title}</h3>
                    <p className="text-gray-400 mb-4">{doc.description}</p>
                  </div>
                </div>
                <Button variant="link" className="text-[#00d9b8] hover:text-[#00c4a7] p-0 h-auto">
                  {doc.link} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}