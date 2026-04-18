import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRole } from "@/lib/session";
import { locales, type Locale } from "@/lib/types";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const role = await getRole();

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale as Locale} role={role} />
      <main>{children}</main>
      <SiteFooter locale={locale as Locale} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
