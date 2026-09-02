import Image from "next/image";
import { SITE } from "@/lib/site";
import { VALUES, TESTIMONIALS } from "@/lib/menu-data";
import TestimonialCard from "@/components/shared/TestimonialCard";
import CTARow from "@/components/shared/CTARow";
import SectionHeading from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "The people and values behind Harvest & Ember — a menu you can trust, from cooks who cook for real.",
  path: "/about",
});

const TEAM = [
  { name: "Elena Marsh", role: "Head Chef & Founder", bio: "Twelve years, farmer's-market-first. Believes a good menu should answer questions before a guest asks them.", img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=400&q=80" },
  { name: "Dev Okafor", role: "General Manager", bio: "The face you'll remember and the reason the floor runs calm. Leads the 'no surprises' promise.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
];

export default function AboutPage() {
  return (
    <main className="container-site py-16">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          center
          eyebrow="About"
          title="A menu you can trust, from people who cook for real."
          subline="We started Harvest & Ember because we got tired of guessing. What's in this dish? How big is it really? Is the price honest? We put every answer on the menu."
        />
      </div>

      {/* Values */}
      <div className="grid gap-6 md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-2xl border border-line bg-white p-7">
            <h3 className="font-display text-xl text-ink">{v.title}</h3>
            <p className="mt-3 text-sm text-inksoft">{v.text}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {TEAM.map((member) => (
          <div key={member.name} className="flex gap-5 rounded-2xl border border-line bg-white p-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <Image src={member.img} alt={member.name} fill className="object-cover" sizes="96px" />
            </div>
            <div>
              <h3 className="font-display text-lg text-ink">{member.name}</h3>
              <div className="text-sm font-medium text-ember">{member.role}</div>
              <p className="mt-2 text-sm text-inksoft">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-16">
        <SectionHeading eyebrow="What guests say" title="People who eat here come back." />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <CTARow primary={{ href: "/menu", label: "Browse the menu" }} secondary={{ href: "/book", label: "Book a table" }} />
      </div>
    </main>
  );
}
