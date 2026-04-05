import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { cn } from '../lib/utils';
import { BrandLogo } from './BrandLogo';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, wishlist, setIsCartOpen } = useShop();
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New In', path: '/shop?category=New Arrivals' },
    { name: 'Clothing', path: '/shop?category=Clothing' },
    { name: 'Accessories', path: '/shop?category=Accessories' },
  ];

  const isNavActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.search;
    if (path === '/shop') return location.pathname === '/shop' && !location.search;
    return currentPath === path;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link 
          to="/" 
          className="inline-flex items-center"
          aria-label="similR home"
        >
          <BrandLogo imageClassName="h-9 sm:h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-accent",
                isNavActive(link.path) ? "text-brand-accent" : "text-brand-charcoal"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/shop" className="p-2 hover:text-brand-accent transition-colors hidden sm:block" aria-label="Browse catalog">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/account" className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:text-brand-accent transition-colors relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full" />
            )}
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:text-brand-accent transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[70] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <BrandLogo imageClassName="h-10" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium tracking-wide uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t space-y-4">
                <Link to="/account" className="flex items-center space-x-3 text-lg">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </Link>
                <Link to="/shop" className="flex items-center space-x-3 text-lg">
                  <Search className="w-5 h-5" />
                  <span>Browse Catalog</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
