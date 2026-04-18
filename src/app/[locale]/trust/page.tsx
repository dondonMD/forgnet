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
        title="Industrial governance and operational oversight."
        description="ForgeNet implements structured verification rails, audit-friendly records, and milestone oversight to ensure high-integrity industrial exchange workflows."
      />
      <div className="grid gap-6">
        <Card className="bg-[var(--navy-900)] text-white">
          <CardHeader>
            <CardTitle>Platform Governance Standards</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-7 text-white/72 sm:grid-cols-2">
            {complianceRails.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-400)]" />
                {item}
              </div>
            ))}
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
            <div className="text-sm font-semibold text-slate-900">Transaction integrity</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Milestone payment schedules are structured to align with industrial execution and
              delivery checkpoints.
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
