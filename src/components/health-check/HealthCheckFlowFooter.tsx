import ScrollReveal from "@/components/ScrollReveal";

const links = [
  "Privacy Policy",
  "Terms of Service",
  "Risk Disclosure",
  "Regulatory Documents",
] as const;

export default function HealthCheckFlowFooter() {
  return (
    <ScrollReveal delay={240}>
      <footer className="mx-auto mt-auto w-full max-w-5xl pt-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#94a3b8]">
          {links.map((link) => (
            <a key={link} href="#" className="transition-colors hover:text-[#64748b]">
              {link}
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#94a3b8] sm:text-sm">
          © 2024 Nxance Financial Technologies. All rights reserved. SIPC/FINRA Member.
        </p>
      </footer>
    </ScrollReveal>
  );
}
