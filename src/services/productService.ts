import { MOCK_PRODUCTS } from '../data/products';
import { Product } from '../types';

export const productService = {
  async getProducts(): Promise<Product[]> {
    // Simulate minor async network latency
    return Promise.resolve([...MOCK_PRODUCTS]);
  },

  async getPopularProducts(): Promise<Product[]> {
    return Promise.resolve(MOCK_PRODUCTS.filter(p => p.isPopular));
  },

  async getProductById(id: string): Promise<Product | undefined> {
    return Promise.resolve(MOCK_PRODUCTS.find(p => p.id === id));
  },

  async getProductsByCategory(category: string, subCategory?: string): Promise<Product[]> {
    let filtered = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (subCategory && subCategory !== 'All') {
      filtered = filtered.filter(p => p.subCategory?.toLowerCase() === subCategory.toLowerCase());
    }
    return Promise.resolve(filtered);
  },

  async getProductsByStore(storeId: string): Promise<Product[]> {
    return Promise.resolve(MOCK_PRODUCTS.filter(p => p.storeId === storeId));
  },

  async searchProducts(query: string): Promise<Product[]> {
    const q = query.toLowerCase().trim();
    if (!q) return Promise.resolve([]);
    return Promise.resolve(
      MOCK_PRODUCTS.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             (p.subCategory && p.subCategory.toLowerCase().includes(q))
      )
    );
  }
};
