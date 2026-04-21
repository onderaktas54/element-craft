// ============================================
// Element Craft - Game Logic
// Drag & Drop birleştirme + Three.js arka plan
// ============================================

import * as THREE from 'three';

// ============================================
// ELEMENT DATABASE (from .md file)
// ============================================
const ALL_ELEMENTS = {
    // --- TIER 1: Başlangıç ---
    'Su': { emoji: '💧', category: 'Temel' },
    'Ateş': { emoji: '🔥', category: 'Temel' },
    'Toprak': { emoji: '🌍', category: 'Temel' },
    'Hava': { emoji: '💨', category: 'Temel' },

    // --- Temel Birleşimler ---
    'Buhar': { emoji: '♨️', category: 'Doğa' },
    'Çamur': { emoji: '🟤', category: 'Doğa' },
    'Yağmur': { emoji: '🌧️', category: 'Doğa' },
    'Lav': { emoji: '🌋', category: 'Doğa' },
    'Enerji': { emoji: '⚡', category: 'Doğa' },
    'Toz': { emoji: '🌫️', category: 'Doğa' },
    'Göl': { emoji: '🌊', category: 'Doğa' },
    'Alev Topu': { emoji: '☄️', category: 'Doğa' },
    'Taş': { emoji: '🪨', category: 'Doğa' },
    'Rüzgar': { emoji: '🌬️', category: 'Doğa' },

    // --- Doğa & Coğrafya ---
    'Obsidyen': { emoji: '🖤', category: 'Doğa' },
    'Volkan': { emoji: '🌋', category: 'Doğa' },
    'Tuğla': { emoji: '🧱', category: 'Doğa' },
    'Bataklık': { emoji: '🏚️', category: 'Doğa' },
    'Kil': { emoji: '🏺', category: 'Doğa' },
    'Dağ': { emoji: '⛰️', category: 'Doğa' },
    'Kum': { emoji: '🏖️', category: 'Doğa' },
    'Metal': { emoji: '⚙️', category: 'Doğa' },
    'Cam': { emoji: '🪟', category: 'Doğa' },
    'Ada': { emoji: '🏝️', category: 'Doğa' },
    'Çöl': { emoji: '🏜️', category: 'Doğa' },
    'Nehir': { emoji: '🏞️', category: 'Doğa' },
    'Sıradağlar': { emoji: '🏔️', category: 'Doğa' },
    'Everest': { emoji: '🏔️', category: 'Doğa' },
    'Deniz': { emoji: '🌊', category: 'Doğa' },
    'Okyanus': { emoji: '🌏', category: 'Doğa' },
    'Şelale': { emoji: '⛲', category: 'Doğa' },
    'Sel': { emoji: '🌊', category: 'Doğa' },
    'Bulut': { emoji: '☁️', category: 'Doğa' },
    'Fırtına': { emoji: '⛈️', category: 'Doğa' },
    'Kar': { emoji: '❄️', category: 'Doğa' },
    'Yıldırım': { emoji: '⚡', category: 'Doğa' },
    'Gökkuşağı': { emoji: '🌈', category: 'Doğa' },
    'Buz': { emoji: '🧊', category: 'Doğa' },
    'Buzdağı': { emoji: '🏔️', category: 'Doğa' },
    'Kristal': { emoji: '💎', category: 'Doğa' },
    'Elmas': { emoji: '💠', category: 'Doğa' },
    'Yakut': { emoji: '♦️', category: 'Doğa' },
    'Safir': { emoji: '🔵', category: 'Doğa' },
    'Soğuk': { emoji: '🥶', category: 'Doğa' },

    // --- Hava & Uzay ---
    'Kasırga': { emoji: '🌪️', category: 'Uzay' },
    'Güneş': { emoji: '☀️', category: 'Uzay' },
    'Gündüz': { emoji: '☀️', category: 'Uzay' },
    'Zaman': { emoji: '⏰', category: 'Uzay' },
    'Güzel Hava': { emoji: '🌤️', category: 'Uzay' },
    'Plazma': { emoji: '🌩️', category: 'Uzay' },
    'Meteor': { emoji: '🪨', category: 'Uzay' },
    'Yıldız': { emoji: '⭐', category: 'Uzay' },
    'Galaksi': { emoji: '🌌', category: 'Uzay' },
    'Karadelik': { emoji: '🕳️', category: 'Uzay' },
    'Gezegen': { emoji: '🌑', category: 'Uzay' },
    'Dünya': { emoji: '🌍', category: 'Uzay' },
    'Asteroid': { emoji: '🪨', category: 'Uzay' },
    'Ay': { emoji: '🌕', category: 'Uzay' },
    'Tutulma': { emoji: '🌗', category: 'Uzay' },
    'Uzay': { emoji: '🌌', category: 'Uzay' },

    // --- Zaman & Gece-Gündüz ---
    'Gün Batımı': { emoji: '🌅', category: 'Zaman' },
    'Gece': { emoji: '🌙', category: 'Zaman' },
    'Karanlık': { emoji: '🌑', category: 'Zaman' },
    'Gelgit': { emoji: '🌊', category: 'Zaman' },
    'Uyku': { emoji: '😴', category: 'Zaman' },
    'Rüya': { emoji: '💭', category: 'Zaman' },
    'Fikir': { emoji: '💡', category: 'Zaman' },
    'Fosil': { emoji: '🦴', category: 'Zaman' },
    'Sonsuzluk': { emoji: '♾️', category: 'Zaman' },

    // --- Bitkiler ---
    'Filiz': { emoji: '🌱', category: 'Bitki' },
    'Bitki': { emoji: '🌿', category: 'Bitki' },
    'Ağaç': { emoji: '🌳', category: 'Bitki' },
    'Çiçek': { emoji: '🌸', category: 'Bitki' },
    'Buğday': { emoji: '🌾', category: 'Bitki' },
    'Mantar': { emoji: '🍄', category: 'Bitki' },
    'Ayçiçeği': { emoji: '🌻', category: 'Bitki' },
    'Orman': { emoji: '🌲', category: 'Bitki' },
    'Kütük': { emoji: '🪵', category: 'Bitki' },
    'Kağıt': { emoji: '📄', category: 'Bitki' },
    'Yağmur Ormanı': { emoji: '🌴', category: 'Bitki' },
    'Perili Orman': { emoji: '😱', category: 'Bitki' },
    'Un': { emoji: '🫓', category: 'Bitki' },
    'Mega Mantar': { emoji: '🍄', category: 'Bitki' },
    'Kaktüs': { emoji: '🌵', category: 'Bitki' },
    'Aloe Vera': { emoji: '🥤', category: 'Bitki' },

    // --- Hayvanlar Küçük ---
    'Böcek': { emoji: '🐛', category: 'Hayvan' },
    'Balık': { emoji: '🐟', category: 'Hayvan' },
    'Kuş': { emoji: '🐦', category: 'Hayvan' },
    'Solucan': { emoji: '🐛', category: 'Hayvan' },
    'Tırtıl': { emoji: '🐛', category: 'Hayvan' },
    'Kelebek': { emoji: '🦋', category: 'Hayvan' },
    'Arı': { emoji: '🐝', category: 'Hayvan' },
    'Karınca': { emoji: '🐜', category: 'Hayvan' },
    'Ateş Böceği': { emoji: '🪲', category: 'Hayvan' },
    'Köpekbalığı': { emoji: '🦈', category: 'Hayvan' },
    'Elektrikli Yılan Balığı': { emoji: '⚡', category: 'Hayvan' },
    'Ahtapot': { emoji: '🐙', category: 'Hayvan' },
    'Penguen': { emoji: '🐧', category: 'Hayvan' },
    'Timsah': { emoji: '🐊', category: 'Hayvan' },

    // --- Hayvanlar Büyük ---
    'Kurbağa': { emoji: '🐸', category: 'Hayvan' },
    'Kertenkele': { emoji: '🦎', category: 'Hayvan' },
    'Yılan': { emoji: '🐍', category: 'Hayvan' },
    'Kartal': { emoji: '🦅', category: 'Hayvan' },
    'Phoenix': { emoji: '🦅', category: 'Fantezi' },
    'Baykuş': { emoji: '🦉', category: 'Hayvan' },
    'Kurt': { emoji: '🐺', category: 'Hayvan' },
    'Kurtadam': { emoji: '🐺', category: 'Fantezi' },
    'At': { emoji: '🐴', category: 'Hayvan' },
    'Su Aygırı': { emoji: '🦛', category: 'Hayvan' },
    'Unicorn': { emoji: '🦄', category: 'Fantezi' },
    'Ejderha': { emoji: '🐉', category: 'Fantezi' },
    'Köpek': { emoji: '🐕', category: 'Hayvan' },
    'Koyun': { emoji: '🐑', category: 'Hayvan' },
    'Yün': { emoji: '🧶', category: 'Hayvan' },
    'Örümcek': { emoji: '🕷️', category: 'Hayvan' },
    'Karınca Kolonisi': { emoji: '🐜', category: 'Hayvan' },
    'Yumurta': { emoji: '🥚', category: 'Hayvan' },
    'Tavuk': { emoji: '🐔', category: 'Hayvan' },
    'Civciv': { emoji: '🐣', category: 'Hayvan' },
    'Boynuz': { emoji: '🦴', category: 'Hayvan' },
    'İpek': { emoji: '🧵', category: 'Hayvan' },

    // --- Hayat & Evrim ---
    'Hayat': { emoji: '🧬', category: 'Yaşam' },
    'Dinozor': { emoji: '🦕', category: 'Yaşam' },
    'Petrol': { emoji: '⛽', category: 'Yaşam' },
    'Patlama': { emoji: '💥', category: 'Yaşam' },

    // --- İnsan & Medeniyet ---
    'İnsan': { emoji: '👤', category: 'Medeniyet' },
    'Aşk': { emoji: '❤️', category: 'Medeniyet' },
    'Bebek': { emoji: '👶', category: 'Medeniyet' },
    'Ayrılık': { emoji: '💔', category: 'Medeniyet' },
    'Kılıç': { emoji: '⚔️', category: 'Medeniyet' },
    'Ev': { emoji: '🏠', category: 'Medeniyet' },
    'Çiftçi': { emoji: '👨‍🌾', category: 'Medeniyet' },
    'Aşçı': { emoji: '🍳', category: 'Medeniyet' },
    'Balıkçı': { emoji: '🎣', category: 'Medeniyet' },
    'Gemici': { emoji: '🚢', category: 'Medeniyet' },
    'Süvari': { emoji: '🏇', category: 'Medeniyet' },
    'Bilim İnsanı': { emoji: '🧑‍🔬', category: 'Medeniyet' },
    'Büyücü': { emoji: '🧙', category: 'Fantezi' },
    'Savaşçı': { emoji: '⚔️', category: 'Medeniyet' },
    'Köy': { emoji: '🏘️', category: 'Medeniyet' },
    'Şehir': { emoji: '🏙️', category: 'Medeniyet' },
    'Metropol': { emoji: '🌆', category: 'Medeniyet' },
    'Ülke': { emoji: '🌍', category: 'Medeniyet' },
    'Dünya Birliği': { emoji: '🌐', category: 'Medeniyet' },
    'Sporcu': { emoji: '🏃', category: 'Medeniyet' },
    'Yüzücü': { emoji: '🏊', category: 'Medeniyet' },
    'Yaşlı': { emoji: '👴', category: 'Medeniyet' },
    'Bilgi': { emoji: '📖', category: 'Medeniyet' },

    // --- Yemek & Mutfak ---
    'Hamur': { emoji: '🫓', category: 'Yemek' },
    'Ekmek': { emoji: '🍞', category: 'Yemek' },
    'Sandviç': { emoji: '🥪', category: 'Yemek' },
    'Peynir': { emoji: '🧀', category: 'Yemek' },
    'Dondurma': { emoji: '🍦', category: 'Yemek' },
    'Sütlü Çikolata': { emoji: '🍫', category: 'Yemek' },
    'Sahanda Yumurta': { emoji: '🍳', category: 'Yemek' },
    'Tavuk But': { emoji: '🍗', category: 'Yemek' },
    'Çay': { emoji: '🍵', category: 'Yemek' },
    'Buzlu Çay': { emoji: '🧊', category: 'Yemek' },
    'Mısır': { emoji: '🌽', category: 'Yemek' },
    'Patlamış Mısır': { emoji: '🍿', category: 'Yemek' },
    'Pizza': { emoji: '🍕', category: 'Yemek' },
    'Şekerleme': { emoji: '🍭', category: 'Yemek' },
    'Karamel': { emoji: '🍮', category: 'Yemek' },
    'Baklava': { emoji: '🥐', category: 'Yemek' },
    'Kurabiye': { emoji: '🍪', category: 'Yemek' },
    'Süt': { emoji: '🥛', category: 'Yemek' },
    'Şeker': { emoji: '🍬', category: 'Yemek' },
    'Bal': { emoji: '🍯', category: 'Yemek' },
    'Çikolata': { emoji: '🍫', category: 'Yemek' },
    'Çay Yaprağı': { emoji: '🍃', category: 'Yemek' },
    'Kahve Çekirdeği': { emoji: '☕', category: 'Yemek' },
    'Kahve': { emoji: '☕', category: 'Yemek' },
    'Latte': { emoji: '☕', category: 'Yemek' },
    'Ice Tea': { emoji: '🧊', category: 'Yemek' },
    'Mega Pizza': { emoji: '🍕', category: 'Yemek' },
    'Gıda Koması': { emoji: '😴', category: 'Yemek' },
    'Masterchef': { emoji: '👨‍🍳', category: 'Yemek' },
    'Bira': { emoji: '🍺', category: 'Yemek' },
    'Meyve Suyu': { emoji: '🧃', category: 'Yemek' },
    'Kokteyl': { emoji: '🍹', category: 'Yemek' },
    'Sütlü Çay': { emoji: '🫖', category: 'Yemek' },

    // --- Teknoloji & Bilim ---
    'Çark': { emoji: '⚙️', category: 'Teknoloji' },
    'Makine': { emoji: '🤖', category: 'Teknoloji' },
    'Pil': { emoji: '🔋', category: 'Teknoloji' },
    'Ampul': { emoji: '💡', category: 'Teknoloji' },
    'Işık': { emoji: '💡', category: 'Teknoloji' },
    'Lens': { emoji: '🔍', category: 'Teknoloji' },
    'Teleskop': { emoji: '🔭', category: 'Teknoloji' },
    'Kamera': { emoji: '📸', category: 'Teknoloji' },
    'Uzaylı': { emoji: '👽', category: 'Teknoloji' },
    'Çip': { emoji: '💻', category: 'Teknoloji' },
    'Bilgisayar': { emoji: '💻', category: 'Teknoloji' },
    'Telefon': { emoji: '📱', category: 'Teknoloji' },
    'İnternet': { emoji: '🌐', category: 'Teknoloji' },
    'Sosyal Medya': { emoji: '📱', category: 'Teknoloji' },
    'Bağımlılık': { emoji: '🤯', category: 'Teknoloji' },
    'Wikipedia': { emoji: '📚', category: 'Teknoloji' },
    'Uçak': { emoji: '✈️', category: 'Teknoloji' },
    'Gemi': { emoji: '🚢', category: 'Teknoloji' },
    'Araba': { emoji: '🚗', category: 'Teknoloji' },
    'Trafik': { emoji: '🚦', category: 'Teknoloji' },
    'Roket': { emoji: '🚀', category: 'Teknoloji' },
    'Uzay Gemisi': { emoji: '🛸', category: 'Teknoloji' },
    'Tren': { emoji: '🚂', category: 'Teknoloji' },
    'Saat': { emoji: '⏰', category: 'Teknoloji' },
    'Elektrik': { emoji: '⚡', category: 'Teknoloji' },
    'Radyo': { emoji: '📻', category: 'Teknoloji' },
    'Televizyon': { emoji: '📺', category: 'Teknoloji' },
    'Netflix': { emoji: '📺', category: 'Teknoloji' },
    'Film': { emoji: '🎬', category: 'Teknoloji' },
    'Robot': { emoji: '🤖', category: 'Teknoloji' },
    'Yapay Zeka': { emoji: '🧠', category: 'Teknoloji' },

    // --- Büyü & Fantezi ---
    'Büyü': { emoji: '✨', category: 'Fantezi' },
    'İksir': { emoji: '🧪', category: 'Fantezi' },
    'Kehanet': { emoji: '🔮', category: 'Fantezi' },
    'Asa': { emoji: '🪄', category: 'Fantezi' },
    'Büyülü Yüzük': { emoji: '💍', category: 'Fantezi' },
    'Excalibur': { emoji: '⚔️', category: 'Fantezi' },
    'Süpürge': { emoji: '🧹', category: 'Fantezi' },
    'Zombi': { emoji: '🧟', category: 'Fantezi' },
    'Vampir': { emoji: '🧛', category: 'Fantezi' },
    'Kül': { emoji: '💀', category: 'Fantezi' },
    'Hayalet': { emoji: '👻', category: 'Fantezi' },
    'Perili Ev': { emoji: '🏚️', category: 'Fantezi' },
    'Ejderha Nefesi': { emoji: '🔥', category: 'Fantezi' },
    'Evcil Ejderha': { emoji: '🐲', category: 'Fantezi' },
    'Ejderha Zırhı': { emoji: '🛡️', category: 'Fantezi' },
    'Büyücü Kulesi': { emoji: '🌟', category: 'Fantezi' },
    'Yeniden Doğuş': { emoji: '🔥', category: 'Fantezi' },

    // --- Müzik & Sanat ---
    'Müzik': { emoji: '🎵', category: 'Sanat' },
    'Trompet': { emoji: '🎺', category: 'Sanat' },
    'Nota': { emoji: '🎼', category: 'Sanat' },
    'Rock': { emoji: '🎸', category: 'Sanat' },
    'Elektronik Müzik': { emoji: '🎧', category: 'Sanat' },
    'Kitap': { emoji: '📖', category: 'Sanat' },
    'Kütüphane': { emoji: '📚', category: 'Sanat' },
    'Büyü Kitabı': { emoji: '📕', category: 'Sanat' },
    'Kalem': { emoji: '✏️', category: 'Sanat' },
    'Tablo': { emoji: '🎨', category: 'Sanat' },
    'Dans': { emoji: '💃', category: 'Sanat' },
    'Sanat': { emoji: '🎨', category: 'Sanat' },

    // --- Doğal Kaynaklar ---
    'Kömür': { emoji: '⬛', category: 'Kaynak' },
    'Çelik': { emoji: '🔩', category: 'Kaynak' },
    'Güçlü Ateş': { emoji: '🔥', category: 'Kaynak' },
    'Odun': { emoji: '🪵', category: 'Kaynak' },
    'Altın': { emoji: '🥇', category: 'Kaynak' },
    'Taç': { emoji: '👑', category: 'Kaynak' },
    'Kral': { emoji: '👑', category: 'Kaynak' },
    'Krallık': { emoji: '🏰', category: 'Kaynak' },
    'İnci': { emoji: '🐚', category: 'Kaynak' },
    'Yüzük': { emoji: '💍', category: 'Kaynak' },
    'Fabrika': { emoji: '🏭', category: 'Kaynak' },
    'Sanayi': { emoji: '🏙️', category: 'Kaynak' },
    'Kirlilik': { emoji: '🌫️', category: 'Kaynak' },
    'Asit Yağmuru': { emoji: '☣️', category: 'Kaynak' },
    'Küresel Isınma': { emoji: '🌡️', category: 'Kaynak' },

    // --- Hava Durumu ---
    'Dalga': { emoji: '🌊', category: 'Doğa' },
    'Tsunami': { emoji: '🌊', category: 'Doğa' },
    'Deprem': { emoji: '🫨', category: 'Doğa' },
    'Yıkım': { emoji: '🏚️', category: 'Doğa' },
    'Kül Bulutu': { emoji: '🌫️', category: 'Doğa' },
    'Tayfun': { emoji: '🌀', category: 'Doğa' },
    'Sıcak Hava': { emoji: '🥵', category: 'Doğa' },
    'Tipi': { emoji: '❄️', category: 'Doğa' },
    'Kardan Adam': { emoji: '⛄', category: 'Doğa' },
    'Gözyaşı': { emoji: '💧', category: 'Doğa' },

    // --- Esprili ---
    'Kanepe': { emoji: '🛋️', category: 'Espri' },
    'Couch Potato': { emoji: '🥔', category: 'Espri' },
    'Uykusuzluk': { emoji: '😵', category: 'Espri' },
    'Süper İnsan': { emoji: '💪', category: 'Espri' },
    'Meme': { emoji: '😺', category: 'Espri' },
    'Viral': { emoji: '🤣', category: 'Espri' },
    'Grip': { emoji: '🤧', category: 'Espri' },
    'İyileşme': { emoji: '💪', category: 'Espri' },
    'Sinir Krizi': { emoji: '😤', category: 'Espri' },
    "Ay'a Yolculuk": { emoji: '🚀', category: 'Espri' },
    'İstila': { emoji: '🛸', category: 'Espri' },
    'Zombi Salgını': { emoji: '🧟‍♂️', category: 'Espri' },
    'Twilight': { emoji: '🧛', category: 'Espri' },
    'Skynet': { emoji: '🌐', category: 'Espri' },
    'Claude': { emoji: '🤝', category: 'Espri' },
    'Kedi': { emoji: '🐱', category: 'Hayvan' },

    // --- Bonus Mega ---
    'Efsanevi Yaratık': { emoji: '🌟', category: 'Efsane' },
    'Kozmik Güç': { emoji: '✨', category: 'Efsane' },
    'Tanrı Parçacığı': { emoji: '💫', category: 'Efsane' },
    'Beyaz Delik': { emoji: '⚪', category: 'Efsane' },
    'Felsefe Taşı': { emoji: '💎', category: 'Efsane' },
    'Ejderha Krallığı': { emoji: '🏰', category: 'Efsane' },
    'Kıyamet': { emoji: '🌍', category: 'Efsane' },
    'Süper Zeka': { emoji: '🧠', category: 'Efsane' },
    'Yeni Başlangıç': { emoji: '🌱', category: 'Efsane' },

    // --- Yeni Eklenenler (v2) ---
    'Magma': { emoji: '🔥', category: 'Doğa' },
    'Kumul': { emoji: '🏜️', category: 'Doğa' },
    'Çakıl': { emoji: '🌫️', category: 'Doğa' },
    'Vadi': { emoji: '🏞️', category: 'Doğa' },
    'Delta': { emoji: '🌾', category: 'Doğa' },
    'Filiz': { emoji: '🌱', category: 'Bitki' },
    'Vaha': { emoji: '🏝️', category: 'Doğa' },
    'Kum Fırtınası': { emoji: '🌪️', category: 'Doğa' },
    'Akrep': { emoji: '🦂', category: 'Hayvan' },
    'Deve': { emoji: '🐫', category: 'Hayvan' },
    'Medeniyet': { emoji: '🕌', category: 'Medeniyet' },
    'Süper Fırtına': { emoji: '🌪️', category: 'Doğa' },
    'Unicorn': { emoji: '🦄', category: 'Fantezi' },
    'Hortum': { emoji: '🌪️', category: 'Doğa' },
    'Kum Fırtınası': { emoji: '🌪️', category: 'Doğa' },
    'Tipi': { emoji: '❄️', category: 'Doğa' },
    'Tayfun': { emoji: '🌀', category: 'Doğa' },
    'Mega Kasırga': { emoji: '🌀', category: 'Doğa' },
    'Kaybolmak': { emoji: '😵‍💫', category: 'Espri' },
    'Dondurucu': { emoji: '🥶', category: 'Doğa' },
    'Buzdağı': { emoji: '🏔️', category: 'Doğa' },
    'Erime': { emoji: '💧', category: 'Doğa' },
    'Fotosentez': { emoji: '🌻', category: 'Bitki' },
    'Karanlık Gece': { emoji: '🌑', category: 'Zaman' },
    'Gelgit': { emoji: '🌊', category: 'Zaman' },
    'Kurtadam': { emoji: '🐺', category: 'Fantezi' },
    'Romantizm': { emoji: '🌙', category: 'Medeniyet' },
    'Halkalı Gezegen': { emoji: '🪐', category: 'Uzay' },
    'Güneş Sistemi': { emoji: '🪐', category: 'Uzay' },
    'Kara Cüce': { emoji: '💀', category: 'Uzay' },
    'Süpernova': { emoji: '💥', category: 'Uzay' },
    'Solucan Deliği': { emoji: '🌀', category: 'Uzay' },
    'Zaman Yolcusu': { emoji: '⏳', category: 'Fantezi' },
    'Büyüteç Ateşi': { emoji: '🔥', category: 'Doğa' },
    'Çocuk': { emoji: '👦', category: 'Medeniyet' },
    'Bilge': { emoji: '🧙', category: 'Medeniyet' },
    'Ölümsüz': { emoji: '🧛', category: 'Fantezi' },
    'Ölüm': { emoji: '💀', category: 'Yaşam' },
    'Hayalet': { emoji: '👻', category: 'Fantezi' },
    'Kayıp Şehir': { emoji: '🏛️', category: 'Medeniyet' },
    'Atlantis': { emoji: '🏛️', category: 'Fantezi' },
    'Yaprak': { emoji: '🍂', category: 'Bitki' },
    'Meyve': { emoji: '🍎', category: 'Bitki' },
    'Çay Yaprağı': { emoji: '🍃', category: 'Yemek' },
    'Papağan': { emoji: '🦜', category: 'Hayvan' },
    'Zehirli Kurbağa': { emoji: '🐸', category: 'Hayvan' },
    'Mısır': { emoji: '🌽', category: 'Yemek' },
    'Mantar': { emoji: '🍄', category: 'Bitki' },
    'Aloe Vera': { emoji: '🥤', category: 'Bitki' },
    'Meyve Suyu': { emoji: '🧃', category: 'Yemek' },
    'Reçel': { emoji: '🍬', category: 'Yemek' },
    'Hindistan Cevizi': { emoji: '🥥', category: 'Bitki' },
    'Tırtıl': { emoji: '🐛', category: 'Hayvan' },
    'Kelebek': { emoji: '🦋', category: 'Hayvan' },
    'Ateş Böceği': { emoji: '🪲', category: 'Hayvan' },
    'Hamam Böceği': { emoji: '🪳', category: 'Hayvan' },
    'Örümcek': { emoji: '🕷️', category: 'Hayvan' },
    'Örümcek Adam': { emoji: '🕷️', category: 'Fantezi' },
    'Ağ': { emoji: '🕸️', category: 'Hayvan' },
    'Arı Kovanı': { emoji: '🐝', category: 'Hayvan' },
    'Kaçış': { emoji: '🏃', category: 'Espri' },
    'Karınca Kolonisi': { emoji: '🐜', category: 'Hayvan' },
    'Karınca İmparatorluğu': { emoji: '🏛️', category: 'Hayvan' },
    'Verimli Toprak': { emoji: '🌱', category: 'Doğa' },
    'Işık Gösterisi': { emoji: '✨', category: 'Espri' },
    'Kelebek Göçü': { emoji: '🌈', category: 'Hayvan' },
    'Süper Hamam Böceği': { emoji: '🪳', category: 'Espri' },
    'Köpekbalığı': { emoji: '🦈', category: 'Hayvan' },
    'Elektrikli Yılan Balığı': { emoji: '⚡', category: 'Hayvan' },
    'Ahtapot': { emoji: '🐙', category: 'Hayvan' },
    'Penguen': { emoji: '🐧', category: 'Hayvan' },
    'Fener Balığı': { emoji: '🐡', category: 'Hayvan' },
    'Palyaço Balığı': { emoji: '🐠', category: 'Hayvan' },
    'Deniz Kabuğu': { emoji: '🐚', category: 'Hayvan' },
    'İnci': { emoji: '🐚', category: 'Kaynak' },
    'Yüzük': { emoji: '💍', category: 'Kaynak' },
    'Sharknado': { emoji: '🦈', category: 'Espri' },
    'Dahi Ahtapot': { emoji: '🐙', category: 'Hayvan' },
    'Yosun': { emoji: '🌊', category: 'Bitki' },
    'Mercan': { emoji: '🪸', category: 'Hayvan' },
    'Mercan Resifi': { emoji: '🏝️', category: 'Doğa' },
    'Ölü Resif': { emoji: '💀', category: 'Doğa' },
    'Dev Kalamar': { emoji: '🦑', category: 'Hayvan' },
    'Penguen Kolonisi': { emoji: '🐧', category: 'Hayvan' },
    'Yunus': { emoji: '🐬', category: 'Hayvan' },
    'Dostluk': { emoji: '🤝', category: 'Medeniyet' },
    'Balina': { emoji: '🐋', category: 'Hayvan' },
    'Balina Şarkısı': { emoji: '🎵', category: 'Hayvan' },
    'Kurbağa': { emoji: '🐸', category: 'Hayvan' },
    'Kertenkele': { emoji: '🦎', category: 'Hayvan' },
    'Prens': { emoji: '🤴', category: 'Fantezi' },
    'Yılan': { emoji: '🐍', category: 'Hayvan' },
    'Bukalemun': { emoji: '🦎', category: 'Hayvan' },
    'Kobra': { emoji: '🐍', category: 'Hayvan' },
    'Medusa': { emoji: '🐍', category: 'Fantezi' },
    'Kartal': { emoji: '🦅', category: 'Hayvan' },
    'Phoenix': { emoji: '🦅', category: 'Fantezi' },
    'Baykuş': { emoji: '🦉', category: 'Hayvan' },
    'Ördek': { emoji: '🦆', category: 'Hayvan' },
    'Papağan': { emoji: '🦜', category: 'Hayvan' },
    'Şahin': { emoji: '🦅', category: 'Hayvan' },
    'Taklit': { emoji: '🗣️', category: 'Espri' },
    'Kurt': { emoji: '🐺', category: 'Hayvan' },
    'Köpek': { emoji: '🐕', category: 'Hayvan' },
    'Sürü': { emoji: '🐺', category: 'Hayvan' },
    'Alfa Kurt': { emoji: '🐺', category: 'Hayvan' },
    'At': { emoji: '🐴', category: 'Hayvan' },
    'Su Aygırı': { emoji: '🦛', category: 'Hayvan' },
    'Unicorn': { emoji: '🦄', category: 'Fantezi' },
    'Zırhlı At': { emoji: '🏇', category: 'Fantezi' },
    'Süvari': { emoji: '🏇', category: 'Medeniyet' },
    'En İyi Arkadaş': { emoji: '🐕', category: 'Hayvan' },
    'Husky': { emoji: '🐕‍🦺', category: 'Hayvan' },
    'Kaniş': { emoji: '🐩', category: 'Hayvan' },
    'Köpek Çiftliği': { emoji: '🐕', category: 'Hayvan' },
    'Koyun': { emoji: '🐑', category: 'Hayvan' },
    'Sürü': { emoji: '🐑', category: 'Hayvan' },
    'Yün': { emoji: '🧶', category: 'Hayvan' },
    'Çoban': { emoji: '🧑‍🌾', category: 'Medeniyet' },
    'Çoban Çayı': { emoji: '🫖', category: 'Yemek' },
    'İnek': { emoji: '🐄', category: 'Hayvan' },
    'Süt': { emoji: '🥛', category: 'Yemek' },
    'Yarasa': { emoji: '🦇', category: 'Hayvan' },
    'Batman': { emoji: '🦇', category: 'Fantezi' },
    'Dracula': { emoji: '🧛', category: 'Fantezi' },
    'Akrep': { emoji: '🦂', category: 'Hayvan' },
    'Burç': { emoji: '♏', category: 'Espri' },
    'Kutup Ayısı': { emoji: '🐻‍❄️', category: 'Hayvan' },
    'Ayı': { emoji: '🐻', category: 'Hayvan' },
    'Winnie': { emoji: '🍯', category: 'Espri' },
    'Aslan': { emoji: '🦁', category: 'Hayvan' },
    'Ormanın Kralı': { emoji: '👑', category: 'Hayvan' },
    'Aslan Sürüsü': { emoji: '🦁', category: 'Hayvan' },
    'Timsah': { emoji: '🐊', category: 'Hayvan' },
    'Dinozor': { emoji: '🦕', category: 'Yaşam' },
    'Tavuk': { emoji: '🐔', category: 'Hayvan' },
    'Civciv': { emoji: '🐣', category: 'Hayvan' },
    'Fosil': { emoji: '🦴', category: 'Yaşam' },
    'Petrol': { emoji: '⛽', category: 'Yaşam' },
    'Müze': { emoji: '🏛️', category: 'Medeniyet' },
    'Patlama': { emoji: '💥', category: 'Yaşam' },
    'Fabrika': { emoji: '🏭', category: 'Kaynak' },
    'Çevre Felaketi': { emoji: '🛢️', category: 'Kaynak' },
    'Mamut': { emoji: '🦣', category: 'Yaşam' },
    'Dondurulmuş Mamut': { emoji: '🧊', category: 'Yaşam' },
    'Canlanmış Mamut': { emoji: '🦣', category: 'Fantezi' },
    'İnsan': { emoji: '👤', category: 'Medeniyet' },
    'Aşk': { emoji: '❤️', category: 'Medeniyet' },
    'Bebek': { emoji: '👶', category: 'Medeniyet' },
    'Ayrılık': { emoji: '💔', category: 'Medeniyet' },
    'Evlilik': { emoji: '💒', category: 'Medeniyet' },
    'Aile': { emoji: '👨‍👩‍👧‍👦', category: 'Medeniyet' },
    'Yuva': { emoji: '🏡', category: 'Medeniyet' },
    'Öğrenci': { emoji: '🎓', category: 'Medeniyet' },
    'Mezun': { emoji: '🧑‍💼', category: 'Medeniyet' },
    'Stres': { emoji: '😰', category: 'Espri' },
    'Ders Çalışma Gücü': { emoji: '💪', category: 'Espri' },
    'Aşçı': { emoji: '🍳', category: 'Medeniyet' },
    'Kılıç': { emoji: '⚔️', category: 'Medeniyet' },
    'Ev': { emoji: '🏠', category: 'Medeniyet' },
    'Çiftçi': { emoji: '👨‍🌾', category: 'Medeniyet' },
    'Balıkçı': { emoji: '🎣', category: 'Medeniyet' },
    'Denizci': { emoji: '⚓', category: 'Medeniyet' },
    'Bilim İnsanı': { emoji: '🧑‍🔬', category: 'Medeniyet' },
    'Büyücü': { emoji: '🧙', category: 'Fantezi' },
    'Savaşçı': { emoji: '⚔️', category: 'Medeniyet' },
    'Şarkıcı': { emoji: '🎤', category: 'Sanat' },
    'Ressam': { emoji: '🎨', category: 'Sanat' },
    'Yönetmen': { emoji: '🎬', category: 'Sanat' },
    'Sporcu': { emoji: '🏃', category: 'Medeniyet' },
    'Dağcı': { emoji: '🧗', category: 'Medeniyet' },
    'Pilot': { emoji: '✈️', category: 'Medeniyet' },
    'Doktor': { emoji: '👨‍⚕️', category: 'Medeniyet' },
    'Avukat': { emoji: '⚖️', category: 'Medeniyet' },
    'Bankacı': { emoji: '🏦', category: 'Medeniyet' },
    'Yüzücü': { emoji: '🏊', category: 'Medeniyet' },
    'Futbolcu': { emoji: '⚽', category: 'Medeniyet' },
    'Şampiyon': { emoji: '🏆', category: 'Medeniyet' },
    'Köy': { emoji: '🏘️', category: 'Medeniyet' },
    'Şehir': { emoji: '🏙️', category: 'Medeniyet' },
    'Metropol': { emoji: '🌆', category: 'Medeniyet' },
    'Ülke': { emoji: '🌍', category: 'Medeniyet' },
    'Dünya Birliği': { emoji: '🌐', category: 'Medeniyet' },
    'Gece Hayatı': { emoji: '🌃', category: 'Medeniyet' },
    'Trafik': { emoji: '🚦', category: 'Teknoloji' },
    'Köprü': { emoji: '🌉', category: 'Medeniyet' },
    'Havalimanı': { emoji: '🛫', category: 'Medeniyet' },
    'İstasyon': { emoji: '🚉', category: 'Medeniyet' },
    'Hamur': { emoji: '🫓', category: 'Yemek' },
    'Ekmek': { emoji: '🍞', category: 'Yemek' },
    'Sandviç': { emoji: '🥪', category: 'Yemek' },
    'Baget': { emoji: '🥖', category: 'Yemek' },
    'Tost': { emoji: '🍞', category: 'Yemek' },
    'Peynir': { emoji: '🧀', category: 'Yemek' },
    'Dondurma': { emoji: '🍦', category: 'Yemek' },
    'Puding': { emoji: '🍮', category: 'Yemek' },
    'Latte': { emoji: '☕', category: 'Yemek' },
    'Sütlü Çikolata': { emoji: '🍫', category: 'Yemek' },
    'Sahanda Yumurta': { emoji: '🍳', category: 'Yemek' },
    'Krep': { emoji: '🥞', category: 'Yemek' },
    'Tavuk But': { emoji: '🍗', category: 'Yemek' },
    'Mantı': { emoji: '🥟', category: 'Yemek' },
    'Pizza': { emoji: '🍕', category: 'Yemek' },
    'Börek': { emoji: '🥟', category: 'Yemek' },
    'Donut': { emoji: '🍩', category: 'Yemek' },
    'Baklava': { emoji: '🥐', category: 'Yemek' },
    'Fırın': { emoji: '🍞', category: 'Yemek' },
    'Biftek': { emoji: '🥩', category: 'Yemek' },
    'Döner': { emoji: '🍖', category: 'Yemek' },
    'Dürüm': { emoji: '🌯', category: 'Yemek' },
    'İskender': { emoji: '🌯', category: 'Yemek' },
    'Gıda Koması': { emoji: '😴', category: 'Yemek' },
    'Patlamış Mısır': { emoji: '🍿', category: 'Yemek' },
    'Haşlama Mısır': { emoji: '🌽', category: 'Yemek' },
    'Şekerleme': { emoji: '🍭', category: 'Yemek' },
    'Karamel': { emoji: '🍮', category: 'Yemek' },
    'Lokum': { emoji: '🍬', category: 'Yemek' },
    'Kurabiye': { emoji: '🍪', category: 'Yemek' },
    'Bitter Çikolata': { emoji: '🍫', category: 'Yemek' },
    'Pilav': { emoji: '🍚', category: 'Yemek' },
    'Tavuklu Pilav': { emoji: '🍛', category: 'Yemek' },
    'Çeşni': { emoji: '🍋', category: 'Yemek' },
    'Sundae': { emoji: '🍨', category: 'Yemek' },
    'Sıcak Su': { emoji: '🫖', category: 'Yemek' },
    'Çay': { emoji: '🍵', category: 'Yemek' },
    'Sütlü Çay': { emoji: '🫖', category: 'Yemek' },
    'Buzlu Çay': { emoji: '🧊', category: 'Yemek' },
    'Limonlu Çay': { emoji: '🍋', category: 'Yemek' },
    'Tatlı Çay': { emoji: '🍵', category: 'Yemek' },
    'Rize Çayı': { emoji: '🫖', category: 'Yemek' },
    'Meyve Suyu': { emoji: '🧃', category: 'Yemek' },
    'Kokteyl': { emoji: '🍹', category: 'Yemek' },
    'Bira': { emoji: '🍺', category: 'Yemek' },
    'Şarap': { emoji: '🍷', category: 'Yemek' },
    'Viski': { emoji: '🥃', category: 'Yemek' },
    'Kahve': { emoji: '☕', category: 'Yemek' },
    'Frappuccino': { emoji: '🧋', category: 'Yemek' },
    'Uykusuzluk': { emoji: '😵', category: 'Espri' },
    'Hindistan Cevizi Suyu': { emoji: '🥥', category: 'Yemek' },
    'Limonata': { emoji: '🍋', category: 'Yemek' },
    'Çark': { emoji: '⚙️', category: 'Teknoloji' },
    'Makine': { emoji: '🤖', category: 'Teknoloji' },
    'Pil': { emoji: '🔋', category: 'Teknoloji' },
    'Ampul': { emoji: '💡', category: 'Teknoloji' },
    'Işık': { emoji: '💡', category: 'Teknoloji' },
    'Lens': { emoji: '🔍', category: 'Teknoloji' },
    'Teleskop': { emoji: '🔭', category: 'Teknoloji' },
    'Kamera': { emoji: '📸', category: 'Teknoloji' },
    'Uzaylı': { emoji: '👽', category: 'Teknoloji' },
    'Çip': { emoji: '💻', category: 'Teknoloji' },
    'Bilgisayar': { emoji: '💻', category: 'Teknoloji' },
    'Telefon': { emoji: '📱', category: 'Teknoloji' },
    'İnternet': { emoji: '🌐', category: 'Teknoloji' },
    'Sosyal Medya': { emoji: '📱', category: 'Teknoloji' },
    'Bağımlılık': { emoji: '🤯', category: 'Teknoloji' },
    'Wikipedia': { emoji: '📚', category: 'Teknoloji' },
    'Kargo': { emoji: '📦', category: 'Teknoloji' },
    'Kayıp Kargo': { emoji: '📦', category: 'Espri' },
    'Ekran Bağımlılığı': { emoji: '📵', category: 'Teknoloji' },
    'Uçak': { emoji: '✈️', category: 'Teknoloji' },
    'Gemi': { emoji: '🚢', category: 'Teknoloji' },
    'Araba': { emoji: '🚗', category: 'Teknoloji' },
    'Tren': { emoji: '🚂', category: 'Teknoloji' },
    'Roket': { emoji: '🚀', category: 'Teknoloji' },
    'Uzay Gemisi': { emoji: '🛸', category: 'Teknoloji' },
    'Trafik': { emoji: '🚦', category: 'Teknoloji' },
    'Tesla': { emoji: '🔋', category: 'Teknoloji' },
    'Otonom Araba': { emoji: '🤖', category: 'Teknoloji' },
    'Havalimanı': { emoji: '🛫', category: 'Teknoloji' },
    'Saat': { emoji: '⏰', category: 'Teknoloji' },
    'Elektrik': { emoji: '⚡', category: 'Teknoloji' },
    'Radyo': { emoji: '📻', category: 'Teknoloji' },
    'Televizyon': { emoji: '📺', category: 'Teknoloji' },
    'Netflix': { emoji: '📺', category: 'Teknoloji' },
    'Kanepe': { emoji: '🛋️', category: 'Espri' },
    'Film': { emoji: '🎬', category: 'Teknoloji' },
    'Hollywood': { emoji: '🎬', category: 'Teknoloji' },
    'YouTube': { emoji: '📹', category: 'Teknoloji' },
    'YouTuber': { emoji: '🎙️', category: 'Teknoloji' },
    'Sponsor': { emoji: '💰', category: 'Espri' },
    'Büyü': { emoji: '✨', category: 'Fantezi' },
    'İksir': { emoji: '🧪', category: 'Fantezi' },
    'Kehanet': { emoji: '🔮', category: 'Fantezi' },
    'Asa': { emoji: '🪄', category: 'Fantezi' },
    'Büyülü Yüzük': { emoji: '💍', category: 'Fantezi' },
    'Excalibur': { emoji: '⚔️', category: 'Fantezi' },
    'Süpürge': { emoji: '🧹', category: 'Fantezi' },
    'Zombi': { emoji: '🧟', category: 'Fantezi' },
    'Vampir': { emoji: '🧛', category: 'Fantezi' },
    'Kül': { emoji: '💀', category: 'Fantezi' },
    'Hayalet': { emoji: '👻', category: 'Fantezi' },
    'Perili Ev': { emoji: '🏚️', category: 'Fantezi' },
    'Ejderha Nefesi': { emoji: '🔥', category: 'Fantezi' },
    'Evcil Ejderha': { emoji: '🐲', category: 'Fantezi' },
    'Ejderha Zırhı': { emoji: '🛡️', category: 'Fantezi' },
    'Büyücü Kulesi': { emoji: '🌟', category: 'Fantezi' },
    'Yeniden Doğuş': { emoji: '🔥', category: 'Fantezi' },
    'Büyü Kitabı': { emoji: '📕', category: 'Sanat' },
    'Kristal Küre': { emoji: '🔮', category: 'Fantezi' },
    'Peri': { emoji: '🧚', category: 'Fantezi' },
    'Unicorn': { emoji: '🦄', category: 'Fantezi' },
    'Zombi Salgını': { emoji: '🧟‍♂️', category: 'Fantezi' },
    'Ölümsüzlük İksiri': { emoji: '💫', category: 'Fantezi' },
    'Süper Güç': { emoji: '💪', category: 'Fantezi' },
    'Vampir': { emoji: '🧛', category: 'Fantezi' },
    'Kül': { emoji: '💀', category: 'Fantezi' },
    'Twilight': { emoji: '🧛', category: 'Espri' },
    'Kaçan Vampir': { emoji: '🏃', category: 'Fantezi' },
    'Perili Ev': { emoji: '🏚️', category: 'Fantezi' },
    'Poltergeist': { emoji: '👻', category: 'Fantezi' },
    'Korku': { emoji: '😱', category: 'Fantezi' },
    'Evcil Ejderha': { emoji: '🐲', category: 'Fantezi' },
    'Ejderha Zırhı': { emoji: '🛡️', category: 'Fantezi' },
    'Ejderha Nefesi': { emoji: '🔥', category: 'Fantezi' },
    'Ejderha İni': { emoji: '🐉', category: 'Fantezi' },
    'Yeniden Doğuş': { emoji: '🔥', category: 'Fantezi' },
    'Büyücü Kulesi': { emoji: '🌟', category: 'Fantezi' },
    'Ejderha Süvarisi': { emoji: '🐉', category: 'Fantezi' },
    'Büyülü Orman': { emoji: '🌲', category: 'Fantezi' },
    'Dilek': { emoji: '✨', category: 'Fantezi' },
    'Uçan Cadı': { emoji: '🧙‍♀️', category: 'Fantezi' },
    'Efsane Savaşı': { emoji: '⚔️', category: 'Fantezi' },
    'Arthur': { emoji: '👑', category: 'Fantezi' },
    'Müzik': { emoji: '🎵', category: 'Sanat' },
    'Trompet': { emoji: '🎺', category: 'Sanat' },
    'Gitar': { emoji: '🎸', category: 'Sanat' },
    'Elektro Gitar': { emoji: '🎸', category: 'Sanat' },
    'Heavy Metal': { emoji: '🤘', category: 'Sanat' },
    'Nota': { emoji: '🎼', category: 'Sanat' },
    'Rock': { emoji: '🎸', category: 'Sanat' },
    'Elektronik Müzik': { emoji: '🎧', category: 'Sanat' },
    'Blues': { emoji: '🎷', category: 'Sanat' },
    'Salsa': { emoji: '💃', category: 'Sanat' },
    'Şarkıcı': { emoji: '🎤', category: 'Sanat' },
    'Konser': { emoji: '🎤', category: 'Sanat' },
    'Festival': { emoji: '🎪', category: 'Sanat' },
    'Kalem': { emoji: '✏️', category: 'Sanat' },
    'Yazı': { emoji: '📝', category: 'Sanat' },
    'Kitap': { emoji: '📖', category: 'Sanat' },
    'Kütüphane': { emoji: '📚', category: 'Sanat' },
    'Büyü Kitabı': { emoji: '📕', category: 'Sanat' },
    'Bilgi': { emoji: '🧠', category: 'Medeniyet' },
    'Bilgelik': { emoji: '🎓', category: 'Medeniyet' },
    'Fırça': { emoji: '🎨', category: 'Sanat' },
    'Tablo': { emoji: '🎨', category: 'Sanat' },
    'Galeri': { emoji: '🏛️', category: 'Sanat' },
    'Dansçı': { emoji: '💃', category: 'Sanat' },
    'Bale': { emoji: '🩰', category: 'Sanat' },
    'Heykel': { emoji: '🗿', category: 'Sanat' },
    'Kömür': { emoji: '⬛', category: 'Kaynak' },
    'Çelik': { emoji: '🔩', category: 'Kaynak' },
    'Güçlü Ateş': { emoji: '🔥', category: 'Kaynak' },
    'Odun': { emoji: '🪵', category: 'Kaynak' },
    'Altın': { emoji: '🥇', category: 'Kaynak' },
    'Taç': { emoji: '👑', category: 'Kaynak' },
    'Kral': { emoji: '👑', category: 'Kaynak' },
    'Krallık': { emoji: '🏰', category: 'Kaynak' },
    'İnci': { emoji: '🐚', category: 'Kaynak' },
    'Yüzük': { emoji: '💍', category: 'Kaynak' },
    'Fabrika': { emoji: '🏭', category: 'Kaynak' },
    'Sanayi': { emoji: '🏙️', category: 'Kaynak' },
    'Kirlilik': { emoji: '🌫️', category: 'Kaynak' },
    'Asit Yağmuru': { emoji: '☣️', category: 'Kaynak' },
    'Küresel Isınma': { emoji: '🌡️', category: 'Kaynak' },
    'Dalga': { emoji: '🌊', category: 'Doğa' },
    'Tsunami': { emoji: '🌊', category: 'Doğa' },
    'Deprem': { emoji: '🫨', category: 'Doğa' },
    'Yıkım': { emoji: '🏚️', category: 'Doğa' },
    'Kül Bulutu': { emoji: '🌫️', category: 'Doğa' },
    'Tayfun': { emoji: '🌀', category: 'Doğa' },
    'Sıcak Hava': { emoji: '🥵', category: 'Doğa' },
    'Tipi': { emoji: '❄️', category: 'Doğa' },
    'Kardan Adam': { emoji: '⛄', category: 'Doğa' },
    'Gözyaşı': { emoji: '💧', category: 'Doğa' },
    'Kanepe': { emoji: '🛋️', category: 'Espri' },
    'Couch Potato': { emoji: '🥔', category: 'Espri' },
    'Uykusuzluk': { emoji: '😵', category: 'Espri' },
    'Süper İnsan': { emoji: '💪', category: 'Espri' },
    'Meme': { emoji: '😺', category: 'Espri' },
    'Viral': { emoji: '🤣', category: 'Espri' },
    'Grip': { emoji: '🤧', category: 'Espri' },
    'İyileşme': { emoji: '💪', category: 'Espri' },
    'Sinir Krizi': { emoji: '😤', category: 'Espri' },
    "Ay'a Yolculuk": { emoji: '🚀', category: 'Espri' },
    'İstila': { emoji: '🛸', category: 'Espri' },
    'Zombi Salgını': { emoji: '🧟‍♂️', category: 'Espri' },
    'Twilight': { emoji: '🧛', category: 'Espri' },
    'Skynet': { emoji: '🌐', category: 'Espri' },
    'Claude': { emoji: '🤝', category: 'Espri' },
    'Kedi': { emoji: '🐱', category: 'Hayvan' },
};

