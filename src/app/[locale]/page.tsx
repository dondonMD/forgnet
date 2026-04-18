import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import {
  categories,
  complianceRails,
  kpiSnapshot,
} from "@/lib/demo-data";
import { getMessages } from "@/lib/messages";
import { getRole } from "@/lib/session";
import type { Locale } from "@/lib/types";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale);
  const role = await getRole();

  return (
    <div className="pb-20">
      <section className="hero-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,37,0.03),rgba(8,18,37,0))]" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <FadeIn className="space-y-8">
            <Badge variant="accent" className="w-fit">
              Industrial capacity exchange
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                The marketplace for production itself.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                ForgeNet helps SMEs discover verified industrial capacity across fabrication,
                packaging, warehousing, cold storage, and return-load logistics, then move from
                requirement to booked execution with milestone oversight.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href={`/${locale}/request`}>
                  {t.common.getStarted}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={`/${locale}/marketplace`}>{t.nav.marketplace}</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Verified providers" value={`${kpiSnapshot.verifiedProviders}`} trend="+21% QoQ" />
              <StatCard label="Average match score" value={`${kpiSnapshot.averageMatchScore}%`} trend="+6 pts" />
              <StatCard label="On-time demo jobs" value={`${kpiSnapshot.onTimeRate}%`} trend="+9%" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="mesh-panel border-slate-200/70 bg-[rgba(255,255,255,0.82)]">
              <CardContent className="space-y-6 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-500">Current demo role</div>
                    <div className="text-2xl font-semibold text-slate-950">{role}</div>
                  </div>
                  <div className="rounded-full bg-[var(--navy-900)] px-4 py-2 text-xs font-semibold text-white">
                    Enterprise-ready posture
                  </div>
                </div>
                <div className="rounded-[28px] bg-[var(--navy-900)] p-6 text-white shadow-xl">
                  <div className="mb-4 flex items-center gap-2 text-sm text-white/70">
                    <Workflow className="h-4 w-4" />
                    Demo flow
                  </div>
                  <div className="grid gap-3">
                    {[
                      "Buyer posts need",
                      "ForgeNet ranks verified capacity",
                      "Provider quote accepted",
                      "Milestones tracked through completion",
                    ].map((step, index) => (
                      <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
                          0{index + 1}
                        </div>
                        <div className="text-sm">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white/90 p-5">
                    <div className="text-sm text-slate-500">Supply-side moat</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">Verified industrial providers</div>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white/90 p-5">
                    <div className="text-sm text-slate-500">Demand-side moat</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">Structured capacity matching</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
        <SectionHeading
          eyebrow="Why now"
          title="Idle industrial capacity is fragmented. SMEs still buy through noise."
          description="ForgeNet reframes the market from selling products to booking underutilized production, processing, storage, and logistics capacity with decision-grade trust signals."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Industrial supply is under-monetized",
              description: "Factories, workshops, warehouses, and fleets carry idle windows that rarely reach qualified SME demand in structured form.",
            },
            {
              title: "SMEs buy on weak signals",
              description: "Finding reliable capacity still depends on calls, referrals, and fragmented spreadsheets rather than comparable operational data.",
            },
            {
              title: "Trust rails are missing",
              description: "Verification, document readiness, milestone visibility, and audit-friendly records remain inconsistent across the value chain.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
        <SectionHeading
          eyebrow="How it works"
          title="One buyer flow. One provider workflow. One operational control layer."
          description="The MVP focuses on a single believable transaction path: requirement intake, ranked matching, quote selection, booking, and milestone oversight."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {[
            ["Requirement intake", "Buyer posts volume, budget, location, deadline, and compliance needs."],
            ["Ranked matching", "ForgeNet scores provider listings by category fit, price, lead time, proximity, verification, and rating."],
            ["Quote and booking", "Buyer requests a quote, accepts the offer, and confirms a milestone-based booking."],
            ["Operational visibility", "Provider and admin views expose utilization, moderation, and trust workflow signals."],
          ].map(([title, description]) => (
            <Card key={title}>
              <CardContent className="space-y-3 p-6">
                <div className="text-sm font-semibold text-[var(--brand-700)]">{title}</div>
                <div className="text-sm leading-6 text-slate-600">{description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
        <SectionHeading
          eyebrow="Capacity categories"
          title="Narrow pilot scope with regionally credible capacity types."
          description="Designed for Zimbabwe-relevant industrial flows today, with room to scale regionally without changing the core operating model."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-5">
          {Object.values(categories).map((category) => (
            <Card key={category}>
              <CardContent className="space-y-3 p-6">
                <div className="text-sm font-semibold text-slate-950">{category}</div>
                <div className="text-sm leading-6 text-slate-600">
                  Structured listings, believable lead times, and operational fit instead of generic vendor cards.
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
        <SectionHeading
          eyebrow="Trust rails"
          title="Enterprise-ready governance posture without pretending to be legally certified."
          description="The MVP frames trust honestly: verification workflows, audit-friendly records, milestone signoff, and controlled provider onboarding."
        />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[var(--navy-900)] text-white">
            <CardContent className="space-y-5 p-8">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <ShieldCheck className="h-4 w-4" />
                Governance posture
              </div>
              <h3 className="text-3xl font-semibold">Audit-friendly, not overclaimed.</h3>
              <p className="text-sm leading-7 text-white/70">
                ForgeNet uses verification rails and document checkpoints to create confidence
                without claiming formal compliance certification or regulated financial custody.
              </p>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {complianceRails.map((rail) => (
              <Card key={rail}>
                <CardContent className="flex items-start gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--brand-600)]" />
                  <div className="text-sm leading-6 text-slate-700">{rail}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
        <SectionHeading
          eyebrow="For both sides"
          title="A better operating surface for providers and SMEs."
          description="The buyer side reduces discovery friction. The provider side monetizes idle windows with structured, trust-enhanced demand."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>For SMEs</CardTitle>
              <CardDescription>
                Faster supplier discovery, more comparable quotes, and clearer operational confidence.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Find verified capacity, not generic suppliers.",
                "Understand why a provider was ranked.",
                "Move from quote to booking without operational ambiguity.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-[var(--gold-500)]" />
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For providers</CardTitle>
              <CardDescription>
                A cleaner path to monetize spare capacity with trust and documentation rails baked in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Expose available capacity in structured form.",
                "Receive demand matched to real operational fit.",
                "Present verification status and service-level readiness credibly.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-[var(--gold-500)]" />
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,var(--navy-900),#12324d)] text-white">
          <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="text-sm uppercase tracking-[0.24em] text-white/60">Demo-ready MVP</div>
              <h3 className="text-3xl font-semibold">Show the full capacity exchange story in one run.</h3>
              <p className="text-sm leading-7 text-white/72">
                Launch the buyer flow, inspect the marketplace, and switch roles to review the
                provider and operations surfaces using seeded Zimbabwe-relevant capacity data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/login`}>Switch demo role</Link>
              </Button>
              <Button asChild size="lg">
                <Link href={`/${locale}/request`}>Start buyer flow</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
