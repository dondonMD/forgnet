"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BookingOverviewChart({
  data,
}: {
  data: { stage: string; count: number }[];
}) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
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
