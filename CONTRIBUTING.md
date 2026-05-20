# Katkı Rehberi

examApp'a yeni bir üniversite/bölüm eklemek için **yalnızca bir JSON dosyası eklemen gerekiyor.** Kod yazman, build araçlarıyla uğraşman gerekmiyor. Bu rehber adım adım nasıl yapılacağını anlatır.

---

## TL;DR

```bash
# 1. Repoyu fork'la, clone'la
git clone https://github.com/<senin-kullanıcı-adın>/examApp.git
cd examApp
npm install

# 2. Yeni bir branch aç
git checkout -b config/<uni-kodu>-<bolum-slug>

# 3. Config dosyasını oluştur
#    configs/<uni-kodu>/<bolum-slug>.json
#    Şema için aşağıdaki "JSON Şeması" bölümüne bak

# 4. Doğrula
npm run validate

# 5. (Opsiyonel) Görsel test
npm run dev
# http://localhost:3000/<uni-kodu>/<bolum-slug>

# 6. Commit + push + PR
git add configs/<uni-kodu>/<bolum-slug>.json
git commit -m "feat: <Üni Adı> - <Bölüm Adı> config'i ekle"
git push origin config/<uni-kodu>-<bolum-slug>
```

PR şablonunu doldurup gönder.

---

## Kuralı en başta söyleyelim: **Resmi kaynak kullan.**

Üniversitelerin not aralıkları, geçme eşikleri ve sınav ağırlıkları üniversiteden üniversiteye, hatta fakülteden fakülteye değişir. **Tahmin etme.** Resmi şartname/yönetmelik bul (üniversitenin web sitesinde yayımlanmış olmalı) ve PR'da o linki ekle.

Bulamadıysan o üniversite/bölümü şimdilik atla, başkası kaynaklı bilgiyle ekleyebilir.

---

## Adım adım

### 1) Dosya yapısı

Bir config dosyasının yolu şu kalıba uymalı:

```
configs/<uni-kodu>/<bolum-slug>.json
```

- `<uni-kodu>` — üniversitenin kısa kebab-case kodu. Örnekler: `adu`, `itu`, `bogazici`, `odtu`, `hacettepe`.
- `<bolum-slug>` — bölüm adının kebab-case slug'ı. Örnekler: `bilgisayar-muh`, `elektrik-elektronik`, `endustri-muh`.

URL doğrudan bu yoldan türetilir: `configs/adu/bilgisayar-muh.json` → `/adu/bilgisayar-muh`.

### 2) İçeriği hazırla

Mevcut bir config'i baz al — en kolayı `configs/adu/bilgisayar-muh.json`'ı kopyalamak. Sonra her alanı kendi bölümünün verisine göre güncelle.

#### Tam örnek

```json
{
  "$schema": "../_schema.json",
  "id": "ornek-uni-ornek-bolum",
  "university": {
    "tr": "Örnek Üniversitesi",
    "en": "Example University",
    "shortCode": "ÖÜ"
  },
  "department": {
    "tr": "Örnek Mühendisliği",
    "en": "Example Engineering"
  },
  "gradingScale": {
    "AA": { "min": 90, "max": 100, "gpa": 4.0 },
    "BA": { "min": 85, "max": 89,  "gpa": 3.5 },
    "BB": { "min": 75, "max": 84,  "gpa": 3.0 },
    "CB": { "min": 65, "max": 74,  "gpa": 2.5 },
    "CC": { "min": 55, "max": 64,  "gpa": 2.0 },
    "DC": { "min": 45, "max": 54,  "gpa": 1.5 },
    "DD": { "min": 35, "max": 44,  "gpa": 1.0 },
    "FF": { "min": 0,  "max": 34,  "gpa": 0.0 }
  },
  "passingGrade": "CC",
  "conditionalPassingGrade": "DD",
  "examWeights": {
    "midterm": 0.4,
    "final": 0.6
  },
  "metadata": {
    "contributedBy": "@kullanıcı-adın",
    "lastUpdated": "2026-05-20",
    "sourceUrl": "https://www.ornek-uni.edu.tr/yonetmelik.pdf"
  }
}
```

### 3) Doğrula

```bash
npm run validate
```

Tüm config'ler şemaya karşı denetlenir ve şu ek kontroller yapılır:

- `gradingScale` aralıkları 0-100'ü **çakışmadan ve boşluksuz** kapsamalı.
- `examWeights.midterm + examWeights.final` tam olarak **1.0** etmeli.
- `passingGrade` ve (varsa) `conditionalPassingGrade`, `gradingScale` içinde tanımlı olmalı.
- `id` global benzersiz olmalı ve dosya yolundan türetilebilir olmalı (`configs/adu/bilgisayar-muh.json` → `adu-bilgisayar-muh`).

Hata varsa anlamlı bir mesaj görürsün; düzeltip tekrar çalıştır.

### 4) Görsel test (önerilir)

```bash
npm run dev
```

Tarayıcıdan `http://localhost:3000/<uni-kodu>/<bolum-slug>` adresini aç.

- Vize/final ağırlıklarının doğru görüntülendiğinden emin ol.
- Sınır değerlerini özellikle test et (örn. 89, 90, 89.5).
- Beklenen harf notu çıkıyor mu?

