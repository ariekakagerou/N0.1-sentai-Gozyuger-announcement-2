# Backend API - Sentai Gozyuger Announcement System

Backend API berbasis Laravel 12 untuk aplikasi Pengumuman Digital Sentai Gozyuger.

## 🚀 Fitur

- **RESTful API** dengan versioning (v1)
- **CRUD Operations** untuk semua entitas:
  - 📰 **News** - Berita dan pengumuman
  - 👥 **Characters** - Karakter/Prajurit Sentai
  - 🤖 **Robots** - Mecha/Robot
  - 🎵 **Songs** - Lagu tema
  - 📝 **Blogs** - Artikel blog
  - 📺 **Stories** - Episode/Cerita
- **Image Upload** support
- **Filtering & Search** capabilities
- **Pagination** support
- **CORS** enabled untuk frontend
- **Slug-based** routing
- **Soft Deletes** untuk semua model

## 📋 Prasyarat

- PHP >= 8.2
- Composer
- MySQL 8.0+
- Docker & Docker Compose (opsional)

## 🛠️ Instalasi

### Dengan Docker (Disarankan)

```bash
# Di root project
docker compose up -d
```

### Manual Setup

1. **Install Dependencies**
```bash
cd backend-gambarmonologi2
composer install
```

2. **Setup Environment**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Konfigurasi Database**

Edit file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pengumuman_db
DB_USERNAME=root
DB_PASSWORD=root
```

4. **Migrasi Database**
```bash
php artisan migrate
php artisan db:seed
```

5. **Create Storage Link**
```bash
php artisan storage:link
```

6. **Jalankan Server**
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

## 📡 API Endpoints

Base URL: `http://localhost:8000/api/v1`

### Health Check
```
GET /api/v1/health
```

### News
```
GET    /api/v1/news              # List all news
POST   /api/v1/news              # Create news
GET    /api/v1/news/{id}         # Get news by ID
GET    /api/v1/news/slug/{slug}  # Get news by slug
PUT    /api/v1/news/{id}         # Update news
DELETE /api/v1/news/{id}         # Delete news
```

**Query Parameters:**
- `status` - Filter by status (draft, published, archived)
- `featured` - Filter featured news (true/false)
- `search` - Search in title and content
- `sort_by` - Sort field (default: published_at)
- `sort_order` - Sort order (asc/desc, default: desc)
- `per_page` - Items per page (default: 15)

### Characters
```
GET    /api/v1/characters              # List all characters
POST   /api/v1/characters              # Create character
GET    /api/v1/characters/{id}         # Get character by ID
GET    /api/v1/characters/slug/{slug}  # Get character by slug
PUT    /api/v1/characters/{id}         # Update character
DELETE /api/v1/characters/{id}         # Delete character
```

**Query Parameters:**
- `status` - Filter by status (active, inactive)
- `color` - Filter by ranger color
- `main` - Filter main characters (true/false)
- `search` - Search in name and ranger_name
- `per_page` - Items per page (default: 15)

### Robots
```
GET    /api/v1/robots              # List all robots
POST   /api/v1/robots              # Create robot
GET    /api/v1/robots/{id}         # Get robot by ID
GET    /api/v1/robots/slug/{slug}  # Get robot by slug
PUT    /api/v1/robots/{id}         # Update robot
DELETE /api/v1/robots/{id}         # Delete robot
```

### Songs
```
GET    /api/v1/songs              # List all songs
POST   /api/v1/songs              # Create song
GET    /api/v1/songs/{id}         # Get song by ID
GET    /api/v1/songs/slug/{slug}  # Get song by slug
PUT    /api/v1/songs/{id}         # Update song
DELETE /api/v1/songs/{id}         # Delete song
```

### Blogs
```
GET    /api/v1/blogs              # List all blogs
POST   /api/v1/blogs              # Create blog
GET    /api/v1/blogs/{id}         # Get blog by ID
GET    /api/v1/blogs/slug/{slug}  # Get blog by slug
PUT    /api/v1/blogs/{id}         # Update blog
DELETE /api/v1/blogs/{id}         # Delete blog
```

### Stories (Episodes)
```
GET    /api/v1/stories              # List all stories
POST   /api/v1/stories              # Create story
GET    /api/v1/stories/{id}         # Get story by ID
GET    /api/v1/stories/slug/{slug}  # Get story by slug
PUT    /api/v1/stories/{id}         # Update story
DELETE /api/v1/stories/{id}         # Delete story
```

## 📦 Database Schema

### News Table
- `id`, `title`, `slug`, `excerpt`, `content`, `image`, `author`
- `status` (draft/published/archived)
- `published_at`, `views`, `is_featured`, `tags`
- `created_at`, `updated_at`, `deleted_at`

### Characters Table
- `id`, `name`, `slug`, `ranger_name`, `color`, `actor`
- `description`, `biography`, `image`, `avatar`
- `age`, `occupation`, `abilities`, `weapons`
- `order`, `is_main`, `status`
- `created_at`, `updated_at`, `deleted_at`

### Robots Table
- `id`, `name`, `slug`, `type`, `description`, `specifications`
- `image`, `pilot`, `weapons`, `special_attacks`, `components`
- `height`, `weight`, `order`, `status`
- `created_at`, `updated_at`, `deleted_at`

### Songs Table
- `id`, `title`, `slug`, `type`, `artist`, `composer`, `lyricist`
- `lyrics`, `audio_url`, `video_url`, `cover_image`
- `duration`, `release_date`, `order`, `status`
- `created_at`, `updated_at`, `deleted_at`

### Blogs Table
- `id`, `title`, `slug`, `excerpt`, `content`, `image`
- `author`, `category`, `status`, `published_at`, `views`, `tags`
- `created_at`, `updated_at`, `deleted_at`

### Stories Table
- `id`, `episode_number`, `title`, `slug`, `synopsis`, `description`
- `thumbnail`, `video_url`, `air_date`, `director`, `writer`
- `featured_characters`, `featured_robots`, `views`, `rating`, `status`
- `created_at`, `updated_at`, `deleted_at`

## 🔧 Development

### Menjalankan Migrations
```bash
php artisan migrate
```

### Menjalankan Seeders
```bash
php artisan db:seed
```

### Membuat Migration Baru
```bash
php artisan make:migration create_table_name
```

### Membuat Model
```bash
php artisan make:model ModelName -mcr
```

### Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## 📝 License

MIT License
