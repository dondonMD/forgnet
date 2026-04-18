import { LockKeyhole, ShieldCheck } from "lucide-react";
import { demoLoginAction } from "@/app/[locale]/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";

const roles = [
  {
    id: "buyer",
    title: "Buyer",
    email: "buyer@forgenet.demo",
    password: "ForgeNet123!",
    detail: "Use the full request → matches → quote → booking flow.",
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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-4 py-2 text-sm font-medium text-[var(--brand-700)]">
          <ShieldCheck className="h-4 w-4" />
          Demo access
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Switch roles instantly for the MVP walkthrough.</h1>
        <p className="text-lg leading-8 text-slate-600">
          Authentication is intentionally mocked for demo speed. Passwords are visible below to make
          the investor/demo flow frictionless.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle>{role.title}</CardTitle>
              <CardDescription>{role.detail}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-[24px] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                <div>{role.email}</div>
                <div>{role.password}</div>
              </div>
              <form action={demoLoginAction} className="space-y-3">
                <input type="hidden" name="role" value={role.id} />
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="next" value={next ?? `/${locale}/${role.id === "buyer" ? "request" : role.id}`} />
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
