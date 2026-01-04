# Panduan Integrasi Frontend dengan Backend API

## 🔗 Koneksi API

Base URL API: `http://localhost:8000/api/v1`

## 📦 Setup di Frontend (Next.js)

### 1. Install Axios

```bash
npm install axios
```

### 2. Buat API Client

Buat file `lib/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
```

### 3. Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 🎯 Contoh Penggunaan

### Fetch News

```typescript
import api from '@/lib/api';

// Get all published news
export async function getNews(params?: {
  status?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  per_page?: number;
}) {
  const response = await api.get('/news', { params });
  return response.data;
}

// Get single news by slug
export async function getNewsBySlug(slug: string) {
  const response = await api.get(`/news/slug/${slug}`);
  return response.data;
}
```

### Fetch Characters

```typescript
// Get all characters
export async function getCharacters(params?: {
  status?: string;
  color?: string;
  main?: boolean;
}) {
  const response = await api.get('/characters', { params });
  return response.data;
}

// Get character by slug
export async function getCharacterBySlug(slug: string) {
  const response = await api.get(`/characters/slug/${slug}`);
  return response.data;
}
```

### Fetch Robots

```typescript
export async function getRobots(params?: {
  status?: string;
  type?: string;
}) {
  const response = await api.get('/robots', { params });
  return response.data;
}
```

### Fetch Songs

```typescript
export async function getSongs(params?: {
  status?: string;
  type?: string;
}) {
  const response = await api.get('/songs', { params });
  return response.data;
}
```

### Fetch Stories (Episodes)

```typescript
export async function getStories(params?: {
  status?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}) {
  const response = await api.get('/stories', { params });
  return response.data;
}
```

## 📄 Response Format

### Pagination Response

```json
{
  "current_page": 1,
  "data": [...],
  "first_page_url": "http://localhost:8000/api/v1/news?page=1",
  "from": 1,
  "last_page": 5,
  "last_page_url": "http://localhost:8000/api/v1/news?page=5",
  "links": [...],
  "next_page_url": "http://localhost:8000/api/v1/news?page=2",
  "path": "http://localhost:8000/api/v1/news",
  "per_page": 15,
  "prev_page_url": null,
  "to": 15,
  "total": 75
}
```

### Single Item Response

```json
{
  "id": 1,
  "title": "Breaking News",
  "slug": "breaking-news",
  "content": "...",
  "image": "news/image.jpg",
  "status": "published",
  "published_at": "2024-01-01T00:00:00.000000Z",
  "created_at": "2024-01-01T00:00:00.000000Z",
  "updated_at": "2024-01-01T00:00:00.000000Z"
}
```

## 🖼️ Image URLs

Images are stored in `storage/app/public`. To access them:

```
http://localhost:8000/storage/{image_path}
```

Example:
```
http://localhost:8000/storage/news/image.jpg
http://localhost:8000/storage/characters/avatar.jpg
```

## 🔄 React Query Integration (Recommended)

### Install React Query

```bash
npm install @tanstack/react-query
```

### Setup Query Client

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Use in Components

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { getNews } from '@/lib/api';

export function NewsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news', { status: 'published' }],
    queryFn: () => getNews({ status: 'published', per_page: 10 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading news</div>;

  return (
    <div>
      {data.data.map((news) => (
        <div key={news.id}>
          <h2>{news.title}</h2>
          <p>{news.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🎨 TypeScript Types

```typescript
// types/api.ts

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  views: number;
  is_featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface Character {
  id: number;
  name: string;
  slug: string;
  ranger_name?: string;
  color?: string;
  actor?: string;
  description?: string;
  biography?: string;
  image?: string;
  avatar?: string;
  age?: number;
  occupation?: string;
  abilities?: string[];
  weapons?: string[];
  order: number;
  is_main: boolean;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Robot {
  id: number;
  name: string;
  slug: string;
  type?: string;
  description?: string;
  specifications?: string;
  image?: string;
  pilot?: string;
  weapons?: string[];
  special_attacks?: string[];
  components?: string[];
  height?: string;
  weight?: string;
  order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Song {
  id: number;
  title: string;
  slug: string;
  type?: string;
  artist?: string;
  composer?: string;
  lyricist?: string;
  lyrics?: string;
  audio_url?: string;
  video_url?: string;
  cover_image?: string;
  duration?: string;
  release_date?: string;
  order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Story {
  id: number;
  episode_number: number;
  title: string;
  slug: string;
  synopsis?: string;
  description?: string;
  thumbnail?: string;
  video_url?: string;
  air_date?: string;
  director?: string;
  writer?: string;
  featured_characters?: string[];
  featured_robots?: string[];
  views: number;
  rating?: number;
  status: 'upcoming' | 'aired' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
```

## ⚠️ Error Handling

```typescript
import api from '@/lib/api';

try {
  const response = await api.get('/news');
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data);
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
  throw error;
}
```

## 🚀 Next Steps

1. Pastikan backend berjalan di `http://localhost:8000`
2. Pastikan frontend berjalan di `http://localhost:3000`
3. Test koneksi dengan health check endpoint
4. Mulai fetch data dari API
5. Implementasikan error handling dan loading states
