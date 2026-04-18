import { Bell, Clock3, Gauge, Layers3, ShieldCheck } from "lucide-react";
import {
  demoJobRequests,
  demoNotifications,
  providerCategoryBreakdown,
  providerUtilizationSeries,
} from "@/lib/demo-data";
import { requireRole } from "@/lib/session";
import { formatPercent } from "@/lib/utils";
import { CategoryBreakdownChart } from "@/components/charts/category-breakdown-chart";
import { ProviderUtilizationChart } from "@/components/charts/provider-utilization-chart";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/types";

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  await requireRole("provider", locale);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-14">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open requests" value="18" trend="+4 this week" />
        <StatCard label="Active jobs" value="7" trend="+2 vs last week" />
        <StatCard label="Available capacity" value="28%" trend="room to sell" />
        <StatCard label="Utilization" value={formatPercent(72)} trend="+8%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Utilization vs matched demand</CardTitle>
          </CardHeader>
          <CardContent>
            <ProviderUtilizationChart data={providerUtilizationSeries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Category mix</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryBreakdownChart data={providerCategoryBreakdown} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Open matched requests</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {demoJobRequests.slice(0, 4).map((request) => (
              <div key={request.id} className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-slate-950">{request.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{request.preferredLocation}</div>
                  </div>
                  <Badge variant="accent">{request.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-[var(--brand-600)]" />
                    Quantity: {request.quantity}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[var(--brand-600)]" />
                    Deadline sensitivity tracked
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="bg-[var(--navy-900)] text-white">
            <CardHeader>
              <CardTitle>Performance summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-white/72">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Verification posture remains current
              </div>
              <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4" />
                Capacity updates synced to the marketplace
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Median response time: 3.4 hours
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <Bell className="mt-0.5 h-4 w-4 text-[var(--brand-600)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-950">{notification.title}</div>
                    <div className="text-sm leading-6 text-slate-600">{notification.body}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
