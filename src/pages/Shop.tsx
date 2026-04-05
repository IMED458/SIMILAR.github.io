import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const activeCategory = searchParams.get('category') || 'All';

  const categories = ['All', 'Clothing', 'Accessories', 'New Arrivals', 'Best Sellers', 'Sale'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', 'One Size'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size],
    );
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSortBy('newest');
    setSearchParams({});
  };

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };
  
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory !== 'All') {
      if (activeCategory === 'New Arrivals') result = result.filter(p => p.isNew);
      else if (activeCategory === 'Best Sellers') result = result.filter(p => p.isBestSeller);
      else if (activeCategory === 'Sale') result = result.filter(p => p.originalPrice);
      else result = result.filter(p => p.category === activeCategory);
    }
    if (selectedSizes.length > 0) {
      result = result.filter(product => product.sizes.some(size => selectedSizes.includes(size)));
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, selectedSizes, sortBy]);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-display font-bold tracking-tight uppercase">{activeCategory}</h1>
          <p className="text-gray-500 mt-2">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-y py-6 mb-12 gap-6">
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeCategory === cat ? "bg-brand-primary text-white" : "bg-brand-muted text-brand-charcoal hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
            <button type="button" onClick={() => setIsFilterOpen(true)} className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:text-brand-accent">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters{selectedSizes.length > 0 ? ` (${selectedSizes.length})` : ''}</span>
            </button>
            <label className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
              <span>Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-brand-accent"
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price Low</option>
                <option value="price-high">Price High</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[110] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Filters</h2>
                <button type="button" onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-10">
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "min-w-[56px] h-12 border rounded-lg px-3 flex items-center justify-center text-sm transition-colors",
                          selectedSizes.includes(size)
                            ? "bg-brand-primary border-brand-primary text-white"
                            : "border-gray-200 hover:border-brand-accent"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t grid grid-cols-2 gap-4">
                <button type="button" onClick={resetFilters} className="py-4 border rounded-full font-bold text-sm uppercase tracking-widest">Reset</button>
                <button type="button" onClick={() => setIsFilterOpen(false)} className="py-4 bg-brand-primary text-white rounded-full font-bold text-sm uppercase tracking-widest">Apply</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
