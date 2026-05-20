# examApp

> Üniversiteye özel **harf notu** ve **geçme notu** hesaplama aracı. Her bölüm bir JSON dosyası — yeni bölüm eklemek için kod yazmanıza gerek yok, JSON ekleyip PR atın yeter.
>
> A grade calculator that's configurable per university and department. Each program is a single JSON file — contribute a new department by adding one file and opening a PR.

[![validate](https://github.com/SeferCinar/examApp/actions/workflows/validate.yml/badge.svg)](https://github.com/SeferCinar/examApp/actions/workflows/validate.yml)
[![live](https://img.shields.io/badge/live-exam.sefercinar.com-emerald)](https://exam.sefercinar.com)
[![license](https://img.shields.io/badge/license-CC%20BY--SA%204.0-blue.svg)](LICENSE)

---

## Ne yapıyor?

- **Basit mod:** Vize/final ağırlıkları ile geçme + şartlı geçme notunu otomatik hesaplar.
- **Detaylı mod:** İstediğin kadar bileşen (quiz, ödev, proje vb.) ekleyebilir, harf notunu çıkarabilirsin.
- **Çoklu üniversite:** Her bölümün not aralıkları ve ağırlıkları, kendi JSON dosyasında. URL'den direkt erişim: `/adu/bilgisayar-muh`.
- **Kayıtlı notlar:** localStorage'da hesapladıklarını saklayıp daha sonra düzenleyebilirsin.

## Desteklenen üniversiteler & bölümler

| Üniversite | Bölüm | URL | Kaynak |
|---|---|---|---|
| Aydın Adnan Menderes Üniversitesi (ADÜ) | Bilgisayar Mühendisliği | [`/adu/bilgisayar-muh`](https://exam.sefercinar.com/adu/bilgisayar-muh) | — |

Bölümün burada yok mu? [Katkıda bulun](CONTRIBUTING.md) — bir JSON dosyası ekleyip PR aç, yeter.

## Stack

Nuxt 3 · Vue 3 · TypeScript · TailwindCSS · Vercel deploy · JSON Schema validasyonu (CI'da)

## Yerel kurulum

```bash
git clone https://github.com/SeferCinar/examApp.git
cd examApp
npm install
npm run dev   # http://localhost:3000
```

Diğer komutlar:

```bash
npm run build      # production build
npm run preview    # local production preview
npm run validate   # configs/ altındaki tüm JSON'ları şemaya karşı doğrula
```

## Proje yapısı

```
configs/
├── _schema.json              JSON Schema (draft-07)
└── {uni-kodu}/
    └── {bolum-slug}.json     Bölüm konfigürasyonu

composables/
├── useUniversityConfig.ts    Config yükleme + cache
├── useGradeCalculator.ts     letterFromScore, calculateGrade, threshold'lar
└── useLastUsedConfig.ts      localStorage yardımcısı

pages/
├── index.vue                 Üniversite seçici + lastUsed redirect
├── savedNotes.vue            Kayıtlı notlar (localStorage)
└── [university]/
    └── [department].vue      Dinamik hesaplama sayfası

scripts/
└── validate-configs.ts       CI doğrulama scripti

.github/workflows/
└── validate.yml              PR'larda npm run validate
```

## Katkıda bulunmak

Yeni üniversite/bölüm eklemek **bir JSON dosyası ekleyip PR açmaktan** ibaret. Detaylar için [CONTRIBUTING.md](CONTRIBUTING.md).

Kısa özet:

1. `configs/{uni-kodu}/{bolum-slug}.json` oluştur (şemaya uy).
2. `npm run validate` çalıştır, yeşil olduğundan emin ol.
3. PR aç — resmi şartname/yönetmelik linkini açıklamaya ekle.

## Lisans

[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](LICENSE).

Kullanır, değiştirir, dağıtırken **atıf ver** ve türev çalışmanı **aynı lisansla** yayımla. Detay için [creativecommons.org/licenses/by-sa/4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## İletişim

- **Sefer Çınar** · [sefercinar.com](https://sefercinar.com) · [@SeferCinar](https://github.com/SeferCinar)
- Hata/öneri: [GitHub Issues](https://github.com/SeferCinar/examApp/issues)
