"use client";

import React, { useEffect, useState } from "react";
import type { Announcement } from "./types";

type HighlightResponse = {
  success: boolean;
  message: string;
  data: Announcement | null;
};

const HighlightBanner: React.FC = () => {
  const [highlight, setHighlight] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchHighlight = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/gozyuger/announcements/highlight`
        );
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: HighlightResponse = await res.json();
        if (json.success && json.data) {
          setHighlight(json.data);
          setError(null);
        } else {
          setHighlight(null);
        }
      } catch (err) {
        console.error("Gagal memuat highlight", err);
        setError("Tidak dapat terhubung ke server pengumuman.");
      } finally {
        setLoading(false);
      }
    };

    fetchHighlight();
  }, [BASE_URL]);

  if (loading) {
    return (
      <div className="w-full h-64 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Memuat highlight...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-700 text-sm text-center px-4">
        {error}
      </div>
    );
  }

  if (!highlight) {
    return (
      <div className="w-full h-64 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Belum ada pengumuman highlight.
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-white text-slate-900 shadow-xl border border-slate-200">
      {highlight.image_url && (
        <img
          src={highlight.image_url}
          alt={highlight.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10">
        <span className="text-sm uppercase tracking-[0.3em] text-emerald-700 mb-2">
          GOZYUGER OFFICIAL
        </span>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-slate-900">
          {highlight.title}
        </h2>
        <p className="max-w-xl text-sm md:text-base text-slate-700 line-clamp-3 md:line-clamp-4">
          {highlight.content}
        </p>
        <div className="mt-4 text-xs text-slate-600">
          Berlaku s/d: {highlight.expired_date}
        </div>
      </div>
    </div>
  );
};

export default HighlightBanner;
