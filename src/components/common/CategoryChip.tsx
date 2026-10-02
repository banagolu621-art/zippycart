import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryChipProps {
  category: Category;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({ category }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/category/${category.id}`)}
      className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-md transition-all shrink-0 w-20 group focus:outline-none"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-50/70 p-1.5 flex items-center justify-center group-hover:bg-emerald-100 transition-colors overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-[11px] font-bold text-slate-800 mt-1.5 text-center leading-tight line-clamp-1 group-hover:text-emerald-700">
        {category.name}
      </span>
    </button>
  );
};
