import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ChefHat } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onCartClick: () => void;
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onCartClick, onOrderClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Our Menu', href: '#menu' },
    { name: 'Our Story', href: '#about' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'AI Concierge', href: '#concierge' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-md border-b border-white/5 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg transform rotate-3">
              <ChefHat size={24} />
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">JP Plates</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-stone-300 hover:text-brand-400 font-medium text-sm transition-colors uppercase tracking-wide cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-stone-300 hover:text-brand-400 transition-colors group"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-500 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={onOrderClick}
              className="hidden md:block bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Order Now
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-300 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-card border-t border-white/5 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block px-3 py-4 text-base font-medium text-stone-300 hover:text-brand-400 hover:bg-white/5 rounded-lg cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                onOrderClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 bg-brand-600 text-white px-4 py-3 rounded-lg font-bold shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};