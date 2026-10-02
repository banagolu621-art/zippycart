import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storeService } from '../services/storeService';
import { productService } from '../services/productService';
import { Store, Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { ProductSkeleton } from '../components/common/SkeletonLoader';
import { ArrowLeft, Star, MapPin, Clock, Search, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export const StoreDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { totalItemsCount } = useCart();
  const { isStoreFavorite, toggleFavoriteStore } = useFavorites();

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      try {
        const s = await storeService.getStoreById(id || '');
        if (s) {
          setStore(s);
          const pList = await productService.getProductsByStore(s.id);
          setProducts(pList.length > 0 ? pList : await productService.getProducts());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [id]);

  if (!store && !loading) {
    return (
      <div className="flex-1 p-8 text-center text-slate-800">
        Store not found.
        <button onClick={() => navigate('/home')} className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl">
          Back to Home
        </button>
      </div>
    );
  }

  const tabs = ['All', 'Groceries', 'Dairy', 'Snacks', 'Beverages', 'Household'];

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase()));

  const isFav = store ? isStoreFavorite(store.id) : false;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-8">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <button
          onClick={() => navigate('/home')}
          className="p-1 rounded-full text-emerald-200 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-extrabold text-white truncate max-w-[200px]">
          {store?.name || 'Store Details'}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/search')}
            className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center relative shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-emerald-950 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-emerald-900">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Store Banner Hero */}
      {store && (
        <div className="bg-white border-b border-slate-200 p-4 relative">
          <div className="h-32 rounded-2xl overflow-hidden bg-slate-200 relative mb-3">
            <img src={store.bannerImage || store.image} alt={store.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={() => toggleFavoriteStore(store.id, store.name)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-400 hover:text-red-500"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">{store.name}</h2>
              <p className="text-xs text-slate-500">{store.category} • {store.address}</p>
            </div>
            <div className="bg-emerald-50 text-emerald-800 px-2 py-1 rounded-xl text-xs font-black flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>{store.rating} ({store.reviewCount})</span>
            </div>
          </div>

          {/* Key details chips */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1 text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              {store.distance}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <Clock className="w-3.5 h-3.5" />
              {store.deliveryTime}
            </span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-[52px] z-20 bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No products found in this category for {store?.name}.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
