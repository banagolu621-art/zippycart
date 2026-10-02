import { NotificationItem } from '../types';

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Order Preparing 🍳',
    message: 'Sharma Grocery has started packing your order #ZP10284.',
    timestamp: '10 mins ago',
    read: false,
    type: 'order',
    linkUrl: '/orders/ZP10284/track'
  },
  {
    id: 'n2',
    title: 'Rider Picked Up 🛵',
    message: 'Rohit is on the way with your order #ZP10284.',
    timestamp: '5 mins ago',
    read: false,
    type: 'order',
    linkUrl: '/orders/ZP10284/track'
  },
  {
    id: 'n3',
    title: '₹50 Coupon Available 🎉',
    message: 'Use code WELCOME50 to get ₹50 off on orders above ₹149!',
    timestamp: '2 hours ago',
    read: true,
    type: 'promo',
    linkUrl: '/coupons'
  },
  {
    id: 'n4',
    title: 'Fresh Vegetables Near You 🥦',
    message: 'Fresh Mart just stocked organic hydroponic spinach & tomatoes.',
    timestamp: '1 day ago',
    read: true,
    type: 'system',
    linkUrl: '/category/vegetables'
  }
];
