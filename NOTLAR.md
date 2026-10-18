# Elektro Haan – Notlar

## Klasör yapısı
```
elektro-haan/
  index.html              SEO etiketleri (NL), JSON-LD main.js tarafından doldurulur
  vite.config.js          base: './' (GitHub Pages alt yolu ve .be alan adı için)
  src/content/site.json   TÜM metinler ve işletme bilgileri (nl + tr + business + images)
  src/main.js             sayfayı site.json'dan çizer, dil değiştirici, form (mailto)
  src/style.css           renk token'ları (:root), açık/koyu tema, mobil öncelikli
  public/logo.jpeg        orijinal logo (beyaz zemin)
  public/logo-trim.png    kenar boşlukları kırpılmış logo (header ve hero'da kullanılır)
  public/favicon.png, og-image.png   logodan üretilmiş
  public/img/             FOTOĞRAFLAR buraya
  .github/workflows/deploy.yml   GitHub Pages yayını
```
Komutlar: `npm install`, `npm run dev` (yerel önizleme), `npm run build` (dist üretir).

## İçeriği değiştirme
Her şey `src/content/site.json` içinde:
- `business`: telefon, e-posta, adres, BTW, saatler, harita linki, `googleReviewsUrl`, `siteUrl` (alan adı belli olunca doldurun).
- `nl` ve `tr`: tüm metinler (hero, hizmetler, SSS, hakkında, form, footer).
- `images`: görsel yolları.
- `reviews.items` ve `projects.items` BOŞ. Dolu olunca bölüm otomatik görünür. Biçim:
  - yorum: `{ "text": "...", "author": "..." }`
  - iş: `{ "title": "...", "text": "...", "image": "img/is1.webp" }`

## Logo ve fotoğraflar
- Logo: `public/logo.jpeg` (orijinal). Değiştirirseniz `logo-trim.png`, `favicon.png`, `og-image.png` dosyalarını da yenileyin.
- Fotoğraflar `public/img/` içine konur, JSON'da yol `img/dosya.webp` şeklinde yazılır (başında `/` yok). WebP önerilir.
- Hero fotoğrafı: `images.hero`. Boşken hero'da logo kartı görünür. Hakkında fotoğrafı: `images.about` (boşken "Foto volgt / Fotoğraf gelecek" kutusu).

## GEÇİCİ stok fotoğraflar
- `public/img/hero.webp` ve `public/img/about.webp` Unsplash'tan alınmış GEÇİCİ stok fotoğraflardır (hero: eldivenli elektrikçi ve pano, hakkında: pense/alet). Gerçek fotoğraflarla değiştirin: aynı dosya adıyla üzerine yazın veya `images.hero` / `images.about` yolunu güncelleyin. Alt metinler `nl.hero.photoAlt`, `tr.hero.photoAlt`, `about.photoAlt` içindedir (gerçek fotoğrafta güncelleyin; hakkında için Hamza Bey'in adı).
- Kaynak, fotoğrafçı ve lisans listesi: `public/img/KAYNAKLAR.md`. Gerçek fotoğraf gelince o dosyayı ve listeyi güncelleyin.
- `projects.items` ve `reviews.items` bilerek boş bırakıldı: stok fotoğraf Hamza Bey'in işi gibi gösterilmemeli.

## Açık işler (brief'ten)
- 6-10 gerçek iş fotoğrafı, Hamza Bey'in fotoğrafı ve biyografisi.
- Google işletme profili linki ve izinli 2-3 gerçek yorum.
- Dil onayı (NL ana + TR ikinci dil), Hollandaca/Türkçe metinlerin Hamza Bey tarafından okunması.
- Hizmet listesi, çalışma bölgesi ve acil servis (7/24) teyidi.
- Alan adı ve `siteUrl`. Harita işaretçisi Duffel merkezine yakındır; tam adres için `mapEmbed` ayarlanabilir.
- Form şu an mailto kullanır (kullanıcının e-posta programını açar). İleride Netlify Forms veya benzeri düşünülebilir.

## GitHub'da yayınlama
1. HakanOfis hesabında yeni, **public** bir depo oluşturun (README eklemeyin).
2. Bu klasörde (elektro-haan, git kökü olduğunu `git rev-parse --show-toplevel` ile doğrulayın):
   ```
   git add .
   git commit -m "İlk sürüm"
   git branch -M main
   git remote add origin https://github.com/HakanOfis/DEPO-ADI.git
   git push -u origin main
   ```
3. Depoda Settings → Pages → Source: **GitHub Actions**.
4. Push sonrası Actions sekmesinde "Deploy to GitHub Pages" çalışır; adres `https://hakanofis.github.io/DEPO-ADI/` olur.

> Yayın kaynağı: Settings → Pages → Source = **GitHub Actions** olmalı. 'Deploy from a branch' seçilirse site beyaz açılır.

