"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeLabels, locales, type Locale } from "@/lib/types";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|sn|nd|ve)/, "");

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2 py-2 shadow-sm">
      <Globe2 className="ml-1 h-4 w-4 shrink-0 text-slate-500" />
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium text-slate-600">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}${stripped || ""}`}
            className={
              locale === currentLocale
                ? "whitespace-nowrap rounded-full bg-[var(--brand-50)] px-2.5 py-1 text-[var(--brand-700)]"
                : "whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-slate-100"
            }
          >
            {localeLabels[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
