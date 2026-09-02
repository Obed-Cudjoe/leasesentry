import Link from "next/link";

// Reusable dual call-to-action row.
export default function CTARow({
  primary = { href: "/book", label: "Book a table" },
  secondary = { href: "/menu", label: "Browse the menu" },
}: {
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href={primary.href} className="btn btn-primary">{primary.label}</Link>
      <Link href={secondary.href} className="btn btn-outline">{secondary.label}</Link>
    </div>
  );
}