### 5) PR aç

Branch'i push'la, GitHub'da PR aç. Şablonu doldur (üniversite, bölüm, resmi kaynak linki, validate sonucu).

CI'da `validate` job'ı yeşil olmalı.

---

## JSON Şeması — Alan Referansı

`configs/_schema.json` JSON Schema draft-07 kullanır. Editörün (VS Code) `$schema` alanı sayesinde otomatik tamamlama ve hata gösterimi yapacaktır.

### Üst seviye

| Alan | Zorunlu | Tip | Açıklama |
|---|---|---|---|
| `$schema` | hayır | string | Editör desteği için. Her zaman `"../_schema.json"`. |
| `id` | **evet** | string | Global benzersiz, kebab-case. Dosya yolundan türemeli. Örn. `adu-bilgisayar-muh`. |
| `university` | **evet** | object | Üniversite bilgileri. |
| `department` | **evet** | object | Bölüm bilgileri. |
| `gradingScale` | **evet** | object | Harf notu → puan aralığı eşlemesi. |
| `passingGrade` | **evet** | string | gradingScale'deki bir harf. Bu eşik ve üzeri "geçti". |
| `conditionalPassingGrade` | hayır | string | Şartlı geçme harfi (varsa). |
| `examWeights` | **evet** | object | Vize/final ağırlıkları. Toplam 1.0 olmalı. |
| `courses` | hayır | array | Ders listesi (şu an UI'da kullanılmıyor). |
| `metadata` | hayır | object | Katkı bilgisi, kaynak linki, vb. |

### `university`

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `tr` | **evet** | Türkçe tam isim, örn. `"Aydın Adnan Menderes Üniversitesi"`. |
| `en` | hayır | İngilizce tam isim. |
| `shortCode` | **evet** | Kısa kod, örn. `"ADÜ"`, `"İTÜ"`, `"ODTÜ"`. |

### `department`

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `tr` | **evet** | Türkçe bölüm adı, örn. `"Bilgisayar Mühendisliği"`. |
| `en` | hayır | İngilizce bölüm adı. |

### `gradingScale`

Anahtar = harf notu (büyük harf + opsiyonel rakam, örn. `AA`, `BA`, `A1`, `F1`).
Değer = `{ min, max, gpa? }`:

- `min` — bu harfin alt sınırı (dahil), 0-100 arası.
- `max` — bu harfin üst sınırı (dahil), 0-100 arası. `min <= max` olmalı.
- `gpa` — opsiyonel. 4'lük sistem üzerinden değeri (0-4). Resmi kaynakta yoksa boş bırak.

**Aralıklar 0-100'ü tam kapsamalı, boşluk veya çakışma olmamalı.** Validation script'i bunu kontrol eder.

### `examWeights`

```json
{ "midterm": 0.4, "final": 0.6 }
```

- `midterm + final == 1.0` olmalı (script kontrolü).
- Bu değerler **varsayılan** ağırlıklar; kullanıcı UI'da değiştirebilir.

### `metadata`

| Alan | Açıklama |
|---|---|
| `contributedBy` | `@github-kullanıcı-adın` |
| `lastUpdated` | ISO tarih, `YYYY-MM-DD`. |
| `sourceUrl` | Resmi şartname/yönetmelik URL'i. **Şiddetle önerilir.** |

---

## PR şablonu (referans)

PR açtığında bu bilgileri açıklamada bulundur:

```markdown
## Eklenen üniversite/bölüm
- Üniversite: ...
- Bölüm: ...
- URL: `/...`

## Resmi kaynak
- Link: https://...
- Hangi sayfa/madde: ...

## Checklist
- [ ] `npm run validate` yeşil
- [ ] Lokal olarak `npm run dev` ile test ettim, sınır değerleri (örn. 89, 90, 89.5) doğru çalışıyor
- [ ] Not aralıkları **resmi kaynağa** dayanıyor (tahmin değil)
- [ ] `metadata.sourceUrl` doldurdum
```

---

## Sık sorulanlar

**Birden fazla bölüm aynı anda ekleyebilir miyim?**
Evet, ama her bölüm ayrı PR olarak gelsin. Review kolaylaşır.

**Aynı üniversitenin farklı fakültelerinde not aralıkları farklı, ne yapayım?**
Her bölüm ayrı bir JSON. Aynı üni klasörü altında istediğin kadar bölüm olabilir.

**Bölümümün kendine özel quiz/ödev ağırlıkları var, eklenebilir mi?**
Şu an `examWeights` sadece vize/final içeriyor (v2 kapsamı). Quiz/ödev gibi ek bileşenler için issue açabilirsin — v3'te düşünülecek.

**Not aralığı 0-100'ü tam kapsamıyorsa ne olur?**
`npm run validate` reddeder ve nerede boşluk olduğunu söyler. Düzelt, yeniden çalıştır.

**Kaynak link bulamıyorum, ne yapayım?**
O bölümü ekleme. Yanlış veri, hiç olmamasından daha kötü.

---

## Sorular?

[GitHub Issues](https://github.com/SeferCinar/examApp/issues) üzerinden sorabilirsin.
