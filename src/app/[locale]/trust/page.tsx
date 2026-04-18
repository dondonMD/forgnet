import { complianceRails, demoVerificationRecords } from "@/lib/demo-data";
import { sentenceCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

export default function TrustPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
      <SectionHeading
        eyebrow="Trust and compliance"
        title="A realistic governance posture for industrial exchange workflows."
        description="ForgeNet is framed around verification rails, audit-friendly records, and milestone oversight. It does not claim legal certification, payment licensing, or real-world compliance approval."
      />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="bg-[var(--navy-900)] text-white">
          <CardHeader>
            <CardTitle>What ForgeNet does claim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-white/72">
            {complianceRails.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What ForgeNet does not claim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div>No actual legal certification or regulatory approval.</div>
            <div>No live escrow, payment custody, or KYC/AML execution.</div>
            <div>No final legal dispute resolution or enforceable marketplace contracting.</div>
          </CardContent>
        </Card>
      </div>
      <Card className="panel-muted">
        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Verification model</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Providers move through pending, reviewing, and verified states with visible evidence
              checkpoints.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Operational records</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Bookings, milestone states, and moderation actions are shown as audit-friendly records.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Payment language</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Milestone payment language is illustrative only and does not imply regulated custody.
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        {demoVerificationRecords.map((record) => (
          <Card key={record.id}>
            <CardContent className="space-y-3 p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-base font-semibold text-slate-950">{record.title}</div>
                <Badge
                  variant={
                    record.status === "VERIFIED"
                      ? "success"
                      : record.status === "REVIEWING"
                        ? "accent"
                        : "warning"
                  }
                >
                  {sentenceCase(record.status)}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-slate-600">{record.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
