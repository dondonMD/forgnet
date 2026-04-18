import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge variant="accent" className="w-fit">
        {eyebrow}
      </Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[2.8rem]">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
