"use client";

import { useEffect, useState } from "react";
import {
  RECENT_ACTIVITY_EVENT,
  formatActivityTime,
  getRecentActivities,
  type RecentActivityItem,
} from "@/lib/recentActivity";

export default function RecentActivityPanel({
  limit = 3,
  className = "",
}: {
  limit?: number;
  className?: string;
} = {}) {
  const [items, setItems] = useState<RecentActivityItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(getRecentActivities());
    sync();
    window.addEventListener(RECENT_ACTIVITY_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(RECENT_ACTIVITY_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const visible = items.slice(0, limit);

  return (
    <div
      className={`rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
            Live Feed
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#0f172a]">Recent Activity</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff6ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
          <span className="live-pulse h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
          Updated
        </span>
      </div>
      <div className="relative space-y-0 pl-1">
        <div
          className="absolute bottom-3 left-[7px] top-3 w-px bg-[#e2e8f0]"
          aria-hidden="true"
        />
        {visible.length === 0 ? (
          <p className="py-2 text-sm text-[#64748b]">No recent activity yet.</p>
        ) : (
          visible.map((item, index) => (
            <ActivityRow
              key={item.id}
              dotColor={item.dotColor}
              title={item.title}
              subtitle={item.subtitle}
              amount={item.amount}
              time={formatActivityTime(item.createdAt) || item.timeLabel}
              amountClass={item.amountClass}
              isLast={index === visible.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ActivityRow({
  dotColor,
  title,
  subtitle,
  amount,
  time,
  amountClass = "text-[#0f172a]",
  isLast,
}: {
  dotColor: string;
  title: string;
  subtitle: string;
  amount: string;
  time: string;
  amountClass?: string;
  isLast?: boolean;
}) {
  return (
    <div className={`relative flex gap-4 pb-6 ${isLast ? "pb-0" : ""}`}>
      <span
        className={`relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-white ${dotColor}`}
      />
      <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-[#0f172a]">{title}</p>
          <p className="mt-0.5 text-sm text-[#64748b]">{subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className={`text-sm font-bold ${amountClass}`}>{amount}</p>
          <p className="mt-0.5 text-xs text-[#94a3b8]">{time}</p>
        </div>
      </div>
    </div>
  );
}
