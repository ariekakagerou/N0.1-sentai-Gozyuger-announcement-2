<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Illuminate\Support\Carbon;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Pengumuman Penting: Perubahan Jadwal Tayang Episode 43',
                'slug' => 'perubahan-jadwal-tayang-episode-43',
                'category' => 'program',
                'excerpt' => 'Dikarenakan siaran khusus akhir tahun, jadwal tayang Gozyuger akan mengalami perubahan.',
                'content' => 'Para penggemar setia Gozyuger, kami ingin menginformasikan bahwa episode 43 yang seharusnya tayang pada minggu ini akan diundur ke minggu depan dikarenakan adanya siaran program spesial akhir tahun TV Asahi. Episode 43 akan tayang dengan durasi spesial 45 menit sebagai gantinya. Jangan lewatkan aksi seru Yamato dan kawan-kawan dalam menghadapi Jenderal Kegelapan!',
                'image' => null,
                'author' => 'Admin',
                'status' => 'published',
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(1),
            ],
            [
                'title' => 'Produk Baru: DX Gozyuger Robo Telah Tersedia!',
                'slug' => 'produk-baru-dx-gozyuger-robo',
                'category' => 'goods',
                'excerpt' => 'Mainan DX Gozyuger Robo kini sudah bisa didapatkan di toko mainan terdekat.',
                'content' => 'Lengkapi koleksi Sentai-mu dengan DX Gozyuger Robo terbaru! Fitur transformasi 3 mode yang canggih dan suara efek original dari seri TV. Tersedia di seluruh toko mainan besar mulai tanggal 25 Desember. Dapatkan bonus GozyuSoul edisi terbatas untuk pembelian di minggu pertama!',
                'image' => null,
                'author' => 'Admin',
                'status' => 'published',
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(3),
            ],
            [
                'title' => 'Event Meet & Greet Pemeran Gozyuger di Tokyo Dome',
                'slug' => 'event-meet-greet-tokyo-dome',
                'category' => 'event',
                'excerpt' => 'Dapatkan kesempatan bertemu langsung dengan Yamato, Sena, dan Tsubasa!',
                'content' => 'Kabar gembira! Kami akan mengadakan sesi jumpa fans di Tokyo Dome City pada tanggal 10 Januari. Tiket terbatas dan akan mulai dijual secara online H-7 acara. Akan ada sesi tanda tangan dan foto bersama untuk pemegang tiket VVIP.',
                'image' => null,
                'author' => 'Admin',
                'status' => 'published',
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Lagu Opening "Go! Go! Gozyuger!" Masuk Top 10 Oricon',
                'slug' => 'lagu-opening-top-10-oricon',
                'category' => 'music',
                'excerpt' => 'Terima kasih atas dukungan kalian semua! Lagu tema kita berhasil masuk tangga lagu.',
                'content' => 'Single terbaru dari Project.R yang menjadi lagu pembuka seri ini berhasil menduduki posisi ke-8 di Oricon Weekly Chart. Video klip resminya juga telah ditonton lebih dari 1 juta kali di YouTube. Terus dengarkan dan nyanyikan semangat Gozyuger!',
                'image' => null,
                'author' => 'Admin',
                'status' => 'published',
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'Wawancara Eksklusif dengan Sutradara Aksi',
                'slug' => 'wawancara-sutradara-aksi',
                'category' => 'interview',
                'excerpt' => 'Simak cerita di balik layar pembuatan adegan pertarungan yang epik.',
                'content' => 'Dalam wawancara spesial kali ini, Bapak Hirofumi Fukuzawa menceritakan tantangan dalam mengarahkan adegan pertarungan Robot Raksasa di tengah kota miniatur. Beliau juga membocorkan sedikit teknik wire-action yang digunakan oleh GozyuRed di episode mendatang.',
                'image' => null,
                'author' => 'Admin',
                'status' => 'published',
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(10),
            ]
        ];

        foreach ($data as $item) {
            News::create($item);
        }
    }
}
