import { format } from "date-fns";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { categories } from "@/lib/demo-data";
import { findListing, findProvider, findRequest, rankMatches } from "@/lib/marketplace";
import { getLiveRequest } from "@/lib/session";
import { formatCurrency } from "@/lib/utils";
import { requestQuoteAction } from "@/app/[locale]/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/types";

export default async function MatchesPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const liveRequest = await getLiveRequest();
  const request = liveRequest?.id === id ? liveRequest : findRequest(id);

  if (!request) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <Card>
          <CardContent className="space-y-4 p-8 text-center text-slate-600">
            <p>No active request found. Submit a new requirement to generate capacity matches.</p>
            <Button asChild>
              <Link href={`/${locale}/request`}>Create a requirement</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const matches = rankMatches(request);

  if (matches.length === 0) {
    return (
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <Card className="panel-muted">
          <CardContent className="space-y-4 p-8 text-center">
            <div className="text-2xl font-semibold text-slate-950">No direct capacity matches yet</div>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              Try widening the location, increasing the lead-time window, or reviewing trust rails
              before posting a broader requirement.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href={`/${locale}/request`}>Edit requirement</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/${locale}/trust`}>Review trust rails</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-14">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-[var(--navy-900)] text-white">
          <CardHeader>
            <CardTitle>Requirement snapshot</CardTitle>
            <CardDescription className="text-white/70">
              Buyer need translated into a ranked capacity search.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-white/78">
            <div>
              <div className="text-white/55">Title</div>
              <div className="font-medium text-white">{request.title}</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-white/55">Category</div>
                <div>{categories[request.category]}</div>
              </div>
              <div>
                <div className="text-white/55">Location</div>
                <div>{request.preferredLocation}</div>
              </div>
              <div>
                <div className="text-white/55">Budget</div>
                <div>
                  {formatCurrency(request.budgetMin)} - {formatCurrency(request.budgetMax)}
                </div>
              </div>
              <div>
                <div className="text-white/55">Deadline</div>
                <div>{format(new Date(request.deadline), "dd MMM yyyy")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Why these matches rank highly</CardTitle>
            <CardDescription>
              The scoring engine favors direct category fit, price alignment, achievable lead time,
              preferred geography, verification status, and provider reputation.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              "Category fit",
              "Price fit",
              "Lead time",
              "Proximity",
              "Verification",
              "Provider rating",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="panel-muted">
        <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Procurement Workflow</div>
            <p className="text-sm leading-6 text-slate-600">
              Select a ranked provider to request an official quote. Upon acceptance, the system
              will initialize the milestone-based booking and oversight surface.
            </p>
          </div>
          <Badge variant="accent">{matches.length} ranked options</Badge>
        </CardContent>
      </Card>

      <div className="grid gap-5">
        {matches.map((match, index) => {
          const listing = findListing(match.listingId);
          const provider = findProvider(match.providerId);

          return (
            <Card key={match.listingId}>
              <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.2fr_0.8fr_0.3fr] lg:items-center">
                <div className="space-y-2">
                  <Badge variant="accent">Rank #{index + 1}</Badge>
                  <div className="text-4xl font-semibold tracking-tight text-slate-950">{match.score}</div>
                  <div className="text-sm text-slate-500">Match score</div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-slate-950">{provider.companyName}</h3>
                    {listing.verified ? <Badge variant="success">Verified</Badge> : <Badge>Reviewing</Badge>}
                    <Badge>{categories[listing.category]}</Badge>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{provider.summary}</p>
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="h-4 w-4" />
                        Location
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">{listing.city}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock3 className="h-4 w-4" />
                        Lead time
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">{match.leadTimeDays} days</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      <div className="text-slate-500">Estimated quote</div>
                      <div className="mt-1 font-semibold text-slate-900">{formatCurrency(match.estimatedPrice)}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        Rating
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">{provider.rating.toFixed(1)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-[var(--brand-600)]" />
                    {match.explanation}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-[24px] bg-slate-50 p-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-600)]" />
                      Why it ranked
                    </div>
                    <p className="mt-2 leading-6">{match.explanation}</p>
                  </div>
                  <form action={requestQuoteAction}>
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="requestId" value={request.id} />
                    <input type="hidden" name="listingId" value={listing.id} />
                    <Button type="submit" className="w-full">
                      Request quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
