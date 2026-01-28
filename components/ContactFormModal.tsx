import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-dark-card border border-white/10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>
          <div className="p-8">
             <h2 className="text-2xl font-bold text-white mb-2">Complete Your Order</h2>
             <p className="text-stone-400 text-sm mb-6">Please fill out your details below to proceed.</p>
             <div className="bg-white rounded-xl overflow-hidden min-h-[600px] w-full">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/form/x3JnIxDDmJnKVrwxyCiQ"
                    style={{width:'100%', height:'100%', border:'none', borderRadius:'3px'}}
                    id="inline-x3JnIxDDmJnKVrwxyCiQ" 
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="JP Plates"
                    data-height="1063"
                    data-layout-iframe-id="inline-x3JnIxDDmJnKVrwxyCiQ"
                    data-form-id="x3JnIxDDmJnKVrwxyCiQ"
                    title="JP Plates"
                >
                </iframe>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};