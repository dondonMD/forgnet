"use client";

import { useSyncExternalStore } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0f766e", "#1d4ed8", "#0f172a", "#14b8a6", "#64748b"];

function subscribe() {
  return () => {};
}

export function CategoryBreakdownChart({ data }: { data: { name: string; value: number }[] }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <div className="h-[260px] min-h-[260px] w-full animate-pulse rounded-[24px] bg-slate-100" />;
  }

  return (
    <div className="h-[260px] min-h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
