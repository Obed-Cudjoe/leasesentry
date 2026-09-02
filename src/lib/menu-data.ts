import type { Dish, Testimonial, Category, Allergen, Diet } from "@/types/menu";

// ------------------------------------------------------------------
// MENU DATA — single source of truth for the demo.
// Prices are the "all-in" price you actually pay (no service fee).
// Update this file to change the menu; the pages render it automatically.
// ------------------------------------------------------------------

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "sides", label: "Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export const ALLERGENS: Allergen[] = [
  "wheat",
  "gluten",
  "dairy",
  "egg",
  "fish",
  "shellfish",
  "peanut",
  "tree nut",
  "soy",
  "sesame",
];

export const DIETS: { id: Diet; label: string }[] = [
  { id: "gf", label: "Gluten-free" },
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto" },
];

export const DISHES: Dish[] = [
  {
    slug: "wood-fired-trout",
    name: "Wood-Fired Trout",
    category: "mains",
    price: 26,
    description: "Whole line-caught trout, roasted over oak, with charred lemon and fresh herbs.",
    ingredients: ["line-caught trout", "roasted seasonal vegetables", "lemon", "fresh dill", "olive oil"],
    allergens: ["fish"],
    diets: ["gf", "dairy-free", "keto"],
    portion: "Generous single main",
    sourcing: "Local day-boat, supplied weekly",
    taste: "Light and smoky, bright citrus finish",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
  },
  {
    slug: "charred-cauliflower-steak",
    name: "Charred Cauliflower Steak",
    category: "mains",
    price: 19,
    description: "Thick-cut cauliflower seared hard, romesco, toasted seeds and micro herbs.",
    ingredients: ["cauliflower", "romesco sauce", "toasted seeds", "micro herbs"],
    allergens: ["tree nut"],
    diets: ["vegan", "vegetarian", "gf", "dairy-free"],
    portion: "Single hearty main",
    sourcing: "Seasonal produce from local growers",
    taste: "Smoky and nutty with a sweet roasted edge",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
  },
  {
    slug: "hand-rolled-ricotta-gnocchi",
    name: "Hand-Rolled Ricotta Gnocchi",
    category: "mains",
    price: 22,
    description: "Cloud-soft ricotta gnocchi, sage butter, aged parmesan and toasted hazelnut.",
    ingredients: ["ricotta", "flour", "sage", "butter", "aged parmesan", "hazelnut"],
    allergens: ["wheat", "gluten", "dairy", "tree nut", "egg"],
    diets: ["vegetarian"],
    portion: "Comforting single main",
    sourcing: "Ricotta from a small local dairy",
    taste: "Rich and buttery, gently nutty",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
  },
  {
    slug: "roasted-beet-and-goat-cheese-salad",
    name: "Roasted Beet & Goat Cheese Salad",
    category: "starters",
    price: 14,
    description: "Heritage beets, whipped goat cheese, candied walnuts and a sherry vinaigrette.",
    ingredients: ["heritage beets", "goat cheese", "walnuts", "sherry vinegar", "greens"],
    allergens: ["dairy", "tree nut"],
    diets: ["vegetarian", "gf"],
    portion: "Shareable starter",
    sourcing: "Beets from a nearby farm",
    taste: "Earthy and tangy with a sweet crunch",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "smoked-salmon-farro",
    name: "Smoked Salmon & Farro Bowl",
    category: "mains",
    price: 24,
    description: "Cured salmon, pearled farro, pickled red onion and a dill yogurt.",
    ingredients: ["smoked salmon", "farro", "red onion", "yogurt", "dill"],
    allergens: ["fish", "dairy", "wheat"],
    diets: [],
    portion: "Filling single main",
    sourcing: "Cold-smoked from a coastal smokehouse",
    taste: "Bright and briny with a creamy finish",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "heirloom-tomato-tartine",
    name: "Heirloom Tomato Tartine",
    category: "starters",
    price: 13,
    description: "Sourdough, whipped feta, heirloom tomatoes, basil oil and sea salt.",
    ingredients: ["sourdough", "feta", "heirloom tomato", "basil", "olive oil"],
    allergens: ["wheat", "gluten", "dairy"],
    diets: ["vegetarian"],
    portion: "Shareable starter",
    sourcing: "Tomatoes from a local market garden",
    taste: "Fresh and sweet with a creamy, salty base",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "charcoal-grilled-skirt-steak",
    name: "Charcoal-Grilled Skirt Steak",
    category: "mains",
    price: 32,
    description: "Grass-fed skirt steak, chimichurri, blistered peppers and crispy potatoes.",
    ingredients: ["skirt steak", "chimichurri", "blistered peppers", "potatoes"],
    allergens: [],
    diets: ["gf", "dairy-free", "keto"],
    portion: "Hearty single main",
    sourcing: "Grass-fed, whole-animal program",
    taste: "Deep charcoal char, herbaceous chimichurri",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "roasted-seasonal-vegetables",
    name: "Roasted Seasonal Vegetables",
    category: "sides",
    price: 9,
    description: "Whatever's best that week — roasted with a smoked paprika salt and lemon.",
    ingredients: ["seasonal vegetables", "smoked paprika", "lemon", "olive oil"],
    allergens: [],
    diets: ["vegan", "vegetarian", "gf", "dairy-free", "keto"],
    portion: "Shareable side",
    sourcing: "From our partner farms",
    taste: "Caramelised, smoky and bright",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "dark-chocolate-tart",
    name: "Dark Chocolate & Olive Oil Tart",
    category: "desserts",
    price: 11,
    description: "Bitter chocolate ganache, olive oil, flaky sea salt and hazelnut praline.",
    ingredients: ["dark chocolate", "olive oil", "hazelnut", "sea salt"],
    allergens: ["tree nut", "dairy", "soy", "wheat", "egg", "gluten"],
    diets: ["vegetarian", "dairy-free"],
    portion: "Single dessert",
    sourcing: "Single-origin dark chocolate",
    taste: "Bitter, silky and deeply indulgent",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "smoked-pear-crumble",
    name: "Smoked Pear Crumble",
    category: "desserts",
    price: 10,
    description: "Warm pears, oat-almond crumble and a vanilla bean cream.",
    ingredients: ["pear", "oats", "almond", "vanilla cream"],
    allergens: ["dairy", "tree nut", "gluten", "wheat", "egg"],
    diets: ["vegetarian"],
    portion: "Single dessert",
    sourcing: "Pears from a hillside orchard",
    taste: "Smoky-sweet with a crisp, buttery top",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "elderflower-spritz",
    name: "Elderflower Spritz",
    category: "drinks",
    price: 12,
    description: "Elderflower, sparkling wine, soda and a twist of lemon.",
    ingredients: ["elderflower", "sparkling wine", "soda", "lemon"],
    allergens: [],
    diets: ["vegan", "vegetarian", "gf", "dairy-free"],
    portion: "Single glass",
    sourcing: "House-made elderflower cordial",
    taste: "Light, floral and crisp",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "cold-brew-tonic",
    name: "Cold Brew Tonic",
    category: "drinks",
    price: 9,
    description: "Cold brew coffee, tonic, and a strip of orange zest.",
    ingredients: ["cold brew", "tonic", "orange"],
    allergens: [],
    diets: ["vegan", "vegetarian", "gf", "dairy-free", "keto"],
    portion: "Single glass",
    sourcing: "Local roastery",
    taste: "Bitter, bright and refreshing",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  },
];

