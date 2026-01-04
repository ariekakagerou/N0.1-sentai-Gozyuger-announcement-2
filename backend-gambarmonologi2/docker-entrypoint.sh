#!/bin/bash
# Don't exit on error - let supervisor handle failures
set +e

echo "🚀 Starting Laravel Backend Setup..."

# Create required directories
mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views storage/logs

# Set permissions
chown -R www-data:www-data /var/www/html
chmod -R 775 bootstrap/cache storage

# Check if vendor/autoload.php exists
if [ ! -f "vendor/autoload.php" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install --no-interaction --optimize-autoloader --no-dev || {
        echo "⚠️  Composer install failed or still running. Services will start anyway."
    }
else
    echo "✅ Composer dependencies already installed"
fi

# Check if .env exists (only if vendor is ready)
if [ -f "vendor/autoload.php" ]; then
    if [ ! -f ".env" ]; then
        echo "📝 Creating .env file..."
        cp .env.example .env
        php artisan key:generate || echo "⚠️  Could not generate key"
    else
        echo "✅ .env file already exists"
    fi

    # Create storage link if not exists
    if [ ! -L "public/storage" ]; then
        echo "🔗 Creating storage link..."
        php artisan storage:link || echo "⚠️  Could not create storage link"
    else
        echo "✅ Storage link already exists"
    fi
else
    echo "⚠️  Vendor not ready yet. Skipping Laravel setup commands."
fi

echo "✅ Setup complete! Starting services..."

# Execute the main command
exec "$@"
