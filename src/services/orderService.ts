import { INITIAL_MOCK_ORDERS } from '../data/orders';
import { Order, OrderStatus, CartItem, DeliveryAddress, PaymentMethod } from '../types';

// Simple in-memory storage backed by localStorage
const STORAGE_KEY = 'zippycart_orders';

const getStoredOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read orders from localStorage:', err);
  }
  // Default initial mock orders
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ORDERS));
  return INITIAL_MOCK_ORDERS;
};

const saveStoredOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage:', err);
  }
};

export const orderService = {
  async getOrders(): Promise<Order[]> {
    return Promise.resolve(getStoredOrders());
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    const orders = getStoredOrders();
    return Promise.resolve(orders.find(o => o.id === id || o.id === `#${id}`));
  },

  async createOrder(params: {
    storeId: string;
    storeName: string;
    items: CartItem[];
    itemTotal: number;
    deliveryFee: number;
    platformFee: number;
    discount: number;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    deliveryAddress: DeliveryAddress;
    deliveryInstructions?: string;
  }): Promise<Order> {
    const orders = getStoredOrders();
    const newId = `ZP${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: Order = {
      id: newId,
      createdAt,
      storeId: params.storeId,
      storeName: params.storeName,
      items: params.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
        image: item.product.image
      })),
      itemTotal: params.itemTotal,
      deliveryFee: params.deliveryFee,
      platformFee: params.platformFee,
      discount: params.discount,
      totalAmount: params.totalAmount,
      paymentMethod: params.paymentMethod,
      paymentStatus: 'Paid',
      deliveryAddress: params.deliveryAddress,
      deliveryInstructions: params.deliveryInstructions,
      status: 'Placed',
      estimatedDeliveryTime: '25 mins',
      riderName: 'Rohit Sharma',
      riderPhone: '+91 98290 12345',
      riderVehicle: 'Hero Splendor (RJ 20 EB 4821)'
    };

    orders.unshift(newOrder);
    saveStoredOrders(orders);
    return Promise.resolve(newOrder);
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | undefined> {
    const orders = getStoredOrders();
    const index = orders.findIndex(o => o.id === orderId || o.id === `#${orderId}`);
    if (index !== -1) {
      orders[index].status = status;
      saveStoredOrders(orders);
      return Promise.resolve(orders[index]);
    }
    return Promise.resolve(undefined);
  }
};
