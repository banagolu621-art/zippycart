import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/common/EmptyState';
import { ArrowLeft, Clock, RotateCcw, ChevronRight, Store, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { productService } from '../services/productService';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const list = await orderService.getOrders();
        setOrders(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');

  const displayedOrders = activeTab === 'Active' ? activeOrders : pastOrders;

  const handleReorder = async (order: Order) => {
    showToast(`Adding items from order #${order.id} to cart...`, 'info');
    for (const item of order.items) {
      const p = await productService.getProductById(item.productId);
      if (p) {
        addToCart(p);
      }
    }
    navigate('/cart');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white">Your Orders</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 p-2 flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('Active')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'Active'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('Past')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'Past'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Past Orders ({pastOrders.length})
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400 font-semibold">
            Loading orders...
          </div>
        ) : displayedOrders.length === 0 ? (
          <EmptyState
            type="orders"
            title={activeTab === 'Active' ? 'No Active Orders' : 'No Past Orders'}
            description={
              activeTab === 'Active'
                ? 'You do not have any orders currently being prepared or delivered.'
                : 'Your order history will appear here.'
            }
          />
        ) : (
          displayedOrders.map(order => {
            const cleanId = order.id.replace('#', '');
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
              >
                {/* Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <span className="text-xs font-black text-slate-900">Order #{cleanId}</span>
                    <span className="text-[10px] text-slate-400 block">{order.createdAt}</span>
                  </div>

                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-orange-50 text-orange-700 border border-orange-200 animate-pulse'
                  }`}>
                    {order.status === 'Delivered' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3 text-orange-500" />
                    )}
                    <span>{order.status}</span>
                  </span>
                </div>

                {/* Store info & Item Preview */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-extrabold text-slate-800 block">{order.storeName}</span>
                      <span className="text-slate-500 text-[11px]">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>

                  <span className="font-black text-slate-900 text-sm">₹{order.totalAmount}</span>
                </div>

                {/* Items Mini Grid */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100 text-[11px] shrink-0">
                      <img src={it.image} alt={it.productName} className="w-6 h-6 rounded-md object-cover" />
                      <span className="font-medium text-slate-700 max-w-[100px] truncate">
                        {it.productName} (x{it.quantity})
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Action */}
                <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {order.status === 'Delivered' ? 'Delivered successfully' : `Estimated: ${order.estimatedDeliveryTime}`}
                  </span>

                  {order.status !== 'Delivered' ? (
                    <button
                      onClick={() => navigate(`/orders/${cleanId}/track`)}
                      className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
