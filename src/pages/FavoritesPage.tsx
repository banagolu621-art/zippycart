import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { productService } from '../services/productService';
import { storeService } from '../services/storeService';
import { Product, Store } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { StoreCard } from '../components/common/StoreCard';
import { EmptyState } from '../components/common/EmptyState';
import { ArrowLeft, Heart } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteProductIds, favoriteStoreIds } = useFavorites();

  const [favProducts, setFavProducts] = useState<Product[]>([]);
  const [favStores, setFavStores] = useState<Store[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'stores'>('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavs = async () => {
      setLoading(true);
      try {
        const allProds = await productService.getProducts();
        const allStores = await storeService.getStores();

        setFavProducts(allProds.filter(p => favoriteProductIds.includes(p.id)));
        setFavStores(allStores.filter(s => favoriteStoreIds.includes(s.id)));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFavs();
  }, [favoriteProductIds, favoriteStoreIds]);

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            <span>Saved Favorites</span>
          </h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 p-2 flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'products'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Favorited Products ({favProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'stores'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Favorited Stores ({favStores.length})
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400 font-semibold">
            Loading favorites...
          </div>
        ) : activeTab === 'products' ? (
          favProducts.length === 0 ? (
            <EmptyState
              type="favorites"
              title="No Saved Products"
              description="Tap the heart icon on any product to save it to your wishlist."
              actionText="Discover Products"
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {favProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )
        ) : favStores.length === 0 ? (
          <EmptyState
            type="favorites"
            title="No Saved Stores"
            description="Tap the heart icon on any store to save your favorite shops in Kota."
            actionText="Discover Stores"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {favStores.map(s => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