// ============================================
// COMBINATION RECIPES (from .md)
// ============================================
const RECIPES = [
    // Temel Birleşimler
    ['Su', 'Ateş', 'Buhar'],
    ['Su', 'Toprak', 'Çamur'],
    ['Su', 'Hava', 'Yağmur'],
    ['Ateş', 'Toprak', 'Lav'],
    ['Ateş', 'Hava', 'Enerji'],
    ['Toprak', 'Hava', 'Toz'],
    ['Su', 'Su', 'Göl'],
    ['Ateş', 'Ateş', 'Alev Topu'],
    ['Toprak', 'Toprak', 'Taş'],
    ['Hava', 'Hava', 'Rüzgar'],

    // Doğa & Coğrafya
    ['Lav', 'Su', 'Obsidyen'],
    ['Lav', 'Hava', 'Taş'],
    ['Lav', 'Toprak', 'Volkan'],
    ['Çamur', 'Ateş', 'Tuğla'],
    ['Çamur', 'Su', 'Bataklık'],
    ['Çamur', 'Hava', 'Kil'],
    ['Taş', 'Taş', 'Dağ'],
    ['Taş', 'Su', 'Kum'],
    ['Taş', 'Ateş', 'Metal'],
    ['Taş', 'Hava', 'Toz'],
    ['Kum', 'Ateş', 'Cam'],
    ['Kum', 'Su', 'Ada'],
    ['Kum', 'Rüzgar', 'Çöl'],
    ['Dağ', 'Su', 'Nehir'],
    ['Dağ', 'Dağ', 'Sıradağlar'],
    ['Dağ', 'Kar', 'Everest'],
    ['Dağ', 'Ateş', 'Volkan'],
    ['Göl', 'Göl', 'Deniz'],
    ['Deniz', 'Deniz', 'Okyanus'],
    ['Nehir', 'Nehir', 'Deniz'],
    ['Yağmur', 'Dağ', 'Şelale'],
    ['Yağmur', 'Yağmur', 'Sel'],
    ['Buhar', 'Hava', 'Bulut'],
    ['Bulut', 'Su', 'Yağmur'],
    ['Bulut', 'Enerji', 'Fırtına'],
    ['Bulut', 'Bulut', 'Fırtına'],
    ['Bulut', 'Soğuk', 'Kar'],
    ['Fırtına', 'Su', 'Sel'],
    ['Fırtına', 'Enerji', 'Yıldırım'],
    ['Yağmur', 'Güneş', 'Gökkuşağı'],
    ['Su', 'Soğuk', 'Buz'],
    ['Buz', 'Buz', 'Buzdağı'],
    ['Buz', 'Deniz', 'Buzdağı'],
    ['Obsidyen', 'Enerji', 'Kristal'],
    ['Kristal', 'Enerji', 'Elmas'],
    ['Kristal', 'Ateş', 'Yakut'],
    ['Kristal', 'Su', 'Safir'],
    ['Hava', 'Buz', 'Soğuk'],
    ['Rüzgar', 'Su', 'Dalga'],
    ['Dalga', 'Dalga', 'Tsunami'],
    ['Fırtına', 'Deniz', 'Tsunami'],
    ['Toprak', 'Enerji', 'Deprem'],
    ['Deprem', 'Deniz', 'Tsunami'],
    ['Deprem', 'Şehir', 'Yıkım'],
    ['Volkan', 'Hava', 'Kül Bulutu'],
    ['Kasırga', 'Su', 'Tayfun'],
    ['Güneş', 'Çöl', 'Sıcak Hava'],
    ['Kar', 'Rüzgar', 'Tipi'],
    ['Kar', 'İnsan', 'Kardan Adam'],
    ['Kardan Adam', 'Ateş', 'Gözyaşı'],
    ['Buz', 'Güneş', 'Su'],

    // Hava & Uzay
    ['Rüzgar', 'Rüzgar', 'Kasırga'],
    ['Rüzgar', 'Enerji', 'Kasırga'],
    ['Enerji', 'Enerji', 'Güneş'],
    ['Güneş', 'Hava', 'Gündüz'],
    ['Gündüz', 'Gündüz', 'Zaman'],
    ['Bulut', 'Gündüz', 'Güzel Hava'],
    ['Hava', 'Enerji', 'Plazma'],
    ['Güneş', 'Taş', 'Meteor'],
    ['Güneş', 'Güneş', 'Yıldız'],
    ['Yıldız', 'Yıldız', 'Galaksi'],
    ['Galaksi', 'Galaksi', 'Karadelik'],
    ['Güneş', 'Toprak', 'Gezegen'],
    ['Gezegen', 'Hava', 'Dünya'],
    ['Göl', 'Gece', 'Ay'],
    ['Gündüz', 'Karanlık', 'Tutulma'],
    ['Güneş', 'Gece', 'Tutulma'],

    // Zaman & Gece-Gündüz
    ['Güneş', 'Su', 'Gün Batımı'],
    ['Gün Batımı', 'Hava', 'Gece'],
    ['Gece', 'Gece', 'Karanlık'],
    ['Gece', 'Enerji', 'Ay'],
    ['Ay', 'Su', 'Gelgit'],
    ['Ay', 'Kurt', 'Kurtadam'],
    ['Gece', 'İnsan', 'Uyku'],
    ['Uyku', 'Uyku', 'Rüya'],
    ['Rüya', 'Enerji', 'Fikir'],
    ['Karanlık', 'Karanlık', 'Hayalet'],
    ['Zaman', 'İnsan', 'Yaşlı'],
    ['Zaman', 'Taş', 'Fosil'],
    ['Zaman', 'Zaman', 'Sonsuzluk'],

    // Bitkiler
    ['Toprak', 'Yağmur', 'Filiz'],
    ['Filiz', 'Su', 'Bitki'],
    ['Filiz', 'Zaman', 'Bitki'],
    ['Bitki', 'Su', 'Ağaç'],
    ['Bitki', 'Güneş', 'Çiçek'],
    ['Bitki', 'Toprak', 'Buğday'],
    ['Bitki', 'Bataklık', 'Mantar'],
    ['Çiçek', 'Çiçek', 'Ayçiçeği'],
    ['Çiçek', 'Arı', 'Bal'],
    ['Ağaç', 'Ağaç', 'Orman'],
    ['Ağaç', 'Ateş', 'Kütük'],
    ['Ağaç', 'Metal', 'Kağıt'],
    ['Orman', 'Orman', 'Yağmur Ormanı'],
    ['Orman', 'Karanlık', 'Perili Orman'],
    ['Buğday', 'Taş', 'Un'],
    ['Mantar', 'Mantar', 'Mega Mantar'],
    ['Bitki', 'Çöl', 'Kaktüs'],
    ['Kaktüs', 'Su', 'Aloe Vera'],
    ['Toprak', 'Bitki', 'Odun'],

    // Hayvanlar — Küçükler
    ['Çamur', 'Hayat', 'Böcek'],
    ['Su', 'Hayat', 'Balık'],
    ['Hava', 'Hayat', 'Kuş'],
    ['Toprak', 'Hayat', 'Solucan'],
    ['Bitki', 'Böcek', 'Tırtıl'],
    ['Tırtıl', 'Hava', 'Kelebek'],
    ['Tırtıl', 'Zaman', 'Kelebek'],
    ['Böcek', 'Çiçek', 'Arı'],
    ['Böcek', 'Bitki', 'Karınca'],
    ['Böcek', 'Gece', 'Ateş Böceği'],
    ['Balık', 'Balık', 'Köpekbalığı'],
    ['Balık', 'Enerji', 'Elektrikli Yılan Balığı'],
    ['Balık', 'Deniz', 'Ahtapot'],
    ['Balık', 'Buz', 'Penguen'],
    ['Su', 'Kurbağa', 'Timsah'],

    // Hayvanlar — Büyükler
    ['Bataklık', 'Hayat', 'Kurbağa'],
    ['Kurbağa', 'Ateş', 'Kertenkele'],
    ['Kertenkele', 'Enerji', 'Yılan'],
    ['Kuş', 'Kuş', 'Kartal'],
    ['Kuş', 'Ateş', 'Phoenix'],
    ['Kuş', 'Buz', 'Penguen'],
    ['Kuş', 'Gece', 'Baykuş'],
    ['Orman', 'Hayat', 'Kurt'],
    ['İnsan', 'Kurt', 'Köpek'],
    ['İnsan', 'Orman', 'Köpek'],
    ['Toprak', 'Hayat', 'At'],
    ['At', 'Su', 'Su Aygırı'],
    ['At', 'Boynuz', 'Unicorn'],
    ['Orman', 'Büyü', 'Unicorn'],
    ['Kertenkele', 'Alev Topu', 'Ejderha'],
    ['Yılan', 'Enerji', 'Ejderha'],
    ['Bitki', 'Hayat', 'Koyun'],
    ['Koyun', 'Su', 'Yün'],
    ['Böcek', 'İpek', 'Örümcek'],
    ['Karınca', 'Karınca', 'Karınca Kolonisi'],
    ['Kuş', 'Toprak', 'Yumurta'],
    ['Yumurta', 'Ateş', 'Tavuk'],
    ['Yumurta', 'Zaman', 'Civciv'],
    ['Tavuk', 'Tavuk', 'Yumurta'],

    // Hayat & Evrim
    ['Enerji', 'Çamur', 'Hayat'],
    ['Enerji', 'Su', 'Hayat'],
    ['Yıldırım', 'Göl', 'Hayat'],
    ['Hayat', 'Toprak', 'Filiz'],
    ['Hayat', 'Zaman', 'Dinozor'],
    ['Dinozor', 'Meteor', 'Fosil'],
    ['Dinozor', 'Buz', 'Fosil'],
    ['Dinozor', 'Zaman', 'Tavuk'],
    ['Fosil', 'Enerji', 'Petrol'],
    ['Petrol', 'Ateş', 'Patlama'],

    // İnsan & Medeniyet
    ['Hayat', 'Kil', 'İnsan'],
    ['Hayat', 'Toprak', 'İnsan'],
    ['İnsan', 'İnsan', 'Aşk'],
    ['Aşk', 'Aşk', 'Bebek'],
    ['Aşk', 'Zaman', 'Ayrılık'],
    ['İnsan', 'Metal', 'Kılıç'],
    ['İnsan', 'Ağaç', 'Ev'],
    ['İnsan', 'Taş', 'Ev'],
    ['İnsan', 'Buğday', 'Çiftçi'],
    ['İnsan', 'Ateş', 'Aşçı'],
    ['İnsan', 'Balık', 'Balıkçı'],
    ['İnsan', 'Deniz', 'Gemici'],
    ['İnsan', 'At', 'Süvari'],
    ['İnsan', 'Bilgi', 'Bilim İnsanı'],
    ['İnsan', 'Büyü', 'Büyücü'],
    ['İnsan', 'Kılıç', 'Savaşçı'],
    ['Ev', 'Ev', 'Köy'],
    ['Köy', 'Köy', 'Şehir'],
    ['Şehir', 'Şehir', 'Metropol'],
    ['Metropol', 'Metropol', 'Ülke'],
    ['Ülke', 'Ülke', 'Dünya Birliği'],
    ['İnsan', 'Enerji', 'Sporcu'],
    ['Sporcu', 'Su', 'Yüzücü'],

    // Yemek & Mutfak
    ['Buğday', 'Su', 'Hamur'],
    ['Hamur', 'Ateş', 'Ekmek'],
    ['Un', 'Su', 'Hamur'],
    ['Ekmek', 'Peynir', 'Sandviç'],
    ['Süt', 'Ateş', 'Peynir'],
    ['Süt', 'Buz', 'Dondurma'],
    ['Süt', 'Çikolata', 'Sütlü Çikolata'],
    ['Yumurta', 'Ateş', 'Sahanda Yumurta'],
    ['Tavuk', 'Ateş', 'Tavuk But'],
    ['Su', 'Çay Yaprağı', 'Çay'],
    ['Çay', 'Buz', 'Buzlu Çay'],
    ['Buğday', 'Güneş', 'Mısır'],
    ['Mısır', 'Ateş', 'Patlamış Mısır'],
    ['Hamur', 'Peynir', 'Pizza'],
    ['Şeker', 'Su', 'Şekerleme'],
    ['Şeker', 'Ateş', 'Karamel'],
    ['Bal', 'Hamur', 'Baklava'],
    ['Çikolata', 'Hamur', 'Kurabiye'],
    ['Bitki', 'Su', 'Süt'],
    ['Bitki', 'Güneş', 'Şeker'],
    ['Bitki', 'Ateş', 'Çay Yaprağı'],
    ['Kahve Çekirdeği', 'Su', 'Kahve'],
    ['Kahve', 'Süt', 'Latte'],
    ['Çay', 'Süt', 'Sütlü Çay'],
    ['Çay', 'Buz', 'Ice Tea'],
    ['Pizza', 'Pizza', 'Mega Pizza'],
    ['Mega Pizza', 'İnsan', 'Gıda Koması'],
    ['Aşçı', 'Ateş', 'Masterchef'],
    ['Buğday', 'Su', 'Bira'],
    ['Çiçek', 'Su', 'Meyve Suyu'],
    ['Meyve Suyu', 'Buz', 'Kokteyl'],
    ['Kahve', 'Kahve', 'Uykusuzluk'],
    ['İnsan', 'Kahve', 'Süper İnsan'],

    // Teknoloji
    ['Metal', 'Metal', 'Çark'],
    ['Çark', 'Çark', 'Makine'],
    ['Çark', 'Enerji', 'Makine'],
    ['Metal', 'Enerji', 'Pil'],
    ['Cam', 'Metal', 'Ampul'],
    ['Ampul', 'Enerji', 'Işık'],
    ['Işık', 'Cam', 'Lens'],
    ['Lens', 'Lens', 'Teleskop'],
    ['Lens', 'Metal', 'Kamera'],
    ['Teleskop', 'Yıldız', 'Uzaylı'],
    ['Kum', 'Enerji', 'Çip'],
    ['Çip', 'Çip', 'Bilgisayar'],
    ['Çip', 'Metal', 'Telefon'],
    ['Bilgisayar', 'Bilgisayar', 'İnternet'],
    ['İnternet', 'İnsan', 'Sosyal Medya'],
    ['Sosyal Medya', 'Sosyal Medya', 'Bağımlılık'],
    ['İnternet', 'Bilgi', 'Wikipedia'],
    ['Makine', 'Hava', 'Uçak'],
    ['Makine', 'Su', 'Gemi'],
    ['Makine', 'Toprak', 'Araba'],
    ['Araba', 'Araba', 'Trafik'],
    ['Araba', 'Enerji', 'Roket'],
    ['Roket', 'Uzay', 'Uzay Gemisi'],
    ['Metal', 'Buhar', 'Tren'],
    ['Enerji', 'Çark', 'Saat'],
    ['Pil', 'Metal', 'Elektrik'],
    ['Elektrik', 'Hava', 'Radyo'],
    ['Radyo', 'Cam', 'Televizyon'],
    ['Televizyon', 'İnternet', 'Netflix'],
    ['Kamera', 'İnsan', 'Film'],
    ['Metal', 'Hayat', 'Robot'],
    ['Robot', 'Bilgisayar', 'Yapay Zeka'],
    ['Kağıt', 'İnsan', 'Bilgi'],
    ['Kağıt', 'Kalem', 'Kitap'],
    ['Kitap', 'Kitap', 'Kütüphane'],

    // Büyü & Fantezi
    ['Enerji', 'Hayat', 'Büyü'],
    ['Büyü', 'Su', 'İksir'],
    ['Büyü', 'Ateş', 'Kehanet'],
    ['Büyü', 'Metal', 'Asa'],
    ['Büyü', 'İnsan', 'Büyücü'],
    ['Büyü', 'Taş', 'Büyülü Yüzük'],
    ['Büyü', 'Kılıç', 'Excalibur'],
    ['Büyü', 'Ağaç', 'Süpürge'],
    ['İksir', 'İnsan', 'Zombi'],
    ['Zombi', 'Enerji', 'Vampir'],
    ['Vampir', 'Güneş', 'Kül'],
    ['Hayalet', 'Ev', 'Perili Ev'],
    ['Ejderha', 'Ateş', 'Ejderha Nefesi'],
    ['Ejderha', 'İnsan', 'Evcil Ejderha'],
    ['Ejderha', 'Metal', 'Ejderha Zırhı'],
    ['Büyücü', 'Yıldız', 'Büyücü Kulesi'],
    ['Phoenix', 'Kül', 'Yeniden Doğuş'],
    ['Kitap', 'Büyü', 'Büyü Kitabı'],

    // Müzik & Sanat
    ['Ağaç', 'Hava', 'Müzik'],
    ['Metal', 'Hava', 'Trompet'],
    ['Kağıt', 'Müzik', 'Nota'],
    ['Müzik', 'Enerji', 'Rock'],
    ['Müzik', 'Elektrik', 'Elektronik Müzik'],
    ['Kağıt', 'İnsan', 'Kalem'],
    ['Kalem', 'Sanat', 'Tablo'],
    ['İnsan', 'Müzik', 'Dans'],

    // Doğal Kaynaklar
    ['Ağaç', 'Zaman', 'Kömür'],
    ['Kömür', 'Enerji', 'Elmas'],
    ['Metal', 'Kömür', 'Çelik'],
    ['Çelik', 'Ateş', 'Kılıç'],
    ['Kömür', 'Ateş', 'Güçlü Ateş'],
    ['Taş', 'Enerji', 'Altın'],
    ['Altın', 'Altın', 'Taç'],
    ['Taç', 'İnsan', 'Kral'],
    ['Kral', 'Şehir', 'Krallık'],
    ['Deniz', 'Kum', 'İnci'],
    ['İnci', 'Metal', 'Yüzük'],
    ['Petrol', 'Makine', 'Fabrika'],
    ['Fabrika', 'Fabrika', 'Sanayi'],
    ['Sanayi', 'Hava', 'Kirlilik'],
    ['Kirlilik', 'Yağmur', 'Asit Yağmuru'],
    ['Kirlilik', 'Dünya', 'Küresel Isınma'],

    // Esprili
    ['İnsan', 'Bağımlılık', 'Kanepe'],
    ['Kanepe', 'Televizyon', 'Couch Potato'],
    ['Kedi', 'İnternet', 'Meme'],
    ['Meme', 'Meme', 'Viral'],
    ['İnsan', 'Yağmur', 'Grip'],
    ['Grip', 'Çay', 'İyileşme'],
    ['İnsan', 'Ay', 'Kurtadam'],
    ['Trafik', 'Zaman', 'Sinir Krizi'],
    ['Roket', 'Ay', "Ay'a Yolculuk"],
    ['Uzay Gemisi', 'Uzaylı', 'İstila'],
    ['Zombi', 'Zombi', 'Zombi Salgını'],
    ['Vampir', 'Aşk', 'Twilight'],
    ['Yapay Zeka', 'İnternet', 'Skynet'],
    ['Yapay Zeka', 'İnsan', 'Claude'],
    ['Köpek', 'Ev', 'Kedi'],

    // Bonus Mega
    ['Ejderha', 'Unicorn', 'Efsanevi Yaratık'],
    ['Galaksi', 'Büyü', 'Kozmik Güç'],
    ['Sonsuzluk', 'Enerji', 'Tanrı Parçacığı'],
    ['Karadelik', 'Işık', 'Beyaz Delik'],
    ['Elmas', 'Büyü', 'Felsefe Taşı'],
    ['Felsefe Taşı', 'Metal', 'Altın'],
    ['Kral', 'Ejderha', 'Ejderha Krallığı'],
    ['Skynet', 'Zombi Salgını', 'Kıyamet'],
    ['Claude', 'Enerji', 'Süper Zeka'],
    ['Kıyamet', 'Fikir', 'Yeni Başlangıç'],

    // Yeni Kombinasyonlar (v2)
    ['Lav', 'Lav', 'Magma'],
    ['Magma', 'Toprak', 'Volkan'],
    ['Taş', 'Rüzgar', 'Kumul'],
    ['Taş', 'Hava', 'Çakıl'],
    ['Göl', 'Dağ', 'Vadi'],
    ['Nehir', 'Toprak', 'Delta'],
    ['Yağmur', 'Toprak', 'Filiz'],
    ['Çöl', 'Su', 'Vaha'],
    ['Çöl', 'Rüzgar', 'Kum Fırtınası'],
    ['Çöl', 'Gece', 'Akrep'],
    ['Çöl', 'İnsan', 'Deve'],
    ['Vaha', 'İnsan', 'Medeniyet'],
    ['Fırtına', 'Fırtına', 'Süper Fırtına'],
    ['Gökkuşağı', 'Büyü', 'Unicorn'],
    ['Rüzgar', 'Enerji', 'Hortum'],
    ['Rüzgar', 'Kum', 'Kum Fırtınası'],
    ['Rüzgar', 'Kar', 'Tipi'],
    ['Kasırga', 'Su', 'Tayfun'],
    ['Kasırga', 'Kasırga', 'Mega Kasırga'],
    ['Sis', 'İnsan', 'Kaybolmak'],
    ['Soğuk', 'Soğuk', 'Dondurucu'],
    ['Buz', 'Güneş', 'Su'],
    ['Buz', 'Ateş', 'Su'],
    ['Kar', 'Ateş', 'Su'],
    ['Kardan Adam', 'Güneş', 'Havuç'],
    ['Buzdağı', 'Gemi', 'Titanic'],
    ['Buzul', 'Zaman', 'Deniz Seviyesi Yükselişi'],
    ['Dondurucu', 'Hayat', 'Mamut'],
    ['Bitki', 'Güneş', 'Fotosentez'],
    ['Gün Batımı', 'Hava', 'Gece'],
    ['Gece', 'Gece', 'Karanlık'],
    ['Gündüz', 'Gündüz', 'Zaman'],
    ['Gündüz', 'Gece', 'Tutulma'],
    ['Ay', 'Su', 'Gelgit'],
    ['Ay', 'Kurt', 'Kurtadam'],
    ['Ay', 'İnsan', 'Romantizm'],
    ['Ay', 'Ay', 'Halkalı Gezegen'],
    ['Gezegen', 'Gezegen', 'Güneş Sistemi'],
    ['Güneş Sistemi', 'Güneş Sistemi', 'Galaksi'],
    ['Yıldız', 'Zaman', 'Kara Cüce'],
    ['Yıldız', 'Patlama', 'Süpernova'],
    ['Süpernova', 'Zaman', 'Karadelik'],
    ['Galaksi', 'Galaksi', 'Karadelik'],
    ['Karadelik', 'Zaman', 'Solucan Deliği'],
    ['Solucan Deliği', 'İnsan', 'Zaman Yolcusu'],
    ['Güneş', 'Cam', 'Büyüteç Ateşi'],
    ['Zaman', 'İnsan', 'Yaşlı'],
    ['Yaşlı', 'Bilgelik', 'Bilge'],
    ['Sonsuzluk', 'İnsan', 'Ölümsüz'],
    ['Zaman', 'Hayat', 'Ölüm'],
    ['Ölüm', 'Büyü', 'Hayalet'],
    ['Harabe', 'Bitki', 'Kayıp Şehir'],
    ['Antik Şehir', 'Büyü', 'Atlantis'],
    ['Ağaç', 'Rüzgar', 'Yaprak'],
    ['Ağaç', 'Su', 'Meyve'],
    ['Bitki', 'Bataklık', 'Mantar'],
    ['Bitki', 'Karanlık', 'Mantar'],
    ['Bitki', 'Böcek', 'Sinek Kapan'],
    ['Yağmur Ormanı', 'Böcek', 'Papağan'],
    ['Yağmur Ormanı', 'Su', 'Zehirli Kurbağa'],
    ['Buğday', 'Güneş', 'Mısır'],
    ['Mantar', 'Mantar', 'Mega Mantar'],
    ['Mantar', 'İnsan', 'Halüsinasyon'],
    ['Kaktüs', 'İnsan', 'Acı'],
    ['Meyve', 'Meyve', 'Meyve Suyu'],
    ['Meyve', 'Zaman', 'Şarap'],
    ['Meyve', 'Şeker', 'Reçel'],
    ['Palmiye', 'Meyve', 'Hindistan Cevizi'],
    ['Çamur', 'Hayat', 'Böcek'],
    ['Su', 'Hayat', 'Balık'],
    ['Hava', 'Hayat', 'Kuş'],
    ['Toprak', 'Hayat', 'Solucan'],
    ['Bitki', 'Böcek', 'Tırtıl'],
    ['Tırtıl', 'Hava', 'Kelebek'],
    ['Tırtıl', 'Zaman', 'Kelebek'],
    ['Böcek', 'Çiçek', 'Arı'],
    ['Böcek', 'Bitki', 'Karınca'],
    ['Böcek', 'Gece', 'Ateş Böceği'],
    ['Böcek', 'Böcek', 'Hamam Böceği'],
    ['Böcek', 'İpek', 'Örümcek'],
    ['Örümcek', 'Ev', 'Ağ'],
    ['Arı', 'Arı', 'Arı Kovanı'],
    ['Arı Kovanı', 'İnsan', 'Kaçış'],
    ['Karınca', 'Karınca', 'Karınca Kolonisi'],
    ['Karınca Kolonisi', 'Zaman', 'Karınca İmparatorluğu'],
    ['Solucan', 'Toprak', 'Verimli Toprak'],
    ['Ateş Böceği', 'Gece', 'Işık Gösterisi'],
    ['Kelebek', 'Kelebek', 'Kelebek Göçü'],
    ['Hamam Böceği', 'Nükleer', 'Süper Hamam Böceği'],
    ['Balık', 'Deniz', 'Ahtapot'],
    ['Balık', 'Bitki', 'Palyaço Balığı'],
    ['Balık', 'Derin', 'Fener Balığı'],
    ['Deniz', 'Hayat', 'Deniz Kabuğu'],
    ['Deniz Kabuğu', 'Zaman', 'İnci'],
    ['İnci', 'Metal', 'Yüzük'],
    ['Köpekbalığı', 'Fırtına', 'Sharknado'],
    ['Ahtapot', 'Zeka', 'Dahi Ahtapot'],
    ['Su', 'Bitki', 'Yosun'],
    ['Yosun', 'Yosun', 'Mercan'],
    ['Mercan', 'Mercan', 'Mercan Resifi'],
    ['Mercan Resifi', 'Kirlilik', 'Ölü Resif'],
    ['Deniz', 'Derin', 'Hayat', 'Dev Kalamar'],
    ['Penguen', 'Penguen', 'Penguen Kolonisi'],
    ['Su', 'Hava', 'Hayat', 'Yunus'],
    ['Yunus', 'İnsan', 'Dostluk'],
    ['Yunus', 'Yunus', 'Balina'],
    ['Balina', 'Şarkı', 'Balina Şarkısı'],
    ['Bataklık', 'Hayat', 'Kurbağa'],
    ['Kurbağa', 'Büyü', 'Prens'],
    ['Kertenkele', 'Güneş', 'Bukalemun'],
    ['Yılan', 'Yılan', 'Kobra'],
    ['Yılan', 'Büyü', 'Medusa'],
    ['Kuş', 'Ateş', 'Phoenix'],
    ['Kuş', 'Su', 'Ördek'],
    ['Kuş', 'Renk', 'Papağan'],
    ['Kuş', 'Hız', 'Şahin'],
    ['Papağan', 'İnsan', 'Taklit'],
    ['Orman', 'Hayat', 'Kurt'],
    ['Kurt', 'Kurt', 'Sürü'],
    ['Sürü', 'Lider', 'Alfa Kurt'],
    ['İnsan', 'Kurt', 'Köpek'],
    ['At', 'Büyü', 'Unicorn'],
    ['At', 'Metal', 'Zırhlı At'],
    ['Köpek', 'Soğuk', 'Husky'],
    ['Köpek', 'Küçük', 'Kaniş'],
    ['Köpek', 'Köpek', 'Köpek Çiftliği'],
    ['Koyun', 'Koyun', 'Sürü'],
    ['Koyun', 'Metal', 'Yün'],
    ['Koyun', 'İnsan', 'Çoban'],
    ['Çoban', 'Dağ', 'Çoban Çayı'],
    ['Toprak', 'Çimen', 'İnek'],
    ['İnek', 'İnsan', 'Süt'],
    ['Orman', 'Gece', 'Yarasa'],
    ['Yarasa', 'Vampir', 'Dracula'],
    ['Akrep', 'Büyü', 'Burç'],
    ['Buz', 'Hayat', 'Kutup Ayısı'],
    ['Orman', 'Büyük', 'Ayı'],
    ['Ayı', 'Bal', 'Winnie'],
    ['Afrika', 'Hayat', 'Aslan'],
    ['Aslan', 'Taç', 'Ormanın Kralı'],
    ['Aslan', 'Aslan', 'Aslan Sürüsü'],
    ['Deniz', 'Büyük', 'Hayat', 'Timsah'],
    ['Timsah', 'Zaman', 'Dinozor'],
    ['Dinozor', 'Uçma', 'Kuş'],
    ['Dinozor', 'Su', 'Timsah'],
    ['Fosil', 'İnsan', 'Müze'],
    ['Mamut', 'Buz', 'Dondurulmuş Mamut'],
    ['Dondurulmuş Mamut', 'Ateş', 'Canlanmış Mamut'],
    ['Hayat', 'Kil', 'İnsan'],
    ['Hayat', 'Toprak', 'İnsan'],
    ['Aşk', 'Zaman', 'Ayrılık'],
    ['Aşk', 'Yüzük', 'Evlilik'],
    ['Evlilik', 'Zaman', 'Aile'],
    ['Aile', 'Ev', 'Yuva'],
    ['Bebek', 'Zaman', 'Çocuk'],
    ['Çocuk', 'Kitap', 'Öğrenci'],
    ['Öğrenci', 'Zaman', 'Mezun'],
    ['Öğrenci', 'Sınav', 'Stres'],
    ['Stres', 'Kahve', 'Ders Çalışma Gücü'],
    ['İnsan', 'Deniz', 'Denizci'],
    ['İnsan', 'Bilgi', 'Bilim İnsanı'],
    ['İnsan', 'Fırça', 'Ressam'],
    ['İnsan', 'Kamera', 'Yönetmen'],
    ['İnsan', 'Dağ', 'Dağcı'],
    ['İnsan', 'Uçak', 'Pilot'],
    ['İnsan', 'Hasta', 'Doktor'],
    ['İnsan', 'Hukuk', 'Avukat'],
    ['İnsan', 'Para', 'Bankacı'],
    ['Sporcu', 'Top', 'Futbolcu'],
    ['Futbolcu', 'Yetenek', 'Şampiyon'],
    ['Ev', 'Ev', 'Köy'],
    ['Köy', 'Pazar', 'Dükkan'],
    ['Dükkan', 'Dükkan', 'AVM'],
    ['AVM', 'İnsan', 'Alışveriş'],
    ['Alışveriş', 'Para', 'İflas'],
    ['Şehir', 'Bilim', 'Üniversite'],
    ['Üniversite', 'İnsan', 'Öğrenci'],
    ['Şehir', 'Hasta', 'Hastane'],
    ['Şehir', 'Spor', 'Stadyum'],
    ['Stadyum', 'İnsan', 'Maç'],
    ['Maç', 'Maç', 'Turnuva'],
    ['Orman', 'Ev', 'Kamp'],
    ['Kamp', 'Ateş', 'Kamp Ateşi'],
    ['Kamp Ateşi', 'Hikaye', 'Korku Hikayesi'],
    ['Deniz', 'Ev', 'Tatil Köyü'],
    ['Tatil', 'Güneş', 'Yaz Tatili'],
    ['Dağ', 'Ev', 'Yayla'],
    ['Yayla', 'Çay', 'Rize'],
    ['Metal', 'Taş', 'Madeni Para'],
    ['Kağıt', 'Altın', 'Banknot'],
    ['Para', 'Para', 'Servet'],
    ['Servet', 'İnsan', 'Zengin'],
    ['Zengin', 'Ev', 'Malikane'],
    ['Para', 'Zaman', 'Faiz'],
    ['Faiz', 'Faiz', 'Enflasyon'],
    ['Enflasyon', 'Ekmek', 'Pahalı Ekmek'],
    ['Gemi', 'Ticaret', 'İpek Yolu'],
    ['Araba', 'Kargo', 'TIR'],
    ['TIR', 'TIR', 'Trafik Sıkışıklığı'],
    ['İnsan', 'Hastalık', 'Hasta'],
    ['Hasta', 'Bitki', 'İlaç'],
    ['Hasta', 'Doktor', 'Tedavi'],
    ['İnsan', 'Yağmur', 'Grip'],
    ['Grip', 'Grip', 'Salgın'],
    ['Salgın', 'Dünya', 'Pandemi'],
    ['Pandemi', 'Bilim', 'Aşı'],
    ['Aşı', 'İnsan', 'Bağışıklık'],
    ['İnsan', 'Spor', 'Sağlık'],
    ['Sağlık', 'Sağlık', 'Zen'],
    ['İnsan', 'Eğlence', 'Oyun'],
    ['Oyun', 'Bilgisayar', 'Video Oyunu'],
    ['Video Oyunu', 'Video Oyunu', 'Arcade'],
    ['Oyun', 'Kağıt', 'Kart Oyunu'],
    ['Kart Oyunu', 'Büyü', 'Yu-Gi-Oh'],
    ['İnsan', 'Top', 'Futbol'],
    ['Futbol', 'Futbol', 'Dünya Kupası'],
    ['İnsan', 'Buz', 'Kayak'],
    ['İnsan', 'Dalga', 'Sörf'],
    ['İnsan', 'Rüzgar', 'Paraşüt'],
    ['Paraşüt', 'Dağ', 'Yamaç Paraşütü'],
    ['İnsan', 'Kanepe', 'Couch Potato'],
    ['Couch Potato', 'Spor', 'Yeni Yıl Kararı'],
    ['Yeni Yıl Kararı', 'Zaman', 'Couch Potato'],
    ['İnsan', 'Kahve', 'Süper İnsan'],
    ['Süper İnsan', 'Kahvesizlik', 'Zombi'],
    ['Kedi', 'İnternet', 'Meme'],
    ['Kedi', 'Kutu', 'Kutu Kedisi'],
    ['Kedi', 'Kedi', 'Kedi Ordusu'],
    ['Kedi Ordusu', 'İnternet', 'Dünya Hakimiyeti'],
    ['Pizza', 'Pizza', 'Mega Pizza'],
    ['Mega Pizza', 'İnsan', 'Gıda Koması'],
    ['Aşçı', 'Ateş', 'MasterChef'],
    ['MasterChef', 'Tuz', 'Salt Bae'],
    ['Trafik', 'Zaman', 'Sinir Krizi'],
    ['Sinir Krizi', 'Müzik', 'Rahatlama'],
    ['Uzay Gemisi', 'Uzaylı', 'İstila'],
    ['İstila', 'İnsan', 'Panik'],
    ['Panik', 'Panik', 'Kıyamet'],
    ['Vampir', 'Vampir', 'Vampir Loncası'],
    ['Kurtadam', 'Kurtadam', 'Kurt Sürüsü'],
    ['Robot', 'Kedi', 'Robo-Kedi'],
    ['Robo-Kedi', 'İnternet', 'Skynet Ama Tatlı Versiyonu'],
    ['Selfie', 'Selfie', 'Influencer'],
    ['Influencer', 'Para', 'Reklam'],
    ['Influencer', 'Gerçeklik', 'Hayal Kırıklığı'],
    ['Donut', 'Polis', 'Amerikan Klasiği'],
    ['Kardan Adam', 'Kardan Adam', 'Kardan Aile'],
    ['Kardan Aile', 'Güneş', 'Gözyaşı Havuzu'],
    ['İnsan', 'Güneş', 'Güneş Kremi'],
    ['Güneş Kremi', 'Unutmak', 'Istakoz Adam'],
    ['Penguen', 'Çöl', 'Kafası Karışık Penguen'],
    ['Makine', 'Zeka', 'Robot'],
    ['Robot', 'Robot', 'Robot Ordusu'],
    ['Robot', 'Hayat', 'Yapay Zeka'],
    ['Robot', 'İnsan', 'İş Birliği'],
    ['Yapay Zeka', 'İnternet', 'Skynet'],
    ['Yapay Zeka', 'İnsan', 'Claude'],
    ['Yapay Zeka', 'Sanat', 'AI Art'],
    ['AI Art', 'Ressam', 'Tartışma'],
    ['Yapay Zeka', 'Yapay Zeka', 'Süper Zeka'],
    ['Süper Zeka', 'Evren', 'Tekil Nokta'],
    ['Robot', 'Aşk', 'Robot Aşkı'],
    ['Robot Aşkı', 'Zaman', 'Wall-E'],
];

