import { MOCK_STORES } from '../data/stores';
import { Store } from '../types';

export const storeService = {
  async getStores(): Promise<Store[]> {
    return Promise.resolve([...MOCK_STORES]);
  },

  async getNearbyStores(): Promise<Store[]> {
    return Promise.resolve([...MOCK_STORES]);
  },

  async getStoreById(id: string): Promise<Store | undefined> {
    return Promise.resolve(MOCK_STORES.find(s => s.id === id));
  },

  async searchStores(query: string): Promise<Store[]> {
    const q = query.toLowerCase().trim();
    if (!q) return Promise.resolve([]);
    return Promise.resolve(
      MOCK_STORES.filter(
        s => s.name.toLowerCase().includes(q) ||
             s.category.toLowerCase().includes(q) ||
             s.tags.some(t => t.toLowerCase().includes(q))
      )
    );
  }
};
