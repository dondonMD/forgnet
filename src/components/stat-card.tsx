import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <Card className="bg-white/90 shadow-[0_16px_54px_-34px_rgba(8,18,37,0.52)]">
      <CardContent className="space-y-4 p-6">
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <div className="flex items-end justify-between gap-4">
          <div className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">{value}</div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
