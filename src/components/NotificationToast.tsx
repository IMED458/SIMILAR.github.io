import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { notifications, removeNotification } = useShop();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-brand-charcoal text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 pointer-events-auto min-w-[300px]"
          >
            {n.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Info className="w-5 h-5 text-brand-accent" />
            )}
            <span className="flex-1 text-sm font-medium">{n.message}</span>
            <button 
              onClick={() => removeNotification(n.id)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
