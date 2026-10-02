import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/common/EmptyState';
import { ArrowLeft, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemTotal,
    deliveryFee,
    platformFee,
    discount,
    totalAmount,
    freeDeliveryThreshold,
    appliedCoupon,
    removeCoupon
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex-1 bg-slate-50 min-h-screen pb-12">
        <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/home')} className="p-1 rounded-full text-emerald-200 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-extrabold text-white">Your Cart</h1>
          </div>
        </header>
        <EmptyState type="cart" actionPath="/home" actionText="Browse Products & Stores" />
      </div>
    );
  }

  const remainingForFreeDelivery = freeDeliveryThreshold - itemTotal;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white">Your Cart ({cart.length} items)</h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-emerald-200 hover:text-white flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </header>

      {/* Free Delivery Progress Note */}
      <div className="bg-orange-50 border-b border-orange-100 p-3 px-4 flex items-center gap-2.5 text-xs text-orange-900 font-bold">
        <Truck className="w-4 h-4 text-orange-500 shrink-0" />
        {remainingForFreeDelivery > 0 ? (
          <span>
            Add <span className="text-orange-600 font-black">₹{remainingForFreeDelivery}</span> more to get <span className="underline">FREE Delivery</span>!
          </span>
        ) : (
          <span className="text-emerald-700 font-extrabold">🎉 You unlocked FREE Delivery!</span>
        )}
      </div>

      {/* Cart Items List */}
      <div className="p-4 space-y-3">
        {cart.map(item => (
          <div
            key={item.product.id}
            className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center gap-3"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-extrabold text-slate-800 line-clamp-1">
                {item.product.name}
              </h3>
              <p className="text-[11px] text-slate-500">{item.product.quantityUnit}</p>
              <div className="text-sm font-black text-slate-900 mt-1">
                ₹{item.product.price * item.quantity}
                {item.quantity > 1 && (
                  <span className="text-[10px] text-slate-400 font-medium ml-1">
                    (₹{item.product.price} each)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center bg-emerald-700 text-white rounded-xl overflow-hidden shadow-2xs">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="p-1.5 hover:bg-emerald-800"
              >
                {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              </button>
              <span className="px-2.5 text-xs font-black">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-1.5 hover:bg-emerald-800"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Application Bar */}
      <div className="px-4 py-1">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Tag className="w-4 h-4 text-orange-500" />
            <div>
              <span className="text-xs font-extrabold text-slate-800 block">
                {appliedCoupon ? `Applied: ${appliedCoupon.code}` : 'Offers & Coupons'}
              </span>
              <span className="text-[11px] text-slate-500">
                {appliedCoupon ? `Saved ₹${discount} on this order` : 'Save up to ₹100 with promo codes'}
              </span>
            </div>
          </div>

          {appliedCoupon ? (
            <button
              onClick={removeCoupon}
              className="text-xs font-bold text-red-600 hover:underline px-2 py-1"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={() => navigate('/coupons')}
              className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl text-xs font-bold transition-all"
            >
              Apply
            </button>
          )}
        </div>
      </div>

      {/* Bill Summary */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5 text-xs">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">
            Bill Breakdown
          </h3>

          <div className="flex justify-between text-slate-600">
            <span>Item Total</span>
            <span className="font-bold text-slate-800">₹{itemTotal}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            <span className="font-bold text-slate-800">
              {deliveryFee === 0 ? <span className="text-emerald-700 font-extrabold">FREE</span> : `₹${deliveryFee}`}
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Platform Handling Fee</span>
            <span className="font-bold text-slate-800">₹{platformFee}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl">
              <span>Coupon Savings ({appliedCoupon?.code})</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm font-black text-slate-900">
            <span>To Pay</span>
            <span className="text-base text-emerald-800">₹{totalAmount}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Safe Payment • Contactless Delivery</span>
        </div>
      </div>

      {/* Fixed Checkout CTA */}
      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg z-30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Grand Total</span>
            <span className="text-lg font-black text-slate-900">₹{totalAmount}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
