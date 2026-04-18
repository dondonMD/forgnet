import { SectionHeading } from "@/components/section-heading";
import { MarketplaceExplorer } from "@/components/marketplace/marketplace-explorer";
import { getAllListings } from "@/lib/marketplace";
import type { Locale } from "@/lib/types";

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const listings = getAllListings();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-14">
      <SectionHeading
        eyebrow="Marketplace"
        title="Search verified capacity, not anonymous suppliers."
        description="Browse regionally relevant listings across fabrication, packaging, warehousing, cold storage, and return-load logistics. Filters are designed for operational fit, not catalog vanity."
      />
      <MarketplaceExplorer locale={locale} listings={listings} />
    </div>
  );
}