// ============================================
// GAME STATE
// ============================================
const STARTING_ELEMENTS = ['Su', 'Ateş', 'Toprak', 'Hava'];
let discoveredElements = new Set(STARTING_ELEMENTS);
let combinationCount = 0;
let workspaceElements = []; // {id, element, x, y, domNode}
let nextWorkspaceId = 0;

// Drag state
let dragState = null; // {source:'sidebar'|'workspace', elementName, wsId, offsetX, offsetY, ghost}

// Three.js
let scene, camera, renderer, clock;
let stars;

// ============================================
// PERSISTENCE
// ============================================
function saveGame() {
    localStorage.setItem('element-craft-save', JSON.stringify({
        discovered: Array.from(discoveredElements),
        combos: combinationCount
    }));
}

function loadGame() {
    try {
        const d = JSON.parse(localStorage.getItem('element-craft-save'));
        if (d && d.discovered) {
            discoveredElements = new Set(d.discovered);
            combinationCount = d.combos || 0;
        }
    } catch (e) { }
}

function resetGame() {
    if (!confirm('Oyunu sıfırlamak istediğine emin misin? Tüm ilerleme silinecek!')) return;
    localStorage.removeItem('element-craft-save');
    discoveredElements = new Set(STARTING_ELEMENTS);
    combinationCount = 0;
    clearWorkspace();
    renderSidebar();
    updateStats();
}

