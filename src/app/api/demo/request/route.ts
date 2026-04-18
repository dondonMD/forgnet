import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { jobRequestSchema, validateBudgetRange } from "@/lib/forms";
import { setLiveRequest } from "@/lib/session";

export async function POST(request: Request) {
  if (!checkRateLimit("request-submit", 8, 60_000)) {
    return NextResponse.json({ error: "Rate limit reached. Please wait a minute." }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = jobRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please review the form fields and try again." }, { status: 400 });
  }

  if (!validateBudgetRange(parsed.data)) {
    return NextResponse.json({ error: "Budget max must be greater than budget min." }, { status: 400 });
  }

  const liveRequest = {
    id: `request-live-${Date.now()}`,
    buyerId: "user-buyer",
    ...parsed.data,
    status: "MATCHED" as const,
    deadline: new Date(parsed.data.deadline).toISOString(),
  };

  await setLiveRequest(liveRequest);
  return NextResponse.json({ id: liveRequest.id });
}
