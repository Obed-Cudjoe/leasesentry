"use client";

import { useState } from "react";

// Reusable submit state + fetch helper for all client-side forms.
// Manages loading, success and error without repeating boilerplate.
export function useSubmit() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(endpoint: string, payload: unknown): Promise<boolean> {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return false;
      }
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please try again.");
      return false;
    }
  }

  return { status, error, submit };
}
