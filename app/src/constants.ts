import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Wool Overcoat",
    price: 850,
    originalPrice: 1200,
    description: "A timeless silhouette crafted from premium Italian wool. Designed for the modern individual who values both form and function.",
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Camel", hex: "#C19A6B" }
    ],
    badges: ["New", "Premium"],
    rating: 4.9,
    reviewsCount: 124,
    inStock: true,
    isNew: true
  },
  {
    id: "2",
    name: "Silk Slip Dress",
    price: 420,
    description: "Effortless elegance in pure mulberry silk. A versatile piece that transitions seamlessly from day to evening.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Midnight", hex: "#191970" },
      { name: "Champagne", hex: "#F7E7CE" }
    ],
    rating: 4.8,
    reviewsCount: 89,
    inStock: true,
    isBestSeller: true
  },
  {
    id: "3",
    name: "Sculptural Gold Earrings",
    price: 280,
    description: "Handcrafted 18k gold plated earrings inspired by contemporary architectural forms.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019058353-524007605225?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "Accessories",
    subCategory: "Jewelry",
    sizes: ["One Size"],
    colors: [
      { name: "Gold", hex: "#D4AF37" }
    ],
    rating: 5.0,
    reviewsCount: 45,
    inStock: true
  },
  {
    id: "4",
    name: "Structured Leather Tote",
    price: 650,
    description: "The ultimate everyday companion. Crafted from full-grain vegetable-tanned leather with a minimalist aesthetic.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "Accessories",
    subCategory: "Bags",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Tan", hex: "#D2B48C" }
    ],
    rating: 4.7,
    reviewsCount: 210,
    inStock: true,
    isBestSeller: true
  },
  {
    id: "5",
    name: "Cashmere Turtleneck",
    price: 350,
    description: "Unparalleled softness and warmth. Sourced from the finest Mongolian cashmere.",
    images: [
      "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Knitwear",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Grey", hex: "#808080" }
    ],
    rating: 4.9,
    reviewsCount: 67,
    inStock: true,
    isNew: true
  },
  {
    id: "6",
    name: "Tailored Linen Trousers",
    price: 220,
    description: "Breathable European linen with a sharp, tailored fit. Perfect for warm-weather sophistication.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "Clothing",
    subCategory: "Trousers",
    sizes: ["28", "30", "32", "34"],
    colors: [
      { name: "Sand", hex: "#C2B280" },
      { name: "White", hex: "#FFFFFF" }
    ],
    rating: 4.6,
    reviewsCount: 52,
    inStock: true
  }
];
