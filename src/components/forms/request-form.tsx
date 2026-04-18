"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CalendarDays, LoaderCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { cities } from "@/lib/demo-data";
import { jobRequestSchema } from "@/lib/forms";
import type { Locale } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { z } from "zod";

const categoryOptions = [
  { value: "FABRICATION", label: "Light manufacturing / fabrication" },
  { value: "PACKAGING", label: "Packaging / processing" },
  { value: "WAREHOUSING", label: "Warehousing" },
  { value: "COLD_STORAGE", label: "Cold storage" },
  { value: "LOGISTICS", label: "Transport / return-load logistics" },
] as const;

type FormInput = z.input<typeof jobRequestSchema>;
type FormValues = z.output<typeof jobRequestSchema>;

export function RequestForm({
  locale,
  initialValues,
}: {
  locale: Locale;
  initialValues?: Partial<FormInput>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormInput, undefined, FormValues>({
    resolver: zodResolver(jobRequestSchema),
    defaultValues: {
      title: "",
      category: "FABRICATION",
      quantity: 250,
      preferredLocation: "Harare",
      deadline: "",
      budgetMin: 1800,
      budgetMax: 6400,
      notes: "",
      complianceRequirements: "",
      ...initialValues,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    const response = await fetch("/api/demo/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSubmitting(false);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      toast.error(payload.error ?? "Unable to create the request.");
      return;
    }

    const payload = (await response.json()) as { id: string };
    toast.success("Requirement submitted. Ranked matches are ready.");
    startTransition(() => {
      router.push(`/${locale}/request/${payload.id}/matches`);
    });
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="title">Job title</Label>
        <Input id="title" placeholder="Retail display stand fabrication run" {...form.register("title")} />
        <p className="text-xs text-rose-600">{form.formState.errors.title?.message}</p>
      </div>

      <div className="space-y-2">
        <Label>Capacity category</Label>
        <Controller
          control={form.control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" {...form.register("quantity")} />
        <p className="text-xs text-rose-600">{form.formState.errors.quantity?.message}</p>
      </div>

      <div className="space-y-2">
        <Label>Preferred location</Label>
        <Controller
          control={form.control}
          name="preferredLocation"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <Input id="deadline" type="date" className="pl-10" {...form.register("deadline")} />
        </div>
        <p className="text-xs text-rose-600">{form.formState.errors.deadline?.message}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budgetMin">Budget min (USD)</Label>
        <Input id="budgetMin" type="number" {...form.register("budgetMin")} />
        <p className="text-xs text-rose-600">{form.formState.errors.budgetMin?.message}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budgetMax">Budget max (USD)</Label>
        <Input id="budgetMax" type="number" {...form.register("budgetMax")} />
        <p className="text-xs text-rose-600">{form.formState.errors.budgetMax?.message}</p>
      </div>

      <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="notes">Requirement notes</Label>
        <Textarea
          id="notes"
          placeholder="Provide the production scope, tolerances, packaging expectations, or dispatch needs."
          {...form.register("notes")}
        />
        <p className="text-xs text-rose-600">{form.formState.errors.notes?.message}</p>
      </div>

      <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="complianceRequirements">Compliance requirements</Label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            id="complianceRequirements"
            className="pl-10"
            placeholder="NDA, batch traceability, QA checklist, POD trail"
            {...form.register("complianceRequirements")}
          />
        </div>
        <p className="text-xs text-rose-600">{form.formState.errors.complianceRequirements?.message}</p>
      </div>

      <div className="panel-muted lg:col-span-2 flex flex-col items-start justify-between gap-4 rounded-[28px] border border-slate-200 p-5 md:flex-row md:items-center">
        <div className="space-y-1">
          <p className="max-w-xl text-sm font-medium text-slate-900">What happens next</p>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            ForgeNet validates the requirement, stores it in the demo session rail, and ranks live
            marketplace matches by fit, timing, location, trust status, and commercial alignment.
          </p>
        </div>
        <Button type="submit" className="min-w-44" disabled={submitting || pending}>
          {submitting || pending ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Ranking capacity...
            </>
          ) : (
            "Generate ranked matches"
          )}
        </Button>
      </div>
    </form>
  );
}
