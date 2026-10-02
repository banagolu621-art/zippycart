import { MOCK_USER } from '../data/users';
import { UserProfile, DeliveryAddress } from '../types';

const USER_STORAGE_KEY = 'zippycart_user_profile';

const getStoredUser = (): UserProfile => {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading user profile:', e);
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(MOCK_USER));
  return MOCK_USER;
};

export const authService = {
  async getCurrentUser(): Promise<UserProfile> {
    return Promise.resolve(getStoredUser());
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const user = getStoredUser();
    const updated = { ...user, ...updates };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return Promise.resolve(updated);
  },

  async addSavedAddress(address: Omit<DeliveryAddress, 'id'>): Promise<DeliveryAddress> {
    const user = getStoredUser();
    const newAddress: DeliveryAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    user.savedAddresses.push(newAddress);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return Promise.resolve(newAddress);
  }
};
