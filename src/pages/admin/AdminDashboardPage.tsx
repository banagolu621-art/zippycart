import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleSwitcherBar } from '../../components/common/RoleSwitcherBar';
import {
  ShoppingBag, IndianRupee, Users, Store, Bike, TrendingUp, BarChart3,
  CheckCircle2, Clock, Search, ShieldCheck, ArrowRight, RefreshCcw
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'merchants' | 'riders'>('overview');

  const stats = [
    { title: 'Total Orders', value: '1,420', change: '+14% this week', icon: ShoppingBag, color: 'bg-emerald-500 text-white' },
    { title: 'Today\'s Revenue', value: '₹48,250', change: '+18% vs yesterday', icon: IndianRupee, color: 'bg-orange-500 text-white' },
    { title: 'Active Customers', value: '3,890', change: 'Kota Region', icon: Users, color: 'bg-teal-500 text-white' },
    { title: 'Active Merchants', value: '42 Stores', change: '6 Kirana, 4 Bakeries', icon: Store, color: 'bg-indigo-500 text-white' },
    { title: 'Active Riders', value: '28 On Duty', change: 'Avg 16 min delivery', icon: Bike, color: 'bg-amber-500 text-white' }
  ];

  const recentOrders = [
    { id: '#ZP10284', customer: 'Mayuri Sainn', store: 'Sharma Grocery', amount: 170, status: 'Out for Delivery', time: '10 mins ago' },
    { id: '#ZP10283', customer: 'Rahul Sharma', store: 'Fresh Mart', amount: 340, status: 'Preparing', time: '15 mins ago' },
    { id: '#ZP10282', customer: 'Ananya Roy', store: 'Royal Bakery', amount: 210, status: 'Delivered', time: '32 mins ago' },
    { id: '#ZP10281', customer: 'Vikram Mehta', store: 'City Super Store', amount: 890, status: 'Delivered', time: '45 mins ago' }
  ];

  const merchants = [
    { name: 'Sharma Grocery', owner: 'Ramesh Sharma', area: 'Talwandi, Kota', ordersToday: 48, rating: 4.5, status: 'Active' },
    { name: 'Fresh Mart', owner: 'Suresh Patel', area: 'Vigyan Nagar', ordersToday: 62, rating: 4.7, status: 'Active' },
    { name: 'City Super Store', owner: 'Vijay Gupta', area: 'Gumanpura', ordersToday: 95, rating: 4.6, status: 'Active' }
  ];

  const riders = [
    { name: 'Rohit Sharma', phone: '+91 98290 12345', vehicle: 'Hero Splendor', orderId: '#ZP10284', status: 'On Delivery' },
    { name: 'Vikram Singh', phone: '+91 94140 88776', vehicle: 'TVS Jupiter', orderId: 'Idle', status: 'Available' },
    { name: 'Amit Verma', phone: '+91 97850 66432', vehicle: 'Honda Activa', orderId: 'Offline', status: 'Offline' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <RoleSwitcherBar />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-6 shrink-0">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
            <ShieldCheck className="w-6 h-6" />
            <span>ZippyCart Admin</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
              { id: 'orders', label: 'All Orders', icon: ShoppingBag },
              { id: 'merchants', label: 'Merchants & Kiranas', icon: Store },
              { id: 'riders', label: 'Delivery Fleet', icon: Bike }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-all ${
                    activeTab === item.id ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-xl font-extrabold text-white">Kota City Admin Operations</h1>
              <p className="text-xs text-slate-400">Real-time Hyperlocal Metrics & Dispatch Monitoring</p>
            </div>
            <button
              onClick={() => showToast('Admin data refreshed', 'success')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
            >
              <RefreshCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Refresh Metrics</span>
            </button>
          </div>

          {/* Stats KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 shadow-lg flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-semibold">{s.title}</span>
                    <div className={`p-2 rounded-xl ${s.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white">{s.value}</span>
                    <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">{s.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Graphical Analytics Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Order Volume & Revenue Trend (Kota)
                </h3>
                <span className="text-xs text-slate-400">Peak Hours: 8 AM & 7 PM</span>
              </div>
              <div className="h-44 bg-slate-900/60 rounded-xl border border-slate-700/50 p-4 flex items-end justify-between gap-2">
                {[40, 65, 80, 50, 95, 110, 75, 120, 140, 100, 130, 160].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md group-hover:from-orange-500 group-hover:to-amber-400 transition-all"
                      style={{ height: `${val * 0.8}%` }}
                    />
                    <span className="text-[9px] text-slate-500">{idx + 8}h</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-4">
              <h3 className="text-sm font-extrabold text-white">Top Demanded Categories</h3>
              <div className="space-y-3">
                {[
                  { name: 'Fresh Dairy & Milk', pct: '38%', color: 'bg-emerald-500' },
                  { name: 'Atta, Pulses & Oil', pct: '26%', color: 'bg-orange-500' },
                  { name: 'Vegetables & Fruits', pct: '22%', color: 'bg-teal-500' },
                  { name: 'Snacks & Bakery', pct: '14%', color: 'bg-indigo-500' }
                ].map(c => (
                  <div key={c.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>{c.name}</span>
                      <span>{c.pct}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${c.color}`} style={{ width: c.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white">
                {activeTab === 'merchants' ? 'Active Merchants' : activeTab === 'riders' ? 'Delivery Fleet Status' : 'Recent Customer Orders'}
              </h3>
              <span className="text-xs text-emerald-400 font-bold">Showing live data</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="p-3">ID / Name</th>
                    <th className="p-3">Store / Details</th>
                    <th className="p-3">Amount / Location</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {recentOrders.map(row => (
                    <tr key={row.id} className="hover:bg-slate-700/40">
                      <td className="p-3 font-mono font-bold text-emerald-400">{row.id}</td>
                      <td className="p-3 font-medium text-slate-200">{row.customer} • {row.store}</td>
                      <td className="p-3 font-bold text-slate-100">₹{row.amount}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-900 text-emerald-300 border border-emerald-700">
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => navigate(`/orders/${row.id.replace('#', '')}/track`)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px]"
                        >
                          View Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
