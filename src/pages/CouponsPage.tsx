import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { couponService } from '../services/couponService';
import { Coupon } from '../types';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Tag, Copy, Check, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CouponsPage: React.FC = () => {
  const navigate = useNavigate();
  const { applyCoupon, itemTotal, appliedCoupon } = useCart();
  const { showToast } = useToast();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    couponService.getCoupons().then(setCoupons);
  }, []);

  const handleApply = async (coupon: Coupon) => {
    const result = await couponService.validateCoupon(coupon.code, itemTotal);
    if (!result.valid && result.error) {
      showToast(result.error, 'error');
    } else {
      applyCoupon(coupon);
      navigate('/cart');
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code ${code} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/cart')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-orange-400" />
            <span>Offers & Coupons</span>
          </h1>
        </div>
      </header>

      {/* Cart Summary Banner */}
      <div className="bg-emerald-950 text-emerald-100 p-3.5 px-4 text-xs flex items-center justify-between border-b border-emerald-800">
        <div>
          <span className="text-slate-300 block">Current Cart Total:</span>
          <span className="text-sm font-black text-white">₹{itemTotal}</span>
        </div>
        <span className="text-[11px] text-emerald-300 font-bold bg-emerald-800/80 px-2.5 py-1 rounded-lg">
          Kota Promo Discounts
        </span>
      </div>

      {/* List of Coupons */}
      <div className="p-4 space-y-3">
        {coupons.map(coupon => {
          const isApplied = appliedCoupon?.code === coupon.code;
          const isEligible = itemTotal >= coupon.minOrderValue;

          return (
            <div
              key={coupon.code}
              className={`bg-white rounded-2xl p-4 border shadow-2xs relative overflow-hidden transition-all ${
                isApplied
                  ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                  : 'border-slate-200'
              }`}
            >
              {/* Top coupon header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-xl font-mono font-black text-xs border border-orange-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-orange-600" />
                    <span>{coupon.code}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Copy code"
                  >
                    {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={() => handleApply(coupon)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-2xs ${
                    isApplied
                      ? 'bg-emerald-700 text-white'
                      : isEligible
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                  }`}
                >
                  {isApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>

              {/* Title & Description */}
              <div className="mt-3">
                <h3 className="text-sm font-extrabold text-slate-900">{coupon.title}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{coupon.description}</p>
              </div>

              {/* Requirements & expiry */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500">
                  Min Order: <span className="font-bold text-slate-800">₹{coupon.minOrderValue}</span>
                </span>
                <span className="text-emerald-700 font-bold">Valid till Dec 2026</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
