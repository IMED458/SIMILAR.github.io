import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { wishlist } = useShop();
  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-display font-bold tracking-tight uppercase">Your Wishlist</h1>
          <p className="text-gray-500 mt-2">
            {wishlistedProducts.length === 0 
              ? "Your wishlist is currently empty." 
              : `You have ${wishlistedProducts.length} items saved.`}
          </p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-8">
            <div className="w-24 h-24 bg-brand-muted rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-display font-bold">SAVE YOUR FAVORITES</h2>
              <p className="text-gray-500 mt-4">
                Keep track of the pieces you love. Add items to your wishlist and they'll appear here.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="inline-flex items-center space-x-2 bg-brand-primary text-white px-10 py-4 rounded-full font-bold hover:bg-brand-charcoal transition-all group"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
