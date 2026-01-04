# Asset Gambarmonologi

Folder ini berisi aset gambar yang digunakan oleh aplikasi Sentai Gozyuger.

## Struktur Folder

```
asset-gambarmonologi/
└── images/
    ├── news/           # Gambar untuk berita
    ├── characters/     # Gambar karakter/rangers
    ├── robots/         # Gambar mecha/robot
    ├── songs/          # Cover art lagu
    ├── blogs/          # Gambar blog
    └── stories/        # Thumbnail episode
```

## Penggunaan

### Dengan Docker

Folder `images/` akan di-mount ke backend container di:
```
/var/www/html/storage/app/public/images
```

### Akses Gambar

Gambar dapat diakses melalui URL:
```
http://localhost:8000/storage/images/{category}/{filename}
```

Contoh:
```
http://localhost:8000/storage/images/characters/gozyuger-red.jpg
http://localhost:8000/storage/images/news/breaking-news.jpg
```

## Format Gambar yang Disarankan

- **Format:** JPG, PNG, WebP
- **Ukuran Maksimal:** 2MB per file
- **Resolusi:**
  - News/Blogs: 1200x630px (landscape)
  - Characters: 800x1000px (portrait)
  - Robots: 1000x800px (landscape)
  - Songs: 600x600px (square)
  - Stories: 1280x720px (16:9)

## Catatan

- Pastikan nama file menggunakan format yang konsisten (lowercase, dash-separated)
- Contoh: `gozyuger-red.jpg`, `episode-01-thumbnail.jpg`
- Hindari spasi dan karakter khusus dalam nama file
