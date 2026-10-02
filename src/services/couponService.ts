import { MOCK_COUPONS } from '../data/coupons';
import { Coupon } from '../types';

export const couponService = {
  async getCoupons(): Promise<Coupon[]> {
    return Promise.resolve([...MOCK_COUPONS]);
  },

  async validateCoupon(code: string, cartTotal: number): Promise<{ valid: boolean; coupon?: Coupon; error?: string }> {
    const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) {
      return Promise.resolve({ valid: false, error: 'Invalid promo code' });
    }
    if (cartTotal < coupon.minOrderValue) {
      return Promise.resolve({
        valid: false,
        error: `Add ₹${coupon.minOrderValue - cartTotal} more to apply code ${coupon.code}`
      });
    }
    return Promise.resolve({ valid: true, coupon });
  }
};
