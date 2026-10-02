import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  autoFocus?: boolean;
  isReadOnly?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChange,
  onSubmit,
  autoFocus = false,
  isReadOnly = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isReadOnly) {
      navigate('/search');
    }
  };

  return (
    <div className="px-4 py-2 bg-emerald-900 pb-4">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (onSubmit) onSubmit(e);
        }}
        onClick={handleClick}
        className="relative flex items-center"
      >
        <Search className="absolute left-3.5 w-4 h-4 text-emerald-600 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          readOnly={isReadOnly}
          autoFocus={autoFocus}
          placeholder="Search groceries, food & more..."
          className="w-full pl-10 pr-10 py-2.5 bg-white text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-inner"
        />
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            if (isReadOnly) navigate('/search');
          }}
          className="absolute right-3 p-1 rounded-full text-emerald-700 hover:text-emerald-900"
          aria-label="Voice Search"
        >
          <Mic className="w-4 h-4 text-slate-500 hover:text-orange-500 transition-colors" />
        </button>
      </form>
    </div>
  );
};
