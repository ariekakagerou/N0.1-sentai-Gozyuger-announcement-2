export type Announcement = {
  id: number;
  title: string;
  content: string;
  category: string;
  /** Prioritas atau level pentingnya pengumuman (opsional untuk beberapa endpoint) */
  priority?: string;
  /** Tanggal dibuat (opsional, tergantung endpoint) */
  created_at?: string;
  /** Status aktif/tidak (opsional) */
  is_active?: boolean;
  /** Apakah merupakan pengumuman highlight */
  is_highlight?: boolean;
  /** URL gambar jika ada */
  image_url?: string | null;
  /** Tanggal tayang/publish */
  publish_date: string;
  /** Tanggal berakhir/expired */
  expired_date: string;
};

export type IndexResponse = {
  success: boolean;
  message: string;
  data: Announcement[];
};
