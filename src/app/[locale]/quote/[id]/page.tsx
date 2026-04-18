import Link from "next/link";
import { format } from "date-fns";
import { CalendarClock, CircleDollarSign, Download, Timer } from "lucide-react";
import { acceptQuoteAction } from "@/app/[locale]/actions";
import { demoQuotes, quoteLookup } from "@/lib/demo-data";
import { findListing, findProvider } from "@/lib/marketplace";
import { getLiveQuote } from "@/lib/session";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/types";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const liveQuote = await getLiveQuote();
  const quote = (liveQuote && liveQuote.id === id ? liveQuote : null) ?? quoteLookup[id] ?? demoQuotes[0];
  const provider = findProvider(quote.providerId);
  const listing = findListing(quote.listingId);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="accent">Quote ready</Badge>
            <Badge variant="success">{provider.verificationBadgeLabel}</Badge>
          </div>
          <CardTitle className="text-3xl">{provider.companyName}</CardTitle>
          <CardDescription>{listing.title}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CircleDollarSign className="h-4 w-4" />
                Quote price
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">{formatCurrency(quote.price)}</div>
            </div>
            <div className="rounded-[24px] bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Timer className="h-4 w-4" />
                Lead time
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">{quote.leadTimeDays} days</div>
            </div>
            <div className="rounded-[24px] bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarClock className="h-4 w-4" />
                Valid until
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">
                {format(new Date(quote.validUntil), "dd MMM")}
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
            <div className="text-sm font-semibold text-slate-900">Why ForgeNet ranked this supplier highly</div>
            <p className="mt-2 text-sm leading-7 text-slate-600">{quote.matchExplanation}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">Operational notes</div>
            <p className="mt-2 text-sm leading-7 text-slate-600">{quote.notes}</p>
            <div className="mt-4 text-sm text-slate-500">{listing.complianceSummary}</div>
          </div>
          <div className="panel-muted rounded-[28px] border border-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">Platform assurance</div>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[var(--brand-600)]" />
                Verified capacity alignment
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[var(--brand-600)]" />
                Audit-ready records
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <form action={acceptQuoteAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="quoteId" value={quote.id} />
              <Button type="submit" size="lg">
                Accept quote and confirm booking
              </Button>
            </form>
            <Button asChild variant="secondary" size="lg">
              <Link href={`/api/quote/${quote.id}/summary`}>
                <Download className="mr-2 h-4 w-4" />
                Download summary
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

  <div className="space-y-5">
    <Card className="bg-[var(--navy-900)] text-white">
      <CardHeader>
        <CardTitle>Execution lifecycle</CardTitle>
        <CardDescription className="text-white/70">
          Standardized milestones for regional industrial exchange.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-7 text-white/72">
        <div className="flex items-center justify-between">
          <span>Requirement captured</span>
          <Badge variant="outline" className="text-white/60 border-white/20">Done</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Provider selection</span>
          <Badge variant="outline" className="text-white/60 border-white/20">Active</Badge>
        </div>
        <div className="flex items-center justify-between opacity-50">
          <span>Production scheduled</span>
          <span className="text-xs">Pending</span>
        </div>
        <div className="flex items-center justify-between opacity-50">
          <span>In-progress monitoring</span>
          <span className="text-xs">Pending</span>
        </div>
        <div className="flex items-center justify-between opacity-50">
          <span>Logistics verification</span>
          <span className="text-xs">Pending</span>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Governance parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">Verification signal</div>
          <p>Provider credentials and facility inspection records current.</p>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">Audit capability</div>
          <p>Full transaction trail logged for regional operations oversight.</p>
        </div>
      </CardContent>
    </Card>
  </div>
    </div>
  );
}
