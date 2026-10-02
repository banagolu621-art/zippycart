import { Category } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'grocery',
    name: 'Grocery',
    description: 'Atta, rice, oil, pulses & essentials',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Atta & Rice', 'Oil & Ghee', 'Pulses & Spices', 'Salt & Sugar', 'Snacks']
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Farm fresh & seasonal greens',
    iconName: 'Carrot',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Fresh Greens', 'Potatoes & Onions', 'Exotic Vegetables', 'Tomatoes & Peppers']
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Sweet, organic & fresh fruits',
    iconName: 'Apple',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Seasonal Fruits', 'Citrus & Berries', 'Exotic Fruits', 'Banana & Apples']
  },
  {
    id: 'dairy',
    name: 'Dairy',
    description: 'Milk, butter, paneer & curd',
    iconName: 'Milk',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Fresh Milk', 'Curd & Lassi', 'Butter & Cheese', 'Paneer']
  },
  {
    id: 'bakery',
    name: 'Bakery',
    description: 'Fresh bread, cookies & cakes',
    iconName: 'Cake',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Breads', 'Cookies & Biscuits', 'Cakes & Pastries', 'Rusk & Toast']
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Ready-to-eat meals, snacks & street food',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Noodles & Pasta', 'Instant Food', 'Local Snacks', 'Sweets & Namkeen']
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Juices, soft drinks, tea & coffee',
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Soft Drinks', 'Juices', 'Tea & Coffee', 'Energy Drinks']
  },
  {
    id: 'household',
    name: 'Household',
    description: 'Cleaning, detergents & essentials',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Detergents', 'Dishwashing', 'Surface Cleaners', 'Pooja Needs']
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    description: 'Soaps, shampoos & skin care',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Soaps & Handwash', 'Hair Care', 'Oral Care', 'Skin Care']
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'OTC medicines & wellness needs',
    iconName: 'Cross',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    subCategories: ['First Aid', 'Pain Relief', 'Vitamins', 'Hygiene']
  },
  {
    id: 'cafe',
    name: 'Café',
    description: 'Hot brews, patties & artisanal snacks',
    iconName: 'CupSoda',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Hot Coffee', 'Cold Brews', 'Pastries', 'Sandwiches']
  },
  {
    id: 'stores',
    name: 'Nearby Stores',
    description: 'Explore verified local shops near you',
    iconName: 'Store',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    subCategories: ['Kirana', 'Supermarkets', 'Bakeries', 'Pharmacies']
  }
];
