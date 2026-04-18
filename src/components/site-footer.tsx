import Link from "next/link";
import { Factory, ShieldCheck } from "lucide-react";
import { getMessages } from "@/lib/messages";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <footer className="border-t border-slate-200/80 bg-white/90">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-700),var(--brand-500))] text-white">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-950">ForgeNet</div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Demo-ready platform</div>
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-600">{t.footer.description}</p>
          <div className="flex items-start gap-2 rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-600)]" />
            <span>{t.footer.note}</span>
          </div>
        </div>
        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <Link href={`/${locale}/marketplace`} className="rounded-2xl border border-slate-200 px-4 py-3 hover:text-slate-950">
            {t.footer.marketplace}
          </Link>
          <Link href={`/${locale}/request`} className="rounded-2xl border border-slate-200 px-4 py-3 hover:text-slate-950">
            {t.footer.request}
          </Link>
          <Link href={`/${locale}/trust`} className="rounded-2xl border border-slate-200 px-4 py-3 hover:text-slate-950">
            {t.footer.trust}
          </Link>
          <Link href={`/${locale}/login`} className="rounded-2xl border border-slate-200 px-4 py-3 hover:text-slate-950">
            {t.footer.login}
          </Link>
        </div>
      </div>
    </footer>
  );
}
