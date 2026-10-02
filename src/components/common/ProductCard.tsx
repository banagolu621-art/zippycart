import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Star, Heart, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, horizontal = false }) => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isProductFavorite, toggleFavoriteProduct } = useFavorites();

  const quantity = getItemQuantity(product.id);
  const isFav = isProductFavorite(product.id);

  if (horizontal) {
    return (
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-3 relative">
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 cursor-pointer relative"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.discount > 0 && (
            <span className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-xs font-bold text-slate-800 line-clamp-1 cursor-pointer hover:text-emerald-700"
            >
              {product.name}
            </h4>
            <button
              onClick={() => toggleFavoriteProduct(product.id, product.name)}
              className="text-slate-400 hover:text-red-500 p-1"
              aria-label="Favorite"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          <p className="text-[11px] text-slate-500">{product.quantityUnit}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sm font-black text-slate-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
            )}
          </div>
        </div>
        <div>
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white border border-emerald-300 font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-emerald-700 text-white rounded-xl overflow-hidden shadow-xs">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="px-2 py-1.5 hover:bg-emerald-800"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 text-xs font-black">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="px-2 py-1.5 hover:bg-emerald-800"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
      {/* Discount Badge & Heart */}
      <div className="flex items-center justify-between z-10">
        {product.discount > 0 ? (
          <span className="bg-emerald-700 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">
            {product.discount}% OFF
          </span>
        ) : <span />}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavoriteProduct(product.id, product.name);
          }}
          className="w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Favorite"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Image */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-full h-28 my-1 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer relative"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1 text-[10px] font-semibold text-slate-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-300">•</span>
            <span>{product.quantityUnit}</span>
          </div>
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-xs font-bold text-slate-800 line-clamp-2 cursor-pointer hover:text-emerald-700 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Add button */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
          <div>
            <div className="text-sm font-black text-slate-900">₹{product.price}</div>
            {product.mrp > product.price && (
              <div className="text-[10px] text-slate-400 line-through">₹{product.mrp}</div>
            )}
          </div>

          <div>
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white border border-emerald-300 font-bold text-xs rounded-xl transition-all shadow-xs active:scale-95"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center bg-emerald-700 text-white rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="px-2 py-1.5 hover:bg-emerald-800"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 text-xs font-black">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="px-2 py-1.5 hover:bg-emerald-800"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
