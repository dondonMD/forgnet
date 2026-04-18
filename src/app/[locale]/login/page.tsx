import { LockKeyhole, ShieldCheck } from "lucide-react";
import { demoLoginAction } from "@/app/[locale]/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMessages } from "@/lib/messages";
import type { Locale } from "@/lib/types";

const roles = [
  {
    id: "buyer",
    title: "Buyer",
    email: "buyer@forgenet.demo",
    password: "ForgeNet123!",
    detail: "Use the full request to matches to quote to booking flow.",
  },
  {
    id: "provider",
    title: "Provider",
    email: "provider@forgenet.demo",
    password: "ForgeNet123!",
    detail: "Review open requests, utilization, and recent activity.",
  },
  {
    id: "admin",
    title: "Admin",
    email: "admin@forgenet.demo",
    password: "ForgeNet123!",
    detail: "Inspect verification queues, moderation, and platform KPIs.",
  },
] as const;

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;
  const t = getMessages(locale);

  return (
    <div className="page-shell space-y-8">
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-4 py-2 text-sm font-medium text-[var(--brand-700)]">
          <ShieldCheck className="h-4 w-4" />
          {t.login.badge}
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl">
          {t.login.title}
        </h1>
        <p className="text-lg leading-8 text-slate-600">{t.login.description}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={
              role.id === "buyer"
                ? "border-[var(--brand-200)] shadow-[0_24px_70px_-36px_rgba(8,145,178,0.48)]"
                : ""
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{role.title}</CardTitle>
                {role.id === "buyer" ? (
                  <div className="rounded-full bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)]">
                    Recommended
                  </div>
                ) : null}
              </div>
              <CardDescription>{role.detail}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-[24px] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                <div className="font-medium text-slate-900">{role.email}</div>
                <div>{role.password}</div>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-600">
                Next step:{" "}
                {role.id === "buyer"
                  ? "submit a requirement and review ranked matches."
                  : role.id === "provider"
                    ? "review open demand and utilization signals."
                    : "inspect trust rails, moderation, and booking oversight."}
              </div>
              <form action={demoLoginAction} className="space-y-3">
                <input type="hidden" name="role" value={role.id} />
                <input type="hidden" name="locale" value={locale} />
                <input
                  type="hidden"
                  name="next"
                  value={next ?? `/${locale}/${role.id === "buyer" ? "request" : role.id}`}
                />
                <Button type="submit" className="w-full">
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  Continue as {role.title}
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
