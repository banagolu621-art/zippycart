import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const BannerCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Fast delivery from your local stores',
      subtitle: 'Fresh groceries at your doorstep in Kota',
      badge: '15-25 MINS EXPRESS',
      badgeIcon: Zap,
      cta: 'Order Now',
      bgGradient: 'from-emerald-900 via-emerald-800 to-teal-900',
      accentColor: 'text-amber-300',
      btnColor: 'bg-orange-500 hover:bg-orange-600 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      targetCategory: 'grocery'
    },
    {
      id: 2,
      title: 'Farm Fresh Organic Veggies',
      subtitle: 'Directly sourced from trusted local farmers',
      badge: 'FLAT 20% OFF',
      badgeIcon: Sparkles,
      cta: 'Shop Veggies',
      bgGradient: 'from-teal-900 via-emerald-800 to-green-900',
      accentColor: 'text-emerald-300',
      btnColor: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80',
      targetCategory: 'vegetables'
    },
    {
      id: 3,
      title: 'Daily Morning Milk & Bakery',
      subtitle: 'Amul, Fresh Dairy & Royal Bakery treats',
      badge: '100% QUALITY GUARANTEE',
      badgeIcon: ShieldCheck,
      cta: 'Explore Dairy',
      bgGradient: 'from-emerald-950 via-slate-900 to-emerald-900',
      accentColor: 'text-orange-400',
      btnColor: 'bg-orange-500 hover:bg-orange-600 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
      targetCategory: 'dairy'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const active = banners[currentSlide];
  const BadgeIcon = active.badgeIcon;

  return (
    <div className="relative px-4 pt-3 pb-1">
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${active.bgGradient} text-white p-4 shadow-md transition-all duration-500 min-h-[150px] flex items-center`}>
        {/* Abstract background graphics */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-20 -top-10 w-24 h-24 bg-orange-500/20 rounded-full blur-md pointer-events-none" />

        <div className="relative z-10 w-3/5 pr-2">
          <div className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-300 mb-1.5 border border-white/10">
            <BadgeIcon className="w-3 h-3 text-amber-300" />
            <span>{active.badge}</span>
          </div>

          <h2 className="text-sm sm:text-base font-extrabold tracking-tight leading-snug">
            {active.title}
          </h2>
          <p className="text-[11px] text-slate-200 mt-1 line-clamp-1">
            {active.subtitle}
          </p>

          <button
            onClick={() => navigate(`/category/${active.targetCategory}`)}
            className={`mt-3 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm ${active.btnColor}`}
          >
            <span>{active.cta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-2/5 h-28 rounded-xl overflow-hidden shadow-inner relative border border-white/20">
          <img
            src={active.imageUrl}
            alt={active.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-1.5 mt-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === idx ? 'w-5 bg-emerald-700' : 'w-1.5 bg-slate-300'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
