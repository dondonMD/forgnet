import Link from "next/link";
import { Factory, LayoutDashboard, ShieldCheck } from "lucide-react";
import { getMessages } from "@/lib/messages";
import type { Locale, Role } from "@/lib/types";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { RolePill } from "./role-pill";

export function SiteHeader({ locale, role }: { locale: Locale; role: Role }) {
  const t = getMessages(locale);
  const navItems = [
    { href: `/${locale}/marketplace`, label: t.nav.marketplace },
    { href: `/${locale}/request`, label: t.nav.postNeed },
    { href: `/${locale}/trust`, label: t.nav.trust },
    { href: `/${locale}/provider`, label: t.nav.provider, icon: LayoutDashboard },
    { href: `/${locale}/admin`, label: t.nav.admin, icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[rgba(246,248,252,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-700),var(--brand-500))] text-white shadow-lg shadow-[var(--brand-600)]/25">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-slate-950">ForgeNet</div>
              <div className="text-xs text-slate-500">Industrial capacity exchange</div>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 hover:text-slate-950">
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <RolePill role={role} label={t.common.demoRole} />
          </div>
          <LanguageSwitcher currentLocale={locale} />
          <Button asChild size="sm">
            <Link href={`/${locale}/login`}>{t.nav.login}</Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-white/60 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 text-sm text-slate-600">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 hover:text-slate-950"
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
