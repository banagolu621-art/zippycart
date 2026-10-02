import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import { ArrowLeft, Phone, MessageSquare, CheckCircle2, Clock, MapPin, Bike, Store, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Out for Delivery');

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const o = await orderService.getOrderById(id);
        if (o) {
          setOrder(o);
          setCurrentStatus(o.status);
        }
      }
    };
    fetchOrder();
  }, [id]);

  const cleanId = id ? id.replace('#', '') : 'ZP10284';

  const steps: { label: OrderStatus; desc: string }[] = [
    { label: 'Placed', desc: 'Order received & confirmed' },
    { label: 'Preparing', desc: 'Store is packing your items' },
    { label: 'Out for Delivery', desc: 'Rider is on the way' },
    { label: 'Delivered', desc: 'Handed over at doorstep' }
  ];

  const statusOrder: OrderStatus[] = ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    if (id) {
      await orderService.updateOrderStatus(id, newStatus);
    }
    showToast(`Order status updated to: ${newStatus}`, 'info');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/orders')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-extrabold text-white">Track Order</h1>
            <p className="text-[11px] text-emerald-200">Order #{cleanId}</p>
          </div>
        </div>

        {/* Demo Controller Button */}
        <div className="flex items-center gap-1 bg-emerald-800 px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-200">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Demo Interactive</span>
        </div>
      </header>

      {/* ETA Banner */}
      <div className="bg-emerald-950 text-white p-4 text-center border-b border-emerald-800 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-black mb-2 shadow-md">
          <Clock className="w-3.5 h-3.5" />
          <span>Arriving in 18 minutes</span>
        </div>
        <h2 className="text-sm font-bold text-emerald-100">
          {currentStatus === 'Delivered'
            ? 'Order Delivered! Enjoy your fresh items.'
            : currentStatus === 'Out for Delivery'
            ? 'Rider Rohit is heading to your address in Kota'
            : currentStatus === 'Preparing'
            ? 'Sharma Grocery is packing your order'
            : 'Order received by store'}
        </h2>
      </div>

      {/* Visual Map Placeholder Graphic */}
      <div className="p-4">
        <div className="h-44 rounded-3xl bg-gradient-to-tr from-slate-900 via-emerald-950 to-teal-900 border border-emerald-700/50 shadow-md relative overflow-hidden flex flex-col justify-between p-4 text-white">
          {/* Simulated Map Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Map Nodes */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Store Location */}
            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-emerald-500/30">
              <Store className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] font-bold text-emerald-300 block">STORE</span>
                <span className="text-xs font-extrabold text-white">{order?.storeName || 'Sharma Grocery'}</span>
              </div>
            </div>

            {/* Path indicator */}
            <div className="flex-1 px-3 flex items-center">
              <div className="w-full h-1 bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-400 rounded-full relative">
                {/* Moving Bike Icon */}
                <div
                  className="absolute -top-3.5 transition-all duration-700"
                  style={{ left: `${Math.min(90, Math.max(10, ((currentIndex + 1) / 4) * 100))}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <Bike className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Location */}
            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-emerald-500/30">
              <MapPin className="w-4 h-4 text-orange-400" />
              <div>
                <span className="text-[10px] font-bold text-orange-300 block">DESTINATION</span>
                <span className="text-xs font-extrabold text-white">Talwandi, Kota</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-emerald-200 bg-black/40 backdrop-blur-xs p-2 rounded-xl border border-white/10">
            <span>Live Delivery Route • 1.2 km distance</span>
            <span className="font-bold text-white">Kota Central Zone</span>
          </div>
        </div>
      </div>

      {/* Interactive Demo Control Bar */}
      <div className="px-4 mb-3">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-amber-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Demo Status Control (Simulate Workflow)
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {statusOrder.map((st, idx) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all ${
                  currentStatus === st
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                {idx + 1}. {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rider Information Card */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
            Delivery Partner
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 overflow-hidden border-2 border-emerald-600">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Delivery Partner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Rohit Sharma</h4>
                <p className="text-xs text-slate-500">Vehicle: Hero Splendor (RJ 20 EB 4821)</p>
                <div className="flex items-center gap-1 mt-0.5 text-[11px] text-emerald-700 font-bold">
                  <span>★ 4.9 Rating</span>
                  <span>•</span>
                  <span>1,240+ deliveries</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Calling rider Rohit Sharma...', 'info')}
                className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-2xs"
                aria-label="Call Rider"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening chat with Rohit...', 'info')}
                className="w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center shadow-2xs"
                aria-label="Chat with Rider"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="px-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-4">
            Order Progress
          </h3>

          <div className="space-y-4 relative pl-4 border-l-2 border-slate-200 ml-3">
            {steps.map((step, idx) => {
              const isDone = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div key={step.label} className="relative flex items-start justify-between group">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-700 border-emerald-700 text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${
                      isCurrent ? 'text-emerald-700 font-extrabold text-sm' : isDone ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step.label} {isCurrent && '●'}
                    </h4>
                    <p className="text-[11px] text-slate-500">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
