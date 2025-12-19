"use client";

import React from "react";

const LinkSection: React.FC = () => {
  return (
    <section className="mb-6">
      <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg font-bold text-sm">
        Tautan
      </div>
      <div className="bg-white rounded-b-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <a href="#" className="block">
            <div className="border-2 border-gray-200 rounded-lg p-3 text-center hover:border-amber-500 transition-colors">
              <div className="text-xs font-bold text-gray-700">Situs resmi</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="border-2 border-gray-200 rounded-lg p-3 text-center hover:border-amber-500 transition-colors">
              <div className="text-xs font-bold text-gray-700">Menuju puncak program ini</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="border-2 border-gray-200 rounded-lg p-3 text-center hover:border-amber-500 transition-colors">
              <div className="text-xs font-bold text-gray-700">Situs program</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="border-2 border-gray-200 rounded-lg p-3 text-center hover:border-amber-500 transition-colors">
              <div className="text-xs font-bold text-gray-700">X resmi</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="border-2 border-gray-200 rounded-lg p-3 text-center hover:border-amber-500 transition-colors">
              <div className="text-xs font-bold text-gray-700">Instagram resmi program</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="border-2 border-gray-200 rounded-lg p-3 text-center hover:border-amber-500 transition-colors">
              <div className="text-xs font-bold text-gray-700">TikTok resmi program</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LinkSection;
