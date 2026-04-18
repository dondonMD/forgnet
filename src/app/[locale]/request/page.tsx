import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestForm } from "@/components/forms/request-form";
import { SectionHeading } from "@/components/section-heading";
import type { Locale } from "@/lib/types";

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    category?: string;
    location?: string;
    title?: string;
  }>;
}) {
  const { locale } = await params;
  const { category, location, title } = await searchParams;

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Buyer flow"
          title="Submit a requirement and let ForgeNet rank the right capacity."
          description="This form captures the commercial and operational context needed for accurate ranking. Inputs are validated for high-integrity production lifecycles."
        />
        <Card>
          <CardContent className="p-6">
            <RequestForm
              locale={locale}
              initialValues={{
                category:
                  category === "FABRICATION" ||
                  category === "PACKAGING" ||
                  category === "WAREHOUSING" ||
                  category === "COLD_STORAGE" ||
                  category === "LOGISTICS"
                    ? category
                    : undefined,
                preferredLocation: location,
                title,
              }}
            />
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
            <CardTitle>Integrity and Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div>Verified identity and facility inspection checkpoints</div>
            <div>Secure regional transaction rails</div>
            <div>Real-time status synchronization for marketplace capacity</div>
            <div>Milestone-based governance and automated audit trails</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
