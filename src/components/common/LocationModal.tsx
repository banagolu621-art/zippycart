import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';
import { MapPin, Navigation, X, Check, Plus } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const {
    isModalOpen,
    closeLocationModal,
    currentAddress,
    savedAddresses,
    selectAddress,
    addNewAddress,
    simulateGpsLocation
  } = useLocation();

  const [showManualForm, setShowManualForm] = useState(false);
  const [formLabel, setFormLabel] = useState('Home');
  const [houseFlat, setHouseFlat] = useState('');
  const [streetArea, setStreetArea] = useState('');
  const [town, setTown] = useState('Kota');
  const [pincode, setPincode] = useState('324005');

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetArea.trim()) return;
    addNewAddress({
      label: formLabel,
      houseFlat: houseFlat || 'Plot 10',
      streetArea,
      town,
      pincode,
      isDefault: false
    });
    setShowManualForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-sm font-extrabold">What's your location?</h3>
              <p className="text-[11px] text-emerald-200">We'll show stores and products available near you.</p>
            </div>
          </div>
          <button
            onClick={closeLocationModal}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-slate-800">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={simulateGpsLocation}
              className="flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-2xl transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-xs font-black block">Use Current Location</span>
                <span className="text-[11px] text-emerald-700">GPS Auto-detect • Kota</span>
              </div>
            </button>
          </div>

          {!showManualForm ? (
            <>
              {/* Saved Addresses */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Saved Addresses
                  </h4>
                  <button
                    onClick={() => setShowManualForm(true)}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {savedAddresses.map(addr => {
                    const isSelected = currentAddress.id === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => selectAddress(addr)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                          <div>
                            <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                              {addr.label}
                              {addr.isDefault && (
                                <span className="bg-slate-200 text-slate-700 text-[9px] px-1.5 py-0.2 rounded-md">
                                  Default
                                </span>
                              )}
                            </span>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {addr.houseFlat}, {addr.streetArea}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {addr.town} - {addr.pincode}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Manual Location Form */
            <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-800">Enter Location Manually</h4>
                <button
                  type="button"
                  onClick={() => setShowManualForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Save Address As</label>
                <div className="flex gap-2">
                  {['Home', 'Work', 'Other'].map(lbl => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setFormLabel(lbl)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        formLabel === lbl ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">House / Flat / Building No.</label>
                <input
                  type="text"
                  required
                  value={houseFlat}
                  onChange={e => setHouseFlat(e.target.value)}
                  placeholder="e.g. Flat 302, Sunrise Heights"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Street / Area / Colony</label>
                <input
                  type="text"
                  required
                  value={streetArea}
                  onChange={e => setStreetArea(e.target.value)}
                  placeholder="e.g. Talwandi Main Market"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm mt-2"
              >
                Save Address & Deliver Here
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
