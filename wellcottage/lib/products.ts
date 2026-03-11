export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  woodFinish: string;
  material: string;
  weight: string;
  dimensions: string;
  description: string;
  shortDescription: string;
  images: string[];
  inStock: boolean;
  badge?: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish?: string;
}

export interface WishlistItem {
  productId: string;
}

export const WOOD_FINISHES = [
  { id: "simply-white", name: "Simply White", color: "#f5f0e4" },
  { id: "classic-grey", name: "Classic Grey", color: "#9ea399" },
  { id: "natural-pine", name: "Natural Pine", color: "#c4a46e" },
  { id: "walnut-brown", name: "Walnut Brown", color: "#8b6340" },
  { id: "dark-walnut", name: "Dark Walnut", color: "#4a3020" },
];

export const NAV_ITEMS = [
  { name: "Decor", href: "/category/decor" },
  { name: "Wall Organizers", href: "/category/wall-organizers" },
  { name: "Kitchen", href: "/category/kitchen" },
  { name: "Countertops", href: "/category/countertops" },
  { name: "Furniture", href: "/category/furniture" },
  { name: "Lighting", href: "/category/lighting" },
];

export const COUNTERTOP_PRODUCTS: Product[] = [
  {
    id: "ct-001",
    name: "Lyric",
    slug: "lyric",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1299,
    woodFinish: "Natural Pine",
    material: "Pine Wood",
    weight: "2kgs",
    dimensions: "30 x 20 x 15 cm",
    description:
      "The Lyric countertop organizer is a beautifully crafted wooden piece that brings warmth and function to your kitchen counter. Perfect for storing fruits, jars, or everyday essentials.",
    shortDescription: "Elegant countertop organizer with natural wood beauty",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
    ],
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "ct-002",
    name: "Emily",
    slug: "emily",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1349,
    woodFinish: "Dark Walnut",
    material: "Pine Wood",
    weight: "2kgs",
    dimensions: "35 x 22 x 18 cm",
    description:
      "Your go-to caddy for stylish storage, easy serving, and effortless organization. Emily combines rustic charm with modern functionality.",
    shortDescription: "Your go-to caddy for stylish storage",
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-003",
    name: "Beatrice",
    slug: "beatrice",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1199,
    woodFinish: "Walnut Brown",
    material: "Pine Wood",
    weight: "1.8kgs",
    dimensions: "28 x 18 x 14 cm",
    description:
      "Beatrice is a compact and stylish countertop basket that enhances your kitchen aesthetic while keeping things neat and accessible.",
    shortDescription: "Compact and stylish countertop basket",
    images: [
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-004",
    name: "Francine",
    slug: "francine",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1449,
    woodFinish: "Simply White",
    material: "Pine Wood",
    weight: "2.2kgs",
    dimensions: "40 x 25 x 20 cm",
    description:
      "Francine brings a touch of farmhouse elegance to your countertops with its generous size and beautiful whitewash finish.",
    shortDescription: "Farmhouse elegance for your countertops",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-005",
    name: "Audrey",
    slug: "audrey",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1249,
    woodFinish: "Classic Grey",
    material: "Pine Wood",
    weight: "1.9kgs",
    dimensions: "32 x 20 x 16 cm",
    description:
      "Audrey's classic grey finish makes her a versatile addition to any kitchen style. Effortlessly chic and highly functional.",
    shortDescription: "Versatile and effortlessly chic organizer",
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-006",
    name: "Penelope",
    slug: "penelope",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1399,
    woodFinish: "Natural Pine",
    material: "Pine Wood",
    weight: "2.1kgs",
    dimensions: "36 x 23 x 18 cm",
    description:
      "Penelope is crafted to perfection with natural pine wood, bringing the warmth of the forest into your home.",
    shortDescription: "Natural pine warmth for your kitchen",
    images: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-007",
    name: "Charlotte",
    slug: "charlotte",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1499,
    woodFinish: "Dark Walnut",
    material: "Pine Wood",
    weight: "2.3kgs",
    dimensions: "38 x 24 x 19 cm",
    description:
      "Charlotte exudes sophistication with her dark walnut stain. A statement piece for the discerning homemaker.",
    shortDescription: "Sophisticated dark walnut statement piece",
    images: [
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
    ],
    inStock: true,
    badge: "New",
  },
  {
    id: "ct-008",
    name: "Amelia",
    slug: "amelia",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1149,
    woodFinish: "Walnut Brown",
    material: "Pine Wood",
    weight: "1.7kgs",
    dimensions: "26 x 17 x 13 cm",
    description:
      "Amelia is the perfect petite organizer for smaller countertops, bringing big style to compact spaces.",
    shortDescription: "Petite organizer for compact spaces",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-009",
    name: "Calista",
    slug: "calista",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1599,
    woodFinish: "Simply White",
    material: "Pine Wood",
    weight: "2.4kgs",
    dimensions: "42 x 26 x 21 cm",
    description:
      "Calista is our most spacious countertop collection piece, ideal for larger kitchens that desire both style and ample storage.",
    shortDescription: "Spacious organizer for larger kitchens",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "ct-010",
    name: "Agatha",
    slug: "agatha",
    category: "Countertops",
    subcategory: "Countertop Unit",
    price: 1349,
    woodFinish: "Classic Grey",
    material: "Pine Wood",
    weight: "2kgs",
    dimensions: "33 x 21 x 16 cm",
    description:
      "Agatha brings timeless grey elegance to your kitchen. Her versatile finish works with any interior style.",
    shortDescription: "Timeless grey elegance for any interior",
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80",
    ],
    inStock: true,
  },
];

