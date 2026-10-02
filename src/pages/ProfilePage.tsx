import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../data/users';
import {
  ClipboardList, MapPin, Heart, Tag, CreditCard, Bell, HelpCircle,
  Info, LogOut, ChevronRight, UserCheck, Shield
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const menuItems = [
    { label: 'My Orders', icon: ClipboardList, path: '/orders', badge: 'Active' },
    { label: 'Saved Addresses', icon: MapPin, path: '/onboarding', sub: 'Talwandi, Kota' },
    { label: 'Favorites', icon: Heart, path: '/favorites', sub: 'Saved items & stores' },
    { label: 'Offers & Coupons', icon: Tag, path: '/coupons', badge: '5 Available' },
    { label: 'Payment Methods', icon: CreditCard, path: '/checkout', sub: 'UPI, Cards' },
    { label: 'Notifications', icon: Bell, path: '/notifications', badge: 'New' },
    { label: 'Help & Support', icon: HelpCircle, path: '/support', sub: '24x7 Assistant' },
    { label: 'About ZippyCart', icon: Info, path: '/support', sub: 'v2.4.0 Kota Edition' }
  ];

  const handleLogout = () => {
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header Profile Hero */}
      <div className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-white p-6 pt-8 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={MOCK_USER.avatar}
              alt={MOCK_USER.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-1 border-2 border-emerald-950">
              <UserCheck className="w-3 h-3 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-lg font-black text-white">{MOCK_USER.name}</h1>
            <p className="text-xs text-emerald-200">{MOCK_USER.email}</p>
            <p className="text-[11px] text-emerald-300 mt-0.5">{MOCK_USER.phone}</p>
          </div>
        </div>

        {/* Quick Trust Badge */}
        <div className="mt-4 p-2.5 bg-emerald-800/60 rounded-2xl border border-emerald-700/50 flex items-center justify-around text-[11px] text-emerald-100 font-bold">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-300" />
            Verified Member
          </span>
          <span>•</span>
          <span>Kota Super Saver</span>
        </div>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-2">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 block">
                      {item.label}
                    </span>
                    {item.sub && <span className="text-[11px] text-slate-400">{item.sub}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="pt-3">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs rounded-2xl border border-red-200 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
