import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import { MapPin, Navigation, ArrowRight, Building2, Store } from 'lucide-react';

export const OnboardingLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const { simulateGpsLocation, addNewAddress } = useLocation();

  const [isManual, setIsManual] = useState(false);
  const [houseFlat, setHouseFlat] = useState('');
  const [streetArea, setStreetArea] = useState('');
  const [town, setTown] = useState('Kota');
  const [pincode, setPincode] = useState('324005');

  const handleUseGps = () => {
    simulateGpsLocation();
    setTimeout(() => {
      navigate('/home');
    }, 700);
  };

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetArea.trim()) return;
    addNewAddress({
      label: 'Home',
      houseFlat: houseFlat || 'House 42',
      streetArea,
      town,
      pincode,
      isDefault: true
    });
    navigate('/home');
  };

  return (
    <div className="flex-1 bg-white text-slate-900 flex flex-col justify-between p-6 min-h-[600px]">
      <div>
        {/* Top Header Graphic */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-6 border border-emerald-100 shadow-xs">
          <MapPin className="w-8 h-8 stroke-[2]" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          What's your location?
        </h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          We'll show stores, fresh groceries, and fast 15-minute delivery products available near you in Kota.
        </p>

        {!isManual ? (
          <div className="mt-8 space-y-3">
            <button
              onClick={handleUseGps}
              className="w-full py-4 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-extrabold text-sm flex items-center justify-between shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <span>Use Current Location</span>
                  <span className="block text-[11px] text-emerald-200 font-normal">GPS Auto-detect • Kota</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsManual(true)}
              className="w-full py-3.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl font-bold text-xs border border-slate-200 flex items-center gap-3 transition-all text-left"
            >
              <Building2 className="w-5 h-5 text-slate-500 shrink-0" />
              <div>
                <span>Enter Location Manually</span>
                <span className="block text-[10px] text-slate-400 font-normal">Enter house, colony, or landmark</span>
              </div>
            </button>

            {/* Kota preset card */}
            <div className="mt-6 p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center gap-3 text-orange-900">
              <Store className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <span className="text-xs font-black block">Active Service Area: Kota</span>
                <span className="text-[11px] text-orange-700">Talwandi, Vigyan Nagar, Dadabari, Gumanpura & CAD Circle.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Manual Location Form */
          <form onSubmit={handleSaveManual} className="mt-6 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800">Fill Delivery Address</h3>
              <button
                type="button"
                onClick={() => setIsManual(false)}
                className="text-xs text-slate-500 font-semibold hover:underline"
              >
                Back
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">House / Flat / Building Name</label>
              <input
                type="text"
                required
                value={houseFlat}
                onChange={e => setHouseFlat(e.target.value)}
                placeholder="e.g. 123, Green Park Colony"
                className="w-full px-3 py-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Street / Area / Colony</label>
              <input
                type="text"
                required
                value={streetArea}
                onChange={e => setStreetArea(e.target.value)}
                placeholder="e.g. Talwandi Market"
                className="w-full px-3 py-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Town / City</label>
                <input
                  type="text"
                  required
                  value={town}
                  onChange={e => setTown(e.target.value)}
                  placeholder="Kota"
                  className="w-full px-3 py-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="324005"
                  className="w-full px-3 py-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm mt-3"
            >
              Save Address & Start Shopping
            </button>
          </form>
        )}
      </div>

      <div className="pt-6 text-center text-[11px] text-slate-400">
        By continuing, you agree to ZippyCart's terms of local delivery.
      </div>
    </div>
  );
};
