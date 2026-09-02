import type { Metadata } from "next";
import CompleteProfileForm from "@/components/CompleteProfileForm";

export const metadata: Metadata = {
  title: "Complete Your Profile | Nxance AI",
  description: "Complete your profile to get started with Nxance AI",
};

export default function CompleteProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eef0f4]">
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <CompleteProfileForm />
      </main>

      <footer className="pb-8 text-center">
        <p className="text-xs text-[#94a3b8] sm:text-sm">
          © 2024 Nxance AI. SEBI Registered Investment Advisor.
        </p>
      </footer>
    </div>
  );
}
