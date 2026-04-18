"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProviderUtilizationChart({
  data,
}: {
  data: { month: string; utilization: number; demand: number }[];
}) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="utilization" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="demand" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#64748b" />
          <YAxis axisLine={false} tickLine={false} stroke="#64748b" />
          <Tooltip />
          <Area type="monotone" dataKey="utilization" stroke="#0f766e" fill="url(#utilization)" strokeWidth={2} />
          <Area type="monotone" dataKey="demand" stroke="#1d4ed8" fill="url(#demand)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