// ============================================
// THREE.JS BACKGROUND
// ============================================
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    scene = new THREE.Scene();
    clock = new THREE.Clock();

    const w = canvas.parentElement.clientWidth - 300;
    const h = canvas.parentElement.clientHeight;
    camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.set(0, 0, 20);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);

    // Stars
    const geo = new THREE.BufferGeometry();
    const pos = [], col = [];
    for (let i = 0; i < 600; i++) {
        pos.push((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 60, -10 - Math.random() * 40);
        const c = new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.5, 0.5 + Math.random() * 0.5);
        col.push(c.r, c.g, c.b);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    stars = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.7 }));
    scene.add(stars);

    // Subtle grid
    const grid = new THREE.GridHelper(60, 30, 0x1a1a3a, 0x121228);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -15;
    grid.material.opacity = 0.3;
    grid.material.transparent = true;
    scene.add(grid);

    // Ambient
    scene.add(new THREE.AmbientLight(0x6c5ce7, 0.3));

    window.addEventListener('resize', () => {
        const nw = document.getElementById('workspace').clientWidth;
        const nh = document.getElementById('workspace').clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    });

    animateBg();
}

function animateBg() {
    requestAnimationFrame(animateBg);
    const t = clock.getElapsedTime();
    if (stars) {
        stars.rotation.y = t * 0.02;
        stars.rotation.x = Math.sin(t * 0.01) * 0.05;
    }
    renderer.render(scene, camera);
}

