import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CATEGORIES } from '../data/categories';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-1 rounded-full text-emerald-200 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white">Explore Categories</h1>
        </div>

        <button
          onClick={() => navigate('/search')}
          className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-white"
        >
          <Search className="w-4 h-4" />
        </button>
      </header>

      {/* Grid of Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-700 group-hover:text-white transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
