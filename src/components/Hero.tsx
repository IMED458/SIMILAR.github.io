import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="similR editorial collection" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white"
        >
          <span className="inline-block text-sm font-bold uppercase tracking-[0.3em] mb-4 text-brand-accent">
            The similR Edit / 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
            ELEVATE YOUR <br />
            <span className="italic font-serif font-normal">Everyday</span> STYLE
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg font-light leading-relaxed">
            Discover a sharper wardrobe built around bold tailoring, premium textures, and effortless daily styling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="bg-white text-brand-primary px-10 py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-brand-accent hover:text-white transition-all group"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/shop?category=Accessories" 
              className="bg-transparent border border-white/30 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Explore Accessories
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
};
