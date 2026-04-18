import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestForm } from "@/components/forms/request-form";
import { SectionHeading } from "@/components/section-heading";
import type { Locale } from "@/lib/types";

export default async function RequestPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Buyer flow"
          title="Submit a requirement and let ForgeNet rank the right capacity."
          description="This form captures the commercial and operational context needed for believable matching. Inputs are validated on the client and server for a production-style demo posture."
        />
        <Card>
          <CardContent className="p-6">
            <RequestForm locale={locale} />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="bg-[var(--navy-900)] text-white">
          <CardHeader>
            <CardTitle>What gets scored</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-white/75">
            <div>Category fit</div>
            <div>Price fit against target budget</div>
            <div>Lead time against deadline</div>
            <div>Proximity to preferred location</div>
            <div>Verification state and provider rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Demo-safe rails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div>Mocked identity and verification checks</div>
            <div>No live payments or escrow</div>
            <div>Cookie-backed demo session flow for Vercel compatibility</div>
            <div>Milestone and audit concepts represented without legal overclaiming</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
