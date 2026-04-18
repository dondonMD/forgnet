import { ShieldCheck } from "lucide-react";
import type { Role } from "@/lib/types";
import { sentenceCase } from "@/lib/utils";

export function RolePill({ role, label = "Demo role" }: { role: Role; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
      <ShieldCheck className="h-4 w-4 text-[var(--brand-600)]" />
      {label}: {sentenceCase(role)}
    </div>
  );
}
