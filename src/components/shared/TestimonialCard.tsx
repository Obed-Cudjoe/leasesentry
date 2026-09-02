import type { Testimonial } from "@/types/menu";

// Reusable testimonial card (quote + name + mini-rating).
export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
      <div className="mb-3 text-ember" aria-hidden>★★★★★</div>
      <blockquote className="flex-1 text-inksoft">“{t.quote}”</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-ink">
        {t.name} <span className="font-normal text-inksoft/70">· {t.role}</span>
      </figcaption>
    </figure>
  );
}
