import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/types/menu";

// Reusable dish card — shows name, price, diet/allergen pills, portion.
export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/menu/${dish.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-ink">{dish.name}</h3>
          <span className="whitespace-nowrap font-bold text-ember">${dish.price}</span>
        </div>
        <p className="mt-2 flex-1 text-sm text-inksoft">{dish.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {dish.diets.slice(0, 2).map((d) => (
            <span key={d} className="rounded-full bg-creamdark px-2.5 py-1 text-[11px] font-medium text-moss uppercase">{d}</span>
          ))}
          <span className="rounded-full bg-creamdark px-2.5 py-1 text-[11px] font-medium text-inksoft">{dish.portion}</span>
        </div>
      </div>
    </Link>
  );
}
