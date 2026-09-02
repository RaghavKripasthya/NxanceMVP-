"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function CompleteProfileForm() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-[#e2e8f0]/60 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6 flex justify-center sm:mb-7">
        <Link href="/" aria-label="Back to home">
          <Logo variant="card" />
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] sm:text-[1.65rem]">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#64748b] sm:text-base">
          Tell us a bit about yourself to get started with AI-powered investing.
        </p>
      </div>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/login/kyc");
        }}
      >
        <div>
          <label
            htmlFor="fullName"
            className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748b]"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your name as per KYC documents"
            className="mt-2 w-full rounded-xl border border-transparent bg-[#eef2ff] px-4 py-3.5 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748b]"
            >
              Email Address
            </label>
            <span className="text-[11px] font-medium text-[#2563eb]">
              For report delivery
            </span>
          </div>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="mt-2 w-full rounded-xl border border-transparent bg-[#eef2ff] px-4 py-3.5 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20"
          />
        </div>

        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Continue
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dbeafe] px-4 py-2">
          <ShieldIcon />
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb] sm:text-[11px]">
            Secure and Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#2563eb]" aria-hidden="true">
      <path
        d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
