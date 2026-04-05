import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut, Mail, Lock, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Mock User Data
  const user = {
    name: "similR Member",
    email: "member@similr.store",
    orders: [
      { id: "#ORD-7742", date: "Mar 12, 2026", status: "Delivered", total: 1250 },
      { id: "#ORD-8821", date: "Feb 28, 2026", status: "In Transit", total: 420 }
    ]
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-brand-muted/30">
        <div className="container mx-auto px-6 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-500 text-sm">
                {authMode === 'login' 
                  ? 'Enter your details to access your account' 
                  : 'Join the similR circle for a premium experience'}
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              {authMode === 'register' && (
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-brand-muted rounded-2xl px-12 py-4 outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-brand-muted rounded-2xl px-12 py-4 outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-brand-muted rounded-2xl px-12 py-4 outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                  required
                />
              </div>

              {authMode === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-brand-charcoal transition-all mt-6 shadow-lg"
              >
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-sm text-gray-500">
                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="ml-2 font-bold text-brand-primary hover:text-brand-accent transition-colors"
                >
                  {authMode === 'login' ? 'Register Now' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm text-center">
              <div className="w-24 h-24 bg-brand-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-brand-accent">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-display font-bold uppercase tracking-tight">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="mt-6 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors mx-auto"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <nav className="bg-white rounded-[2rem] p-4 shadow-sm overflow-hidden">
              {[
                { icon: Package, label: 'My Orders', active: true },
                { icon: Heart, label: 'Wishlist' },
                { icon: MapPin, label: 'Addresses' },
                { icon: Settings, label: 'Settings' }
              ].map((item, i) => (
                <button 
                  key={i}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                    item.active ? "bg-brand-muted text-brand-primary" : "hover:bg-gray-50 text-gray-500"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <item.icon className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", item.active ? "opacity-100" : "opacity-0")} />
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-8">Recent Orders</h2>
              <div className="space-y-6">
                {user.orders.map((order, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl border border-gray-100 hover:border-brand-accent transition-colors group">
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{order.id}</p>
                      <p className="font-bold">{order.date}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-8">
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Status</p>
                        <p className={cn(
                          "font-bold",
                          order.status === 'Delivered' ? "text-green-500" : "text-brand-accent"
                        )}>{order.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total</p>
                        <p className="font-bold">${order.total}</p>
                      </div>
                      <button className="p-3 bg-brand-muted rounded-full group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm">
                <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-6">Personal Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent pt-2">Edit Profile</button>
                </div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm">
                <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-6">Shipping Address</h3>
                <div className="space-y-4">
                  <p className="text-gray-500 leading-relaxed">
                    Creative District, Floor 4<br />
                    Tbilisi 0179<br />
                    Georgia
                  </p>
                  <button className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent pt-2">Manage Addresses</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
