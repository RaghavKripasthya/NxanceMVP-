import type { Metadata } from "next";
import PremiumUpgradeMain from "@/components/dashboard/PremiumUpgradeMain";

export const metadata: Metadata = {
  title: "Upgrade to Premium | Nxance AI",
  description: "Elevate your wealth intelligence with Nxance Premium",
};

export default function UpgradePage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <PremiumUpgradeMain />
    </main>
  );
}
