import { differenceInCalendarDays } from "date-fns";
import {
  demoProviders,
  jobRequestLookup,
  listingLookup,
  providerLookup,
} from "./demo-data";
import type { CapacityListing, JobRequest, MatchResult, ProviderProfile, Quote } from "./types";
import { clamp } from "./utils";

export function getAllListings() {
  return demoProviders.flatMap((provider) =>
    provider.listings.map((listing) => ({
      ...listing,
      provider,
      estimatedMidPrice: Math.round((listing.estimatedPriceMin + listing.estimatedPriceMax) / 2),
    })),
  );
}

function calculateMatchScore(request: JobRequest, listing: CapacityListing, provider: ProviderProfile) {
  const budgetMid = Math.round((request.budgetMin + request.budgetMax) / 2);
  const listingMid = Math.round((listing.estimatedPriceMin + listing.estimatedPriceMax) / 2);
  const priceDelta = Math.abs(budgetMid - listingMid);
  const priceFit = clamp(100 - Math.round(priceDelta / 110), 48, 100);
  const categoryFit = request.category === listing.category ? 100 : 45;
  const proximity = request.preferredLocation === listing.city ? 100 : 72;
  const leadTime = clamp(100 - listing.leadTimeDays * 5, 55, 100);
  const verification = listing.verified ? 100 : 62;
  const rating = provider.rating * 20;

  return Math.round(
    categoryFit * 0.3 +
      priceFit * 0.2 +
      leadTime * 0.18 +
      proximity * 0.12 +
      verification * 0.1 +
      rating * 0.1,
  );
}

export function rankMatches(request: JobRequest): MatchResult[] {
  return getAllListings()
    .filter((listing) => listing.category === request.category)
    .map((listing) => {
      const score = calculateMatchScore(request, listing, listing.provider);
      const proximity: MatchResult["proximity"] =
        request.preferredLocation === listing.city ? "local" : "regional";
      const reasons = [
        request.category === listing.category ? "capacity type aligned" : "adjacent capacity fit",
        proximity === "local" ? "same-city execution" : "regional coverage",
        listing.verified ? "verified trust rail" : "verification in progress",
        `${listing.leadTimeDays}-day lead time`,
      ];

      return {
        listingId: listing.id,
        providerId: listing.providerId,
        score,
        explanation: reasons.join(", "),
        estimatedPrice: Math.round((listing.estimatedPriceMin + listing.estimatedPriceMax) / 2),
        leadTimeDays: listing.leadTimeDays,
        proximity,
      };
    })
    .sort((left, right) => right.score - left.score);
}

export function findProvider(id: string) {
  return providerLookup[id];
}

export function findListing(id: string) {
  return listingLookup[id];
}

export function findRequest(id: string) {
  return jobRequestLookup[id];
}

export function findQuoteById(id: string, fallbackQuotes: Quote[] = []) {
  return fallbackQuotes.find((quote) => quote.id === id);
}

export function buildQuoteFromMatch(request: JobRequest, match: MatchResult): Quote {
  const listing = listingLookup[match.listingId];
  const deadlineGap = differenceInCalendarDays(new Date(request.deadline), new Date());
  const price = clamp(
    match.estimatedPrice + Math.round(request.quantity / 25) * 12,
    listing.estimatedPriceMin,
    listing.estimatedPriceMax + 2200,
  );

  return {
    id: `quote-live-${request.id}-${match.listingId}`,
    jobRequestId: request.id,
    providerId: match.providerId,
    listingId: match.listingId,
    price,
    currency: "USD",
    leadTimeDays: Math.min(match.leadTimeDays, Math.max(deadlineGap - 2, 2)),
    validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Demo quote generated from marketplace fit, verification status, and capacity window.",
    matchScore: match.score,
    matchExplanation: match.explanation,
    status: "SENT",
  };
}
