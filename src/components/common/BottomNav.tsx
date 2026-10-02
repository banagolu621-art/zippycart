import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemsCount } = useCart();

  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Orders', path: '/orders', icon: ClipboardList },
    { label: 'Cart', path: '/cart', icon: ShoppingBag, badge: totalItemsCount },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around max-w-md mx-auto">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path !== '/home' && location.pathname.startsWith(item.path));
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-emerald-700 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700 stroke-[2.5]' : 'stroke-[1.75]'}`} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
