import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, Bell, ShoppingBag } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currentAddress, openLocationModal } = useLocation();
  const { totalItemsCount } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between gap-3">
        {/* Location Selector */}
        <button
          onClick={openLocationModal}
          className="flex items-center gap-2 text-left max-w-[65%] focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 border border-emerald-700/50">
            <MapPin className="w-4 h-4 text-emerald-300" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Delivering To</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <p className="text-sm font-semibold truncate text-white">
              {currentAddress.streetArea}, {currentAddress.town}
            </p>
          </div>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className="w-9 h-9 rounded-full bg-emerald-800/70 hover:bg-emerald-800 flex items-center justify-center transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-emerald-100" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-emerald-900"></span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => navigate('/cart')}
            className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors relative text-white shadow-sm"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-emerald-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-900">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
