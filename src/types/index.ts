export type OrderStatus = 'Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'UPI' | 'Cards' | 'Cash on Delivery';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  discount: number; // percentage e.g. 10
  image: string;
  category: string;
  subCategory?: string;
  storeId: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  quantityUnit: string; // e.g. "1 L", "Pack of 4", "500 g"
  available: boolean;
  isPopular?: boolean;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  distance: string; // e.g. "1.2 km"
  deliveryTime: string; // e.g. "20–30 min"
  rating: number;
  reviewCount: number;
  image: string;
  bannerImage: string;
  address: string;
  isOpen: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  subCategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  id: string;
  label: string; // e.g. "Home", "Work"
  houseFlat: string;
  streetArea: string;
  town: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number; // e.g. 50 (flat rupees) or 20 (percent)
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

export interface Order {
  id: string; // e.g. "#ZP10284"
  createdAt: string;
  storeId: string;
  storeName: string;
  items: OrderItem[];
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending';
  deliveryAddress: DeliveryAddress;
  deliveryInstructions?: string;
  status: OrderStatus;
  estimatedDeliveryTime: string; // e.g. "20 min"
  riderName?: string;
  riderPhone?: string;
  riderVehicle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
  linkUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  savedAddresses: DeliveryAddress[];
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  deliveriesCompleted: number;
  isOnline: boolean;
  currentOrderId?: string;
}
