export type RecentActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  timeLabel: string;
  amountClass?: string;
  dotColor: string;
  createdAt: number;
};

export const RECENT_ACTIVITY_STORAGE_KEY = "nxance-recent-activity";
export const RECENT_ACTIVITY_EVENT = "nxance-recent-activity-updated";

const DEFAULT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: "default-nvda",
    title: "Bought NVIDIA Corp (NVDA)",
    subtitle: "Successfully executed market order for 12 shares.",
    amount: "$1,482.00",
    timeLabel: "2h ago",
    dotColor: "bg-[#2563eb]",
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: "default-aapl",
    title: "Dividend Received: AAPL",
    subtitle: "Quarterly dividend credited to your primary account.",
    amount: "+$42.50",
    timeLabel: "Yesterday",
    amountClass: "text-[#2563eb]",
    dotColor: "bg-[#7c3aed]",
    createdAt: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    id: "default-rebalance",
    title: "Rebalanced Portfolio",
    subtitle: "Nxance AI automated rebalancing for Risk Level 4.",
    amount: "3 assets",
    timeLabel: "3 days ago",
    dotColor: "bg-[#94a3b8]",
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
];

function notifyActivityUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(RECENT_ACTIVITY_EVENT));
}

export function getRecentActivities(): RecentActivityItem[] {
  if (typeof window === "undefined") return DEFAULT_ACTIVITIES;

  try {
    const raw = window.localStorage.getItem(RECENT_ACTIVITY_STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(
        RECENT_ACTIVITY_STORAGE_KEY,
        JSON.stringify(DEFAULT_ACTIVITIES),
      );
      return DEFAULT_ACTIVITIES;
    }
    const parsed = JSON.parse(raw) as RecentActivityItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_ACTIVITIES;
    return parsed;
  } catch {
    return DEFAULT_ACTIVITIES;
  }
}

export function formatActivityTime(createdAt: number) {
  const diffMs = Date.now() - createdAt;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function pushRecentActivity(
  item: Omit<RecentActivityItem, "createdAt" | "timeLabel"> & {
    id?: string;
    timeLabel?: string;
  },
) {
  if (typeof window === "undefined") return;

  const nextItem: RecentActivityItem = {
    ...item,
    id: item.id ?? `activity-${Date.now()}`,
    createdAt: Date.now(),
    timeLabel: item.timeLabel ?? "Just now",
  };

  const existing = getRecentActivities().filter((entry) => entry.id !== nextItem.id);
  const next = [nextItem, ...existing].slice(0, 8);
  window.localStorage.setItem(RECENT_ACTIVITY_STORAGE_KEY, JSON.stringify(next));
  notifyActivityUpdated();
}

export function recordPortfolioReportView(kind: "health-check" | "construction") {
  if (kind === "health-check") {
    pushRecentActivity({
      id: `portfolio-health-${Date.now()}`,
      title: "Viewed Health Check Report",
      subtitle: "Opened full portfolio health analysis from Portfolio.",
      amount: "Report",
      amountClass: "text-[#2563eb]",
      dotColor: "bg-[#2563eb]",
    });
    return;
  }

  pushRecentActivity({
    id: `portfolio-construction-${Date.now()}`,
    title: "Viewed Construction Report",
    subtitle: "Opened Dream Home construction blueprint from Portfolio.",
    amount: "Report",
    amountClass: "text-[#7c3aed]",
    dotColor: "bg-[#7c3aed]",
  });
}
