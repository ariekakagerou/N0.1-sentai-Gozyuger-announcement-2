"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HighlightBanner from "./components/HighlightBanner";
import AnnouncementCard from "./components/AnnouncementCard";
import LinkSection from "./components/LinkSection";
import type { Announcement, IndexResponse } from "./components/types";

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/gozyuger/announcements`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: IndexResponse = await res.json();
        if (json.success) {
          setAnnouncements(json.data);
          setError(null);
        } else {
          setAnnouncements([]);
        }
      } catch (err) {
        console.error("Gagal memuat pengumuman", err);
        setError("Tidak dapat terhubung ke server pengumuman.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [BASE_URL]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Highlight Banner */}
        <HighlightBanner />

        {/* Quick Links Banner */}
        <section className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-blue-600 text-white rounded-lg p-4 text-center font-bold text-sm">
            Semua episode tayang sekaligus!
            <br />
            <span className="text-xs">Konten original TVer juga tersedia!</span>
          </div>
          <div className="bg-cyan-500 text-white rounded-lg p-4 text-center font-bold text-sm">
            Episode 42 tayang sampai 21/12 pukul 10:00
          </div>
          <div className="bg-orange-500 text-white rounded-lg p-4 text-center font-bold text-sm col-span-2 md:col-span-1">
            Episode terbaru juga tayang lengkap!
          </div>
        </section>

        {/* Navigation Menu - bottom bar on mobile, full grid on desktop */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 md:static md:mb-6 md:bg-gradient-to-r md:from-amber-900 md:to-yellow-900 md:rounded-lg md:overflow-hidden">
          {/* Mobile bottom bar */}
          <div className="md:hidden flex justify-around items-center py-2">
            {/* Cerita */}
            <Link
              href="/cerita"
              className="flex flex-col items-center text-white text-xs font-semibold px-2"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-300 flex items-center justify-center mb-1 shadow-md">
                <span className="text-xs">STORY</span>
              </span>
              <span>Cerita</span>
            </Link>

            {/* Berita */}
            <Link
              href="/berita"
              className="flex flex-col items-center text-white text-xs font-semibold px-2"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-yellow-300 flex items-center justify-center mb-1 shadow-md">
                <span className="text-[10px] leading-tight">NEWS</span>
              </span>
              <span>Berita</span>
            </Link>

            {/* Karakter */}
            <Link
              href="/karakter"
              className="flex flex-col items-center text-white text-xs font-semibold px-2"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 border-2 border-yellow-300 flex items-center justify-center mb-1 shadow-md">
                <span className="text-[10px] leading-tight">CHAR</span>
              </span>
              <span>Karakter</span>
            </Link>

            {/* Menu (buka daftar lengkap) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center text-white text-xs font-semibold px-2 focus:outline-none"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 border-2 border-yellow-300 flex items-center justify-center mb-1 shadow-md">
                <span className="text-lg leading-none">≡</span>
              </span>
              <span>Menu</span>
            </button>
          </div>

          {/* Desktop/tablet menu (as before) */}
          <div className="hidden md:grid grid-cols-4 gap-px bg-yellow-200">
            <Link href="/berita" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Berita
            </Link>
            <Link href="/cerita" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Cerita
            </Link>
            <Link href="/karakter" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Karakter
            </Link>
            <Link href="/robot" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Robot
            </Link>
            <Link href="/prajurit" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Prajurit/Legenda
            </Link>
            <Link href="/lagu" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Lagu tema & staf
            </Link>
            <Link href="/blog" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Blog pemain
            </Link>
            <Link href="/data" className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white text-center py-3 px-2 text-sm font-bold hover:opacity-80">
              Data siaran
            </Link>
          </div>
        </nav>

        {/* Social Links */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-700">
              Situs resmi program
            </a>
            <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-700">
              Akun resmi TV Asahi
            </a>
            <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-700">
              Akun resmi TeleAsa POST
            </a>
            <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-700">
              Instagram resmi
            </a>
            <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-700">
              TikTok resmi
            </a>
            <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-700">
              Fan club informasi program
            </a>
          </div>
        </section>

        {/* Notice */}
        <div className="mb-6 bg-red-600 text-white px-4 py-3 rounded-lg flex items-center gap-3">
          <span className="bg-white text-red-600 px-3 py-1 rounded font-bold text-sm">
            Pengumuman
          </span>
          <span className="text-sm">
            Terkait pengisi acara "Pasukan No.1 Gozyuger"
          </span>
        </div>

        {/* Announcements Section */}
        <section className="mb-6">
          <div className="bg-gradient-to-b from-amber-800 to-yellow-800 rounded-t-3xl p-1">
            <div className="bg-gradient-to-b from-gray-800 to-black rounded-t-3xl">
              <h2 className="text-yellow-400 text-center text-xl md:text-2xl font-bold py-4 border-4 border-yellow-500 rounded-t-3xl">
                Info terbaru
              </h2>
            </div>
          </div>

          {loading && (
            <div className="bg-white p-8 text-center rounded-b-lg">
              <div className="inline-block w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 text-sm">Memuat...</p>
            </div>
          )}

          {!loading && error && (
            <div className="bg-white p-6 rounded-b-lg">
              <div className="bg-red-50 border border-red-200 rounded p-4 text-center text-red-700 text-sm">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && announcements.length === 0 && (
            <div className="bg-white p-6 rounded-b-lg text-center text-gray-500 text-sm">
              Saat ini belum ada info terbaru
            </div>
          )}

          <div className="bg-white rounded-b-lg">
            {announcements.map((item, index) => (
              <React.Fragment key={item.id}>
                <AnnouncementCard announcement={item} />
                {index < announcements.length - 1 && (
                  <div className="px-6">
                    <div className="border-b-2 border-dashed border-gray-300"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <LinkSection />
      </div>

      {/* Overlay menu lengkap (mobile) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-b from-yellow-900 via-black to-black/95 md:hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm font-semibold">Menu lengkap</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-yellow-400 text-yellow-300 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/cerita" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-yellow-500 to-orange-500" />
                <div>Cerita</div>
              </Link>
              <Link href="/berita" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-red-500 to-orange-500" />
                <div>Berita</div>
              </Link>
              <Link href="/karakter" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-amber-600 to-yellow-500" />
                <div>Karakter</div>
              </Link>
              <Link href="/robot" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-slate-500 to-slate-700" />
                <div>Robot</div>
              </Link>
              <Link href="/prajurit" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-emerald-600 to-emerald-400" />
                <div>Prajurit/Legenda</div>
              </Link>
              <Link href="/lagu" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-purple-600 to-purple-400" />
                <div>Lagu tema & staf</div>
              </Link>
              <Link href="/blog" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-pink-600 to-rose-400" />
                <div>Blog pemain</div>
              </Link>
              <Link href="/data" className="bg-gradient-to-b from-gray-900 to-black border border-yellow-700 rounded-lg p-3 text-center text-white text-xs font-semibold">
                <div className="mb-2 w-full h-16 rounded bg-gradient-to-br from-blue-600 to-cyan-400" />
                <div>Data siaran</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-sm mb-2">© TV Asahi · Toei AG · Toei</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <a href="#" className="hover:underline">Info perusahaan</a>
            <a href="#" className="hover:underline">Info karir</a>
            <a href="#" className="hover:underline">IR (Hubungan Investor)</a>
            <a href="#" className="hover:underline">Info program</a>
            <a href="#" className="hover:underline">Untuk yang ketinggalan tayang</a>
            <a href="#" className="hover:underline">TV Asahi</a>
          </div>
        </div>
      </footer>
    </main>
  );
}