import Link from "next/link";
import { SITE } from "@/lib/site";
import Newsletter from "@/components/shared/Newsletter";

// Shared footer with quick links, contact details and a newsletter signup.
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-creamdark">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-xl font-bold text-ink">{SITE.name}</div>
          <p className="mt-3 max-w-xs text-sm text-inksoft">{SITE.tagline} Honest ingredients, true portions, no surprise fees.</p>
        </div>

        <div>
          <div className="eyebrow mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-inksoft">
            <li><Link href="/menu" className="hover:text-ember">Menu</Link></li>
            <li><Link href="/book" className="hover:text-ember">Book a table</Link></li>
            <li><Link href="/story" className="hover:text-ember">Our story</Link></li>
            <li><Link href="/about" className="hover:text-ember">About</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3">Visit</div>
          <ul className="space-y-2 text-sm text-inksoft">
            <li>{SITE.address}</li>
            <li>{SITE.city}</li>
            <li>{SITE.hours}</li>
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-ember">{SITE.phone}</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3">Stay in touch</div>
          <Newsletter />
          <div className="mt-4 flex gap-3 text-sm text-inksoft">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-ember">Instagram</a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="hover:text-ember">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-inksoft/70">
        © {new Date().getFullYear()} {SITE.name}. Built on the Menu Truth Engine — a menu you can trust.
      </div>
    </footer>
  );
}
