import React from 'react';
import { Link } from 'react-router-dom';
import type { CatalogItem } from '../types';
import { slugify } from '../utils/slugify';
import { ArrowRight } from 'lucide-react';

interface ItemCardProps {
  item: CatalogItem;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const slug = slugify(item.itemname);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={item.image} 
          alt={item.itemname} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 shadow-sm">
          {item.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{item.itemname}</h3>
        
        {/* Quick specs preview - show up to 2 items */}
        <div className="space-y-1.5 mb-4 flex-1">
          {item.itemprops.slice(0, 2).map((prop, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-slate-500">{prop.label}</span>
              <span className="font-medium text-slate-700 truncate ml-2 max-w-[60%]">{prop.value}</span>
            </div>
          ))}
          {item.itemprops.length > 2 && (
            <div className="text-xs text-slate-400 mt-2 font-medium">
              +{item.itemprops.length - 2} more specs
            </div>
          )}
        </div>

        <Link 
          to={`/item/${slug}`}
          className="inline-flex items-center justify-center w-full bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold py-2.5 px-4 rounded-xl transition-colors group-hover:bg-blue-600 group-hover:text-white"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
};
