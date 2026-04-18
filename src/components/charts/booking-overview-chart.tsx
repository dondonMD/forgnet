"use client";

import { useSyncExternalStore } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function subscribe() {
  return () => {};
}

export function BookingOverviewChart({
  data,
}: {
  data: { stage: string; count: number }[];
}) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <div className="h-[260px] min-h-[260px] w-full animate-pulse rounded-[24px] bg-slate-100" />;
  }

  return (
    <div className="h-[260px] min-h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="stage" axisLine={false} tickLine={false} stroke="#64748b" />
          <YAxis axisLine={false} tickLine={false} stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="count" fill="#0f766e" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
