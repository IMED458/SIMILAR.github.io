export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  badges?: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type Category = 'Clothing' | 'Accessories' | 'New Arrivals' | 'Best Sellers' | 'Sale';
