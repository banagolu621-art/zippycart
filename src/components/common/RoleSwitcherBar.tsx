import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Smartphone, Monitor, ShoppingBag, ShieldCheck, Store, Bike } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { viewportMode, setViewportMode, deviceWidth, setDeviceWidth } = useRole();

  const isCustomer = !location.pathname.startsWith('/admin') &&
                     !location.pathname.startsWith('/merchant') &&
                     !location.pathname.startsWith('/rider');

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs z-50">
      {/* Brand logo & portal switcher */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="font-black tracking-tight text-emerald-400 flex items-center gap-1 pr-2 border-r border-slate-700">
          ⚡ ZippyCart Prototype
        </span>

        <button
          onClick={() => navigate('/home')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
            isCustomer ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Customer App</span>
        </button>

        <button
          onClick={() => navigate('/merchant')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
            location.pathname.startsWith('/merchant') ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Merchant</span>
        </button>

        <button
          onClick={() => navigate('/rider')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
            location.pathname.startsWith('/rider') ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Bike className="w-3.5 h-3.5" />
          <span>Rider</span>
        </button>

        <button
          onClick={() => navigate('/admin')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
            location.pathname.startsWith('/admin') ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>

      {/* Viewport Control (Mobile simulator vs Desktop Full-width) */}
      <div className="flex items-center gap-2">
        {isCustomer && (
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setViewportMode('mobile-frame')}
              className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-medium ${
                viewportMode === 'mobile-frame' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile Shell</span>
            </button>
            <button
              onClick={() => setViewportMode('responsive')}
              className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-medium ${
                viewportMode === 'responsive' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Full Screen</span>
            </button>
          </div>
        )}

        {isCustomer && viewportMode === 'mobile-frame' && (
          <select
            value={deviceWidth}
            onChange={e => setDeviceWidth(e.target.value as any)}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-md px-2 py-0.5 text-[11px] focus:outline-none"
          >
            <option value="360px">360px Width</option>
            <option value="390px">390px (iPhone 14)</option>
            <option value="414px">414px (Plus/Max)</option>
          </select>
        )}
      </div>
    </div>
  );
};
