"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Announcement, IndexResponse } from "../components/types";

// Helper fetch standar untuk Admin Panel
// - Menangani base URL
// - Memastikan struktur response success / message / data
async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // backend tidak mengembalikan JSON valid
  }

  if (!res.ok || !json?.success) {
    const msg = json?.message || `Gagal mengakses API (${res.status} ${res.statusText}).`;
    throw new Error(msg);
  }

  return json as T;
}

type StatusFilter = "all" | "active" | "inactive";
type SortDirection = "desc" | "asc";

type FormState = {
  id: number | null;
  title: string;
  content: string;
  category: string;
  priority: string;
  publish_date: string;
  expired_date: string;
  is_highlight: boolean;
};

const initialForm: FormState = {
  id: null,
  title: "",
  content: "",
  category: "",
  priority: "",
  publish_date: "",
  expired_date: "",
  is_highlight: false,
};

export default function AdminPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [savingId, setSavingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Ambil data pengumuman dari backend
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setGlobalError(null);
      const json = await apiRequest<IndexResponse>("/api/gozyuger/announcements");
      setAnnouncements(json.data);
    } catch (err: any) {
      console.error("Gagal memuat pengumuman (admin)", err);
      setGlobalError(err.message || "Tidak dapat terhubung ke server pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setImageFile(null);
    setFormError(null);
  };

  const handleEdit = (a: Announcement) => {
    setForm({
      id: a.id,
      title: a.title,
      content: a.content,
      category: a.category,
      priority: a.priority ?? "",
      publish_date: a.publish_date,
      expired_date: a.expired_date,
      is_highlight: Boolean(a.is_highlight),
    });
    setImageFile(null);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Validasi sederhana di sisi client sebelum kirim ke backend
  const validateForm = (): string | null => {
    if (!form.title.trim()) return "Judul wajib diisi.";
    if (!form.content.trim()) return "Isi wajib diisi.";
    if (!form.category.trim()) return "Kategori wajib diisi.";
    if (!form.publish_date) return "Tanggal publish wajib diisi.";
    if (!form.expired_date) return "Tanggal berakhir wajib diisi.";

    const pub = new Date(form.publish_date);
    const exp = new Date(form.expired_date);
    if (exp.getTime() < pub.getTime()) {
      return "Tanggal berakhir tidak boleh sebelum tanggal publish.";
    }

    if (imageFile) {
      const maxSizeMb = 2;
      if (imageFile.size > maxSizeMb * 1024 * 1024) {
        return `Ukuran gambar maksimal ${maxSizeMb}MB.`;
      }
      if (!imageFile.type.startsWith("image/")) {
        return "File gambar harus bertipe image (jpg, png, dll).";
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation) {
      setFormError(validation);
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      const body = new FormData();
      body.append("title", form.title.trim());
      body.append("content", form.content.trim());
      body.append("category", form.category.trim());
      body.append("publish_date", form.publish_date);
      body.append("expired_date", form.expired_date);
      if (form.priority.trim()) body.append("priority", form.priority.trim());
      body.append("is_highlight", form.is_highlight ? "1" : "0");
      if (imageFile) {
        body.append("image", imageFile);
      }

      const url = form.id
        ? `/api/gozyuger/announcements/${form.id}`
        : "/api/gozyuger/announcements";

      const method = form.id ? "PUT" : "POST";

      await apiRequest(url, {
        method,
        body,
      });

      resetForm();
      await fetchAnnouncements();
    } catch (err: any) {
      console.error("Gagal menyimpan pengumuman", err);
      setFormError(err.message || "Gagal menyimpan pengumuman. Cek isian dan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: number, currentActive?: boolean) => {
    const konfirmasi = window.confirm(
      currentActive
        ? "Yakin ingin menonaktifkan pengumuman ini?"
        : "Yakin ingin mengaktifkan pengumuman ini?"
    );
    if (!konfirmasi) return;

    try {
      setSavingId(id);
      await apiRequest(`/api/gozyuger/announcements/${id}/toggle-active`, {
        method: "PATCH",
      });
      await fetchAnnouncements();
    } catch (err: any) {
      console.error("Gagal mengubah status aktif", err);
      alert(err.message || "Gagal mengubah status aktif. Coba lagi.");
    } finally {
      setSavingId(null);
    }
  };

  const filteredAndSorted = useMemo(
    () =>
      announcements
        .filter((a) => {
          if (statusFilter === "active") return a.is_active !== false;
          if (statusFilter === "inactive") return a.is_active === false;
          return true;
        })
        .sort((a, b) => {
          const da = new Date(a.publish_date).getTime();
          const db = new Date(b.publish_date).getTime();
          return sortDirection === "desc" ? db - da : da - db;
        }),
    [announcements, statusFilter, sortDirection]
  );

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2">Admin Pengumuman Gozyuger</h1>
        <p className="mb-4 text-sm text-slate-300">
          Halaman ini untuk mengelola pengumuman yang tampil di halaman utama.
        </p>

        {globalError && (
          <div className="mb-4 rounded border border-red-500 bg-red-900/40 px-3 py-2 text-xs">
            {globalError}
          </div>
        )}

        {/* Filter dan sort */}
        <div className="mb-6 flex flex-wrap gap-3 items-center text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded bg-slate-900 border border-slate-600 px-2 py-1"
            >
              <option value="all">Semua</option>
              <option value="active">Hanya aktif</option>
              <option value="inactive">Hanya non-aktif</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Urut publish:</span>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as any)}
              className="rounded bg-slate-900 border border-slate-600 px-2 py-1"
            >
              <option value="desc">Terbaru &rarr; Lama</option>
              <option value="asc">Lama &rarr; Terbaru</option>
            </select>
          </div>
        </div>

        {/* Form buat/edit pengumuman */}
        <section className="mb-8 bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">
            {form.id ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
          </h2>

          {formError && (
            <div className="mb-3 rounded border border-red-500 bg-red-900/40 px-3 py-2 text-xs">
              {formError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm"
          >
            <div className="md:col-span-2">
              <label className="block mb-1">Judul</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded bg-slate-900 border border-slate-600 px-2 py-1"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1">Gambar (opsional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setImageFile(file);
                }}
                className="w-full text-xs text-slate-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-slate-50 hover:file:bg-slate-600"
              />
              {form.id && (
                <p className="mt-1 text-[11px] text-slate-400">
                  Jika tidak memilih file baru, gambar lama akan tetap digunakan.
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1">Isi</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full rounded bg-slate-900 border border-slate-600 px-2 py-1 h-20"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Kategori</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded bg-slate-900 border border-slate-600 px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Prioritas (opsional)</label>
              <input
                type="text"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded bg-slate-900 border border-slate-600 px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-1">Tanggal Publish</label>
              <input
                type="date"
                value={form.publish_date}
                onChange={(e) => setForm({ ...form, publish_date: e.target.value })}
                className="w-full rounded bg-slate-900 border border-slate-600 px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Tanggal Berakhir</label>
              <input
                type="date"
                value={form.expired_date}
                onChange={(e) => setForm({ ...form, expired_date: e.target.value })}
                className="w-full rounded bg-slate-900 border border-slate-600 px-2 py-1"
                required
              />
            </div>
            <div className="flex items-center gap-2 md:col-span-2 mt-1">
              <label className="inline-flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={form.is_highlight}
                  onChange={(e) => setForm({ ...form, is_highlight: e.target.checked })}
                  className="rounded border-slate-600 bg-slate-900"
                />
                Jadikan highlight
              </label>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              {form.id && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="px-3 py-1 rounded border border-slate-500 text-xs disabled:opacity-60"
                >
                  Batal edit
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-3 py-1 rounded bg-emerald-500 text-slate-900 text-xs font-semibold hover:bg-emerald-400 disabled:opacity-60"
              >
                {submitting
                  ? "Menyimpan..."
                  : form.id
                  ? "Simpan Perubahan"
                  : "Buat Pengumuman"}
              </button>
            </div>
          </form>
        </section>

        {loading && <p className="text-sm">Memuat data...</p>}

        {!loading && !globalError && (
          <div className="overflow-x-auto bg-slate-800 rounded-lg border border-slate-700">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-700 text-left">
                  <th className="px-3 py-2 w-20">Gambar</th>
                  <th className="px-3 py-2">Judul</th>
                  <th className="px-3 py-2">Kategori</th>
                  <th className="px-3 py-2">Prioritas</th>
                  <th className="px-3 py-2">Publish</th>
                  <th className="px-3 py-2">Expired</th>
                  <th className="px-3 py-2">Highlight</th>
                  <th className="px-3 py-2">Aktif</th>
                  <th className="px-3 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSorted.map((a) => (
                  <tr key={a.id} className="border-t border-slate-700">
                    <td className="px-3 py-2 align-top">
                      {a.image_url ? (
                        <img
                          src={a.image_url}
                          alt={a.title}
                          className="w-16 h-16 object-cover rounded border border-slate-600"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded bg-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                          Tidak ada
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top max-w-xs">
                      <div className="font-semibold line-clamp-2">{a.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-2">
                        {a.content}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">{a.category}</td>
                    <td className="px-3 py-2 align-top">{a.priority ?? '-'}</td>
                    <td className="px-3 py-2 align-top">{a.publish_date}</td>
                    <td className="px-3 py-2 align-top">{a.expired_date}</td>
                    <td className="px-3 py-2 align-top">
                      {a.is_highlight ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-semibold">
                          YA
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">TIDAK</span>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top">
                      {a.is_active ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                          AKTIF
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-semibold">
                          NON-AKTIF
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      <button
                        type="button"
                        onClick={() => handleEdit(a)}
                        disabled={savingId === a.id}
                        className="inline-flex items-center px-3 py-1 mr-2 rounded border border-slate-500 text-xs hover:bg-slate-700 disabled:opacity-60"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleActive(a.id, a.is_active)}
                        disabled={savingId === a.id}
                        className="inline-flex items-center px-3 py-1 rounded bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-white disabled:opacity-60"
                      >
                        {savingId === a.id
                          ? "Menyimpan..."
                          : a.is_active
                          ? "Nonaktifkan"
                          : "Aktifkan"}
                      </button>
                    </td>
                  </tr>
                ))}

                {announcements.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-3 py-6 text-center text-slate-400 text-sm"
                    >
                      Belum ada pengumuman.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
