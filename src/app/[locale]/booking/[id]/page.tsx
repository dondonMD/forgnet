import Link from "next/link";
import { bookingLookup } from "@/lib/demo-data";
import { findProvider } from "@/lib/marketplace";
import { getLiveBooking } from "@/lib/session";
import { formatCurrency, sentenceCase } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/types";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const liveBooking = await getLiveBooking();
  const booking = (liveBooking && liveBooking.id === id ? liveBooking : null) ?? bookingLookup[id];

  if (!booking) {
    return (
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <Card className="panel-muted">
          <CardContent className="space-y-4 p-8 text-center">
            <div className="text-2xl font-semibold text-slate-950">No booking found for this demo session</div>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              Accept a quote first to open the milestone-based booking flow.
            </p>
            <Link
              href={`/${locale}/request`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand-600)] px-5 text-sm font-semibold text-white"
            >
              Start buyer flow
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const provider = findProvider(booking.providerId);
  const completed = booking.milestones.filter((milestone) => milestone.state === "COMPLETE").length;
  const active = booking.milestones.find((milestone) => milestone.state === "ACTIVE");
  const progress = Math.round((completed / booking.milestones.length) * 100);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_0.9fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="accent">Booking confirmed</Badge>
            <Badge variant="success">{sentenceCase(booking.status)}</Badge>
          </div>
          <CardTitle className="text-3xl">{provider.companyName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Milestone progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <div className="panel-muted rounded-[28px] border border-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">Flow status</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The booking has been confirmed and is now tracked through an audit-friendly milestone
              timeline that buyer, provider, and operations can all reference during the demo.
            </p>
          </div>
          <div className="grid gap-4">
            {booking.milestones.map((milestone) => (
              <div key={milestone.id} className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-base font-semibold text-slate-950">{milestone.label}</div>
                  <Badge
                    variant={
                      milestone.state === "COMPLETE"
                        ? "success"
                        : milestone.state === "ACTIVE"
                          ? "accent"
                          : "default"
                    }
                  >
                    {sentenceCase(milestone.state)}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="space-y-5">
        <Card className="bg-[var(--navy-900)] text-white">
          <CardHeader>
            <CardTitle>Governance trail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-white/72">
            <div>Contract terms acknowledged: {booking.contractAcknowledged ? "Yes" : "No"}</div>
            <div>Issue escalation placeholder: {booking.issueFlagged ? "Open" : "None"}</div>
            <div>Milestone value: {formatCurrency(booking.milestoneValue)}</div>
            <div>Active milestone: {active?.label ?? "Completed"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What is mocked</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div>Milestone-based payout language is illustrative only.</div>
            <div>Disputes, signoff, and payment release are placeholder workflow rails.</div>
            <div>Operational updates are designed to feel credible, not legally final.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