// ============================================
// CATEGORY SYSTEM
// ============================================
function getCategories() {
    const cats = new Set();
    discoveredElements.forEach(name => {
        const el = ALL_ELEMENTS[name];
        if (el) cats.add(el.category);
    });
    return Array.from(cats);
}

function renderCategoryTabs() {
    const container = document.getElementById('category-tabs');
    const cats = getCategories();
    container.innerHTML = '<button class="cat-tab active" data-category="all">Tümü</button>';
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cat-tab';
        btn.dataset.category = cat;
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            container.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderElementList();
        });
        container.appendChild(btn);
    });
    // Re-bind "all"
    container.querySelector('[data-category="all"]').addEventListener('click', () => {
        container.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
        container.querySelector('[data-category="all"]').classList.add('active');
        renderElementList();
    });
}

// ============================================
// SIDEBAR
// ============================================
function renderSidebar() {
    renderCategoryTabs();
    renderElementList();
}

function renderElementList() {
    const list = document.getElementById('element-list');
    const filter = document.querySelector('.cat-tab.active')?.dataset.category || 'all';
    const search = document.getElementById('search-input').value.toLowerCase();
    list.innerHTML = '';

    const sorted = Array.from(discoveredElements).sort((a, b) => a.localeCompare(b, 'tr'));

    sorted.forEach(name => {
        const el = ALL_ELEMENTS[name];
        if (!el) return;
        if (filter !== 'all' && el.category !== filter) return;
        if (search && !name.toLowerCase().includes(search)) return;

        const card = document.createElement('div');
        card.className = 'element-card';
        card.dataset.element = name;
        card.innerHTML = `<span class="el-emoji">${el.emoji}</span><span class="el-name">${name}</span>`;

        // Drag from sidebar
        card.addEventListener('mousedown', (e) => startSidebarDrag(e, name));
        card.addEventListener('touchstart', (e) => startSidebarDrag(e, name), { passive: false });

        list.appendChild(card);
    });
}

