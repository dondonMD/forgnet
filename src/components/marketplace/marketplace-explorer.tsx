"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { categories, cities } from "@/lib/demo-data";
import { getMessages } from "@/lib/messages";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CapacityCategory, Locale } from "@/lib/types";

type ListingCard = {
  id: string;
  title: string;
  city: string;
  availableCapacity: string;
  leadTimeDays: number;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  verified: boolean;
  provider: {
    companyName: string;
    rating: number;
  };
  category: CapacityCategory;
};

export function MarketplaceExplorer({
  locale,
  listings,
}: {
  locale: Locale;
  listings: ListingCard[];
}) {
  const t = getMessages(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CapacityCategory | "ALL">("ALL");
  const [city, setCity] = useState<string>("ALL");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [fastOnly, setFastOnly] = useState(false);
  const [priceCap, setPriceCap] = useState(10000);

  const resetFilters = () => {
    setQuery("");
    setCategory("ALL");
    setCity("ALL");
    setVerifiedOnly(false);
    setFastOnly(false);
    setPriceCap(10000);
  };

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      const matchesQuery =
        query.length === 0 ||
        [listing.title, listing.provider.companyName, listing.city]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesCategory = category === "ALL" || listing.category === category;
      const matchesCity = city === "ALL" || listing.city === city;
      const matchesVerified = !verifiedOnly || listing.verified;
      const matchesLeadTime = !fastOnly || listing.leadTimeDays <= 5;
      const matchesPrice = listing.estimatedPriceMin <= priceCap;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesCity &&
        matchesVerified &&
        matchesLeadTime &&
        matchesPrice
      );
    });
  }, [category, city, fastOnly, listings, priceCap, query, verifiedOnly]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/90">
          <CardContent className="space-y-2 p-5">
            <div className="text-sm text-slate-500">Visible listings</div>
            <div className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">{filtered.length}</div>
            <div className="text-sm text-slate-600">Filtered by geography, speed, price, and trust posture.</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardContent className="space-y-2 p-5">
            <div className="text-sm text-slate-500">Fast-turnaround options</div>
            <div className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              {filtered.filter((listing) => listing.leadTimeDays <= 5).length}
            </div>
            <div className="text-sm text-slate-600">Providers that can respond within five days or less.</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--navy-900)] text-white">
          <CardContent className="space-y-3 p-5">
            <div className="text-sm text-white/60">Buyer flow</div>
            <div className="text-lg font-semibold">Prefer a ranked shortlist over manual browsing?</div>
            <Button asChild variant="outline" size="sm">
              <Link href={`/${locale}/request`}>{t.common.backToFlow}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/90">
        <CardContent className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-6">
          <div className="relative xl:col-span-2">
            <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search providers, cities, or capacity types"
              className="pl-10"
            />
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as CapacityCategory | "ALL")}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
          >
            <option value="ALL">All categories</option>
            {Object.entries(categories).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
          >
            <option value="ALL">All locations</option>
            {cities.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700">
            <input type="checkbox" checked={verifiedOnly} onChange={() => setVerifiedOnly((value) => !value)} />
            Verified only
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700">
            <input type="checkbox" checked={fastOnly} onChange={() => setFastOnly((value) => !value)} />
            Turnaround 5 days or less
          </label>
          <div className="xl:col-span-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Price ceiling: {formatCurrency(priceCap)}
            </div>
            <div className="flex w-full max-w-xl items-center gap-4">
              <input
                type="range"
                min={1500}
                max={10000}
                step={100}
                value={priceCap}
                onChange={(event) => setPriceCap(Number(event.target.value))}
                className="w-full accent-[var(--brand-600)]"
              />
              <Button type="button" variant="secondary" size="sm" onClick={resetFilters}>
                {t.common.reset}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <Card className="panel-muted">
          <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-700)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <div className="text-xl font-semibold text-slate-950">{t.common.noResults}</div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Widen the city, budget, or turnaround settings to reveal more industrial capacity.
              </p>
            </div>
            <Button type="button" onClick={resetFilters}>
              {t.common.reset}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((listing) => (
          <Card key={listing.id} className="h-full">
            <CardContent className="flex h-full flex-col gap-5 p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-slate-950">{listing.provider.companyName}</div>
                  <div className="text-sm text-slate-500">{listing.title}</div>
                </div>
                {listing.verified ? <Badge variant="success">{t.common.verified}</Badge> : <Badge>Reviewing</Badge>}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent">{categories[listing.category]}</Badge>
                <Badge>{listing.city}</Badge>
                <Badge>{listing.availableCapacity}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Lead time</div>
                  <div className="font-semibold text-slate-900">{listing.leadTimeDays} days</div>
                </div>
                <div>
                  <div className="text-slate-500">Estimated price</div>
                  <div className="font-semibold text-slate-900">
                    {formatCurrency(listing.estimatedPriceMin)} - {formatCurrency(listing.estimatedPriceMax)}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Suited to {categories[listing.category].toLowerCase()} work in {listing.city}, with visible capacity,
                published lead times, and an investor-demo-ready trust signal layer.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {listing.provider.rating.toFixed(1)} provider rating
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <Button asChild variant="secondary">
                  <Link
                    href={`/${locale}/request?category=${listing.category}&location=${encodeURIComponent(
                      listing.city,
                    )}&title=${encodeURIComponent(listing.title)}`}
                  >
                    Start with this fit
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/${locale}/trust`}>Review trust rails</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
