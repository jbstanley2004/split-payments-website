import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const footerLinks = {
    Product: [
      { title: "Payments", path: "/payments" },
      { title: "Funding", path: "/funding" },
      { title: "CC Split", path: "/cc-split" },
      { title: "Partnerships", path: "/partnerships" },
    ],
    Resources: [
      { title: "Blog", path: "#" },
      { title: "Help Center", path: "#" },
      { title: "Contact Us", path: "#" },
    ],
    Company: [
        { title: "About Us", path: "#" },
        { title: "Careers", path: "#" },
        { title: "Brand", path: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t border-[var(--border-subtle)] px-4 md:px-6 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                alt="Split logo"
                src="/new_logo.svg"
                width={80}
                height={24}
              />
            </Link>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-serif text-base font-semibold text-[var(--text-main)] mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.path}
                      className="text-sm text-[var(--text-body)] hover:text-[var(--text-main)] transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] text-center text-sm text-[var(--text-muted)]">
          <p>&copy; {new Date().getFullYear()} Split. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
