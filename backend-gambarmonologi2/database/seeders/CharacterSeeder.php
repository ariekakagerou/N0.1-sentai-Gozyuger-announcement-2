<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Character;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $characters = [
            [
                'name' => 'Yamato Kazakiri',
                'slug' => 'yamato-kazakiri',
                'ranger_name' => 'Gozyuger Red',
                'color' => 'red',
                'actor' => 'Sakai Taisei',
                'description' => 'Pemimpin tim Gozyuger yang berani dan penuh semangat',
                'biography' => 'Yamato adalah seorang pemuda yang dipilih oleh Gozyuger Red untuk melindungi dunia dari ancaman jahat.',
                'age' => 20,
                'occupation' => 'Mahasiswa',
                'abilities' => ['Kekuatan Super', 'Kepemimpinan', 'Pedang Api'],
                'weapons' => ['Gozyuger Sword', 'Red Blaster'],
                'order' => 1,
                'is_main' => true,
                'status' => 'active',
            ],
            [
                'name' => 'Sena Hayate',
                'slug' => 'sena-hayate',
                'ranger_name' => 'Gozyuger Blue',
                'color' => 'blue',
                'actor' => 'Hirakawa Yuzuki',
                'description' => 'Ahli strategi tim dengan kecerdasan luar biasa',
                'biography' => 'Sena adalah seorang jenius yang menggunakan kecerdasannya untuk membantu tim.',
                'age' => 19,
                'occupation' => 'Mahasiswa',
                'abilities' => ['Kecerdasan Tinggi', 'Analisis Cepat', 'Es Sihir'],
                'weapons' => ['Blue Lance', 'Tactical Scanner'],
                'order' => 2,
                'is_main' => true,
                'status' => 'active',
            ],
            [
                'name' => 'Tsubasa Oozora',
                'slug' => 'tsubasa-oozora',
                'ranger_name' => 'Gozyuger Yellow',
                'color' => 'yellow',
                'actor' => 'Murakami Maito',
                'description' => 'Petarung tangguh dengan kekuatan luar biasa',
                'biography' => 'Tsubasa memiliki kekuatan fisik yang menakjubkan dan selalu melindungi teman-temannya.',
                'age' => 21,
                'occupation' => 'Atlet',
                'abilities' => ['Kekuatan Fisik', 'Pertahanan Kuat', 'Petir'],
                'weapons' => ['Yellow Hammer', 'Thunder Gauntlet'],
                'order' => 3,
                'is_main' => true,
                'status' => 'active',
            ],
            [
                'name' => 'Sakura Hoshino',
                'slug' => 'sakura-hoshino',
                'ranger_name' => 'Gozyuger Pink',
                'color' => 'pink',
                'actor' => 'Watanabe Aoto',
                'description' => 'Penyembuh tim dengan hati yang lembut',
                'biography' => 'Sakura memiliki kemampuan penyembuhan dan selalu peduli dengan kesejahteraan timnya.',
                'age' => 18,
                'occupation' => 'Perawat',
                'abilities' => ['Penyembuhan', 'Empati', 'Sihir Cahaya'],
                'weapons' => ['Pink Bow', 'Healing Staff'],
                'order' => 4,
                'is_main' => true,
                'status' => 'active',
            ],
            [
                'name' => 'Ryu Kurogane',
                'slug' => 'ryu-kurogane',
                'ranger_name' => 'Gozyuger Black',
                'color' => 'black',
                'actor' => 'Yashiro Takuya',
                'description' => 'Prajurit misterius dengan masa lalu yang gelap',
                'biography' => 'Ryu adalah mantan agen rahasia yang bergabung dengan Gozyuger untuk menebus kesalahannya.',
                'age' => 25,
                'occupation' => 'Mantan Agen',
                'abilities' => ['Siluman', 'Seni Bela Diri', 'Bayangan'],
                'weapons' => ['Black Katana', 'Shadow Shuriken'],
                'order' => 5,
                'is_main' => true,
                'status' => 'active',
            ],
        ];

        foreach ($characters as $character) {
            Character::create($character);
        }
    }
}
