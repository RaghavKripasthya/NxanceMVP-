import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="px-4 sm:px-8 lg:px-12">
        <nav
          className="flex h-[64px] w-full items-center sm:h-[72px]"
          aria-label="Main navigation"
        >
          <Link href="/" className="flex shrink-0 items-center">
            <Logo />
          </Link>

          <div className="ml-auto flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Desktop links */}
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="hidden text-[13px] font-bold uppercase tracking-wide text-[#1a1a1a] transition-opacity hover:opacity-70 md:inline-block"
              >
                {label}
              </Link>
            ))}

            <Link
              href="#"
              className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-3.5 py-2 text-[11px] font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Nxance AI
            </Link>
          </div>
        </nav>

        {/* Mobile links — always visible below header row */}
        <div className="flex items-center justify-center gap-3 border-t border-[#e2e8f0]/70 py-2.5 sm:gap-5 sm:py-3 md:hidden">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] font-bold uppercase tracking-wide text-[#1a1a1a] transition-opacity hover:opacity-70 sm:text-[11px]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
