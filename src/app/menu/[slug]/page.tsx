import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DISHES, getDishBySlug } from "@/lib/menu-data";
import { allergenLabel, dietLabel } from "@/lib/allergen-labels";

// Generate one static page per dish for SEO (e.g. "gluten-free trout" long-tail).
export function generateStaticParams() {
  return DISHES.map((d) => ({ slug: d.slug }));
}

// In Next 15, `params` is a Promise — await it.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) return {};
  return { title: `${dish.name} — Harvest & Ember`, description: dish.description };
}

export default async function DishPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) notFound();

  return (
    <main className="container-site py-16">
      <Link href="/menu" className="text-sm font-medium text-inksoft hover:text-ember">← Back to menu</Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={dish.image} alt={dish.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
        </div>

        <div>
          <div className="eyebrow mb-2">{dish.category}</div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl text-ink md:text-4xl">{dish.name}</h1>
            <span className="whitespace-nowrap text-2xl font-bold text-ember">${dish.price}</span>
          </div>

          <p className="mt-4 text-lg text-inksoft">{dish.description}</p>

          <div className="mt-6 space-y-5 border-t border-line pt-6">
            <div>
              <div className="text-sm font-semibold text-ink">Ingredients</div>
              <p className="mt-1 text-inksoft">{dish.ingredients.join(", ")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-ink">Portion</div>
                <p className="mt-1 text-inksoft">{dish.portion}</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Sourcing</div>
                <p className="mt-1 text-inksoft">{dish.sourcing}</p>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">Taste</div>
              <p className="mt-1 text-inksoft">{dish.taste}</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">Allergens</div>
              <p className="mt-1 text-inksoft">{dish.allergens.length ? dish.allergens.map((a) => allergenLabel[a]).join(", ") : "None of the top allergens"}</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">Dietary</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {dish.diets.length ? dish.diets.map((d) => (
                  <span key={d} className="rounded-full bg-creamdark px-3 py-1 text-xs font-medium text-moss uppercase">{dietLabel[d]}</span>
                )) : <span className="text-inksoft">None specified</span>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/book" className="btn btn-primary">Book this table</Link>
            <Link href="/menu" className="btn btn-outline">Browse again</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
