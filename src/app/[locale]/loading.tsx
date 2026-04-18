function LoadingCard() {
  return <div className="h-36 animate-pulse rounded-[28px] bg-white/70" />;
}

export default function LocaleLoading() {
  return (
    <div className="page-shell space-y-6">
      <div className="max-w-3xl space-y-4">
        <div className="h-6 w-28 animate-pulse rounded-full bg-white/70" />
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-3xl bg-white/70" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-white/60" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
