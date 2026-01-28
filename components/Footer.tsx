import React from 'react';
import { ChefHat, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                  <ChefHat size={18} />
                </div>
                <span className="font-serif text-xl font-bold text-white">JP Plates</span>
             </div>
             <p className="text-stone-400 text-sm leading-relaxed">
               Bringing the heart of home cooking to your dining table. Fresh, local, and delivered with love.
             </p>
             <div className="flex gap-4 pt-2">
               <a href="#" className="w-8 h-8 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-stone-400 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all">
                 <Instagram size={16} />
               </a>
               <a href="#" className="w-8 h-8 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-stone-400 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all">
                 <Facebook size={16} />
               </a>
               <a href="#" className="w-8 h-8 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-stone-400 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all">
                 <Twitter size={16} />
               </a>
             </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Sourcing Partners</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Delivery Areas</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 mt-0.5" />
                <span>123 Culinary Ave,<br />Food District, FD 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-500" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500" />
                <span>hello@jpplates.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} JP Plates Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};