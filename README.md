# Pengumuman Digital – Gambarmonologi

Repositori ini berisi monorepo untuk aplikasi Pengumuman Digital (Gambarmonologi) yang terdiri dari:

- **asset-gambarmonologi**  
  Folder aset gambar yang akan dipakai oleh backend.
- **backend-gambarmonologi2**  
  Aplikasi backend berbasis Laravel 12 (PHP 8.2).
- **frontend-gambarmonologi**  
  Aplikasi frontend berbasis Next.js 16 & React 19.

Selain itu tersedia **docker-compose** untuk menjalankan MySQL, phpMyAdmin, dan backend Laravel.

---

## Struktur Proyek

```bash
pengumuman-digital/
├─ asset-gambarmonologi/
│  └─ images/                      # Folder gambar untuk aplikasi
│
├─ backend-gambarmonologi2/        # Laravel 12 (PHP 8.2)
│  ├─ app/
│  ├─ bootstrap/
│  ├─ config/
│  ├─ database/
│  ├─ public/
│  ├─ resources/
│  ├─ routes/
│  ├─ storage/
│  ├─ composer.json
│  ├─ package.json
│  └─ Dockerfile
│
├─ frontend-gambarmonologi/        # Next.js 16, React 19
│  ├─ app/
│  ├─ public/
│  ├─ package.json
│  └─ Dockerfile
│
├─ docker-compose.yml              # Orkestrasi MySQL, phpMyAdmin, backend
└─ README.md
```

---

## Prasyarat

- **Docker & Docker Compose** terinstall
- (Opsional) Untuk development tanpa Docker:
  - **PHP** ≥ 8.2
  - **Composer**
  - **Node.js** (disarankan LTS terbaru) + **npm**

---

## Menjalankan dengan Docker (Disarankan)

Di root folder `pengumuman-digital`:

```bash
docker compose up -d
```

Layanan yang akan berjalan:

- **MySQL**
  - Host: `localhost`
  - Port: `3306`
  - Database: `pengumuman_db`
  - User: `root`
  - Password: `root`
- **phpMyAdmin**
  - URL: http://localhost:8081  
  - Host: `mysql`  
  - User: `root`  
  - Password: `root`
- **Backend Laravel**
  - URL: http://localhost:8000
  - Source: `./backend-gambarmonologi2` di-mount ke `/var/www/html`
  - Aset gambar: `./asset-gambarmonologi/images` di-mount ke  
    `/var/www/html/storage/app/public/images`

### Volume yang digunakan

```yaml
volumes:
  mysql_data:  # data MySQL
```

---

## Backend – Laravel (`backend-gambarmonologi2`)

Backend menggunakan **Laravel 12** dengan requirement utama:

- PHP: `^8.2`
- Laravel framework: `^12.0`

### Setup manual (tanpa Docker)

Masuk ke folder backend:

```bash
cd backend-gambarmonologi2
```

1. **Install dependency PHP**

   ```bash
   composer install
   ```

2. **Copy `.env` dan generate key**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Atur koneksi database** di file `.env` (sesuaikan dengan MySQL lokal atau Docker):

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=pengumuman_db
   DB_USERNAME=root
   DB_PASSWORD=root
   ```

4. **Migrasi database (dan seeder jika diperlukan)**

   ```bash
   php artisan migrate
   # php artisan db:seed   # jika ada seeder yang perlu dijalankan
   ```

5. **Install dependency Node (jika pakai Vite / asset frontend Laravel)**

   ```bash
   npm install
   # npm run dev   # untuk mode development
   # npm run build # untuk production build
   ```

6. **Jalankan server Laravel**

   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

---

## Frontend – Next.js (`frontend-gambarmonologi`)

Frontend menggunakan:

- `next`: `16.0.10`
- `react`: `19.2.1`
- `react-dom`: `19.2.1`
- Tailwind CSS 4 (via `@tailwindcss/postcss`)

### Setup & Jalankan Development

```bash
cd frontend-gambarmonologi

npm install
npm run dev
```

Secara default, Next.js akan berjalan di:

- **Frontend URL:** http://localhost:3000

### Build & Start Production

```bash
npm run build
npm start
```

---

## Aset Gambar (`asset-gambarmonologi`)

Folder ini berisi gambar yang digunakan oleh aplikasi.

- Path lokal: `asset-gambarmonologi/images`
- Di dalam container backend (Docker), folder ini di-mount ke:

  ```bash
  /var/www/html/storage/app/public/images
  ```

Pastikan gambar yang dibutuhkan aplikasi ditempatkan di dalam folder `images/`.

---

## Pengembangan Lanjutan

- **Backend**
  - Gunakan `php artisan` untuk menjalankan perintah seperti migrasi, seeder, dan testing.
  - Testing: `php artisan test` atau `composer test` (jika script sudah didefinisikan).

- **Frontend**
  - Linting: `npm run lint`
  - Konfigurasi Next.js ada di `next.config.ts`.
  - Style & utility diatur dengan Tailwind CSS.

---

## Troubleshooting

- **Container tidak bisa konek ke database**
  - Pastikan service `mysql` sudah `healthy` dan environment `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` di backend sesuai dengan konfigurasi di `docker-compose.yml`.

- **Perubahan kode backend tidak ter-update di container**
  - Pastikan volume bind:
    ```yaml
    - ./backend-gambarmonologi2:/var/www/html
    ```
    sudah dimount dengan benar.
  - Coba restart service backend:
    ```bash
    docker compose restart backend
    ```

- **Gambar tidak tampil**
  - Pastikan file sudah ada di `asset-gambarmonologi/images`.
  - Cek permission folder di dalam container (khusus jika deploy ke server Linux).

---
