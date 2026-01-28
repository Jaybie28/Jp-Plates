import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PlateBundle } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedBundle?: PlateBundle;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preSelectedBundle }) => {

  // Load external script for the booking widget
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
            document.body.removeChild(script);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-dark-card border border-white/10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8">
             <h2 className="text-2xl font-bold text-white mb-2">Where are we going?</h2>
             <p className="text-stone-400 text-sm mb-6">Tell us where to drop off the goodness.</p>
             
             {/* Embed Container */}
             <div className="bg-white rounded-xl overflow-hidden min-h-[500px] w-full">
                <iframe 
                  src="https://api.leadconnectorhq.com/widget/booking/tn83FZUpM0v7LuSNh7RB" 
                  style={{width: '100%', border: 'none', overflow: 'hidden', minHeight: '500px'}} 
                  scrolling="no" 
                  id="sYqlGbS0fjzQ2hVUhqtz_1768839169123"
                ></iframe>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};