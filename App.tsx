import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuGrid } from './components/MenuGrid';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { AIConcierge } from './components/AIConcierge';
import { OrderManagement } from './components/OrderManagement';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ContactFormModal } from './components/ContactFormModal';
import { FoodMenuModal } from './components/FoodMenuModal';
import { CartItem, Dish, PlateBundle } from './types';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<PlateBundle | undefined>(undefined);

  // Food Menu Modal State
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);

  // Contact Form Modal State
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // When a bundle is clicked in MenuGrid, we show the food menu modal first
  const handleOrderBundle = (bundle?: PlateBundle) => {
    setSelectedBundle(bundle);
    setIsFoodMenuOpen(true);
  };

  // When the user clicks "Order Now" inside the Food Menu Modal
  const handleProceedToOrder = () => {
    setIsFoodMenuOpen(false);
    // Redirect to the external ordering page as per previous logic
    window.location.href = "https://app.gohighlevel.com/v2/preview/LlC3JUFiH0zZWHGZ0kIY?notrack=true";
  };

  const handleNavOrderClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-dark font-sans text-stone-200">
      <Navbar 
        cart={cart} 
        onCartClick={() => setIsCartOpen(true)} 
        onOrderClick={handleNavOrderClick}
      />
      
      <main>
        <Hero />
        <MenuGrid onOrder={handleOrderBundle} />
        <About />
        <AIConcierge onOpenContactForm={() => setIsContactFormOpen(true)} />
        <OrderManagement />
        <Testimonials />
      </main>
      
      <Footer />
      
      <FoodMenuModal 
        isOpen={isFoodMenuOpen}
        onClose={() => setIsFoodMenuOpen(false)}
        onProceedToOrder={handleProceedToOrder}
        selectedBundle={selectedBundle}
      />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preSelectedBundle={selectedBundle}
      />

      <ContactFormModal 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />

      {/* Cart Sidebar Overlay - Kept but secondary to Booking Flow */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-dark-card border-l border-dark-border shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-card">
                <h2 className="text-lg font-bold text-white flex items-center justify-between w-full">
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-brand-500" />
                    Your Plate
                  </span>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-dark-hover transition-colors"
                  >
                    <X size={20} />
                  </button>
                </h2>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-dark-hover rounded-full flex items-center justify-center text-stone-500">
                      <ShoppingBag size={40} />
                    </div>
                    <p className="text-stone-400 font-medium">Your plate is empty</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); handleNavOrderClick(); }}
                      className="text-brand-500 font-bold hover:underline"
                    >
                      Start booking
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-dark-border" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                          <span className="font-semibold text-brand-400">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-stone-500 mb-3">{item.category}</p>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center hover:bg-dark-hover text-stone-400 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-medium w-4 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center hover:bg-dark-hover text-stone-400 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-dark-border p-6 bg-dark">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-stone-400">Subtotal</span>
                    <span className="text-xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-900/20 transition-all transform active:scale-95">
                    Checkout Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;