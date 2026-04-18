import Link from "next/link";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:justify-between">
        <div className="max-w-md space-y-3">
          <div className="text-lg font-semibold text-slate-950">ForgeNet</div>
          <p className="text-sm leading-6 text-slate-600">
            A regulation-aligned industrial capacity exchange for verified fabrication, packaging,
            warehousing, cold storage, and logistics capacity.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-600">
          <Link href={`/${locale}/marketplace`} className="hover:text-slate-950">
            Marketplace
          </Link>
          <Link href={`/${locale}/request`} className="hover:text-slate-950">
            Post a requirement
          </Link>
          <Link href={`/${locale}/trust`} className="hover:text-slate-950">
            Trust and compliance
          </Link>
          <Link href={`/${locale}/login`} className="hover:text-slate-950">
            Demo access
          </Link>
        </div>
      </div>
    </footer>
  );
}
