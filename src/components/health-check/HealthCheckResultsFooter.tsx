import Link from "next/link";
import Logo from "@/components/Logo";
import ScrollReveal from "@/components/ScrollReveal";

const footerLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Regulatory Disclosures",
  "SIPC Protection",
] as const;

export default function HealthCheckResultsFooter() {
  return (
    <ScrollReveal delay={200}>
      <footer className="mt-10 border-t border-[#e2e8f0] bg-white">
        <div className="flex flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <Link href="/dashboard" className="inline-flex">
              <Logo variant="footer" />
            </Link>
            <p className="mt-2 text-sm text-[#64748b]">
              © 2024 Nxance Investment Group. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748b]">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-[#2563eb]">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </ScrollReveal>
  );
}
