import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { PlateBundle } from '../types';

interface FoodMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToOrder: () => void;
  selectedBundle?: PlateBundle;
}

export const FoodMenuModal: React.FC<FoodMenuModalProps> = ({ isOpen, onClose, onProceedToOrder, selectedBundle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark">
            <div>
              <h2 className="text-2xl font-bold text-white">Our Fresh Menu</h2>
              {selectedBundle && <p className="text-brand-500 text-sm mt-1">Viewing options for: {selectedBundle.title}</p>}
            </div>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-dark">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MENU_ITEMS.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/30 transition-colors group">
                   <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="flex flex-col justify-between flex-1">
                     <div>
                       <h3 className="font-bold text-white text-lg leading-tight">{item.name}</h3>
                       <p className="text-xs text-stone-400 mt-1 line-clamp-2">{item.description}</p>
                     </div>
                     <div className="mt-3 flex items-center justify-between">
                        <span className="text-brand-500 font-bold">${item.price.toFixed(2)}</span>
                        <span className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-1 rounded text-stone-300">{item.category}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 bg-dark flex justify-end items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-white font-medium">Ready to eat?</p>
                <p className="text-stone-500 text-xs">Secure your slot now</p>
             </div>
             <button 
               onClick={onProceedToOrder}
               className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform transition-all hover:-translate-y-1"
             >
               Order Now <ArrowRight size={18} />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};