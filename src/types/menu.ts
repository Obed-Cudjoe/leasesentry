// Type definitions for the menu and its filters.

export type Category = "starters" | "mains" | "sides" | "desserts" | "drinks";

// The allergens we can filter on (the "top 9").
export type Allergen =
  | "wheat"
  | "gluten"
  | "dairy"
  | "egg"
  | "fish"
  | "shellfish"
  | "peanut"
  | "tree nut"
  | "soy"
  | "sesame";

export type Diet = "gf" | "vegan" | "vegetarian" | "dairy-free" | "keto";

export interface Dish {
  slug: string;
  name: string;
  category: Category;
  price: number; // whole dollars, displayed as "$26"
  description: string;
  ingredients: string[];
  allergens: Allergen[];
  diets: Diet[];
  portion: string;
  sourcing: string;
  image: string; // unsplash URL
  isFeatured?: boolean;
  taste: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
