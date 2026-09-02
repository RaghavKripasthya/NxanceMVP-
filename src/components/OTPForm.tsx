"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Logo from "./Logo";

const OTP_LENGTH = 6;

export default function OTPForm() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/login/complete-profile");
  };

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-[#e2e8f0]/60 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6 flex justify-center sm:mb-7">
        <Link href="/" aria-label="Back to home">
          <Logo variant="card" />
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] sm:text-[1.65rem]">
          Verify Your Identity
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#64748b] sm:text-base">
          We&apos;ve sent a 6-digit code to your registered mobile number.
        </p>
      </div>

      <form
        className="mt-8"
        onSubmit={handleSubmit}
        aria-label="OTP verification"
      >
        <div className="flex justify-center gap-2 sm:gap-2.5">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              aria-label={`Digit ${index + 1}`}
              onChange={(e) => updateDigit(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-12 w-10 rounded-xl border border-transparent bg-[#eef2ff] text-center text-lg font-bold text-[#0f172a] outline-none transition-colors focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 sm:h-14 sm:w-12 sm:text-xl"
            />
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Verify
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="mt-5 space-y-2 text-center">
        <button
          type="button"
          className="text-sm font-medium text-[#475569] transition-colors hover:text-[#0f172a]"
        >
          Resend OTP
        </button>
        <div>
          <Link
            href="/login"
            className="text-sm font-semibold text-[#2563eb] hover:underline"
          >
            Change number
          </Link>
        </div>
      </div>

      <div className="mt-8 border-t border-[#f1f5f9] pt-5 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8] sm:text-[11px]">
          Secured by Nxance AI Engine
        </p>
      </div>
    </div>
  );
}
