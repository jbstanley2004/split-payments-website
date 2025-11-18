
import Image from "next/image";

export default function PaymentsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="py-24 text-left">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-semibold">
              Smarter payments. <br /> Stronger cash flow.
            </h1>
            <p className="mt-4 text-lg text-[var(--text-body)]">
              Simplify every transaction — from cards to ACH — while unlocking funding that moves at the speed of your business.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="notion-card">
              <h3 className="text-2xl font-semibold">No new behavior for your customers.</h3>
              <p className="mt-2 text-[var(--text-body)]">
                Your customers pay exactly as they do today. We automatically split a small portion of card sales to repay your funding. No extra steps. No new portals.
              </p>
              <div className="mt-6 p-5 bg-white rounded-lg shadow-sm border border-[var(--border-subtle)]">
                <Image src="/placeholder.png" alt="Payment flow diagram" width={800} height={450} />
              </div>
            </div>
            <div className="notion-card">
              <h3 className="text-2xl font-semibold">Predictable cash flow you can count on.</h3>
              <p className="mt-2 text-[var(--text-body)]">
                Because funding is repaid as a percentage of sales, you pay less during slow periods and more when sales are strong. It’s a flexible model that works with your natural business cycles.
              </p>
              <div className="mt-6 p-5 bg-white rounded-lg shadow-sm border border-[var(--border-subtle)]">
                <Image src="/placeholder.png" alt="Cash flow chart" width={800} height={450} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold">Less friction at renewal.</h2>
            <p className="mt-4 text-lg text-[var(--text-body)]">
              Our integrated system uses your real payment data to automate renewals, making it easier than ever to access ongoing funding.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="notion-card">
              <h3 className="text-2xl font-semibold">Automated Renewals</h3>
              <p className="mt-2 text-[var(--text-body)]">
                Your payment processing data automatically qualifies you for renewals. No new applications needed.
              </p>
            </div>
            <div className="notion-card">
              <h3 className="text-2xl font-semibold">Transparent Pricing</h3>
              <p className="mt-2 text-[var(--text-body)]">
                Clear, simple pricing on payment processing and funding. No hidden fees, no surprises.
              </p>
            </div>
            <div className="notion-card">
              <h3 className="text-2xl font-semibold">Unified Dashboard</h3>
              <p className="mt-2 text-[var(--text-body)]">
                Manage payments and funding from a single dashboard. See your complete financial picture in one place.
              </p>
            </div>
            <div className="notion-card">
              <h3 className="text-2xl font-semibold">Dedicated Support</h3>
              <p className="mt-2 text-[var(--text-body)]">
                Our team is here to help with both your payments and funding questions. One contact, one solution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
