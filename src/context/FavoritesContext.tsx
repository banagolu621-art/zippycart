import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';

interface FavoritesContextType {
  favoriteProductIds: string[];
  favoriteStoreIds: string[];
  toggleFavoriteProduct: (productId: string, name?: string) => void;
  toggleFavoriteStore: (storeId: string, name?: string) => void;
  isProductFavorite: (productId: string) => boolean;
  isStoreFavorite: (storeId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const PROD_FAV_KEY = 'zippycart_fav_products';
const STORE_FAV_KEY = 'zippycart_fav_stores';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PROD_FAV_KEY);
      return saved ? JSON.parse(saved) : ['p-amul-milk', 'p-banana-robusta'];
    } catch {
      return ['p-amul-milk', 'p-banana-robusta'];
    }
  });

  const [favoriteStoreIds, setFavoriteStoreIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORE_FAV_KEY);
      return saved ? JSON.parse(saved) : ['store-sharma-grocery'];
    } catch {
      return ['store-sharma-grocery'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROD_FAV_KEY, JSON.stringify(favoriteProductIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteProductIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_FAV_KEY, JSON.stringify(favoriteStoreIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteStoreIds]);

  const toggleFavoriteProduct = (productId: string, name?: string) => {
    setFavoriteProductIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed ${name || 'item'} from favorites`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Added ${name || 'item'} to favorites ❤️`, 'success');
        return [...prev, productId];
      }
    });
  };

  const toggleFavoriteStore = (storeId: string, name?: string) => {
    setFavoriteStoreIds(prev => {
      const exists = prev.includes(storeId);
      if (exists) {
        showToast(`Removed ${name || 'store'} from favorites`, 'info');
        return prev.filter(id => id !== storeId);
      } else {
        showToast(`Saved ${name || 'store'} to favorites ❤️`, 'success');
        return [...prev, storeId];
      }
    });
  };

  const isProductFavorite = (productId: string) => favoriteProductIds.includes(productId);
  const isStoreFavorite = (storeId: string) => favoriteStoreIds.includes(storeId);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteProductIds,
        favoriteStoreIds,
        toggleFavoriteProduct,
        toggleFavoriteStore,
        isProductFavorite,
        isStoreFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
