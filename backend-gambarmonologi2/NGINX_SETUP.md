# 🚀 Setup Nginx untuk Laravel Backend

## Menggunakan Docker (Recommended)

Backend sudah dikonfigurasi dengan **Nginx + PHP-FPM** menggunakan Supervisor.

### 1. Build dan Jalankan Container

```bash
# Di root project
docker compose up -d --build
```

### 2. Setup Database (Pertama Kali)

```bash
# Masuk ke container
docker compose exec backend bash

# Di dalam container
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
exit
```

### 3. Akses Backend

Backend akan berjalan di: **http://localhost:8000**

API endpoint: **http://localhost:8000/api/v1**

### 4. Cek Status

```bash
# Cek logs
docker compose logs -f backend

# Cek status Nginx
docker compose exec backend nginx -t

# Cek status PHP-FPM
docker compose exec backend php-fpm -v

# Cek proses Supervisor
docker compose exec backend supervisorctl status
```

---

## Setup Nginx Manual (Tanpa Docker)

### 1. Install Nginx dan PHP-FPM

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install nginx php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-gd
```

#### CentOS/RHEL

```bash
sudo yum install nginx php-fpm php-mysql php-mbstring php-xml php-bcmath php-gd
```

### 2. Konfigurasi Nginx

Buat file konfigurasi:

```bash
sudo nano /etc/nginx/sites-available/laravel-backend
```

Paste konfigurasi berikut:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;  # Ganti dengan domain Anda
    root /var/www/html/backend-gambarmonologi2/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    # Logging
    access_log /var/log/nginx/laravel-access.log;
    error_log /var/log/nginx/laravel-error.log;

    # Main location
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP-FPM Configuration
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    # Deny access to hidden files
    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to sensitive files
    location ~ /\.(env|git|gitignore|gitattributes) {
        deny all;
    }

    # Client body size limit
    client_max_body_size 20M;
}
```

### 3. Enable Site

```bash
# Buat symbolic link
sudo ln -s /etc/nginx/sites-available/laravel-backend /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. Konfigurasi PHP-FPM

Edit file PHP-FPM pool:

```bash
sudo nano /etc/php/8.2/fpm/pool.d/www.conf
```

Pastikan konfigurasi berikut:

```ini
user = www-data
group = www-data
listen = /var/run/php/php8.2-fpm.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660
```

Restart PHP-FPM:

```bash
sudo systemctl restart php8.2-fpm
```

### 5. Set Permissions

```bash
cd /var/www/html/backend-gambarmonologi2

# Set ownership
sudo chown -R www-data:www-data .

# Set permissions
sudo chmod -R 755 storage bootstrap/cache
```

### 6. Setup Laravel

```bash
# Install dependencies
composer install --optimize-autoloader --no-dev

# Setup environment
cp .env.example .env
php artisan key:generate

# Edit .env untuk database
nano .env

# Migrasi database
php artisan migrate
php artisan db:seed

# Create storage link
php artisan storage:link

# Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Konfigurasi SSL (HTTPS)

### Menggunakan Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Dapatkan SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal sudah disetup otomatis
```

### Update Nginx Config untuk SSL

Certbot akan otomatis update konfigurasi Nginx. Atau manual:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Rest of configuration...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Troubleshooting

### 502 Bad Gateway

**Penyebab:** PHP-FPM tidak berjalan atau socket path salah

**Solusi:**
```bash
# Cek status PHP-FPM
sudo systemctl status php8.2-fpm

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm

# Cek socket path
ls -la /var/run/php/
```

### 403 Forbidden

**Penyebab:** Permission error

**Solusi:**
```bash
sudo chown -R www-data:www-data /var/www/html/backend-gambarmonologi2
sudo chmod -R 755 storage bootstrap/cache
```

### 404 Not Found

**Penyebab:** Nginx config salah atau root path salah

**Solusi:**
```bash
# Test Nginx config
sudo nginx -t

# Cek root path di config
# Harus mengarah ke folder /public
```

### Upload File Gagal

**Penyebab:** Client body size limit

**Solusi:**
Edit `/etc/nginx/nginx.conf`:
```nginx
http {
    client_max_body_size 20M;
}
```

Atau di server block:
```nginx
server {
    client_max_body_size 20M;
}
```

### Slow Performance

**Solusi:**
```bash
# Enable OPcache
sudo nano /etc/php/8.2/fpm/php.ini

# Set:
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.revalidate_freq=2

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm
```

---

## Monitoring

### Cek Logs

```bash
# Nginx access log
sudo tail -f /var/log/nginx/laravel-access.log

# Nginx error log
sudo tail -f /var/log/nginx/laravel-error.log

# Laravel log
tail -f storage/logs/laravel.log

# PHP-FPM log
sudo tail -f /var/log/php8.2-fpm.log
```

### Status Nginx

```bash
# Status
sudo systemctl status nginx

# Reload
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# Test config
sudo nginx -t
```

### Status PHP-FPM

```bash
# Status
sudo systemctl status php8.2-fpm

# Restart
sudo systemctl restart php8.2-fpm

# Reload
sudo systemctl reload php8.2-fpm
```

---

## Performance Tuning

### Nginx Worker Processes

Edit `/etc/nginx/nginx.conf`:

```nginx
worker_processes auto;
worker_connections 1024;
```

### PHP-FPM Pool

Edit `/etc/php/8.2/fpm/pool.d/www.conf`:

```ini
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
```

### Enable Gzip

Edit `/etc/nginx/nginx.conf`:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

---

## Testing

### Test Nginx Config

```bash
sudo nginx -t
```

### Test PHP-FPM

```bash
php-fpm -t
```

### Test API

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Get characters
curl http://localhost:8000/api/v1/characters
```

---

## Docker Commands

```bash
# Build ulang container
docker compose up -d --build

# Restart backend
docker compose restart backend

# Lihat logs
docker compose logs -f backend

# Masuk ke container
docker compose exec backend bash

# Cek status Supervisor
docker compose exec backend supervisorctl status

# Restart Nginx di container
docker compose exec backend supervisorctl restart nginx

# Restart PHP-FPM di container
docker compose exec backend supervisorctl restart php-fpm
```

---

**✅ Backend dengan Nginx sudah siap!**

Akses API di: **http://localhost:8000/api/v1**
