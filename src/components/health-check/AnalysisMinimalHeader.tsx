export default function AnalysisMinimalHeader() {
  return (
    <header className="flex items-center justify-end gap-3 px-4 py-4 sm:px-8">
      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#64748b] hover:bg-white hover:text-[#0f172a]"
      >
        <BellIcon />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef4444]" />
      </button>
      <div
        className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#c4b5fd] to-[#2563eb] ring-2 ring-white"
        aria-label="User profile"
      >
        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M15 17H9l-1 2h8l-1-2zM18 13a6 6 0 10-12 0c0 3-1 4-2 4H16c0-1-1-2-2-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
