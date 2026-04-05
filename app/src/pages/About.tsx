import React from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const About = () => {
  const { addNotification } = useShop();

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNotification('Thanks for contacting similR. We will be in touch shortly.', 'success');
    event.currentTarget.reset();
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <div className="max-w-4xl mb-24">
          <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-12">
            REDEFINING <br />
            <span className="italic font-serif font-normal">Modern</span> STYLE
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
            similR was created for people who want their wardrobe to feel polished, wearable, and unmistakably current. Every release balances strong form, refined materials, and pieces designed to stay in rotation.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden mt-12 md:mt-24">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
          {[
            { title: "Craftsmanship", desc: "Every piece is handcrafted by skilled artisans using the finest materials sourced from around the globe." },
            { title: "Sustainability", desc: "We are committed to ethical production and reducing our environmental footprint at every step." },
            { title: "Innovation", desc: "Blending traditional techniques with modern technology to create forward-thinking designs." }
          ].map((v, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight">{v.title}</h3>
              <p className="text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-brand-charcoal text-white rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/10 blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight uppercase">Get in Touch</h2>
              <p className="text-white/60 text-lg">Have a question or want to visit our flagship store? We'd love to hear from you.</p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Email Us</p>
                    <p className="text-lg">hello@similr.store</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Call Us</p>
                    <p className="text-lg">+995 555 24 58 00</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Visit Us</p>
                    <p className="text-lg">Creative District, Tbilisi, Georgia</p>
                  </div>
                </div>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors" />
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors" />
              </div>
              <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors" />
              <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors resize-none" />
              <button type="submit" className="w-full bg-white text-brand-primary py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-brand-accent hover:text-white transition-all">
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
