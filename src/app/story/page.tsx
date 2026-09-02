import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import CTARow from "@/components/shared/CTARow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eat Real Story",
  description: "Where Harvest & Ember's ingredients come from, our kitchen & hygiene standards, and the sourcing that justifies every plate.",
  path: "/story",
});

const SUPPLIERS = [
  { name: "Ridge Farm", region: "Willamette Valley · produce", icon: "🌾" },
  { name: "Daybreak Catch", region: "Oregon coast · line-caught fish", icon: "🐟" },
  { name: "Hearthstone Bakery", region: "Portland · daily sourdough", icon: "🥖" },
  { name: "Bright Dairy", region: "Local · ricotta, butter, cream", icon: "🥛" },
];

const STANDARDS = [
  "Full ingredient traceability on every plate",
  "Dedicated prep area for allergen handling",
  "Colour-coded prep boards and daily kitchen clean-down",
  "Seasonal menu that rotates with what's actually good",
];

export default function StoryPage() {
  return (
    <main className="container-site py-16">
      <SectionHeading
        eyebrow="Eat real story"
        title="Good food starts before the kitchen."
        subline="We know where our ingredients come from — and we'll tell you. That's the whole point of this place."
      />

      {/* Suppliers */}
      <div className="grid gap-6 md:grid-cols-2">
        {SUPPLIERS.map((s) => (
          <div key={s.name} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-6">
            <div className="text-3xl">{s.icon}</div>
            <div>
              <div className="font-semibold text-ink">{s.name}</div>
              <div className="text-sm text-inksoft">{s.region}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Standards */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-8">
          <h2 className="font-display text-2xl text-ink">Kitchen & hygiene standards</h2>
          <ul className="mt-5 space-y-3">
            {STANDARDS.map((s) => (
              <li key={s} className="flex gap-3 text-sm text-inksoft"><span className="text-moss">✓</span>{s}</li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=80"
            alt="A dish at Harvest & Ember"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Origin examples */}
      <div className="mt-16">
        <h2 className="mb-6 font-display text-2xl text-ink">Where it comes from</h2>
        <div className="overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-creamdark">
              <tr><th className="px-5 py-3 font-medium text-ink">Dish</th><th className="px-5 py-3 font-medium text-ink">Key ingredient</th><th className="px-5 py-3 font-medium text-ink">Source</th></tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              <tr><td className="px-5 py-3">Wood-Fired Trout</td><td className="px-5 py-3">Trout</td><td className="px-5 py-3">Daybreak Catch, local coast</td></tr>
              <tr><td className="px-5 py-3">Heirloom Tomato Tartine</td><td className="px-5 py-3">Tomatoes</td><td className="px-5 py-3">Ridge Farm</td></tr>
              <tr><td className="px-5 py-3">Ricotta Gnocchi</td><td className="px-5 py-3">Ricotta</td><td className="px-5 py-3">Bright Dairy</td></tr>
              <tr><td className="px-5 py-3">Sourdough</td><td className="px-5 py-3">Flour</td><td className="px-5 py-3">Hearthstone Bakery</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <CTARow />
      </div>
    </main>
  );
}
