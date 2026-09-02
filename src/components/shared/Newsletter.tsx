"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";
import { newsletterSchema } from "@/lib/validation";

// Newsletter signup (footer + post-booking). Stores real submissions.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const { status, error, submit } = useSubmit();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setFieldError(parsed.error.errors[0]?.message ?? "Please add a valid email.");
      return;
    }
    setFieldError(null);
    await submit("/api/newsletter", { email });
    if (status === "success") setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input
        id="nl-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="rounded-full border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-ember"
      />
      {fieldError && <span className="text-xs text-red-600">{fieldError}</span>}
      {status === "error" && <span className="text-xs text-red-600">{error}</span>}
      {status === "success" && <span className="text-xs text-moss">✓ You're on the list!</span>}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary text-sm" style={{ padding: "0.55rem 1.1rem" }}>
        {status === "loading" ? "Saving…" : "Keep me posted"}
      </button>
    </form>
  );
}
