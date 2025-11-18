"use client";

import Link from "next/link";

export default function GetStartedSection() {
  return (
    <div className="bg-[var(--bg-secondary)] py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-semibold">
            See how Split can improve your cash flow.
          </h2>
          <p className="mt-4 text-lg text-[var(--text-body)]">
            Get a free cost review and see how our integrated funding and payments can benefit your business.
          </p>
          <div className="mt-8">
            <Link href="/get-started" className="btn-primary">
              Start my cost review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
