import Link from "next/link";
import Logo from "@/components/Logo";
import ScrollReveal from "@/components/ScrollReveal";

const legalLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Compliance",
] as const;

const supportLinks = [
  "Help Center",
  "Contact Us",
  "API Docs",
] as const;

export default function HealthCheckFooter() {
  return (
    <ScrollReveal delay={80}>
      <footer className="mt-4 border-t border-[#e2e8f0] bg-white">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="max-w-md">
              <Link href="/dashboard" className="inline-flex">
                <Logo variant="footer" />
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
                Predictive intelligence for the modern investor. Elevate your portfolio
                health with automated analysis.
              </p>
            </div>

            <div className="flex gap-12 sm:gap-16 md:gap-20">
              <div>
                <p className="text-sm font-bold text-[#0f172a]">Legal</p>
                <ul className="mt-3 space-y-2.5">
                  {legalLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-[#64748b] transition-colors hover:text-[#2563eb]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0f172a]">Support</p>
                <ul className="mt-3 space-y-2.5">
                  {supportLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-[#64748b] transition-colors hover:text-[#2563eb]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 border-t border-[#e2e8f0] pt-6 text-sm text-[#64748b]">
            © 2026 Nxance, SEBI compliant.
          </p>
        </div>
      </footer>
    </ScrollReveal>
  );
}
