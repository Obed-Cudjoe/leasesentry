import Link from "next/link";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a table",
  description: "Reserve a table at Harvest & Ember in a few taps. The price you saw is the price you pay — no booking fees, no surprises.",
  path: "/book",
});

// Booking page — the conversion flow. Uses a reservation hand-off, which for the
// demo is a simple guided form that confirms the choice, then directs to the
// third-party reservation platform (OpenTable / Resy / Tock) on the live site.
export default function BookPage() {
  return (
    <main className="container-site py-16">
      <div className="mx-auto max-w-3xl">
        <div className="eyebrow mb-2">Reserve in a few taps</div>
        <h1 className="text-4xl text-ink">Book your table</h1>
        <p className="mt-3 text-inksoft">The price you saw is the price you pay. No booking fees, no hidden charges — just a confirmed table.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Booking panel */}
        <div className="rounded-2xl border border-line bg-white p-7">
          <form className="space-y-4" action="/book" method="get">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Date</label>
                <input type="date" required className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Time</label>
                <input type="time" defaultValue="19:00" required className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Party size</label>
              <select className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember" defaultValue="2">
                <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Anything we should know?</label>
              <textarea rows={2} placeholder="Allergies, accessibility, an occasion…" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ember" />
            </div>
            <button type="submit" className="btn btn-primary w-full">Continue to reservation</button>
          </form>
        </div>

        {/* Reassurance + fallback */}
        <div className="rounded-2xl border border-line bg-creamdark p-7">
          <div className="eyebrow mb-3">Good to know</div>
          <ul className="space-y-3 text-sm text-inksoft">
            <li className="flex gap-2"><span>✓</span> No booking fees — the price you saw is the price you pay.</li>
            <li className="flex gap-2"><span>✓</span> Confirmation and a reminder sent automatically.</li>
            <li className="flex gap-2"><span>✓</span> We hold your table for 15 minutes past your booking time.</li>
            <li className="flex gap-2"><span>✓</span> Prefer to talk? Call <a className="text-ember" href={`tel:${SITE.phone}`}>{SITE.phone}</a>.</li>
          </ul>
          <div className="mt-6 border-t border-line pt-5 text-sm text-inksoft">
            <p><b className="text-ink">Prefer to call?</b></p>
            <p className="mt-1">
              Reservations are confirmed through our reservation partner. If that link is ever unavailable, we'll still take your booking directly — give us a ring at{" "}
              <a className="text-ember" href={`tel:${SITE.phone}`}>{SITE.phone}</a> or email{" "}
              <a className="text-ember" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Post-book secondary conversion */}
      <div className="mt-12 rounded-2xl border border-line bg-white p-7 text-center">
        <p className="font-display text-xl text-ink">Booked? Save the menu for next time.</p>
        <p className="mt-2 text-sm text-inksoft">Or ask us about a meal and we'll make it work for your dietary needs.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Link href="/visit" className="btn btn-primary">Ask about a meal</Link>
          <Link href="/menu" className="btn btn-outline">Browse the menu</Link>
        </div>
      </div>
    </main>
  );
}
