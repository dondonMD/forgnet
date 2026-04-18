"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Booking, JobRequest, Quote, Role } from "./types";

const roleCookie = "forgenet-role";
const requestCookie = "forgenet-live-request";
const quoteCookie = "forgenet-live-quote";
const bookingCookie = "forgenet-live-booking";
const secureCookie = process.env.NODE_ENV === "production";

function encode<T>(value: T) {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

function decode<T>(value?: string) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function getRole(): Promise<Role> {
  const store = await cookies();
  const role = store.get(roleCookie)?.value;
  return role === "provider" || role === "admin" ? role : "buyer";
}

export async function setRole(role: Role) {
  const store = await cookies();
  store.set(roleCookie, role, { sameSite: "lax", httpOnly: true, secure: secureCookie, path: "/" });
}

export async function requireRole(role: Role, locale: string) {
  const currentRole = await getRole();
  if (currentRole !== role) {
    redirect(`/${locale}/login?next=/${locale}/${role}`);
  }
}

export async function setLiveRequest(request: JobRequest) {
  const store = await cookies();
  store.set(requestCookie, encode(request), {
    sameSite: "lax",
    httpOnly: true,
    secure: secureCookie,
    path: "/",
  });
}

export async function getLiveRequest() {
  const store = await cookies();
  return decode<JobRequest>(store.get(requestCookie)?.value);
}

export async function setLiveQuote(quote: Quote) {
  const store = await cookies();
  store.set(quoteCookie, encode(quote), {
    sameSite: "lax",
    httpOnly: true,
    secure: secureCookie,
    path: "/",
  });
}

export async function getLiveQuote() {
  const store = await cookies();
  return decode<Quote>(store.get(quoteCookie)?.value);
}

export async function setLiveBooking(booking: Booking) {
  const store = await cookies();
  store.set(bookingCookie, encode(booking), {
    sameSite: "lax",
    httpOnly: true,
    secure: secureCookie,
    path: "/",
  });
}

export async function getLiveBooking() {
  const store = await cookies();
  return decode<Booking>(store.get(bookingCookie)?.value);
}
