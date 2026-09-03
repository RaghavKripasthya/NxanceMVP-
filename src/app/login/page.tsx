import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Sign In | Nxance AI",
  description: "Sign in to your Nxance AI account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#eef4ff] via-[#f5f3ff] to-[#fdf2f8] px-4 py-10 sm:px-6">
      <div className="mb-8 flex justify-center sm:mb-10">
        <Link href="/" aria-label="Back to home">
          <Logo variant="auth" />
        </Link>
      </div>

      <LoginForm />

      <div className="mt-8 flex flex-col items-center gap-3 text-center sm:mt-10">
        <div className="flex items-center gap-4 text-sm text-[#94a3b8]">
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Privacy Policy
          </a>
          <span aria-hidden="true">|</span>
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Terms of Service
          </a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#94a3b8] sm:text-[11px]">
          © 2026 Nxance, SEBI compliant
        </p>
      </div>
    </div>
  );
}
