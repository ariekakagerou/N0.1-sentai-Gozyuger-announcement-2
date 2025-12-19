# Dockerfile untuk frontend Next.js

FROM node:20-alpine

WORKDIR /app

# Copy file konfigurasi npm terlebih dahulu untuk cache layer
COPY package*.json ./

RUN npm install

# Copy seluruh source code
COPY . .

# Build aplikasi (untuk mode production jika diperlukan)
RUN npm run build || echo "Build bisa dijalankan ulang saat runtime"

EXPOSE 3000

# Command default akan di-override oleh docker-compose (npm run dev)
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
