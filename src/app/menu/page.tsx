import MenuClient from "@/components/menu/MenuClient";

export const metadata = {
  title: "Menu — Harvest & Ember",
  description: "Filter our honest menu by what you can safely eat. Every dish lists real ingredients, portion size and the true all-in price.",
};

// Menu page — server-rendered shell; the interactive filter logic is in MenuClient.
export default function MenuPage() {
  return <MenuClient />;
}
