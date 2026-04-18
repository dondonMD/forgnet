import Link from "next/link";
import { Factory, LayoutDashboard, ShieldCheck } from "lucide-react";
import { getMessages } from "@/lib/messages";
import type { Locale, Role } from "@/lib/types";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { RolePill } from "./role-pill";

export function SiteHeader({ locale, role }: { locale: Locale; role: Role }) {
  const t = getMessages(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[rgba(246,248,252,0.76)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-700),var(--brand-500))] text-white shadow-lg shadow-[var(--brand-600)]/25">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-slate-950">ForgeNet</div>
              <div className="text-xs text-slate-500">Marketplace for production itself</div>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <Link href={`/${locale}/marketplace`} className="hover:text-slate-950">
            {t.nav.marketplace}
          </Link>
          <Link href={`/${locale}/request`} className="hover:text-slate-950">
            {t.nav.postNeed}
          </Link>
          <Link href={`/${locale}/trust`} className="hover:text-slate-950">
            {t.nav.trust}
          </Link>
          <Link href={`/${locale}/provider`} className="inline-flex items-center gap-2 hover:text-slate-950">
            <LayoutDashboard className="h-4 w-4" />
            {t.nav.provider}
          </Link>
          <Link href={`/${locale}/admin`} className="inline-flex items-center gap-2 hover:text-slate-950">
            <ShieldCheck className="h-4 w-4" />
            {t.nav.admin}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <RolePill role={role} />
          </div>
          <LanguageSwitcher currentLocale={locale} />
          <Button asChild size="sm">
            <Link href={`/${locale}/login`}>{t.nav.login}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
