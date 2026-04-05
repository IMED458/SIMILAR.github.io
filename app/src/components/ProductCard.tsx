import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-muted rounded-2xl">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {product.images[1] && (
            <img 
              src={product.images[1]} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-brand-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={cn(
              "p-3 rounded-full shadow-lg transition-all hover:scale-110",
              isWishlisted ? "bg-brand-accent text-white" : "bg-white text-brand-charcoal"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button 
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name)}
            className="w-full bg-white/90 backdrop-blur-md text-brand-primary py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-brand-primary hover:text-white transition-all shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">Quick Add</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{product.subCategory}</p>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-brand-charcoal hover:text-brand-accent transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <p className="font-bold text-brand-charcoal">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewsCount})</span>
        </div>
      </div>
    </motion.div>
  );
};
