import Link from "next/link";

export default function FooterBeam() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: Company Name */}
        <div className="text-sm font-medium text-brand-black/60">
          Split LLC
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-brand-black/60">
          <Link href="/privacy" className="hover:text-brand-black transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-brand-black transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-brand-black transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
