"use client";

import React, { useEffect, useState } from "react";
import HighlightBanner from "../components/HighlightBanner";
import AnnouncementCard, {
  Announcement,
} from "../components/AnnouncementCard";

type IndexResponse = {
  success: boolean;
  message: string;
  data: Announcement[];
};

const DisplayPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/gozyuger/announcements`,
          {
            cache: "no-store",
          }
        );
        const json: IndexResponse = await res.json();
        if (json.success) {
          setAnnouncements(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat pengumuman (display)", error);
      }
    };

    fetchAnnouncements();

    const interval = setInterval(() => {
      fetchAnnouncements();
    }, 30000);

    return () => clearInterval(interval);
  }, [BASE_URL]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 flex flex-col">
      <div className="p-4 md:p-6">
        <h1 className="text-center text-xl md:text-3xl font-bold tracking-[0.4em] text-emerald-700">
          GOZYUGER ANNOUNCEMENT
        </h1>
      </div>

      <div className="px-4 md:px-8 pb-4">
        <HighlightBanner />
      </div>

      <div className="flex-1 px-4 md:px-8 pb-6 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 md:space-y-5">
          {announcements.map((item) => (
            <AnnouncementCard key={item.id} announcement={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default DisplayPage;
