import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ClipboardList, Heart, Search, Bell, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  type: 'cart' | 'orders' | 'favorites' | 'search' | 'notifications';
  title?: string;
  description?: string;
  actionText?: string;
  actionPath?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionText,
  actionPath = '/home',
  onAction
}) => {
  const navigate = useNavigate();

  const configs: Record<
    string,
    { icon: LucideIcon; defaultTitle: string; defaultDesc: string; defaultAction: string }
  > = {
    cart: {
      icon: ShoppingBag,
      defaultTitle: 'Your Cart is Empty',
      defaultDesc: 'Looks like you haven\'t added any groceries or snacks to your cart yet.',
      defaultAction: 'Browse Products'
    },
    orders: {
      icon: ClipboardList,
      defaultTitle: 'No Orders Yet',
      defaultDesc: 'When you place orders, you can track their real-time delivery status here.',
      defaultAction: 'Start Shopping'
    },
    favorites: {
      icon: Heart,
      defaultTitle: 'No Saved Favorites',
      defaultDesc: 'Tap the heart icon on any product or store to quickly access them here.',
      defaultAction: 'Explore Stores & Items'
    },
    search: {
      icon: Search,
      defaultTitle: 'No Products Found',
      defaultDesc: 'Try searching for something else like "milk", "banana", "chips" or "maggi".',
      defaultAction: 'Back to Home'
    },
    notifications: {
      icon: Bell,
      defaultTitle: 'No Notifications',
      defaultDesc: 'You\'re all caught up! Order updates and discounts will appear here.',
      defaultAction: 'Go to Home'
    }
  };

  const current = configs[type];
  const Icon = current.icon;

  const handleBtnClick = () => {
    if (onAction) {
      onAction();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-2xs my-6 max-w-sm mx-auto">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4 border border-emerald-100/80 shadow-xs">
        <Icon className="w-8 h-8 text-emerald-700 stroke-[1.75]" />
      </div>
      <h3 className="text-base font-extrabold text-slate-800">{title || current.defaultTitle}</h3>
      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs">
        {description || current.defaultDesc}
      </p>
      <button
        onClick={handleBtnClick}
        className="mt-5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
      >
        {actionText || current.defaultAction}
      </button>
    </div>
  );
};
