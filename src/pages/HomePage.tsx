import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { CategorySection } from '../components/CategorySection';
import catalogData from '../data/catalog.json';
import type { CatalogItem } from '../types';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const data = catalogData as CatalogItem[];
    const uniqueCats = Array.from(new Set(data.map(item => item.category)));
    return ['All', ...uniqueCats];
  }, []);

  const groupedData = useMemo(() => {
    const data = catalogData as CatalogItem[];
    const filtered = activeCategory === 'All' 
      ? data 
      : data.filter(item => item.category === activeCategory);

    return filtered.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, CatalogItem[]>);
  }, [activeCategory]);

  return (
    <Layout>
      <div className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Premium Collection</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
          Explore our curated selection of high-performance vehicles, cutting-edge electronics, and premium machinery. Immerse yourself in the details.
        </p>
      </div>

      {/* Dynamic Category Filter */}
      <div className="sticky top-[4.5rem] z-40 bg-slate-50/90 backdrop-blur-md py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-slate-200/60 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white shadow-md scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {Object.entries(groupedData).map(([category, items]) => (
          <CategorySection 
            key={category} 
            title={category} 
            items={items} 
            onViewAll={() => setActiveCategory(category)}
            hideViewAll={activeCategory !== 'All'}
          />
        ))}
      </div>
    </Layout>
  );
};
