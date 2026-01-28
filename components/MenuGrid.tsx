import React from 'react';
import { PlateBundle } from '../types';
import { PLATE_BUNDLES } from '../constants';

interface MenuGridProps {
  onOrder: (bundle?: PlateBundle) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ onOrder }) => {

  return (
    <section id="menu" className="py-24 bg-dark text-white scroll-mt-20">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">
              Pick Your <span className="text-brand-500">Plates</span>
            </h2>
            <p className="text-stone-400 text-lg">How hungry are you? Tap to view our menu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
             {PLATE_BUNDLES.map((bundle) => (
               <button 
                 key={bundle.id}
                 onClick={() => onOrder(bundle)}
                 className="group relative bg-dark-card border border-white/5 hover:border-brand-500/30 rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:transform hover:scale-[1.02] hover:bg-dark-hover overflow-hidden"
               >
                 {/* Top right decorative gradient blob */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-brand-500/10"></div>

                 <div className="text-6xl mb-8 flex gap-3 z-10">
                    {bundle.type === 'family' ? (
                        <span className="filter drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300">👨‍👩‍👧‍👦</span>
                    ) : (
                        Array(bundle.iconCount).fill('🍽️').map((_, i) => (
                            <span key={i} className="filter drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>🍽️</span>
                        ))
                    )}
                 </div>
                 <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-500 transition-colors">{bundle.title}</h3>
                 <p className="text-stone-400 font-medium leading-relaxed">{bundle.subtitle}</p>
                 {/* Price removed as requested */}
               </button>
             ))}
          </div>
       </div>
    </section>
  );
};