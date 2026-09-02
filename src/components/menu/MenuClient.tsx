"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, DIETS, DISHES } from "@/lib/menu-data";
import { allergenLabel, dietLabel } from "@/lib/allergen-labels";
import DishCard from "./DishCard";
import { ALLERGENS } from "@/lib/menu-data";
import type { Diet } from "@/types/menu";

// The interactive filterable menu — the core of the whole concept.
export default function MenuClient() {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  function toggle(list: string[], setList: (l: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    return DISHES.filter((dish) => {
      if (activeCategory !== "all" && dish.category !== activeCategory) return false;
      // Exclude dishes containing any selected allergen.
      if (selectedAllergens.some((a) => dish.allergens.includes(a as never))) return false;
      // Include only dishes that satisfy ALL selected diets.
      if (selectedDiets.length && !selectedDiets.every((d) => dish.diets.includes(d as Diet))) return false;
      return true;
    });
  }, [selectedAllergens, selectedDiets, activeCategory]);

  const chipsClass = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-medium transition ${
      active ? "border-ember bg-ember text-white" : "border-line bg-white text-inksoft hover:border-ember"
    }`;

  return (
    <main className="container-site py-16">
      <div className="mb-8 max-w-2xl">
        <div className="eyebrow mb-2">Filter it your way</div>
        <h1 className="text-4xl text-ink">Our menu</h1>
        <p className="mt-3 text-inksoft">Choose what you can eat — and see the real ingredients, portion and all-in price for every dish. No hidden fees.</p>
      </div>

      {/* Category tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[{ id: "all", label: "All" }, ...CATEGORIES].map((c) => (
          <button key={c.id} onClick={() => setActiveCategory(c.id)} className={chipsClass(activeCategory === c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Allergen filters */}
      <div className="mb-4 rounded-2xl border border-line bg-white p-5">
        <div className="mb-2 text-sm font-semibold text-ink">I can't eat…</div>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <button key={a} onClick={() => toggle(selectedAllergens, setSelectedAllergens, a)} aria-pressed={selectedAllergens.includes(a)} className={chipsClass(selectedAllergens.includes(a))}>
              {allergenLabel[a]}
            </button>
          ))}
        </div>
      </div>

      {/* Diet filters */}
      <div className="mb-8 rounded-2xl border border-line bg-white p-5">
        <div className="mb-2 text-sm font-semibold text-ink">Choose a diet</div>
        <div className="flex flex-wrap gap-2">
          {DIETS.map((d) => (
            <button key={d.id} onClick={() => toggle(selectedDiets, setSelectedDiets, d.id)} aria-pressed={selectedDiets.includes(d.id)} className={chipsClass(selectedDiets.includes(d.id))}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count + reset */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-inksoft">
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} match your filters
        </p>
        {(selectedAllergens.length || selectedDiets.length || activeCategory !== "all") && (
          <button
            onClick={() => {
              setSelectedAllergens([]);
              setSelectedDiets([]);
              setActiveCategory("all");
            }}
            className="text-sm font-medium text-ember hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dish) => (
            <DishCard key={dish.slug} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-white p-12 text-center">
          <div className="mb-3 text-4xl">🥗</div>
          <h2 className="text-xl text-ink">No dishes match those filters right now</h2>
          <p className="mt-2 text-sm text-inksoft">Reset the filters, or ask us about a custom option for your needs.</p>
          <button onClick={() => { setSelectedAllergens([]); setSelectedDiets([]); }} className="btn btn-primary mt-5">Reset filters</button>
          <div className="mt-4">
            <Link href="/visit" className="text-sm font-medium text-ember hover:underline">Ask us about a meal →</Link>
          </div>
        </div>
      )}
    </main>
  );
}
