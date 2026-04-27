import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { Layout } from '../components/Layout';
import catalogData from '../data/catalog.json';
import type { CatalogItem } from '../types';
import { slugify } from '../utils/slugify';

export const ItemDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const item = useMemo(() => {
    const data = catalogData as CatalogItem[];
    return data.find((i) => slugify(i.itemname) === slug);
  }, [slug]);

  if (!item) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Link>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 lg:w-3/5 relative bg-slate-100 min-h-[300px] md:min-h-[500px]">
            <img 
              src={item.image} 
              alt={item.itemname} 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold mb-3 shadow-sm">
                <Tag className="w-4 h-4" />
                {item.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {item.itemname}
              </h1>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              Specifications
            </h2>
            
            <div className="space-y-5">
              {item.itemprops.map((prop, idx) => (
                <div 
                  key={idx} 
                  className="group flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {prop.label}
                  </span>
                  <span className="text-lg font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                    {prop.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
