import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Checkout = () => {
  const { cart, cartTotal, addNotification, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const isShippingComplete = Object.values(shipping).every(Boolean);
  const isPaymentComplete = Object.values(payment).every(Boolean);

  const handlePlaceOrder = () => {
    if (!isPaymentComplete) return;

    addNotification('Your similR order has been placed successfully.', 'success');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-display font-bold mb-6">Your bag is empty</h2>
        <Link to="/shop" className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-brand-muted/30 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center space-x-4 mb-8">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Checkout</h1>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-3xl p-8 shadow-sm space-y-10">
              {/* Shipping */}
              <div className={cn("space-y-6", step !== 1 && "opacity-50")}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">1</span>
                    <span>Shipping Information</span>
                  </h2>
                  {step !== 1 && <button onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-widest text-brand-accent">Edit</button>}
                </div>
                
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" value={shipping.firstName} onChange={(event) => setShipping(prev => ({ ...prev, firstName: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                    <input type="text" placeholder="Last Name" value={shipping.lastName} onChange={(event) => setShipping(prev => ({ ...prev, lastName: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                    <input type="email" placeholder="Email Address" value={shipping.email} onChange={(event) => setShipping(prev => ({ ...prev, email: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent md:col-span-2" />
                    <input type="text" placeholder="Address" value={shipping.address} onChange={(event) => setShipping(prev => ({ ...prev, address: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent md:col-span-2" />
                    <input type="text" placeholder="City" value={shipping.city} onChange={(event) => setShipping(prev => ({ ...prev, city: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                    <input type="text" placeholder="Postal Code" value={shipping.postalCode} onChange={(event) => setShipping(prev => ({ ...prev, postalCode: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!isShippingComplete}
                      className="md:col-span-2 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-charcoal transition-all mt-4 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className={cn("space-y-6", step !== 2 && "opacity-50")}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">2</span>
                    <span>Payment Method</span>
                  </h2>
                </div>
                
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="border-2 border-brand-primary rounded-2xl p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-bold">Credit / Debit Card</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <input type="text" placeholder="Card Number" value={payment.cardNumber} onChange={(event) => setPayment(prev => ({ ...prev, cardNumber: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM / YY" value={payment.expiry} onChange={(event) => setPayment(prev => ({ ...prev, expiry: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                        <input type="text" placeholder="CVC" value={payment.cvc} onChange={(event) => setPayment(prev => ({ ...prev, cvc: event.target.value }))} className="w-full bg-brand-muted rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-brand-accent" />
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={!isPaymentComplete}
                      className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-charcoal transition-all mt-4 flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>Pay ${cartTotal + 20}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-[400px] space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-tight mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto no-scrollbar">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-4">
                    <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 text-sm">
                      <h3 className="font-bold line-clamp-1">{item.name}</h3>
                      <p className="text-gray-500">{item.selectedSize} / {item.selectedColor}</p>
                      <div className="flex justify-between mt-1">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-bold">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">$20.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t">
                  <span>Total</span>
                  <span>${cartTotal + 20}</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-accent/10 rounded-3xl p-6 flex items-center space-x-4">
              <Truck className="w-6 h-6 text-brand-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">Free shipping on your next order!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
