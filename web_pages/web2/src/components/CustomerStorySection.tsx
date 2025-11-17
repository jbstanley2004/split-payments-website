import { Button } from './ui/button';
export function CustomerStorySection() {
  return (
    <section className="py-20 px-6 bg-[#0a1929]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-white/60 text-sm mb-4 uppercase tracking-wide">
            WHAT OUR CLIENTS ARE SAYING
          </p>
        </div>
        <div className="bg-[#0f1f2e] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/images/1763319758065-1534bd55-7efc-44ce-85e1-5e41c3b4bab9-screenshot.jpg"
                alt="Customer using laptop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v8h8v-8H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v8h8v-8h-4c0-1.1.9-2 2-2V8z"/>
                </svg>
              </div>
              <blockquote className="text-xl text-white mb-8 leading-relaxed">
                "Plastiq is a winner for me and my customers! It's simple, I can proudly stand behind when I give my customers the link to pay."
              </blockquote>
              <div>
                <p className="text-white font-semibold mb-1">Scott Bethel, CEO</p>
                <p className="text-white/60 mb-4">Surplus Co.</p>
                <Button 
                  variant="link" 
                  className="text-[#ff6b35] hover:text-[#ff5520] p-0"
                >
                  Read Customer Story →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}