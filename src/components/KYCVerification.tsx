import Link from "next/link";
import Logo from "./Logo";

const verificationSteps = [
  {
    title: "PAN Verification",
    subtitle: "PAN Entry & Name Match",
    icon: <IdCardIcon />,
    iconBg: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    trailing: <DotsIcon />,
  },
  {
    title: "Aadhaar Verification",
    subtitle: "DigiLocker Secure Access",
    icon: <KeyIcon />,
    iconBg: "bg-[#ede9fe]",
    iconColor: "text-[#7c3aed]",
    trailing: <LockIcon />,
  },
  {
    title: "Liveness Check",
    subtitle: "Selfie / Video Capture",
    icon: <TimerIcon />,
    iconBg: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    trailing: <CameraIcon />,
  },
] as const;

export default function KYCVerification() {
  return (
    <main className="flex flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-[#e2e8f0]/60 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <div className="mb-6 flex justify-center sm:mb-7">
            <Logo variant="card" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
              Verify Your Identity
            </h1>
            <p className="mt-2 text-sm text-[#64748b] sm:text-base">
              Complete these 3 quick steps to unlock AI-powered investing.
            </p>
          </div>

          <div className="mt-8 divide-y divide-[#f1f5f9]">
            {verificationSteps.map((step) => (
              <div
                key={step.title}
                className="flex items-center gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${step.iconBg} ${step.iconColor}`}
                >
                  {step.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0f172a]">{step.title}</p>
                  <p className="mt-0.5 text-sm text-[#94a3b8]">{step.subtitle}</p>
                </div>
                <div className="shrink-0 text-[#94a3b8]">{step.trailing}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Start KYC
            <span aria-hidden="true">→</span>
          </button>

          <div className="mt-4 text-center">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
            >
              I&apos;ll do this later
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ffedd5] px-4 py-2">
              <LockBadgeIcon />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a3412] sm:text-[11px]">
                Secure and Encrypted
              </span>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-[#94a3b8] sm:text-sm">
          PAN and personal data are used for verification only and never stored in
          reports. Secure 256-bit AES encryption protects your information.
        </p>
      </div>
    </main>
  );
}

function IdCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 10h4M14 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12h9M18 12v2M21 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9v4l2.5 2.5M9 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="6" cy="12" r="1.25" fill="currentColor" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" />
      <circle cx="18" cy="12" r="1.25" fill="currentColor" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 8h4l2-2h4l2 2h4v10H4V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LockBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#9a3412]" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
