import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { SearchBar } from '../components/common/SearchBar';
import { BannerCarousel } from '../components/common/BannerCarousel';
import { CategoryChip } from '../components/common/CategoryChip';
import { StoreCard } from '../components/common/StoreCard';
import { ProductCard } from '../components/common/ProductCard';
import { ProductSkeleton, StoreSkeleton } from '../components/common/SkeletonLoader';
import { MOCK_CATEGORIES } from '../data/categories';
import { storeService } from '../services/storeService';
import { productService } from '../services/productService';
import { Store, Product } from '../types';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sList, pList] = await Promise.all([
          storeService.getNearbyStores(),
          productService.getPopularProducts()
        ]);
        setStores(sList);
        setPopularProducts(pList);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-slate-50 pb-8 min-h-screen">
      {/* Header & Search */}
      <Header />
      <SearchBar isReadOnly />

      {/* Hero Banner */}
      <BannerCarousel />

      {/* Express Delivery Promise Tagline strip */}
      <div className="px-4 py-2 my-2 bg-emerald-50 border-y border-emerald-100 flex items-center justify-around text-[11px] text-emerald-900 font-bold">
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          15-20 Min Delivery
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          Verified Stores
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Best Prices
        </span>
      </div>

      {/* Horizontal Category Scroll */}
      <section className="mt-2">
        <div className="px-4 py-2 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Explore Categories
          </h2>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
          {MOCK_CATEGORIES.slice(0, 8).map(cat => (
            <CategoryChip key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Nearby Stores Section */}
      <section className="mt-5">
        <div className="px-4 py-2 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Nearby Stores</h2>
            <p className="text-[11px] text-slate-500">Delivering fast to your location in Kota</p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
          {loading ? (
            <>
              <StoreSkeleton />
              <StoreSkeleton />
            </>
          ) : (
            stores.map(store => <StoreCard key={store.id} store={store} />)
          )}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="mt-6">
        <div className="px-4 py-2 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Popular Near You</h2>
            <p className="text-[11px] text-slate-500">Everyday essentials ordered most in Kota</p>
          </div>
          <button
            onClick={() => navigate('/category/grocery')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 mt-1">
          {loading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};
