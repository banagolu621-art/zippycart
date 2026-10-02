import { Coupon } from '../types';

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'WELCOME50',
    title: 'Flat ₹50 OFF',
    description: 'Get ₹50 flat discount on your first ZippyCart order in Kota',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 149,
    expiresAt: '2026-12-31'
  },
  {
    code: 'FRESH20',
    title: '20% OFF Fresh Produce',
    description: '20% discount on fresh fruits and farm vegetables',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 199,
    maxDiscount: 60,
    expiresAt: '2026-11-15'
  },
  {
    code: 'ZIPPY100',
    title: 'Mega Saver ₹100 OFF',
    description: 'Flat ₹100 discount on pantry and monthly grocery orders',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 499,
    expiresAt: '2026-12-31'
  },
  {
    code: 'KOTA30',
    title: 'Kota Special 30% OFF',
    description: '30% off on snacks and beverages from city stores',
    discountType: 'percentage',
    discountValue: 30,
    minOrderValue: 250,
    maxDiscount: 75,
    expiresAt: '2026-10-31'
  }
];
