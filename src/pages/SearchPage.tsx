import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/common/SearchBar';
import { ProductCard } from '../components/common/ProductCard';
import { StoreCard } from '../components/common/StoreCard';
import { EmptyState } from '../components/common/EmptyState';
import { productService } from '../services/productService';
import { storeService } from '../services/storeService';
import { Product, Store } from '../types';
import { ArrowLeft, Clock, TrendingUp, Sparkles } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([]);
  const [matchingStores, setMatchingStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);

  const recentSearches = ['milk', 'banana', 'chips', 'maggi'];
  const popularSearches = ['Amul Milk', 'Tomato', 'Tata Salt', 'Lay\'s', 'Atta 10kg', 'Paneer'];

  useEffect(() => {
    const runSearch = async () => {
      if (!query.trim()) {
        setMatchingProducts([]);
        setMatchingStores([]);
        return;
      }
      setLoading(true);
      try {
        const [pList, sList] = await Promise.all([
          productService.searchProducts(query),
          storeService.searchStores(query)
        ]);
        setMatchingProducts(pList);
        setMatchingStores(sList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    runSearch();
  }, [query]);

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Search Header */}
      <div className="bg-emerald-900 text-white px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => navigate('/home')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-extrabold text-white">Search ZippyCart</span>
        </div>
      </div>

      <SearchBar
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
      />

      {/* When input is empty */}
      {!query.trim() ? (
        <div className="p-4 space-y-5">
          {/* Recent Searches */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 transition-colors shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
              Popular Searches in Kota
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 transition-colors shadow-2xs flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="p-4 space-y-5">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 font-semibold">
              Searching products & stores...
            </div>
          ) : matchingProducts.length === 0 && matchingStores.length === 0 ? (
            <EmptyState
              type="search"
              title="No products found"
              description={`We couldn't find any products or stores matching "${query}".`}
              actionText="Clear Search"
              onAction={() => setQuery('')}
            />
          ) : (
            <>
              {/* Stores Results */}
              {matchingStores.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Matching Stores ({matchingStores.length})
                  </h3>
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                    {matchingStores.map(store => (
                      <StoreCard key={store.id} store={store} />
                    ))}
                  </div>
                </div>
              )}

              {/* Products Results */}
              {matchingProducts.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Matching Products ({matchingProducts.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {matchingProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
