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
            <CardTitle>Booking model</CardTitle>
            <CardDescription className="text-white/70">
              Milestone-based and trust-enhanced, with payment language clearly mocked.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-white/72">
            <div>Request submitted</div>
            <div>Provider confirmed</div>
            <div>Production scheduled</div>
            <div>In progress</div>
            <div>Ready for dispatch</div>
            <div>Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Important demo posture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div>No live payments are processed.</div>
            <div>Escrow and dispute handling are mocked as governance rails.</div>
            <div>Verification signals indicate workflow readiness, not legal certification.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
