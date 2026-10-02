import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { orderService } from '../services/orderService';
import { PaymentMethod } from '../types';
import { ArrowLeft, MapPin, CreditCard, Banknote, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, itemTotal, deliveryFee, platformFee, discount, totalAmount, clearCart } = useCart();
  const { currentAddress, openLocationModal } = useLocation();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [instructions, setInstructions] = useState('Ring the bell twice, leave at gate if unavailable.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    showToast('Creating order...', 'info');

    try {
      const firstStoreName = cart[0]?.product.storeName || 'Sharma Grocery';
      const firstStoreId = cart[0]?.product.storeId || 'store-sharma-grocery';

      const newOrder = await orderService.createOrder({
        storeId: firstStoreId,
        storeName: firstStoreName,
        items: cart,
        itemTotal,
        deliveryFee,
        platformFee,
        discount,
        totalAmount,
        paymentMethod,
        deliveryAddress: currentAddress,
        deliveryInstructions: instructions
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${newOrder.id.replace('#', '')}`);
    } catch (err) {
      console.error('Failed placing order:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/cart')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white">Checkout</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Delivery Address Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Delivery Address
            </h3>
            <button
              onClick={openLocationModal}
              className="text-xs font-extrabold text-emerald-700 hover:underline"
            >
              [Change]
            </button>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                {currentAddress.label} • {currentAddress.houseFlat}
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                {currentAddress.streetArea}, {currentAddress.town}, Rajasthan - {currentAddress.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Instructions Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            Delivery Instructions
          </h3>
          <input
            type="text"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            placeholder="e.g. Ring the bell, leave at gate, call on arrival..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Payment Method Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
            Payment Method
          </h3>

          <div className="space-y-2">
            {[
              { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm)', icon: CheckCircle2, sub: 'Instant & recommended' },
              { id: 'Cards', label: 'Credit / Debit Cards', icon: CreditCard, sub: 'Visa, Mastercard, RuPay' },
              { id: 'Cash on Delivery', label: 'Cash on Delivery (COD)', icon: Banknote, sub: 'Pay upon arrival at gate' }
            ].map(method => {
              const isSelected = paymentMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-emerald-700 bg-emerald-700' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{method.label}</span>
                      <span className="text-[10px] text-slate-500">{method.sub}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Summary */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 text-xs">
          <h3 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2">
            Price Details
          </h3>
          <div className="flex justify-between text-slate-600">
            <span>Item Total ({cart.length} items)</span>
            <span className="font-bold text-slate-800">₹{itemTotal}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            <span className="font-bold text-slate-800">
              {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Platform Fee</span>
            <span className="font-bold text-slate-800">₹{platformFee}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl">
              <span>Promo Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="border-t border-slate-100 pt-2.5 flex justify-between items-center text-sm font-black text-slate-900">
            <span>Total Payable</span>
            <span className="text-emerald-800 text-base">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Place Order CTA Bar */}
      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg z-30">
        <button
          disabled={isSubmitting}
          onClick={handlePlaceOrder}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Place Order (₹{totalAmount})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
