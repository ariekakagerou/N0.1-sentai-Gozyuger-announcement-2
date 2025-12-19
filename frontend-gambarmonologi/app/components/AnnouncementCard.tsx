"use client";

import React from "react";
import type { Announcement } from "./types";

interface Props {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<Props> = ({ announcement }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-slate-900 shadow-md flex gap-4">
      {announcement.image_url && (
        <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <img
            src={announcement.image_url}
            alt={announcement.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs uppercase tracking-wide text-emerald-600">
            {announcement.category}
          </span>
          <span className="text-xs text-slate-500">
            {announcement.publish_date}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-1 text-slate-900">
          {announcement.title}
        </h3>
        <p className="text-sm text-slate-700 line-clamp-3">
          {announcement.content}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
