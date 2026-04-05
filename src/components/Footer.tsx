import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { addNotification } = useShop();

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNotification('Thanks for subscribing to similR updates.', 'info');
    event.currentTarget.reset();
  };

  const handleSupportClick = () => {
    addNotification('Support pages are on the way. Use the About page contact form for help.', 'info');
  };

  return (
    <footer className="bg-white border-t pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link to="/" className="font-display text-3xl font-bold tracking-tighter">similR</Link>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              Elevated wardrobe essentials for people who want clean silhouettes, strong materials, and a confident everyday look.
            </p>
            <div className="flex items-center space-x-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => addNotification('similR social channels are launching soon.', 'info')}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"
                  aria-label="Social channel coming soon"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Shop</h4>
            <ul className="space-y-4">
              {[
                { label: 'All Collections', path: '/shop' },
                { label: 'New Arrivals', path: '/shop?category=New Arrivals' },
                { label: 'Best Sellers', path: '/shop?category=Best Sellers' },
                { label: 'Clothing', path: '/shop?category=Clothing' },
                { label: 'Accessories', path: '/shop?category=Accessories' },
                { label: 'Sale', path: '/shop?category=Sale' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-500 hover:text-brand-primary transition-colors flex items-center group">
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Customer Service</h4>
            <ul className="space-y-4">
              {[
                { label: 'Contact Us', path: '/about' },
                { label: 'Shipping Info' },
                { label: 'Returns & Exchanges' },
                { label: 'Size Guide', path: '/shop' },
                { label: 'FAQ', path: '/about' },
                { label: 'Order Tracking', path: '/account' },
              ].map(item => (
                <li key={item.label}>
                  {item.path ? (
                    <Link to={item.path} className="text-gray-500 hover:text-brand-primary transition-colors">{item.label}</Link>
                  ) : (
                    <button type="button" onClick={handleSupportClick} className="text-gray-500 hover:text-brand-primary transition-colors">
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-gray-500 mb-6 text-sm">Join our circle for exclusive updates and early access.</p>
            <form className="relative" onSubmit={handleNewsletterSubmit}>
              <input 
                name="email"
                type="email" 
                placeholder="Your email" 
                className="w-full bg-brand-muted rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                required
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            © 2026 similR. All rights reserved.
          </p>
          <div className="flex items-center space-x-8">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
              <button
                key={item}
                type="button"
                onClick={() => addNotification(`${item} details will be published soon.`, 'info')}
                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
