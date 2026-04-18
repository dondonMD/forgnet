"use server";

import { redirect } from "next/navigation";
import { checkRateLimit } from "@/lib/rate-limit";
import { roleSchema } from "@/lib/forms";
import {
  buildQuoteFromMatch,
  findQuoteById,
  rankMatches,
} from "@/lib/marketplace";
import { bookingLookup, demoQuotes, quoteLookup } from "@/lib/demo-data";
import {
  getLiveBooking,
  getLiveQuote,
  getLiveRequest,
  setLiveBooking,
  setLiveQuote,
  setRole,
} from "@/lib/session";

export async function demoLoginAction(formData: FormData) {
  if (!checkRateLimit("demo-login", 12, 60_000)) {
    redirect("/en/login?error=rate-limit");
  }

  const parsed = roleSchema.safeParse({ role: formData.get("role") });
  const locale = String(formData.get("locale") ?? "en");
  const next = String(formData.get("next") ?? `/${locale}`);

  if (!parsed.success) {
    redirect(`/${locale}/login?error=role`);
  }

  await setRole(parsed.data.role);
  redirect(next);
}

export async function requestQuoteAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const listingId = String(formData.get("listingId"));
  const liveRequest = await getLiveRequest();
  const requestId = String(formData.get("requestId"));

  const request = liveRequest?.id === requestId ? liveRequest : null;
  if (!request) {
    redirect(`/${locale}/request`);
  }

  const match = rankMatches(request).find((item) => item.listingId === listingId);
  if (!match) {
    redirect(`/${locale}/request/${request.id}/matches`);
  }

  const quote = buildQuoteFromMatch(request, match);
  await setLiveQuote(quote);
  redirect(`/${locale}/quote/${quote.id}`);
}

export async function acceptQuoteAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const quoteId = String(formData.get("quoteId"));
  const liveQuote = await getLiveQuote();
  const quote =
    (liveQuote && liveQuote.id === quoteId ? liveQuote : null) ??
    findQuoteById(quoteId, demoQuotes) ??
    quoteLookup[quoteId];

  if (!quote) {
    redirect(`/${locale}/marketplace`);
  }

  const existingLive = await getLiveBooking();
  const existingSeed = Object.values(bookingLookup).find((booking) => booking.quoteId === quote.id);
  const booking =
    existingLive?.quoteId === quote.id
      ? existingLive
      : existingSeed ?? {
          id: `booking-live-${Date.now()}`,
          jobRequestId: quote.jobRequestId,
          quoteId: quote.id,
          buyerId: "user-buyer",
          providerId: quote.providerId,
          status: "PROVIDER_CONFIRMED" as const,
          contractAcknowledged: true,
          issueFlagged: false,
          milestoneValue: quote.price,
          milestones: [
            {
              id: "live-1",
              label: "Request submitted",
              description: "Buyer requirement captured with audit trail.",
              state: "COMPLETE" as const,
            },
            {
              id: "live-2",
              label: "Provider confirmed",
              description: "Provider accepted the booking and reserved capacity.",
              state: "ACTIVE" as const,
            },
            {
              id: "live-3",
              label: "Production scheduled",
              description: "Scheduling will begin after demo confirmation.",
              state: "UPCOMING" as const,
            },
            {
              id: "live-4",
              label: "In progress",
              description: "Execution tracking placeholder.",
              state: "UPCOMING" as const,
            },
            {
              id: "live-5",
              label: "Ready for dispatch",
              description: "Dispatch signoff placeholder.",
              state: "UPCOMING" as const,
            },
            {
              id: "live-6",
              label: "Completed",
              description: "Buyer completion acknowledgement placeholder.",
              state: "UPCOMING" as const,
            },
          ],
        };

  await setLiveBooking(booking);
  redirect(`/${locale}/booking/${booking.id}`);
}
