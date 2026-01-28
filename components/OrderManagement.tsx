import React, { useState } from 'react';
import { Calendar, XCircle, CheckCircle, Clock } from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const [rescheduleNote, setRescheduleNote] = useState('');
  const [rescheduleStatus, setRescheduleStatus] = useState<'idle' | 'success'>('idle');

  const handleCancelRedirect = () => {
    window.location.href = "https://app.gohighlevel.com/v2/preview/7hhpnsvgYByNxYbb0KI5?notrack=true";
  };

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if(!rescheduleNote.trim()) return;
    // Simulate API call
    setRescheduleStatus('success');
    setTimeout(() => {
        setRescheduleStatus('idle');
        setRescheduleNote('');
    }, 3000);
  };

  return (
    <section className="py-12 bg-dark border-b border-white/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-card border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-serif font-bold text-white mb-6 text-center">Manage Your Order</h2>
          
          <div className="space-y-8">
            
            {/* Cancel Order Section */}
            <div className="space-y-3">
               <h3 className="text-md font-bold text-red-500 flex items-center gap-2">
                 <XCircle size={18} /> Cancel Order
               </h3>
               <p className="text-xs text-stone-500">Change of plans? Click the button below to process a cancellation.</p>
               <button 
                 onClick={handleCancelRedirect}
                 className="w-full py-2.5 bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/30 hover:border-red-500/30 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
               >
                 Cancel Order
               </button>
            </div>

            <div className="h-px bg-white/5 w-full"></div>

            {/* Reschedule Order Section */}
            <div className="space-y-3">
               <h3 className="text-md font-bold text-brand-500 flex items-center gap-2">
                 <Clock size={18} /> Reschedule Order
               </h3>
               <p className="text-xs text-stone-500">Change of plans? Leave a note for rescheduling.</p>
               <form onSubmit={handleReschedule} className="space-y-3">
                 <textarea 
                   value={rescheduleNote}
                   onChange={(e) => setRescheduleNote(e.target.value)}
                   className="w-full bg-dark border border-white/10 rounded-xl p-3 text-sm text-stone-200 focus:outline-none focus:border-brand-500/50 transition-colors h-20 resize-none placeholder-stone-600"
                   placeholder="New requested time or instructions..."
                 />
                 <button 
                   type="submit" 
                   disabled={!rescheduleNote.trim() || rescheduleStatus === 'success'}
                   className="w-full py-2.5 bg-brand-900/20 hover:bg-brand-900/30 text-brand-400 border border-brand-900/30 hover:border-brand-500/30 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                 >
                   {rescheduleStatus === 'success' ? (
                       <>
                         <CheckCircle size={16} /> Reschedule Request Sent
                       </>
                   ) : (
                       "Request Reschedule"
                   )}
                 </button>
               </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};