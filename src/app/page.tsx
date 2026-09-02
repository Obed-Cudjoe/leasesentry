import Link from "next/link";
import { SITE } from "@/lib/site";
import { DISHES, TESTIMONIALS } from "@/lib/menu-data";
import DishCard from "@/components/menu/DishCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import TrustBadge from "@/components/shared/TrustBadge";
import CTARow from "@/components/shared/CTARow";
import { buildMetadata, restaurantJsonLd } from "@/lib/seo";
import { DIETS } from "@/lib/menu-data";

export const metadata = buildMetadata();

export default function Home() {
  const featured = DISHES.filter((d) => d.isFeatured).slice(0, 3);
  const steps = [
    { n: "01", t: "Choose what you can eat", d: "Filter by allergen or diet and see only the dishes that work for you." },
    { n: "02", t: "See what's really in it", d: "Real ingredients, true portion, and the honest all-in price. No surprises." },
    { n: "03", t: "Book with confidence", d: "Reserve your table in one tap — the menu you saw is the meal you get." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(120deg,#1c1715 0%,#3a2a20 55%,#6b3a1c 100%)" }}
        />
        <div className="container-site relative py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="eyebrow text-cream/80">{SITE.tagline}</div>
            <h1 className="mt-3 text-4xl text-cream md:text-6xl">A menu you can actually trust.</h1>
            <p className="mt-5 max-w-xl text-lg text-cream/85">
              Filter every dish by what you can and can’t eat, see the real portion and real ingredients, and book your table in the same tap. No hidden fees, no guessing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="btn btn-primary">Filter the menu</Link>
              <Link href="/book" className="btn" style={{ background: "#fff", color: "#1c1715" }}>Book a table</Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIETARY QUICK START + TRUST */}
      <section className="container-site -mt-10 relative z-10">
        <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold text-ink">Filter your diet, right now</div>
            <div className="flex flex-wrap gap-2">
              {DIETS.map((d) => (
                <Link key={d.id} href={`/menu?diet=${d.id}`} className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-medium text-inksoft transition hover:border-ember hover:text-ember">
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <TrustBadge icon="🌾" label="Honest sourcing" />
            <TrustBadge icon="🧾" label="No hidden fees" />
            <TrustBadge icon="⚖️" label="True portions" />
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="container-site py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Tonight's standouts</div>
            <h2 className="text-3xl text-ink md:text-4xl">Real food, honestly described</h2>
          </div>
          <Link href="/menu" className="text-sm font-medium text-ember hover:underline">See the full menu →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish) => <DishCard key={dish.slug} dish={dish} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-creamdark py-20">
        <div className="container-site">
          <div className="eyebrow mb-2">How it works</div>
          <h2 className="text-3xl text-ink md:text-4xl">From hungry to booked in three steps</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-white p-7">
                <div className="font-display text-3xl text-ember">{s.n}</div>
                <h3 className="mt-3 font-display text-xl text-ink">{s.t}</h3>
                <p className="mt-2 text-sm text-inksoft">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-site py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>

      {/* LOCATION + CTA */}
      <section className="container-site pb-8">
        <div className="grid gap-8 rounded-2xl border border-line bg-white p-8 md:grid-cols-2">
          <div>
            <div className="eyebrow mb-2">Come find us</div>
            <h2 className="text-2xl text-ink">34 Orchard Street, Portland</h2>
            <p className="mt-3 text-sm text-inksoft">{SITE.hours} · Parking on Orange Lane · Step-free access</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <CTARow />
            </div>
          </div>
          <div className="relative h-56 overflow-hidden rounded-xl">
            <div className="flex h-full items-center justify-center bg-creamdark">
              <span className="text-5xl">📍</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
