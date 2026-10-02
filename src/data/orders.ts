import { Order } from '../types';

export const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'ZP10284',
    createdAt: '2026-10-02 16:15',
    storeId: 'store-sharma-grocery',
    storeName: 'Sharma Grocery',
    items: [
      {
        productId: 'p-amul-milk',
        productName: 'Amul Fresh Milk',
        quantity: 1,
        unitPrice: 62,
        totalPrice: 62,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'p-lays-classic',
        productName: 'Lay\'s Classic Salted (52 g)',
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'p-amul-butter',
        productName: 'Amul Pasteurised Salted Butter',
        quantity: 1,
        unitPrice: 58,
        totalPrice: 58,
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80'
      }
    ],
    itemTotal: 160,
    deliveryFee: 15,
    platformFee: 5,
    discount: 10,
    totalAmount: 170,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      houseFlat: '123, Green Park Colony',
      streetArea: 'Talwandi',
      town: 'Kota',
      pincode: '324005',
      isDefault: true
    },
    deliveryInstructions: 'Ring the bell twice, leave at gate if unavailable.',
    status: 'Out for Delivery',
    estimatedDeliveryTime: '18 mins',
    riderName: 'Rohit Sharma',
    riderPhone: '+91 98290 12345',
    riderVehicle: 'Hero Splendor (RJ 20 EB 4821)'
  },
  {
    id: 'ZP10211',
    createdAt: '2026-09-29 11:30',
    storeId: 'store-city-super-store',
    storeName: 'City Super Store',
    items: [
      {
        productId: 'p-aashirvaad-atta',
        productName: 'Aashirvaad Shuddh Chakki Atta (10 kg)',
        quantity: 1,
        unitPrice: 345,
        totalPrice: 345,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'p-tata-salt',
        productName: 'Tata Salt (1 kg)',
        quantity: 2,
        unitPrice: 28,
        totalPrice: 56,
        image: 'https://images.unsplash.com/photo-1518110165387-975549b4395e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    itemTotal: 401,
    deliveryFee: 25,
    platformFee: 5,
    discount: 11,
    totalAmount: 420,
    paymentMethod: 'Cards',
    paymentStatus: 'Paid',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      houseFlat: '123, Green Park Colony',
      streetArea: 'Talwandi',
      town: 'Kota',
      pincode: '324005',
      isDefault: true
    },
    status: 'Delivered',
    estimatedDeliveryTime: 'Delivered in 22 mins',
    riderName: 'Vikram Singh',
    riderPhone: '+91 94140 88776',
    riderVehicle: 'TVS Jupiter (RJ 20 SF 1092)'
  }
];
