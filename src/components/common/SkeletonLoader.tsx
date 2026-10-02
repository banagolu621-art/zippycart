import React from 'react';

export const ProductSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs animate-pulse flex flex-col justify-between h-48">
    <div className="w-full h-24 bg-slate-200 rounded-xl" />
    <div className="space-y-2 mt-2">
      <div className="h-3 bg-slate-200 rounded-md w-3/4" />
      <div className="h-2.5 bg-slate-200 rounded-md w-1/2" />
    </div>
    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
      <div className="h-4 bg-slate-200 rounded-md w-10" />
      <div className="h-7 bg-slate-200 rounded-xl w-14" />
    </div>
  </div>
);

export const StoreSkeleton: React.FC = () => (
  <div className="w-64 bg-white rounded-2xl border border-slate-100 p-3 animate-pulse shrink-0">
    <div className="w-full h-24 bg-slate-200 rounded-xl" />
    <div className="h-4 bg-slate-200 rounded-md w-3/4 mt-3" />
    <div className="h-3 bg-slate-200 rounded-md w-1/2 mt-1.5" />
    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
      <div className="h-3 bg-slate-200 rounded-md w-12" />
      <div className="h-3 bg-slate-200 rounded-md w-16" />
    </div>
  </div>
);

export const CartItemSkeleton: React.FC = () => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 animate-pulse">
    <div className="w-16 h-16 bg-slate-200 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-200 rounded-md w-3/4" />
      <div className="h-3 bg-slate-200 rounded-md w-1/3" />
    </div>
    <div className="h-8 bg-slate-200 rounded-xl w-20" />
  </div>
);
