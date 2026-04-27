import React from 'react';
import type { CatalogItem } from '../types';
import { ItemCard } from './ItemCard';

interface CategorySectionProps {
  title: string;
  items: CatalogItem[];
  onViewAll?: () => void;
  hideViewAll?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  items, 
  onViewAll,
  hideViewAll = false 
}) => {
  if (items.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-3">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
          {title}
          <span className="bg-slate-100 text-slate-600 text-sm py-1 px-3 rounded-full font-bold shadow-inner">
            {items.length}
          </span>
        </h2>
        {!hideViewAll && (
          <button 
            onClick={onViewAll}
            className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors hidden sm:flex items-center gap-1 group"
          >
            View all
            <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <ItemCard key={`${item.itemname}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
};
