import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  clearCart: () => void;
  totalItemsCount: number;
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  totalAmount: number;
  freeDeliveryThreshold: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'zippycart_cart_items';
const COUPON_STORAGE_KEY = 'zippycart_applied_coupon';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed saving cart to localStorage:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed saving coupon to localStorage:', e);
    }
  }, [appliedCoupon]);

  const getItemQuantity = (productId: string): number => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      showToast(`Removed ${item.product.name}`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (coupon: Coupon) => {
    setAppliedCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied!`, 'success');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const itemTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const freeDeliveryThreshold = 250;
  const deliveryFee = itemTotal >= freeDeliveryThreshold || itemTotal === 0 ? 0 : 15;
  const platformFee = itemTotal > 0 ? 5 : 0;

  // Calculate discount based on applied coupon
  let discount = 0;
  if (appliedCoupon && itemTotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'flat') {
      discount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'percentage') {
      const calculated = (itemTotal * appliedCoupon.discountValue) / 100;
      discount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    }
  }

  const totalAmount = Math.max(0, itemTotal + deliveryFee + platformFee - Math.round(discount));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        totalItemsCount,
        itemTotal,
        deliveryFee,
        platformFee,
        discount: Math.round(discount),
        totalAmount,
        freeDeliveryThreshold,
        appliedCoupon,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
