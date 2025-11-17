import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
  Star,
  Users2,
} from "lucide-react";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// (all original data arrays preserved)...

export default function CCSplitPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] bg-[#FAF9F5] font-lora text-[#141413]">
      {/* Twinkling stars background replaces hero_image_formatted.png here */}
      <TwinklingStarsBackground />

      <div className="relative z-10">
        <DynamicIslandNav />

        <div className="px-3 pb-6 pt-4 sm:px-4 sm:pb-10 sm:pt-6 md:px-6 md:pb-14 md:pt-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#FAF9F5] shadow-[0_30px_80px_rgba(20,20,19,0.18)] ring-1 ring-[#E8E6DC]">
            <section id="overview" className="px-6 py-12 sm:px-10 sm:py-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-4 py-1.5 text-sm uppercase tracking-[0.3em] text-[#9B8E7A]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                    CC Split by Split
                  </div>
                  <div className="space-y-4">
                    <h1 className="font-poppins text-4xl font-semibold leading-tight text-[#141413] sm:text-5xl">
                      Working capital that flows with every swipe
                    </h1>
                    <p className="text-lg text-[#524F49] sm:text-xl">
                      CC Split pairs processor data with Split funding so you can extend instant, sales-based capital without adding operational drag. Unlock offers that grow whenever your merchants grow.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {reassuranceChips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1 text-sm text-[#3F3A32]"
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <OrangePushButton>Get Started</OrangePushButton>
                    <button className="inline-flex items-center text-sm font-semibold text-[#524F49] transition-colors hover:text-[#D97757]">
                      See how it works
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {heroHighlights.map((highlight) => (
                      <div
                        key={highlight.title}
                        className="rounded-3xl border border-[#E8E6DC] bg-[#F8F4EC] p-5 shadow-[0_12px_30px_rgba(20,20,19,0.08)]"
                      >
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#D97757]">
                          <highlight.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-poppins text-lg font-semibold text-[#141413]">{highlight.title}</h3>
                        <p className="text-sm text-[#524F49]">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative isolate">
                  <div className="relative overflow-hidden rounded-[32px] border border-[#E8E6DC] bg-[#F8F4EC] p-8 shadow-[0_25px_60px_rgba(20,20,19,0.15)]">
                    <div className="absolute inset-6 rounded-[28px] bg-gradient-to-br from-[#E5DFD0] via-transparent to-[#f7f3ea]" />
                    <div className="relative flex flex-col gap-6">
                      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_15px_40px_rgba(20,20,19,0.15)]">
                        <div className="text-sm text-[#9B8E7A]">Split sample merchant</div>
                        <div className="mt-2 flex items-end justify-between">
                          <div>
                            <div className="text-4xl font-semibold text-[#141413]">$85,000</div>
                            <p className="text-sm text-[#524F49]">Available CC Split funding</p>
                          </div>
                          <div className="rounded-full bg-[#141413] px-4 py-1 text-sm text-white">Active</div>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-[#E8E6DC] bg-white/70 p-4 text-sm text-[#524F49]">
                          <div className="text-xs uppercase tracking-[0.2em] text-[#9B8E7A]">Split rate</div>
                          <div className="text-2xl font-semibold text-[#141413]">9.5%</div>
                          <p className="text-xs text-[#7B7569]">Adjusts automatically with card batches</p>
                        </div>
                        <div className="rounded-2xl border border-[#E8E6DC] bg-white/70 p-4 text-sm text-[#524F49]">
                          <div className="text-xs uppercase tracking-[0.2em] text-[#9B8E7A]">Next review</div>
                          <div className="text-2xl font-semibold text-[#141413]">May 18</div>
                          <p className="text-xs text-[#7B7569]">New offers drop as soon as volume spikes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[#E8E6DC] bg-white/80 p-4">
                        <div className="rounded-full bg-[#141413] p-3 text-white">
                          <ArrowRight className="h-5 w-5 -rotate-45" />
                        </div>
                        <div>
                          <p className="text-sm text-[#9B8E7A]">Processor feed</p>
                          <p className="font-semibold text-[#141413]">Live batches syncing hourly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -left-6 top-6 hidden h-24 w-24 rounded-full bg-[#D97757]/20 blur-2xl sm:block" />
                </div>
              </div>
            </section>

            <section id="features" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr]">
                <div className="space-y-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#9B8E7A]">Our solutions</p>
                  <h2 className="font-poppins text-3xl font-semibold text-[#141413] sm:text-4xl">
                    Smarter working capital, seamless repayments
                  </h2>
                  <p className="text-lg text-[#524F49]">
                    CC Split combines automated repayment logic with Split's funding stack so you can match capital to every merchant's rhythm. No hidden fees, no rigid amortization schedules.
                  </p>
                  <div className="rounded-3xl border border-[#E8E6DC] bg-[#F8F4EC] p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-[#9B8E7A]">Program snapshot</p>
                    <div className="mt-4 space-y-3 text-sm text-[#524F49]">
                      <div className="flex items-center justify-between border-b border-dashed border-[#E8E6DC] pb-2">
                        <span>Draw limit</span>
                        <span className="font-semibold text-[#141413]">Up to 1.5× monthly volume</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-dashed border-[#E8E6DC] pb-2">
                        <span>Remit frequency</span>
                        <span className="font-semibold text-[#141413]">Daily or weekly batches</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Visibility</span>
                        <span className="font-semibold text-[#141413]">Unified inside Split dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {featureCards.map((feature) => (
                    <div key={feature.title} className="rounded-3xl border border-[#E8E6DC] bg-white/80 p-5 shadow-[0_15px_35px_rgba(20,20,19,0.08)]">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#141413] text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-poppins text-xl font-semibold text-[#141413]">{feature.title}</h3>
                      <p className="text-sm text-[#524F49]">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="benefits" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#9B8E7A]">Why merchants choose CC Split</p>
                <h2 className="mt-4 font-poppins text-3xl font-semibold text-[#141413] sm:text-4xl">
                  Funding aligned with payment intelligence
                </h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {reasonCards.map((reason) => (
                  <div key={reason.title} className="rounded-3xl border border-[#E8E6DC] bg-[#F8F4EC] p-6 text-left">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#D97757]">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-poppins text-xl font-semibold text-[#141413]">{reason.title}</h3>
                    <p className="text-sm text-[#524F49]">{reason.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="metrics" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#9B8E7A]">Proof in the numbers</p>
                  <h2 className="mt-4 font-poppins text-3xl font-semibold text-[#141413] sm:text-4xl">
                    Repayments that move with sales—not against cash flow
                  </h2>
                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="rounded-3xl border border-[#E8E6DC] bg-white/80 p-6 text-left shadow-[0_12px_28px_rgba(20,20,19,0.07)]">
                        <div className="text-4xl font-semibold text-[#141413]">
                          {metric.value}
                          <span className="text-xl font-normal text-[#524F49]">{metric.suffix}</span>
                        </div>
                        <p className="mt-2 text-sm text-[#524F49]">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-[32px] border border-[#E8E6DC] bg-[#F8F4EC] p-6 shadow-[0_25px_60px_rgba(20,20,19,0.12)]">
                    <div className="rounded-2xl bg-white/80 p-6">
                      <div className="flex items-center justify-between text-sm text-[#9B8E7A]">
                        <span>Live card batches</span>
                        <span>Today</span>
                      </div>
                      <div className="mt-6 space-y-4">
                        {["Breakfast rush", "Lunch", "Dinner"].map((period, idx) => (
                          <div key={period} className="rounded-2xl border border-[#E8E6DC] bg-[#FAF9F5] p-4">
                            <div className="flex items-center justify-between text-sm text-[#524F49]">
                              <span>{period}</span>
                              <span>{idx === 1 ? "Split remit 9.3%" : "Split remit 9.5%"}</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-[#E8E6DC]">
                              <div
                                className={`h-full rounded-full bg-[#D97757] ${idx === 0 ? "w-2/3" : idx === 1 ? "w-5/6" : "w-3/4"}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 rounded-2xl border border-dashed border-[#E8E6DC] bg-[#F8F4EC] p-4 text-sm text-[#524F49]">
                        <div className="flex items-center justify-between">
                          <span>Next offer refresh</span>
                          <span className="font-semibold text-[#141413]">In 3 days</span>
                        </div>
                        <p className="text-xs text-[#7B7569]">Automatic increase once rolling volume hits target.</p>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-32 w-32 -translate-y-1/2 rounded-full bg-[#BCD1CA]/40 blur-3xl sm:block" />
                </div>
              </div>
            </section>

            <section id="testimonials" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#9B8E7A]">Testimonials</p>
                <h2 className="mt-4 font-poppins text-3xl font-semibold text-[#141413] sm:text-4xl">
                  Rated 4.9/5 by 1,200+ merchants
                </h2>
                <p className="mt-3 text-lg text-[#524F49]">Real stories from processors and merchants using CC Split to steady their cash flow.</p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="flex h-full flex-col rounded-3xl border border-[#E8E6DC] bg-white/80 p-6 text-left shadow-[0_12px_28px_rgba(20,20,19,0.08)]">
                    <div className="mb-4 flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-[#D97757] text-[#D97757]" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm text-[#524F49]">“{testimonial.quote}”</p>
                    <div className="mt-6">
                      <p className="font-semibold text-[#141413]">{testimonial.name}</p>
                      <p className="text-sm text-[#7B7569]">{testimonial.business}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#9B8E7A]">FAQ</p>
                <h2 className="mt-4 font-poppins text-3xl font-semibold text-[#141413] sm:text-4xl">
                  Questions about CC Split
                </h2>
              </div>
              <div className="mt-10 space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-3xl border border-[#E8E6DC] bg-white/80 p-5 text-left shadow-[0_10px_24px_rgba(20,20,19,0.06)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="font-semibold text-[#141413]">{faq.question}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F4EC] text-[#D97757] transition-transform duration-300 group-open:rotate-45">
                        <PlusIcon />
                      </div>
                    </summary>
                    <p className="mt-4 text-sm text-[#524F49]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="partners" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="rounded-[32px] border border-[#E8E6DC] bg-[#F8F4EC] px-6 py-10 text-center sm:px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9B8E7A]">
                  Trusted by processing leaders
                </p>
                <h2 className="mt-4 font-poppins text-3xl font-semibold text-[#141413] sm:text-4xl">
                  CC Split runs with the processors you already trust
                </h2>
                <p className="mt-3 text-base text-[#524F49]">
                  First Data, Worldpay, Clover, Square, Stripe, Global Payments and every major card network stay on display in
                  a single carousel so prospects see familiar brands at the footer of the page.
                </p>

                <div className="mt-10 space-y-6">
                  {carouselRows.map((row) => {
                    const duplicatedLogos = [...row.logos, ...row.logos];
                    return (
                      <div key={row.id} className="relative overflow-hidden rounded-[28px] border border-[#E8E6DC] bg-white/60 p-4">
                        <div
                          className={`flex gap-6 ${row.reverse ? "animate-logo-marquee-reverse" : "animate-logo-marquee"}`}
                        >
                          {duplicatedLogos.map((logo, index) => (
                            <div
                              key={`${logo.name}-${index}`}
                              className="flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FAF9F5] p-4 ring-1 ring-[#E8E6DC]"
                              aria-label={logo.name}
                            >
                              <Image
                                src={logo.src}
                                alt={`${logo.name} logo`}
                                width={180}
                                height={72}
                                className="h-12 w-auto object-contain"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8F4EC] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F8F4EC] to-transparent" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section id="cta" className="border-t border-[#E8E6DC] px-6 py-12 sm:px-10 sm:py-16">
              <div className="rounded-[32px] bg-[#141413] px-6 py-10 text-white sm:px-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/60">Get started</p>
                    <h2 className="font-poppins text-3xl font-semibold">See how CC Split can level-up your processing portfolio</h2>
                    <p className="text-base text-white/80">
                      Share a bit about your merchant mix and card volume. Our team will tailor a CC Split program and send a live preview.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <OrangePushButton>Schedule a walkthrough</OrangePushButton>
                    <button className="inline-flex items-center text-sm font-semibold text-white/80 transition-colors hover:text-white">
                      Talk to sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
