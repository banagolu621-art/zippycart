import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShoppingBag, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white flex flex-col items-center justify-between p-8 text-center min-h-[600px] relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="pt-8" />

      {/* Brand Logo & Illustration */}
      <div className="flex flex-col items-center space-y-6 my-auto animate-fade-in">
        {/* Animated Custom Logo Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-2xl flex items-center justify-center animate-pulse-subtle">
            <div className="w-full h-full bg-emerald-950 rounded-[22px] flex items-center justify-center relative">
              <ShoppingBag className="w-11 h-11 text-emerald-400 stroke-[2]" />
              <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full p-1.5 shadow-md">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-1">
            Zippy<span className="text-orange-400">Cart</span>
          </h1>
          <p className="text-xs font-semibold text-emerald-300 tracking-wider uppercase mt-1">
            Hyperlocal Quick-Commerce
          </p>
        </div>

        <p className="text-sm text-emerald-100 max-w-xs font-medium leading-relaxed">
          "Your town. Your stores. Delivered fast."
        </p>

        {/* Loading Spinner */}
        <div className="pt-4 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
          <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span>Setting up your local stores...</span>
        </div>
      </div>

      {/* Direct Skip Button */}
      <div className="w-full pb-4">
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full py-3 bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 text-xs font-bold rounded-2xl border border-emerald-700/50 flex items-center justify-center gap-2 transition-all"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
