import React, { useState } from 'react';
import { RoleSwitcherBar } from '../../components/common/RoleSwitcherBar';
import {
  Store, ShoppingBag, IndianRupee, Clock, CheckCircle2, PackageCheck,
  ChefHat, AlertCircle, Plus, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface MerchantOrder {
  id: string;
  items: string;
  total: number;
  time: string;
  customer: string;
  address: string;
  status: 'New' | 'Preparing' | 'Ready' | 'Completed';
}

export const MerchantDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [storeOpen, setStoreOpen] = useState(true);

  const [orders, setOrders] = useState<MerchantOrder[]>([
    { id: '#ZP10284', items: 'Amul Fresh Milk (1L), Lay\'s Chips x2', total: 170, time: '3 mins ago', customer: 'Mayuri Sainn', address: '123, Green Park Colony', status: 'New' },
    { id: '#ZP10283', items: 'Aashirvaad Atta 10kg, Tata Salt', total: 401, time: '12 mins ago', customer: 'Rahul Sharma', address: 'Plot 14, Talwandi Market', status: 'Preparing' },
    { id: '#ZP10280', items: 'Maggi Pack of 4 x2, Coca-Cola', total: 261, time: '25 mins ago', customer: 'Deepak Meena', address: 'Vigyan Nagar Main Road', status: 'Ready' }
  ]);

  const handleUpdateStatus = (id: string, newStatus: MerchantOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    showToast(`Order ${id} status updated to: ${newStatus}`, 'success');
  };

  const newOrdersCount = orders.filter(o => o.status === 'New').length;
  const preparingCount = orders.filter(o => o.status === 'Preparing').length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <RoleSwitcherBar />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Merchant Sidebar */}
        <aside className="w-full md:w-60 bg-slate-950 border-r border-slate-800 p-4 space-y-6 shrink-0">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
            <Store className="w-6 h-6" />
            <span>Sharma Grocery</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span>Store Status</span>
              <button onClick={() => setStoreOpen(!storeOpen)} className="text-emerald-400">
                {storeOpen ? <ToggleRight className="w-6 h-6 text-emerald-500" /> : <ToggleLeft className="w-6 h-6 text-slate-600" />}
              </button>
            </div>
            <span className={`text-[11px] font-bold block ${storeOpen ? 'text-emerald-400' : 'text-slate-500'}`}>
              {storeOpen ? '● Online & Accepting Orders' : '○ Offline'}
            </span>
          </div>

          <nav className="space-y-1 text-xs">
            <div className="px-3 py-2 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders Queue</span>
            </div>
            <div className="px-3 py-2 text-slate-400 hover:text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer">
              <ChefHat className="w-4 h-4" />
              <span>Inventory & Products</span>
            </div>
            <div className="px-3 py-2 text-slate-400 hover:text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer">
              <IndianRupee className="w-4 h-4" />
              <span>Daily Earnings</span>
            </div>
          </nav>
        </aside>

        {/* Main Merchant Portal Content */}
        <main className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-xl font-extrabold text-white">Store Orders Dashboard</h1>
              <p className="text-xs text-slate-400">Sharma Grocery • Talwandi, Kota</p>
            </div>
            <button
              onClick={() => showToast('Stock updated successfully', 'success')}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product Stock</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <span className="text-xs text-slate-400 font-semibold block">Today's Orders</span>
              <span className="text-2xl font-black text-white">48</span>
              <span className="text-[11px] text-emerald-400 block mt-1">+12 vs yesterday</span>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <span className="text-xs text-slate-400 font-semibold block">Today's Revenue</span>
              <span className="text-2xl font-black text-emerald-400">₹8,450</span>
              <span className="text-[11px] text-slate-400 block mt-1">Payout pending</span>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <span className="text-xs text-slate-400 font-semibold block">New Orders</span>
              <span className="text-2xl font-black text-orange-400">{newOrdersCount}</span>
              <span className="text-[11px] text-orange-300 block mt-1">Requires confirmation</span>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <span className="text-xs text-slate-400 font-semibold block">In Preparation</span>
              <span className="text-2xl font-black text-amber-400">{preparingCount}</span>
              <span className="text-[11px] text-amber-300 block mt-1">Packing now</span>
            </div>
          </div>

          {/* Order Queue Management */}
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Incoming Live Orders Queue ({orders.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  className={`bg-slate-800 rounded-2xl p-4 border space-y-3 shadow-lg ${
                    order.status === 'New'
                      ? 'border-orange-500/80 ring-1 ring-orange-500/50'
                      : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-sm font-mono font-black text-emerald-400">{order.id}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      order.status === 'New'
                        ? 'bg-orange-500 text-white animate-pulse'
                        : order.status === 'Preparing'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white">{order.customer}</h3>
                    <p className="text-[11px] text-slate-400">{order.address}</p>
                    <p className="text-xs font-semibold text-slate-200 mt-2 bg-slate-900/60 p-2 rounded-xl border border-slate-700/50">
                      {order.items}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400">{order.time}</span>
                    <span className="text-sm font-black text-white">₹{order.total}</span>
                  </div>

                  {/* Merchant Actions */}
                  <div className="pt-2 border-t border-slate-700 flex gap-2">
                    {order.status === 'New' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Preparing')}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        Accept & Start Packing
                      </button>
                    )}

                    {order.status === 'Preparing' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Ready')}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        Mark Ready for Rider Pick Up
                      </button>
                    )}

                    {order.status === 'Ready' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Completed')}
                        className="w-full py-2 bg-slate-700 text-slate-300 font-bold text-xs rounded-xl cursor-default"
                      >
                        Handed Over to Rider Rohit ✓
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
