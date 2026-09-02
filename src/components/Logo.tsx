const LOGO_SRC = "/Nxance%20logo.svg";

type LogoProps = {
  /** auth = login gradient; card = white card; kycHeader = grey KYC header; dashboard = sidebar */
  variant?: "nav" | "footer" | "auth" | "card" | "kycHeader" | "dashboard";
};

export default function Logo({ variant = "nav" }: LogoProps) {
  const isFooter = variant === "footer";
  const isAuth = variant === "auth";
  const isCard = variant === "card";
  const isKycHeader = variant === "kycHeader";
  const isDashboard = variant === "dashboard";
  const blendOnLight = isAuth || isCard || isKycHeader || isDashboard || isFooter;

  const sizeClass = isDashboard
    ? "h-7 max-h-7 max-w-[90px]"
    : isCard
      ? "h-8 max-h-8 max-w-[120px] sm:h-9 sm:max-h-9 sm:max-w-[130px]"
      : isAuth
        ? "h-10 max-h-10 max-w-[180px] sm:h-11 sm:max-h-11 sm:max-w-[200px]"
        : isFooter
          ? "max-h-12 max-w-[165px]"
          : "max-h-10 max-w-[145px]";

  const wrapperClass =
    isAuth || isCard
      ? "flex items-center justify-center"
      : isDashboard
        ? "flex shrink-0 flex-col items-start gap-1"
        : `relative flex shrink-0 items-center ${
            isFooter
              ? "h-11 w-[150px] sm:h-12 sm:w-[165px]"
              : "h-9 w-[130px] sm:h-10 sm:w-[145px]"
          }`;

  return (
    <div
      className={wrapperClass}
      aria-label={isDashboard ? "Nxance Premium Wealth" : "Nxance logo"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Nxance"
        width={443}
        height={154}
        loading={isFooter ? "lazy" : "eager"}
        fetchPriority={isFooter ? "auto" : "high"}
        className={`h-full w-auto object-contain ${isAuth || isCard ? "object-center" : "object-left"} ${blendOnLight ? "mix-blend-multiply" : ""} ${sizeClass}`}
        decoding="async"
      />
      {isDashboard ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
          Premium Wealth
        </p>
      ) : null}
    </div>
  );
}