// ------------------------------------------------------------------
// TESTIMONIALS — shown on Home and About.
// ------------------------------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Finally a place that takes my gluten issue seriously. Every dish I could see was safe — and it actually tasted great.",
    name: "Sam R.",
    role: "Verified diner",
  },
  {
    quote:
      "I knew the portion, the ingredients and the price before I sat down. No surprise fees, no guessing. I booked again the next week.",
    name: "Priya K.",
    role: "Verified diner",
  },
  {
    quote:
      "The menu filter is the reason my whole family comes here — everyone finds something they can eat, and it's all delicious.",
    name: "Miguel T.",
    role: "Verified diner",
  },
];

// ------------------------------------------------------------------
// VALUES — shown on the About page.
// ------------------------------------------------------------------
export const VALUES = [
  { title: "Radical transparency", text: "The menu says everything it can — ingredients, portion, sourcing and the real price." },
  { title: "Real ingredients", text: "Seasonal, sustainable, sourced from people we know. When we say it, we mean it." },
  { title: "True hospitality", text: "We serve the guest, not the booking quota. You're never rushed, never surprised." },
];

export function getDishesByCategory(category: Category): Dish[] {
  return DISHES.filter((d) => d.category === category);
}

export function getDishBySlug(slug: string): Dish | undefined {
  return DISHES.find((d) => d.slug === slug);
}
