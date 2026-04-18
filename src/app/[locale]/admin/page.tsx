import { CheckCircle2, Shield, ShieldAlert } from "lucide-react";
import {
  adminBookingOverview,
  complianceRails,
  demoAuditLogs,
  moderationQueue,
} from "@/lib/demo-data";
import { requireRole } from "@/lib/session";
import { sentenceCase } from "@/lib/utils";
import { BookingOverviewChart } from "@/components/charts/booking-overview-chart";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/types";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  await requireRole("admin", locale);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-14">
      <Card className="panel-muted">
        <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Platform Control Surface</div>
            <p className="text-sm leading-6 text-slate-600">
              Administrative oversight for provider verification, listing moderation, and 
              regional booking management.
            </p>
          </div>
          <Badge variant="warning">1 active issue</Badge>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending verifications" value="3" trend="-1 today" />
        <StatCard label="Moderation queue" value="3" trend="stable" />
        <StatCard label="Active bookings" value="3" trend="all visible" />
        <StatCard label="Incidents" value="1" trend="contained" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Booking overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingOverviewChart data={adminBookingOverview} />
          </CardContent>
        </Card>
        <Card className="bg-[var(--navy-900)] text-white">
          <CardHeader>
            <CardTitle>Trust and compliance overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-white/72">
            {complianceRails.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Listing moderation queue</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {moderationQueue.map((item) => (
              <div key={item.id} className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-950">{item.provider}</div>
                    <div className="mt-1 text-sm text-slate-600">{item.issue}</div>
                  </div>
                  <Badge variant={item.risk === "Low" ? "success" : "warning"}>{item.risk} risk</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System integrity logs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {demoAuditLogs.map((log) => (
              <div key={log.id} className="rounded-[28px] bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Shield className="h-4 w-4 text-[var(--brand-600)]" />
                  {sentenceCase(log.action)}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{log.detail}</div>
              </div>
            ))}
            <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="h-4 w-4" />
                Dispute resolution pipeline
              </div>
              <p className="mt-2">
                Active dispute between provider and buyer regarding milestone fulfillment. 
                Platform arbitration active.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
