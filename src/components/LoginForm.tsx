"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-white/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] sm:text-[1.65rem]">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-[#64748b] sm:text-base">
          Intelligent investing begins here.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2.5 text-sm font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2.5 text-sm font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]"
        >
          <AppleIcon />
          Apple
        </button>
      </div>

      <div className="relative my-6 flex items-center sm:my-7">
        <div className="h-px flex-1 bg-[#e2e8f0]" />
        <span className="px-3 text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
          Or
        </span>
        <div className="h-px flex-1 bg-[#e2e8f0]" />
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="email"
            className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748b]"
          >
            Email or Phone
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email or phone number"
            className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748b]"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs font-semibold text-[#2563eb] hover:underline"
            >
              Forgot?
            </a>
          </div>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-11 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] transition-colors hover:text-[#64748b]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Sign In
        </button>
      </form>

      <div className="mt-5 text-center">
        <Link
          href="/login/otp"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:underline"
        >
          <OtpIcon />
          Login with OTP instead
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-[#64748b]">
        New to Nxance?{" "}
        <Link href="#" className="font-semibold text-[#2563eb] hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 15.25 5.51 7.59 11.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3 3l18 18M10.58 10.58A2 2 0 0012 15a2 2 0 001.42-.58M9.88 5.09A10.94 10.94 0 0112 5c6.5 0 10 7 10 7a18.45 18.45 0 01-5.06 5.94M6.1 6.1C3.68 7.86 2 12 2 12a18.5 18.5 0 006 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OtpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M8.5 14.5A2.5 2.5 0 0011 12V7a4 4 0 118 0v5a2.5 2.5 0 002.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="3" y="11" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
