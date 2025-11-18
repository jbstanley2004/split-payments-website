"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  const links = [
    { title: "Home", path: "/" },
    { title: "Payments", path: "/payments" },
    { title: "Funding", path: "/funding" },
    { title: "CC Split", path: "/cc-split" },
    { title: "Partnerships", path: "/partnerships" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-[var(--border-subtle)]">
        <div className="flex items-center">
          <Link href="/" className="flex items-center focus-visible:outline-none">
            <span className="sr-only">Split Logo</span>
            <Image
              alt="Split logo"
              src="/new_logo.svg"
              width={80}
              height={24}
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map(({ path, title }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="text-sm font-medium text-[var(--text-body)] transition-colors hover:text-[var(--text-main)]"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:inline-flex items-center text-sm font-medium text-[var(--text-body)] transition-colors hover:text-[var(--text-main)]"
          >
            Sign in
          </a>
          <a
            href="#"
            className="btn-primary"
          >
            Request a demo
          </a>
        </div>
      </nav>
    </header>
  );
}
