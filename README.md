# Ilgar Özali — Matematik Animasyonları

Kişisel portfolyo sitesi: Manim ile üretilmiş matematik animasyonları,
üretim süreci ve iletişim. Saf HTML + CSS + JS — build adımı yok.

## Yeni animasyon ekleme

1. MP4 dosyasını `videos/` klasörüne koy (9:16 önerilir)
2. İstersen bir poster karesi (jpg) ekle:
   `ffmpeg -ss 40 -i video.mp4 -frames:v 1 -q:v 3 poster.jpg`
3. `js/videos.js` içindeki listeye yeni bir blok ekle (örneği dosyada)
4. Commit + push — GitHub Pages otomatik günceller

## Düzenlenecek yerler

`index.html` içinde `DÜZENLE` diye ara: ad, hakkımda metni ve
sosyal medya bağlantıları oradan güncellenir.
