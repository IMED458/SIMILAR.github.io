import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist, addNotification } = useShop();
  const product = PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Product not found</h2>
        <Link to="/shop" className="inline-flex items-center rounded-full bg-brand-primary px-8 py-3 font-bold text-white">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuantity(1);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-brand-primary transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-brand-muted">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    activeImage === i ? "border-brand-primary" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-brand-accent text-brand-accent" : "text-gray-200")} />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 uppercase">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

            {/* Variants */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Color: {selectedColor}</h3>
                <div className="flex items-center space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 p-1 transition-all",
                        selectedColor === color.name ? "border-brand-primary" : "border-transparent"
                      )}
                    >
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest">Size</h3>
                  <button
                    type="button"
                    onClick={() => addNotification('Use your usual fit for this collection. Size guide details are coming soon.', 'info')}
                    className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[60px] h-12 border-2 rounded-xl font-bold transition-all",
                        selectedSize === size ? "border-brand-primary bg-brand-primary text-white" : "border-gray-100 hover:border-gray-300"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl px-4 py-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-brand-accent"><Minus className="w-4 h-4" /></button>
                <span className="mx-6 font-bold w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-brand-accent"><Plus className="w-4 h-4" /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-brand-charcoal transition-all shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Bag</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "p-4 border-2 rounded-2xl transition-all",
                  isWishlisted ? "bg-brand-accent border-brand-accent text-white" : "border-gray-100 hover:border-gray-300"
                )}
              >
                <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: RotateCcw, text: "30-Day Returns" },
                { icon: ShieldCheck, text: "Secure Payment" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-32">
          <h2 className="text-3xl font-display font-bold mb-12 uppercase tracking-tight">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
};
