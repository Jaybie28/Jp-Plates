import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-dark text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Our Neighbors Say</h2>
          <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-dark-card border border-white/5 p-8 rounded-2xl relative hover:bg-dark-hover transition-colors duration-300">
               <Quote className="absolute top-8 right-8 text-stone-600 w-8 h-8 opacity-50" />
               <div className="flex items-center gap-4 mb-6">
                 <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-500" />
                 <div>
                   <h4 className="font-bold text-lg">{t.name}</h4>
                   <p className="text-stone-400 text-sm">{t.role}</p>
                 </div>
               </div>
               <p className="text-stone-300 italic leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};