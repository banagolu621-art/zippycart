import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NOTIFICATIONS } from '../data/notifications';
import { NotificationItem } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { ArrowLeft, Bell, CheckCheck, Clock, Sparkles } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setItems(prev => prev.map(i => ({ ...i, read: true })));
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-emerald-300" />
            <span>Notifications</span>
          </h1>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-bold text-emerald-200 hover:text-white flex items-center gap-1"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark Read</span>
        </button>
      </header>

      <div className="p-4 space-y-2.5">
        {items.length === 0 ? (
          <EmptyState type="notifications" />
        ) : (
          items.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.linkUrl) navigate(notif.linkUrl);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                notif.read ? 'bg-white border-slate-200' : 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                notif.type === 'order'
                  ? 'bg-orange-100 text-orange-600'
                  : notif.type === 'promo'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {notif.type === 'order' ? (
                  <Clock className="w-4 h-4" />
                ) : notif.type === 'promo' ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-900">{notif.title}</h3>
                  <span className="text-[10px] text-slate-400 font-semibold">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">{notif.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