export const WALL_ORGANIZER_PRODUCTS: Product[] = [
  {
    id: "wo-001",
    name: "Layla",
    slug: "layla",
    category: "Wall Organizers",
    subcategory: "Kitchen Wall Unit",
    price: 2199,
    woodFinish: "Natural Pine",
    material: "Pine Wood",
    weight: "3.5kgs",
    dimensions: "60 x 40 x 12 cm",
    description:
      "Layla is a stunning wall organizer that transforms any blank wall into a functional display space. Perfect for a rustic mountain aesthetic.",
    shortDescription: "Stunning wall organizer for functional display",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
    ],
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "wo-002",
    name: "Quinn",
    slug: "quinn",
    category: "Wall Organizers",
    subcategory: "Kitchen Wall Unit",
    price: 2499,
    woodFinish: "Dark Walnut",
    material: "Pine Wood",
    weight: "4kgs",
    dimensions: "70 x 45 x 14 cm",
    description:
      "Quinn makes a bold statement with rich dark walnut finish. An artistic wall unit that is as beautiful as it is functional.",
    shortDescription: "Bold statement wall unit in dark walnut",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "wo-003",
    name: "Eleanor",
    slug: "eleanor",
    category: "Wall Organizers",
    subcategory: "Kitchen Wall Unit",
    price: 1899,
    woodFinish: "Simply White",
    material: "Pine Wood",
    weight: "3kgs",
    dimensions: "55 x 35 x 10 cm",
    description:
      "Eleanor is a delicate wall organizer with a crisp white finish, perfect for bright, airy kitchens and living spaces.",
    shortDescription: "Delicate wall organizer with white finish",
    images: [
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "wo-004",
    name: "Bristol",
    slug: "bristol",
    category: "Wall Organizers",
    subcategory: "Kitchen Wall Unit",
    price: 2299,
    woodFinish: "Walnut Brown",
    material: "Pine Wood",
    weight: "3.8kgs",
    dimensions: "65 x 42 x 13 cm",
    description:
      "Bristol brings a touch of British countryside charm to your walls. Warm walnut tones create a cozy, welcoming atmosphere.",
    shortDescription: "Countryside charm for your walls",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
    ],
    inStock: true,
  },
  {
    id: "wo-005",
    name: "Florentine",
    slug: "florentine",
    category: "Wall Organizers",
    subcategory: "Kitchen Wall Unit",
    price: 2799,
    woodFinish: "Classic Grey",
    material: "Pine Wood",
    weight: "4.5kgs",
    dimensions: "75 x 50 x 15 cm",
    description:
      "Florentine is our grandest wall organizer, inspired by Florentine artisanship. A showpiece that also works hard for you.",
    shortDescription: "Grand showpiece inspired by Florentine artisanship",
    images: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    inStock: true,
    badge: "Premium",
  },
];

export const ALL_PRODUCTS = [...COUNTERTOP_PRODUCTS, ...WALL_ORGANIZER_PRODUCTS];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}
