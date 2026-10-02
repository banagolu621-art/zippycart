import React, { useState } from 'react';
import { RoleSwitcherBar } from '../../components/common/RoleSwitcherBar';
import {
  Bike, Navigation, Phone, CheckCircle2, Store, MapPin, IndianRupee,
  Clock, ShieldCheck, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const RiderDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const [riderStatusIndex, setRiderStatusIndex] = useState(2); // 0: Accepted, 1: Picked Up, 2: Out for Delivery, 3: Delivered

  const statuses = ['Accepted', 'Picked Up', 'Out for Delivery', 'Delivered'];

  const handleAdvanceStatus = () => {
    if (riderStatusIndex < statuses.length - 1) {
      const next = riderStatusIndex + 1;
      setRiderStatusIndex(next);
      showToast(`Status updated to: ${statuses[next]}`, 'success');
    } else {
      showToast('Delivery completed! Earning ₹45 added to your wallet.', 'success');
      setRiderStatusIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <RoleSwitcherBar />

      <div className="flex-1 max-w-lg mx-auto w-full p-4 space-y-4">
        {/* Header Rider Status */}
        <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center font-black">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white">Rohit Sharma</h1>
              <p className="text-xs text-slate-400">Hero Splendor • RJ 20 EB 4821</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOnline(!isOnline);
              showToast(`Duty status: ${!isOnline ? 'Online' : 'Offline'}`, 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-extrabold"
          >
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
            {isOnline ? <ToggleRight className="w-6 h-6 text-emerald-500" /> : <ToggleLeft className="w-6 h-6 text-slate-600" />}
          </button>
        </div>

        {/* Earnings & Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">TODAY'S EARNINGS</span>
            <span className="text-lg font-black text-emerald-400">₹840</span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">DELIVERIES</span>
            <span className="text-lg font-black text-white">14 Orders</span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">RIDER RATING</span>
            <span className="text-lg font-black text-amber-400">★ 4.9</span>
          </div>
        </div>

        {/* Active Order Card */}
        {isOnline ? (
          <div className="bg-slate-800 rounded-3xl p-5 border border-emerald-500/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-xs font-mono font-black text-emerald-400">Order #ZP10284</span>
                <span className="text-[11px] text-slate-400 block">Collect Cash/UPI: ₹170</span>
              </div>

              <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-black animate-pulse">
                {statuses[riderStatusIndex]}
              </span>
            </div>

            {/* Visual Map Graphic */}
            <div className="h-36 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-emerald-600/40 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
              <div className="relative z-10 text-center">
                <Navigation className="w-7 h-7 text-orange-400 mx-auto animate-bounce mb-1" />
                <span className="text-xs font-extrabold text-white block">Turn-by-Turn GPS to Customer</span>
                <span className="text-[10px] text-emerald-300">Talwandi Main Market → Green Park Colony</span>
              </div>
            </div>

            {/* Pickup & Customer Details */}
            <div className="space-y-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700 text-xs">
              <div className="flex items-start gap-2.5">
                <Store className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Pickup Store</span>
                  <span className="font-extrabold text-white block">Sharma Grocery</span>
                  <span className="text-[11px] text-slate-400">Shop 14, Talwandi Main Market, Kota</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer Delivery</span>
                  <span className="font-extrabold text-white block">Mayuri Sainn</span>
                  <span className="text-[11px] text-slate-400">123, Green Park Colony, Kota (Pincode: 324005)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleAdvanceStatus}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {riderStatusIndex === 0
                    ? 'Confirm Picked Up from Store'
                    : riderStatusIndex === 1
                    ? 'Start Navigation (Out for Delivery)'
                    : riderStatusIndex === 2
                    ? 'Mark Delivered to Customer'
                    : 'Complete Delivery'}
                </span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => showToast('Calling Customer Mayuri Sainn...', 'info')}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </button>
                <button
                  onClick={() => showToast('Calling Store Sharma Grocery...', 'info')}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-3xl p-8 text-center text-slate-400 border border-slate-700 space-y-3">
            <Bike className="w-12 h-12 mx-auto text-slate-600" />
            <h3 className="text-sm font-extrabold text-white">You are Offline</h3>
            <p className="text-xs text-slate-400">Toggle Duty status above to start accepting local orders in Kota.</p>
          </div>
        )}
      </div>
    </div>
  );
};
