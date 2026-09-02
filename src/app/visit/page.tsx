import { SITE } from "@/lib/site";
import ContactForm from "@/components/shared/ContactForm";
import DietaryForm from "@/components/shared/DietaryForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Visit & Contact",
  description: "Find us, see our hours, or send a message or a dietary question. We reply within a day.",
  path: "/visit",
});

export default function VisitPage() {
  return (
    <main className="container-site py-16">
      <SectionHeading
        eyebrow="Come find us"
        title="Visit us"
        subline="At our home on Orchard Street in Portland. Convenient parking on Orange Lane, fully step-free access, and we're happy to answer any dietary question."
      />

      {/* Location + hours */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-line">
          {/* Map (CSS placeholder — swap for a Google Maps embed on deployment) */}
          <div className="flex h-64 items-center justify-center bg-creamdark" style={{ backgroundImage: "radial-gradient(circle at 40% 40%, #e6ded2 0%, transparent 40%)" }}>
            <div className="text-center text-inksoft">
              <div className="text-4xl">📍</div>
              <div className="mt-2 text-sm font-medium text-ink">34 Orchard Street, Portland</div>
              <a className="mt-1 block text-sm text-ember hover:underline" href="https://maps.google.com" target="_blank" rel="noreferrer">Open in maps →</a>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-line bg-white p-7">
          <div className="flex justify-between border-b border-line pb-4">
            <div className="text-sm font-semibold text-ink">Dine-in</div>
            <div className="text-sm text-inksoft">{SITE.hours}</div>
          </div>
          <div className="flex justify-between border-b border-line pb-4">
            <div className="text-sm font-semibold text-ink">Takeout</div>
            <div className="text-sm text-inksoft">Tue–Sun · 4pm–9pm</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm font-semibold text-ink">Phone</div>
            <a className="text-sm text-ember hover:underline" href={`tel:${SITE.phone}`}>{SITE.phone}</a>
          </div>
          <div className="pt-2 text-sm text-inksoft">Parking on Orange Lane · Step-free access · Reservations recommended on weekends.</div>
        </div>
      </div>

      {/* Forms */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-8">
          <h2 className="mb-5 font-display text-2xl text-ink">Send us a message</h2>
          <ContactForm />
        </div>
        <div className="rounded-2xl border border-line bg-white p-8">
          <h2 className="mb-5 font-display text-2xl text-ink">Ask about a meal</h2>
          <p className="mb-5 text-sm text-inksoft">Tell us what you're avoiding and we'll confirm what we can make work. We reply within a day.</p>
          <DietaryForm />
        </div>
      </div>
    </main>
  );
}