// ============================================
// DRAG & DROP SYSTEM
// ============================================
function startSidebarDrag(e, elementName) {
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const el = ALL_ELEMENTS[elementName];
    if (!el) return;

    // Create ghost
    const ghost = createGhostElement(elementName, el.emoji);
    ghost.style.left = (touch.clientX - 40) + 'px';
    ghost.style.top = (touch.clientY - 30) + 'px';
    document.body.appendChild(ghost);

    dragState = {
        source: 'sidebar',
        elementName,
        offsetX: 40,
        offsetY: 30,
        ghost
    };
}

function startWorkspaceDrag(e, wsId) {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches ? e.touches[0] : e;
    const wsEl = workspaceElements.find(w => w.id === wsId);
    if (!wsEl) return;

    const rect = wsEl.domNode.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    wsEl.domNode.classList.add('dragging');

    dragState = {
        source: 'workspace',
        elementName: wsEl.element,
        wsId: wsId,
        offsetX,
        offsetY,
        ghost: null, // we move the actual node
        domNode: wsEl.domNode
    };
}

function onPointerMove(e) {
    if (!dragState) return;
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;

    if (dragState.source === 'sidebar' && dragState.ghost) {
        dragState.ghost.style.left = (x - dragState.offsetX) + 'px';
        dragState.ghost.style.top = (y - dragState.offsetY) + 'px';
    } else if (dragState.source === 'workspace' && dragState.domNode) {
        const workspace = document.getElementById('workspace');
        const wsRect = workspace.getBoundingClientRect();
        const nx = x - wsRect.left - dragState.offsetX;
        const ny = y - wsRect.top - dragState.offsetY;
        dragState.domNode.style.left = nx + 'px';
        dragState.domNode.style.top = ny + 'px';

        // Update stored position
        const wsEl = workspaceElements.find(w => w.id === dragState.wsId);
        if (wsEl) { wsEl.x = nx; wsEl.y = ny; }

        // Check merge hover
        checkMergeHover(dragState.wsId, x, y);
    }
}

