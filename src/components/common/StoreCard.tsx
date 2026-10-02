import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../types';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const navigate = useNavigate();
  const { isStoreFavorite, toggleFavoriteStore } = useFavorites();
  const isFav = isStoreFavorite(store.id);

  return (
    <div
      onClick={() => navigate(`/store/${store.id}`)}
      className="w-64 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden shrink-0 group flex flex-col justify-between"
    >
      <div className="relative h-28 overflow-hidden bg-slate-100">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavoriteStore(store.id, store.name);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Favorite store"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        <span className="absolute bottom-2 left-2 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-emerald-200" />
          {store.deliveryTime}
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700">
              {store.name}
            </h3>
            <p className="text-[11px] text-slate-500 line-clamp-1">{store.category}</p>
          </div>
          <div className="bg-emerald-50 text-emerald-800 text-xs font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
            <span>{store.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 border-t border-slate-50 pt-2">
          <span className="flex items-center gap-1 text-slate-600 font-medium">
            <MapPin className="w-3 h-3 text-orange-500" />
            {store.distance}
          </span>
          <span className="text-emerald-700 font-semibold">{store.isOpen ? 'Open Now' : 'Closed'}</span>
        </div>
      </div>
    </div>
  );
};
