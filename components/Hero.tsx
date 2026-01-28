import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-dark">
      {/* Subtle Background Gradient instead of blobs */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-brand-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full shadow-sm border border-white/10 backdrop-blur-sm">
              <span className="flex items-center text-brand-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </span>
              <span className="text-xs font-semibold text-stone-300 uppercase tracking-wide">Rated #1 in City Food</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Taste the warmth of <span className="text-brand-500 italic">home</span> in every bite.
            </h1>
            
            <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-lg mx-auto md:mx-0">
              Chef-prepared meals using locally sourced ingredients, delivered fresh to your doorstep. No frozen shortcuts, just real food.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                onClick={() => scrollToSection('menu')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                View Menu <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => scrollToSection('concierge')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-stone-600 rounded-full font-semibold hover:bg-white/5 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Ask Concierge
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center md:justify-start gap-6 text-sm text-stone-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Free Delivery over $50
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Daily Fresh Ingredients
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 ease-out border-4 border-white/10">
                <img 
                  src="https://picsum.photos/id/431/800/900" 
                  alt="Delicious plated food" 
                  className="w-full h-[500px] object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-2xl">Roasted Spring Chicken</p>
                  <p className="text-stone-300 text-sm">With seasonal root vegetables</p>
                </div>
             </div>
             
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-dark-card p-4 rounded-2xl shadow-xl border border-white/10 max-w-xs hidden lg:block animate-bounce" style={{animationDuration: '3s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-900/30 rounded-full flex items-center justify-center text-brand-500">
                    <span className="font-bold text-lg">20%</span>
                  </div>
                  <div>
                    <p className="font-bold text-white leading-tight">First Order Discount</p>
                    <p className="text-xs text-stone-400">Use code: FRESH20</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};