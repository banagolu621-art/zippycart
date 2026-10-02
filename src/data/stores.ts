import { Store } from '../types';

export const MOCK_STORES: Store[] = [
  {
    id: 'store-sharma-grocery',
    name: 'Sharma Grocery',
    category: 'Grocery & Daily Needs',
    distance: '1.2 km',
    deliveryTime: '20–30 min',
    rating: 4.5,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    address: 'Shop 14, Talwandi Main Market, Kota',
    isOpen: true,
    tags: ['Kirana Essentials', 'Fresh Dairy', 'Best Prices']
  },
  {
    id: 'store-fresh-mart',
    name: 'Fresh Mart',
    category: 'Vegetables & Fruits',
    distance: '0.8 km',
    deliveryTime: '15–25 min',
    rating: 4.7,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    address: 'Plot 42, Vigyan Nagar, Kota',
    isOpen: true,
    tags: ['Farm Fresh', 'Organic Greens', 'Daily Stock']
  },
  {
    id: 'store-city-super-store',
    name: 'City Super Store',
    category: 'Supermarket & Packaged Food',
    distance: '2.4 km',
    deliveryTime: '25–35 min',
    rating: 4.6,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    address: 'Gumanpura Main Road, Kota',
    isOpen: true,
    tags: ['All Brands', 'Discounts', 'Imported Snacks']
  },
  {
    id: 'store-green-basket',
    name: 'Green Basket',
    category: 'Organic Fruits & Veggies',
    distance: '1.5 km',
    deliveryTime: '20–30 min',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80',
    address: 'CAD Circle, Dadabari, Kota',
    isOpen: true,
    tags: ['Pesticide Free', 'Hydrated Cold Chain']
  },
  {
    id: 'store-local-daily-needs',
    name: 'Local Daily Needs',
    category: 'Dairy & Morning Express',
    distance: '0.5 km',
    deliveryTime: '10–20 min',
    rating: 4.4,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    address: 'Mahaveer Nagar 1st, Kota',
    isOpen: true,
    tags: ['Early Morning Delivery', 'Fresh Milk']
  },
  {
    id: 'store-royal-bakery',
    name: 'Royal Bakery',
    category: 'Bakery & Confectionery',
    distance: '1.9 km',
    deliveryTime: '20–30 min',
    rating: 4.9,
    reviewCount: 850,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    address: 'Chawani Chauraha, Kota',
    isOpen: true,
    tags: ['Hot Patties', 'Artisanal Breads', 'Eggless Cakes']
  }
];
