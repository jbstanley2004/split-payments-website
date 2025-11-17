import Link from "next/link";
import { PageBackdrop } from "@/components/page-backdrop";

export default function CloudsShowcasePage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] min-h-[100svh] font-lora text-[#FAF9F5]">
      <PageBackdrop priority />

      <div className="relative z-10 flex min-h-screen min-h-[100dvh] min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#E5DFD0]">Atmospheric system</p>
          <h1 className="font-poppins text-4xl font-semibold leading-tight text-white sm:text-5xl">
            A living Split backdrop inspired by warm twilight skies.
          </h1>
          <p className="text-base text-[#E8E6DC] sm:text-lg">
            The new Clouds animation replaces the static hero illustration everywhere in the experience.
            It keeps the same editorial warmth while adding subtle motion that echoes card volume constantly in motion.
          </p>
          <div className="flex flex-col items-center gap-4 text-sm text-[#E8E6DC]/80 sm:flex-row sm:justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
              <span>Warm dusk palette</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
              <span>Perpetual drift loop</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
              <span>GPU-friendly</span>
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2 text-sm font-semibold tracking-[0.2em] uppercase text-white transition hover:border-white hover:bg-white/10"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
