# 🚀 Quick Start Guide - Backend API

## Langkah Cepat Setup Backend

### 1️⃣ Install Dependencies

```bash
cd backend-gambarmonologi2
composer install
```

**Catatan:** Jika `composer install` gagal karena koneksi, Anda bisa:
- Coba lagi dengan koneksi internet yang stabil
- Atau gunakan Docker (lihat langkah Docker di bawah)

### 2️⃣ Setup Environment

```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3️⃣ Konfigurasi Database

Edit file `.env` dan sesuaikan dengan konfigurasi database Anda:

```env
DB_CONNECTION=mysql
DB_HOST=mysql          # Gunakan 'mysql' untuk Docker, '127.0.0.1' untuk lokal
DB_PORT=3306
DB_DATABASE=pengumuman_db
DB_USERNAME=root
DB_PASSWORD=root
```

### 4️⃣ Migrasi Database

```bash
# Jalankan migrations
php artisan migrate

# Jalankan seeders (data contoh)
php artisan db:seed
```

### 5️⃣ Setup Storage

```bash
# Buat symbolic link untuk storage
php artisan storage:link
```

### 6️⃣ Jalankan Server

```bash
# Development server
php artisan serve --host=0.0.0.0 --port=8000
```

Backend akan berjalan di: **http://localhost:8000**

### 7️⃣ Test API

Buka browser atau Postman dan akses:

```
http://localhost:8000/api/v1/health
```

Jika berhasil, Anda akan melihat response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00+07:00",
  "service": "Sentai Gozyuger API",
  "version": "1.0.0"
}
```

---

## 🐳 Alternatif: Menggunakan Docker

Jika Anda ingin menggunakan Docker (lebih mudah):

### 1️⃣ Pastikan Docker Compose Sudah Terinstall

### 2️⃣ Jalankan Docker Compose

```bash
# Di root project (bukan di folder backend)
cd ..
docker compose up -d
```

### 3️⃣ Akses Container Backend

```bash
docker compose exec backend bash
```

### 4️⃣ Di Dalam Container, Jalankan Setup

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### 5️⃣ Akses API

- Backend: http://localhost:8000
- phpMyAdmin: http://localhost:8081

---

## 📝 Troubleshooting

### Error: "Class not found"

```bash
composer dump-autoload
```

### Error: "No application encryption key"

```bash
php artisan key:generate
```

### Error: "SQLSTATE[HY000] [2002] Connection refused"

Pastikan MySQL sudah berjalan. Jika menggunakan Docker:

```bash
docker compose ps
```

Pastikan service `mysql` dalam status `healthy`.

### Error: "Storage link already exists"

```bash
# Hapus link lama
rm public/storage

# Buat link baru
php artisan storage:link
```

### Permission Error (Linux/Mac)

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## 🎯 Testing API dengan cURL

### Health Check

```bash
curl http://localhost:8000/api/v1/health
```

### Get All News

```bash
curl http://localhost:8000/api/v1/news?status=published
```

### Get All Characters

```bash
curl http://localhost:8000/api/v1/characters?status=active
```

### Create News (dengan form-data)

```bash
curl -X POST http://localhost:8000/api/v1/news \
  -F "title=Breaking News" \
  -F "content=This is the news content" \
  -F "status=published" \
  -F "image=@/path/to/image.jpg"
```

---

## 📚 Dokumentasi Lengkap

- **README.md** - Dokumentasi lengkap backend
- **FRONTEND_INTEGRATION.md** - Panduan integrasi dengan frontend
- **SUMMARY.md** - Ringkasan fitur dan struktur
- **Sentai-Gozyuger-API.postman_collection.json** - Postman collection untuk testing

---

## 🔗 Endpoint Penting

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/news` | GET | List semua berita |
| `/api/v1/characters` | GET | List semua karakter |
| `/api/v1/robots` | GET | List semua robot |
| `/api/v1/songs` | GET | List semua lagu |
| `/api/v1/blogs` | GET | List semua blog |
| `/api/v1/stories` | GET | List semua episode |

---

## ✅ Checklist Setup

- [ ] Install Composer dependencies
- [ ] Copy .env.example ke .env
- [ ] Generate application key
- [ ] Konfigurasi database di .env
- [ ] Jalankan migrations
- [ ] Jalankan seeders
- [ ] Buat storage link
- [ ] Jalankan server
- [ ] Test health check endpoint
- [ ] Test CRUD endpoints

---

**Selamat! Backend API Anda sudah siap digunakan! 🎉**

Selanjutnya, Anda bisa mengintegrasikan dengan frontend Next.js menggunakan panduan di **FRONTEND_INTEGRATION.md**.
