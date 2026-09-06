export type CategoryId = "hot" | "cold" | "pastry" | "snack";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  tags: string[];
  featured?: boolean;
  quote?: string;
}

const img = (hash: string) =>
  `https://image.qwenlm.ai/generated-images/${hash}/_result.png`;

export const IMAGES = {
  hero: img("d52e3c1a-1965-4754-aa26-6bfa040541db"),
  espresso: img("8f0f38dd-6489-4e1a-bae2-13a55316130c"),
  cappuccino: img("90ff955e-5569-4c9b-8057-624d348e28d4"),
  caramelLatte: img("d877314b-e4c1-422a-b2ec-c792d257b061"),
  mocha: img("17e7a514-827f-45bc-9f2b-a50148262c6d"),
  iced: img("535a6183-babc-47be-a91f-8ec4f83ef70f"),
  matcha: img("7d0dd0ac-4f59-4a2b-941d-10e37c571b99"),
  croissant: img("1cee0fa3-0252-4854-be7a-0164a18b8123"),
  muffin: img("d148e3fb-ed79-40d4-9caa-0503313c9343"),
  toast: img("713abdd1-3c86-47a4-a214-2a3d257c6b52"),
};

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hot", label: "Hot Coffee" },
  { id: "cold", label: "Cold Drinks" },
  { id: "pastry", label: "Pastries" },
  { id: "snack", label: "Snacks" },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  hot: "Hot Coffee",
  cold: "Cold Drinks",
  pastry: "Pastries",
  snack: "Snacks",
};

export const MENU: MenuItem[] = [
  {
    id: "espresso",
    name: "Espresso Doppio",
    description:
      "A double shot of our house blend — dark cherry, cocoa nib, and a long caramel finish.",
    price: 3.2,
    image: IMAGES.espresso,
    category: "hot",
    tags: ["classic", "bold"],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description:
      "Velvet microfoam over a double shot, dusted with single-origin cocoa. The house anthem.",
    price: 4.5,
    image: IMAGES.cappuccino,
    category: "hot",
    tags: ["signature"],
    featured: true,
    quote: "“The foam could hold a coin.” — a regular",
  },
  {
    id: "caramel-latte",
    name: "Caramel Latte",
    description:
      "Slow-steamed milk and espresso under house-made caramel with a whisper of sea salt.",
    price: 5.1,
    image: IMAGES.caramelLatte,
    category: "hot",
    tags: ["sweet", "bestseller"],
    featured: true,
    quote: "“Dangerously easy to drink.” — Mara, co-founder",
  },
  {
    id: "mocha",
    name: "Midnight Mocha",
    description:
      "70% dark chocolate melted into espresso, capped with lightly whipped cream.",
    price: 5.4,
    image: IMAGES.mocha,
    category: "hot",
    tags: ["rich"],
  },
  {
    id: "iced-americano",
    name: "Iced Americano",
    description:
      "Double shot poured over alpine ice and cold spring water. Clean, crisp, honest.",
    price: 3.8,
    image: IMAGES.iced,
    category: "cold",
    tags: ["crisp"],
  },
  {
    id: "matcha",
    name: "Matcha Cloud Latte",
    description:
      "Ceremonial-grade matcha whisked with oat milk and a vanilla cloud foam.",
    price: 5.6,
    image: IMAGES.matcha,
    category: "cold",
    tags: ["caffeine-free option", "oat milk"],
    featured: true,
    quote: "“Green, dreamy, gone in a minute.” — a regular",
  },
  {
    id: "cold-brew",
    name: "Honey Cold Brew",
    description:
      "An 18-hour steep sweetened with raw wildflower honey and a splash of cream.",
    price: 4.9,
    image: IMAGES.iced,
    category: "cold",
    tags: ["smooth"],
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    description:
      "Twenty-seven layers of French butter, laminated by hand and baked at dawn.",
    price: 3.4,
    image: IMAGES.croissant,
    category: "pastry",
    tags: ["baked 6 AM"],
    featured: true,
    quote: "“Flakes on the keyboard, zero regrets.” — a regular",
  },
  {
    id: "muffin",
    name: "Blueberry Muffin",
    description:
      "Wild blueberries folded into a brown-sugar crumb that refuses to stay in the case.",
    price: 3.9,
    image: IMAGES.muffin,
    category: "pastry",
    tags: ["weekend special"],
  },
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    description:
      "Yesterday's croissant, reborn: frangipane, flaked almonds, a second bake.",
    price: 4.2,
    image: IMAGES.croissant,
    category: "pastry",
    tags: ["sweet"],
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description:
      "Smashed avocado, pickled chilli and toasted seeds on sourdough from down the street.",
    price: 7.8,
    image: IMAGES.toast,
    category: "snack",
    tags: ["vegan"],
  },
  {
    id: "ricotta-toast",
    name: "Whipped Ricotta Toast",
    description:
      "Whipped ricotta, thyme honey and cracked pepper on warm sourdough.",
    price: 6.9,
    image: IMAGES.toast,
    category: "snack",
    tags: ["vegetarian"],
  },
];

export const FEATURED = MENU.filter((m) => m.featured);
