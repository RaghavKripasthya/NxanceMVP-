import type { Metadata } from "next";
import OTPForm from "@/components/OTPForm";

export const metadata: Metadata = {
  title: "Verify OTP | Nxance AI",
  description: "Verify your identity with a one-time password",
};

export default function VerifyOTPPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eef0f4]">
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <OTPForm />
      </main>

      <footer className="flex flex-col items-center gap-4 px-5 pb-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left md:px-12">
        <p className="text-xs text-[#94a3b8] sm:text-sm">
          © 2024 Nxance AI. SEBI Registered Investment Advisor.
        </p>
        <div className="flex items-center gap-5 text-xs text-[#94a3b8] sm:text-sm">
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
