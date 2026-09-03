import Logo from "@/components/Logo";

export default function ConstructionPageFooter() {
  return (
    <footer className="mt-auto w-full shrink-0 border-t border-[#e2e8f0] bg-[#f8f9fc] px-4 py-6 sm:px-8">
      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Logo variant="footer" />
          <p className="text-xs text-[#64748b] sm:text-sm">
            © 2026 Nxance, SEBI compliant.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#64748b] sm:text-sm">
          <a href="#" className="hover:text-[#0f172a]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#0f172a]">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#0f172a]">
            Risk Disclosure
          </a>
        </div>
      </div>
    </footer>
  );
}
