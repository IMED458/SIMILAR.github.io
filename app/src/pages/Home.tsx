import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useShop } from '../context/ShopContext';

export const Home = () => {
  const { addNotification } = useShop();
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNotification('Thanks for joining the similR list.', 'info');
    event.currentTarget.reset();
  };

  return (
    <div className="pb-20">
      <Hero />

      {/* Trust Badges */}
      <section className="py-12 border-b bg-brand-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $200" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: CreditCard, title: "Flexible Payment", desc: "Buy now, pay later" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2">
                <item.icon className="w-6 h-6 text-brand-accent" />
                <h3 className="text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">Curated Collections</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 tracking-tight">SHOP BY CATEGORY</h2>
          </div>
          <Link to="/shop" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest border-b-2 border-brand-primary pb-1">
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Clothing", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop", size: "md:col-span-2" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000&auto=format&fit=crop", size: "" },
            { name: "New Arrivals", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop", size: "" },
            { name: "Best Sellers", img: "https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=1000&auto=format&fit=crop", size: "md:col-span-2" }
          ].map((cat, i) => (
            <Link 
              key={i} 
              to={`/shop?category=${cat.name}`}
              className={cn("relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-auto h-[400px]", cat.size)}
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-display font-bold text-white mb-2">{cat.name}</h3>
                <span className="text-white/80 text-sm font-medium uppercase tracking-widest flex items-center space-x-2">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-brand-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">Most Loved</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 tracking-tight">BEST SELLERS</h2>
            <p className="text-gray-500 mt-4">Discover the pieces our community can't get enough of. Timeless designs, exceptional quality.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" 
                alt="Brand Story" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-80 bg-brand-beige rounded-3xl overflow-hidden hidden md:block shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1000&auto=format&fit=crop" 
                alt="Detail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">Our Philosophy</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight">
              CRAFTED FOR THE <br />
              <span className="italic font-serif font-normal">Modern</span> INDIVIDUAL
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              similR builds premium essentials for people who want every outfit to feel intentional. We focus on confident silhouettes, tactile fabrics, and pieces that stay relevant long after the season changes.
            </p>
            <div className="pt-4">
              <Link 
                to="/about" 
                className="bg-brand-primary text-white px-10 py-4 rounded-full font-bold inline-flex items-center space-x-2 hover:bg-brand-accent transition-all group"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-brand-charcoal text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">JOIN THE similR EDIT</h2>
          <p className="text-white/60 mb-10 text-lg">Subscribe to receive exclusive early access to new collections, seasonal sales, and style inspiration.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
            <input 
              name="email"
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors"
              required
            />
            <button type="submit" className="bg-white text-brand-primary px-8 py-4 rounded-full font-bold hover:bg-brand-accent hover:text-white transition-all">
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-xs text-white/40">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
        </div>
      </section>
    </div>
  );
};
