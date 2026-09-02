"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";
import { contactSchema } from "@/lib/validation";

// Contact form — validates client-side, posts to /api/contact, stores the submission.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { status, error, submit } = useSubmit();

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((er) => {
        if (er.path[0]) errs[String(er.path[0])] = er.message;
      });
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    await submit("/api/contact", form);
    if (status === "success") setForm({ name: "", email: "", message: "" });
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-ink">Name</label>
        <input id="c-name" className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
        {fieldErrors.name && <span className="text-xs text-red-600">{fieldErrors.name}</span>}
      </div>
      <div>
        <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input id="c-email" type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
        {fieldErrors.email && <span className="text-xs text-red-600">{fieldErrors.email}</span>}
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-ink">Message</label>
        <textarea id="c-message" rows={4} className={inputClass} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help?" />
        {fieldErrors.message && <span className="text-xs text-red-600">{fieldErrors.message}</span>}
      </div>
      {status === "error" && <span className="text-xs text-red-600">{error}</span>}
      {status === "success" && <span className="text-xs text-moss">✓ Thanks — we've got it. We'll be in touch.</span>}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
