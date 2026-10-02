import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { ArrowLeft, Star, Heart, Clock, Store, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity, totalItemsCount } = useCart();
  const { isProductFavorite, toggleFavoriteProduct } = useFavorites();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        const p = await productService.getProductById(id || '');
        if (p) {
          setProduct(p);
          const all = await productService.getProductsByCategory(p.category);
          setRelatedProducts(all.filter(item => item.id !== p.id).slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 p-8 text-center text-slate-500 font-semibold">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 p-8 text-center text-slate-800">
        Product not found.
        <button onClick={() => navigate('/home')} className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl">
          Back to Home
        </button>
      </div>
    );
  }

  const quantity = getItemQuantity(product.id);
  const isFav = isProductFavorite(product.id);

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-12">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 shadow-xs border-b border-slate-200 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-xs font-extrabold text-slate-800 truncate max-w-[200px]">
          {product.name}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavoriteProduct(product.id, product.name)}
            className="p-1.5 rounded-full text-slate-500 hover:text-red-500"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="p-1.5 rounded-full text-slate-700 relative"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            {totalItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Large Product Image */}
      <div className="bg-white p-6 border-b border-slate-200 flex items-center justify-center relative">
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
            {product.discount}% OFF
          </span>
        )}
        <div className="w-64 h-64 rounded-2xl overflow-hidden bg-slate-50 p-2">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-white p-4 border-b border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span>({product.reviewCount} ratings)</span>
          <span>•</span>
          <span className="text-slate-700 font-bold">{product.quantityUnit}</span>
        </div>

        <h1 className="text-xl font-black text-slate-900 leading-snug">
          {product.name}
        </h1>

        {/* Pricing */}
        <div className="flex items-baseline gap-3 pt-1">
          <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-slate-400 line-through">MRP ₹{product.mrp}</span>
          )}
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            Inclusive of all taxes
          </span>
        </div>

        {/* Store & Delivery Source */}
        <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Available from:</span>
            <span className="font-extrabold text-slate-900 flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              {product.storeName}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-2">
            <span className="text-slate-500 font-medium">Estimated Delivery:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              20–30 mins in Kota
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="pt-2">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
            Product Information
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Guarantee Badge */}
        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold border border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>100% Quality Checked & Sealed Packaging</span>
        </div>
      </div>

      {/* Add to Cart Fixed Bottom Control Bar */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-4 mt-3">
        <div>
          <span className="text-[11px] text-slate-400 font-bold block">TOTAL PRICE</span>
          <span className="text-lg font-black text-slate-900">₹{product.price * (quantity || 1)}</span>
        </div>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-between bg-emerald-700 text-white rounded-xl p-1.5 shadow-md">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-2 hover:bg-emerald-800 rounded-lg"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-sm px-4">{quantity} in Cart</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-2 hover:bg-emerald-800 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-4 px-4">
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 uppercase tracking-wider">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
