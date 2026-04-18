"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeLabels, locales, type Locale } from "@/lib/types";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|sn|nd|ve)/, "");

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
      <Globe2 className="h-4 w-4 text-slate-500" />
      <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}${stripped || ""}`}
            className={
              locale === currentLocale
                ? "rounded-full bg-[var(--brand-50)] px-2 py-1 text-[var(--brand-700)]"
                : "rounded-full px-2 py-1 hover:bg-slate-100"
            }
          >
            {localeLabels[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
