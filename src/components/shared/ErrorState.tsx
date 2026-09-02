import Link from "next/link";

// Reusable error / empty state (used on 404, zero-filter results and booking fallback).
export default function ErrorState({
  title,
  message,
  actions = [
    { href: "/menu", label: "Browse the menu" },
    { href: "/book", label: "Book a table" },
  ],
}: {
  title: string;
  message: string;
  actions?: { href: string; label: string }[];
}) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-10 text-center">
      <div className="mb-4 text-4xl" aria-hidden>🍽️</div>
      <h1 className="text-2xl text-ink">{title}</h1>
      <p className="mt-3 text-inksoft">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="btn btn-primary">{a.label}</Link>
        ))}
      </div>
    </div>
  );
}
