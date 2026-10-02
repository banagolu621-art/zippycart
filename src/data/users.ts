import { UserProfile, Rider } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'usr-mayuri',
  name: 'Mayuri Sainn',
  email: 'mayuri@gmail.com',
  phone: '+91 98280 54321',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home',
      houseFlat: '123, Green Park Colony',
      streetArea: 'Talwandi',
      town: 'Kota',
      pincode: '324005',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Work',
      houseFlat: 'A-14, IT Park Extension',
      streetArea: 'IPIA Industrial Area',
      town: 'Kota',
      pincode: '324003',
      isDefault: false
    }
  ]
};

export const MOCK_RIDERS: Rider[] = [
  {
    id: 'r1',
    name: 'Rohit Sharma',
    phone: '+91 98290 12345',
    vehicle: 'Hero Splendor (RJ 20 EB 4821)',
    rating: 4.9,
    deliveriesCompleted: 1240,
    isOnline: true,
    currentOrderId: 'ZP10284'
  },
  {
    id: 'r2',
    name: 'Vikram Singh',
    phone: '+91 94140 88776',
    vehicle: 'TVS Jupiter (RJ 20 SF 1092)',
    rating: 4.8,
    deliveriesCompleted: 890,
    isOnline: true
  },
  {
    id: 'r3',
    name: 'Amit Verma',
    phone: '+91 97850 66432',
    vehicle: 'Honda Activa (RJ 20 CD 3311)',
    rating: 4.7,
    deliveriesCompleted: 650,
    isOnline: false
  }
];
