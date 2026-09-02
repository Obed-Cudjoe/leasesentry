// Reusable trust badge — small icon + label.
export default function TrustBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-ink">{label}</span>
    </div>
  );
}
