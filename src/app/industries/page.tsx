"use client";

import { SplitLogo } from "@/components/split-logo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const navItems = [
  { href: "/#funding", label: "funding" },
  { href: "/payments", label: "payments" },
  { href: "/industries", label: "industries" },
];

export default function IndustriesPage() {
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotatingTitles = ["funding", "payments", "industries"];

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % rotatingTitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);
  const industries = [
    {
      title: "Restaurants",
      description:
        "Enhance the dining experience with flexible payment options, from tableside payments to online ordering.",
      image: "/industries/restaurants.webp",
    },
    {
      title: "Auto Repair",
      description:
        "From the front desk to the service bay, accept payments easily and get customers back on the road faster.",
      image: "/industries/car_repair.webp",
    },
    {
      title: "Retail & Clothing",
      description:
        "Boost sales and improve customer flow with our integrated POS and payment solutions for clothing boutiques.",
      image: "/industries/clothing.webp",
    },
    {
      title: "Pharmacies & Healthcare",
      description:
        "Provide a seamless and secure payment process for patients with our HIPAA-compliant solutions.",
      image: "/industries/pharmacy.webp",
    },
    {
      title: "Home Goods & Furniture",
      description:
        "Support big-ticket purchases and manage complex inventories with our versatile retail payment systems.",
      image: "/industries/home_goods_furniture.webp",
    },
    {
      title: "Salons & Spas",
      description:
        "Let clients book and pay with ease, so you can focus on providing exceptional beauty and wellness services.",
      image: "/industries/hair_beauty.webp",
    },
    {
      title: "Hotels & Hospitality",
      description:
        "From check-in to check-out, offer guests a smooth and secure payment experience for their stay.",
      image: "/industries/hotels.webp",
    },
    {
      title: "Franchises",
      description:
        "Standardize payment processing across all your locations with our scalable and easy-to-manage franchise solutions.",
      image: "/industries/franchise.webp",
    },
    {
      title: "Convenience Stores",
      description:
        "Streamline checkout and manage inventory with our fast and reliable payment solutions for convenience stores.",
      image: "/industries/convenience_store.webp",
    },
    {
      title: "Professional Services",
      description:
        "Simplify client billing and invoicing with our secure online payment portals for professional firms.",
      image: "/industries/professional_services.webp",
    },
  ];

  return (
    <main ref={ref} className="relative min-h-screen font-jetbrains text-text">
      {/* Fixed Parallax Background */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-0"
      >
        <Image
          src="/industries-hero.png"
          alt="Industries We Serve"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-bg/70" />
      </motion.div>

      {/* All content with relative positioning */}
      <div className="relative z-10">
        {/* Dynamic Island Header */}
        <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-center px-6 pointer-events-none">
          {/* Desktop Dynamic Island */}
          <div
            className="hidden md:flex gap-2 items-center justify-center pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                width: isHovered ? "auto" : "100px",
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-4 py-1.5 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-white/70 font-medium whitespace-nowrap block text-center"
                >
                  {rotatingTitles[currentTitle]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.nav
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 30,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-4 py-1.5"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <div className="flex gap-4 text-xs text-white/80">
                <Link href="/#funding" className="hover:text-[#00D9FF] transition-colors font-medium whitespace-nowrap">funding</Link>
                <Link href="/payments" className="hover:text-[#00D9FF] transition-colors font-medium whitespace-nowrap">payments</Link>
              </div>
            </motion.nav>

            <motion.nav
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -30,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-4 py-1.5"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <div className="flex gap-4 text-xs text-white/80">
                <Link href="/industries" className="hover:text-[#00D9FF] transition-colors font-medium whitespace-nowrap">industries</Link>
                <Link href="/get-started" className="bg-[#00D9FF] text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-[#00C4EA] transition-colors whitespace-nowrap">get started</Link>
              </div>
            </motion.nav>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/85 rounded-full border border-white/10 px-4 py-3 pointer-events-auto">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="sr-only">Split</span>
              <SplitLogo priority />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#00D9FF]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen ? (
            <>
              <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden pointer-events-auto" onClick={closeMenu} />
              <nav className="fixed left-6 right-6 top-24 z-50 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/95 backdrop-blur-[20px] backdrop-saturate-[180%] p-6 text-sm shadow-xl md:hidden pointer-events-auto">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-white/80 hover:text-[#00D9FF] transition-colors" onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/get-started" className="btn mt-2" onClick={closeMenu}>
                  get started
                </Link>
              </nav>
            </>
          ) : null}
        </header>

        {/* Hero */}
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              Industries We Serve
            </h1>
            <p className="text-muted text-lg md:text-xl mb-8">
              We provide tailored payment solutions for a wide range of businesses.
              Our broad partnerships and industry relationships enable us to deliver
              the most effective and affordable services for your needs.
            </p>
          </motion.div>
        </section>

        {/* Industries Grid */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-line overflow-hidden hover:border-muted transition-colors flex flex-col bg-bg/80 backdrop-blur-sm"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-medium mb-3">{industry.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto border border-line p-12 bg-bg/80 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Don't See Your Industry?</h2>
            <p className="text-muted mb-8 text-lg">
              We support many other business types, including high-risk industries.
              Request a free comparison to see how we can help.
            </p>
            <Link href="/get-started" className="btn inline-block">
              Request a Free Comparison
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 split payments, inc.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
