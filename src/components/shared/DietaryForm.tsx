"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";
import { dietarySchema } from "@/lib/validation";
import { ALLERGENS } from "@/lib/menu-data";

// Dietary / allergen enquiry form — posts to /api/dietary and stores the submission.
export default function DietaryForm() {
  const [form, setForm] = useState({ name: "", email: "", allergens: [] as string[], question: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { status, error, submit } = useSubmit();

  function toggleAllergen(a: string) {
    setForm((f) => ({
      ...f,
      allergens: f.allergens.includes(a) ? f.allergens.filter((x) => x !== a) : [...f.allergens, a],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = dietarySchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((er) => {
        if (er.path[0]) errs[String(er.path[0])] = er.message;
      });
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    await submit("/api/dietary", form);
    if (status === "success") setForm({ name: "", email: "", allergens: [], question: "" });
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="d-name" className="mb-1 block text-sm font-medium text-ink">Name</label>
          <input id="d-name" className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" />
          {fieldErrors.name && <span className="text-xs text-red-600">{fieldErrors.name}</span>}
        </div>
        <div>
          <label htmlFor="d-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
          <input id="d-email" type="email" className={inputClass} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
          {fieldErrors.email && <span className="text-xs text-red-600">{fieldErrors.email}</span>}
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm font-medium text-ink">I'm avoiding…</div>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAllergen(a)}
              aria-pressed={form.allergens.includes(a)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                form.allergens.includes(a)
                  ? "border-ember bg-ember text-white"
                  : "border-line bg-white text-inksoft hover:border-ember"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="d-question" className="mb-1 block text-sm font-medium text-ink">Your question</label>
        <textarea id="d-question" rows={3} className={inputClass} value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} placeholder="e.g. Is the kitchen entirely gluten-free?" />
        {fieldErrors.question && <span className="text-xs text-red-600">{fieldErrors.question}</span>}
      </div>

      {status === "error" && <span className="text-xs text-red-600">{error}</span>}
      {status === "success" && <span className="text-xs text-moss">✓ Thanks — we'll reply within a day.</span>}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary">
        {status === "loading" ? "Sending…" : "Ask about a meal"}
      </button>
    </form>
  );
}
