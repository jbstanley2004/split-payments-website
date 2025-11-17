import { Button } from './ui/button';
import { X } from 'lucide-react';
export function CookieBanner() {
  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="#E5E7EB"/>
              <circle cx="15" cy="20" r="3" fill="#6B7280"/>
              <circle cx="28" cy="16" r="2" fill="#6B7280"/>
              <circle cx="32" cy="28" r="3" fill="#6B7280"/>
              <circle cx="18" cy="32" r="2" fill="#6B7280"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">This website uses cookies</h3>
            <p className="text-sm text-gray-600 mb-4">
              We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.
            </p>
            <a href="#" className="text-sm text-[#ff6b35] hover:underline">
              Show details →
            </a>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button className="flex-1 bg-[#ff6b35] hover:bg-[#ff5520] text-white">
            OK
          </Button>
          <Button variant="outline" className="flex-1">
            Do not sell my personal information
          </Button>
        </div>
      </div>
    </div>
  );
}