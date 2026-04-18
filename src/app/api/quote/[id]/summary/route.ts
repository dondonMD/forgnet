import { NextResponse } from "next/server";
import { format } from "date-fns";
import { findListing, findProvider } from "@/lib/marketplace";
import { demoQuotes, quoteLookup } from "@/lib/demo-data";
import { getLiveQuote } from "@/lib/session";
import { formatCurrency } from "@/lib/utils";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const liveQuote = await getLiveQuote();
  const quote =
    (liveQuote && liveQuote.id === id ? liveQuote : null) ?? quoteLookup[id] ?? demoQuotes[0];
  const listing = findListing(quote.listingId);
  const provider = findProvider(quote.providerId);

  const content = [
    "ForgeNet quote summary",
    `Quote ID: ${quote.id}`,
    `Provider: ${provider.companyName}`,
    `Capacity listing: ${listing.title}`,
    `Price: ${formatCurrency(quote.price)}`,
    `Lead time: ${quote.leadTimeDays} days`,
    `Valid until: ${format(new Date(quote.validUntil), "dd MMM yyyy")}`,
    `Match score: ${quote.matchScore}`,
    `Why matched: ${quote.matchExplanation}`,
    `Notes: ${quote.notes}`,
  ].join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${quote.id}-summary.txt"`,
    },
  });
}
