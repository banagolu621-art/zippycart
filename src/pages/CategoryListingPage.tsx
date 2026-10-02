import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { MOCK_CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { ProductSkeleton } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { Product } from '../types';
import { ArrowLeft, Search, ShoppingBag, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CategoryListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { totalItemsCount } = useCart();

  const category = MOCK_CATEGORIES.find(c => c.id === id) || {
    id: id || 'grocery',
    name: id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Groceries',
    description: 'Fresh products delivered in 15 mins',
    subCategories: ['All', 'Snacks', 'Dairy', 'Beverages', 'Household']
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [discountOnly, setDiscountOnly] = useState(false);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      setLoading(true);
      try {
        const list = await productService.getProductsByCategory(category.id, selectedSubCategory);
        // Fallback to all products if category is empty
        const finalProducts = list.length > 0 ? list : await productService.getProducts();
        setProducts(finalProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryProducts();
  }, [category.id, selectedSubCategory]);

  // Apply sorting and local filter
  const displayedProducts = [...products]
    .filter(p => (!discountOnly || p.discount > 0))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/explore')}
            className="p-1 rounded-full text-emerald-200 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white">{category.name}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/search')}
            className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center relative shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-emerald-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-900">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Subcategory Chips */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {['All', ...(category.subCategories || [])].map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubCategory(sub)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedSubCategory === sub
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Mini Category Promo Banner */}
      <div className="m-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-800 text-white shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest block">
            Quality Guaranteed
          </span>
          <h2 className="text-sm font-extrabold mt-0.5">Fresh & Healthy {category.name}</h2>
          <p className="text-[11px] text-emerald-200 mt-0.5">Directly delivered in 15-20 mins in Kota</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 font-black text-xl">
          ⚡
        </div>
      </div>

      {/* Sort & Filter Controls */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-200 bg-white">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
          <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-transparent font-extrabold text-emerald-700 focus:outline-none cursor-pointer"
          >
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <button
          onClick={() => setDiscountOnly(!discountOnly)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
            discountOnly
              ? 'bg-orange-50 text-orange-600 border-orange-300'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{discountOnly ? 'Discounts Only ✓' : 'Offers Filter'}</span>
        </button>
      </div>

      {/* Product Grid */}
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : displayedProducts.length === 0 ? (
          <EmptyState
            type="search"
            title="No Items Found"
            description="No products available matching your current filters."
            actionText="Reset Filters"
            onAction={() => {
              setSelectedSubCategory('All');
              setDiscountOnly(false);
            }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
