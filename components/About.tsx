import React from 'react';
import { Heart, Leaf, Truck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-dark-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <img src="https://picsum.photos/id/292/300/400" className="rounded-2xl shadow-lg mt-8 opacity-80 hover:opacity-100 transition-opacity" alt="Chef cooking" />
                <img src="https://picsum.photos/id/225/300/400" className="rounded-2xl shadow-lg opacity-80 hover:opacity-100 transition-opacity" alt="Fresh ingredients" />
             </div>
             {/* Quote Card */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark p-6 rounded-xl shadow-xl border border-white/10 w-64 text-center">
                <p className="font-serif italic text-lg text-stone-200">"Food is the ingredient that binds us together."</p>
                <p className="text-xs text-brand-500 font-bold mt-2 uppercase tracking-wider">— Chef Jean-Paul</p>
             </div>
          </div>

          <div>
             <span className="text-brand-500 font-semibold tracking-wider uppercase text-sm">Our Story</span>
             <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-white mb-6">More than just a meal delivery.</h2>
             <p className="text-stone-400 text-lg leading-relaxed mb-8">
               JP Plates was born from a simple idea: everyone deserves a home-cooked meal, even on their busiest days. We partner with local chefs who treat every plate like a canvas and every ingredient like a gem.
             </p>

             <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-900/20 flex items-center justify-center text-brand-500 flex-shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Made with Love</h4>
                    <p className="text-stone-500">No assembly lines. Real chefs cooking real food in small batches.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-900/20 flex items-center justify-center text-secondary-500 flex-shrink-0">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Sustainably Sourced</h4>
                    <p className="text-stone-500">We work directly with local farmers to ensure zero-mile freshness.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 flex-shrink-0">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Swift & Safe Delivery</h4>
                    <p className="text-stone-500">Vacuum sealed thermal packaging keeps your food hot for 45 minutes.</p>
                  </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};