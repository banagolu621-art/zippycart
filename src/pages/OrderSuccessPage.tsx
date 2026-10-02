import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { CheckCircle2, Clock, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const o = await orderService.getOrderById(id);
        if (o) setOrder(o);
      }
    };
    fetchOrder();
  }, [id]);

  const orderIdText = order ? `#${order.id.replace('#', '')}` : `#ZP${id || '10284'}`;

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white flex flex-col items-center justify-between p-6 text-center min-h-[600px] animate-fade-in">
      <div className="pt-6" />

      <div className="space-y-4 max-w-sm my-auto">
        {/* Success Animated Circle */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center mx-auto shadow-2xl animate-pulse-subtle">
          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-emerald-950 shadow-md">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-1">
            Success!
          </span>
          <h1 className="text-2xl font-black text-white">Order Placed!</h1>
          <p className="text-xs text-emerald-100 mt-1">Your order has been confirmed.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-emerald-300 font-medium">Order ID</span>
            <span className="font-mono font-bold text-white text-sm">{orderIdText}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-emerald-300 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              Estimated Delivery
            </span>
            <span className="font-extrabold text-amber-300">25 minutes</span>
          </div>

          {order && (
            <div className="flex justify-between items-center pt-1 border-t border-white/10">
              <span className="text-emerald-300 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Store
              </span>
              <span className="font-bold text-white">{order.storeName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full space-y-2.5 pb-4 max-w-sm">
        <button
          onClick={() => navigate(`/orders/${id || 'ZP10284'}/track`)}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
        >
          <Clock className="w-4 h-4" />
          <span>Track Order</span>
        </button>

        <button
          onClick={() => navigate('/home')}
          className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};