function onPointerUp(e) {
    if (!dragState) return;
    const touch = e.changedTouches ? e.changedTouches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;

    if (dragState.source === 'sidebar') {
        // Check if dropped on workspace
        const workspace = document.getElementById('workspace');
        const wsRect = workspace.getBoundingClientRect();
        if (x >= wsRect.left && x <= wsRect.right && y >= wsRect.top && y <= wsRect.bottom) {
            // First add to workspace
            const dropX = x - wsRect.left - 40;
            const dropY = y - wsRect.top - 30;
            addToWorkspace(dragState.elementName, dropX, dropY);

            // Then check if dropped on another element for merge
            const newWsId = nextWorkspaceId - 1; // ID of the element we just added
            const target = findMergeTarget(newWsId, x, y);
            if (target) {
                tryCombine(newWsId, target.id);
            }
        }
        if (dragState.ghost) dragState.ghost.remove();
        clearMergeHovers();
    } else if (dragState.source === 'workspace') {
        dragState.domNode.classList.remove('dragging');

        // Check if dropped on another workspace element
        const target = findMergeTarget(dragState.wsId, x, y);
        if (target) {
            tryCombine(dragState.wsId, target.id);
        }

        // Clear merge hovers
        clearMergeHovers();
    }

    dragState = null;
}

function createGhostElement(name, emoji) {
    const div = document.createElement('div');
    div.className = 'workspace-element dragging';
    div.style.position = 'fixed';
    div.style.zIndex = '9999';
    div.style.pointerEvents = 'none';
    div.innerHTML = `<span class="ws-emoji">${emoji}</span><span class="ws-name">${name}</span>`;
    return div;
}

// ============================================
// WORKSPACE
// ============================================
function addToWorkspace(elementName, x, y) {
    const el = ALL_ELEMENTS[elementName];
    if (!el) return;

    const workspace = document.getElementById('workspace');
    const wsRect = workspace.getBoundingClientRect();

    // Clamp position
    x = Math.max(10, Math.min(x, wsRect.width - 100));
    y = Math.max(10, Math.min(y, wsRect.height - 60));

    const id = nextWorkspaceId++;
    const domNode = document.createElement('div');
    domNode.className = 'workspace-element';
    domNode.dataset.wsId = id;
    domNode.style.left = x + 'px';
    domNode.style.top = y + 'px';
    domNode.innerHTML = `<span class="ws-emoji">${el.emoji}</span><span class="ws-name">${elementName}</span>`;

    // Drag handlers
    domNode.addEventListener('mousedown', (e) => startWorkspaceDrag(e, id));
    domNode.addEventListener('touchstart', (e) => startWorkspaceDrag(e, id), { passive: false });

    // Double click to remove
    domNode.addEventListener('dblclick', () => removeFromWorkspace(id));

    workspace.appendChild(domNode);
    workspaceElements.push({ id, element: elementName, x, y, domNode });

    // Hide hint
    const hint = document.getElementById('workspace-hint');
    if (hint) hint.style.display = 'none';
}

function removeFromWorkspace(wsId) {
    const idx = workspaceElements.findIndex(w => w.id === wsId);
    if (idx === -1) return;
    workspaceElements[idx].domNode.remove();
    workspaceElements.splice(idx, 1);
    if (workspaceElements.length === 0) {
        const hint = document.getElementById('workspace-hint');
        if (hint) hint.style.display = '';
    }
}

function clearWorkspace() {
    workspaceElements.forEach(w => w.domNode.remove());
    workspaceElements = [];
    const hint = document.getElementById('workspace-hint');
    if (hint) hint.style.display = '';
}

// ============================================
// MERGE / COMBINE
// ============================================
function findMergeTarget(draggedId, x, y) {
    for (const w of workspaceElements) {
        if (w.id === draggedId) continue;
        const rect = w.domNode.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return w;
        }
    }
    return null;
}

function checkMergeHover(draggedId, x, y) {
    clearMergeHovers();
    const target = findMergeTarget(draggedId, x, y);
    if (target) {
        target.domNode.classList.add('merge-hover');
    }
}

function clearMergeHovers() {
    workspaceElements.forEach(w => w.domNode.classList.remove('merge-hover'));
}

function tryCombine(wsId1, wsId2) {
    const el1 = workspaceElements.find(w => w.id === wsId1);
    const el2 = workspaceElements.find(w => w.id === wsId2);
    if (!el1 || !el2) return;

    const result = findRecipe(el1.element, el2.element);
    if (!result) {
        showToast('Bu kombinasyon çalışmadı! 😕', 'error');
        return;
    }

    // Calculate midpoint for new element
    const midX = (el1.x + el2.x) / 2;
    const midY = (el1.y + el2.y) / 2;

    // Remove both elements
    removeFromWorkspace(wsId1);
    removeFromWorkspace(wsId2);

    // Track discovery
    const isNew = !discoveredElements.has(result);
    discoveredElements.add(result);
    combinationCount++;

    // Add result to workspace
    addToWorkspace(result, midX, midY);

    // Show result animation
    showCombineResult(result, isNew);
    if (isNew) spawnParticles(midX, midY);

    // Update UI
    renderSidebar();
    updateStats();
    saveGame();
}

function findRecipe(el1, el2) {
    for (const r of RECIPES) {
        if ((r[0] === el1 && r[1] === el2) || (r[0] === el2 && r[1] === el1)) {
            return r[2];
        }
    }
    return null;
}

// ============================================
// UI HELPERS
// ============================================
function showCombineResult(elementName, isNew) {
    const el = ALL_ELEMENTS[elementName];
    if (!el) return;
    const div = document.getElementById('combine-result');
    div.querySelector('.result-emoji').textContent = el.emoji;
    div.querySelector('.result-name').textContent = elementName;
    div.querySelector('.result-message').textContent = isNew ? '🎉 Yeni element keşfedildi!' : '✅ Zaten keşfedilmiş!';
    div.classList.remove('hidden', 'show');
    void div.offsetWidth;
    div.classList.add('show');
    setTimeout(() => { div.classList.add('hidden'); div.classList.remove('show'); }, 2500);
}

function spawnParticles(centerX, centerY) {
    const workspace = document.getElementById('workspace');
    const wsRect = workspace.getBoundingClientRect();
    const cx = wsRect.left + centerX + 40;
    const cy = wsRect.top + centerY + 20;
    const colors = ['#6c5ce7', '#a29bfe', '#00e676', '#ffd600', '#ff6b35', '#00b4d8'];
    for (let i = 0; i < 16; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.setProperty('--tx', `${(Math.random() - 0.5) * 180}px`);
        p.style.setProperty('--ty', `${(Math.random() - 0.5) * 180}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

function showToast(msg, type = '') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

function updateStats() {
    document.getElementById('discovered-count').textContent = discoveredElements.size;
    document.getElementById('discovered-total').textContent = `/ ${Object.keys(ALL_ELEMENTS).length}`;
    document.getElementById('combo-count').textContent = combinationCount;
}

// ============================================
// HINT SYSTEM
// ============================================
function showHint() {
    const possible = RECIPES.filter(r =>
        discoveredElements.has(r[0]) && discoveredElements.has(r[1]) && !discoveredElements.has(r[2])
    );
    let text;
    if (possible.length === 0) {
        const undiscovered = Object.keys(ALL_ELEMENTS).filter(n => !discoveredElements.has(n));
        text = undiscovered.length === 0
            ? '🎊 Tebrikler! Tüm elementleri keşfettin!'
            : 'Şu an yapılabilecek yeni kombinasyon yok. Farklı şeyler dene!';
    } else {
        const hint = possible[Math.floor(Math.random() * possible.length)];
        const e1 = ALL_ELEMENTS[hint[0]], e2 = ALL_ELEMENTS[hint[1]];
        text = `${e1.emoji} ${hint[0]}  +  ${e2.emoji} ${hint[1]}  =  ???`;
    }
    document.getElementById('hint-text').textContent = text;
    document.getElementById('hint-modal').classList.remove('hidden');
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEvents() {
    // Global pointer move/up for dragging
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);

    // Search
    document.getElementById('search-input').addEventListener('input', renderElementList);

    // Buttons
    document.getElementById('btn-reset').addEventListener('click', resetGame);
    document.getElementById('btn-hint').addEventListener('click', showHint);
    document.getElementById('btn-info').addEventListener('click', () => {
        document.getElementById('info-modal').classList.remove('hidden');
    });
    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('info-modal').classList.add('hidden');
    });
    document.getElementById('hint-close').addEventListener('click', () => {
        document.getElementById('hint-modal').classList.add('hidden');
    });
    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', (e) => { if (e.target === m) m.classList.add('hidden'); });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    });
}

// ============================================
// INIT
// ============================================
function init() {
    loadGame();
    initBackground();
    setupEvents();
    renderSidebar();
    updateStats();

    // Hide loading
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
        setTimeout(() => { document.getElementById('loading-screen').style.display = 'none'; }, 800);
    }, 2000);
}

init();
