# Soru Tahtası (prototip)

Tek dosyalık web uygulaması: `index.html`. Tarayıcıda açmak yeterli, kurulum yok.
Ekran kaydı için tasarlandı: sahne büyük, alt yazı kapalı, araç çubuğu sağ kenara gizli, sol alt köşe kamera için boş.

## Yapı (index.html içinde)
- `LESSONS`: `TRI` (üçgenin özellikleri, 15 adım) ve `POL` (2021 AYT polinom sorusu, 7 adım).
  Her ders bir `chapters` listesi: `{ name, cap (alt yazı), note (konuşma notu), t (başlangıç zamanı), preset? }`.
  `preset` varsa o adımda üçgen sabit bir örneğe geçer (ikizkenar, eşkenar, dik üçgen, kapanış).
- Oynatıcı: adımlar zaman çizelgesi üzerinde. `holds[i]` adımın bittiği an. İleri tuşu bir sonraki `hold`'a kadar oynatır.
- Sahne: `renderTri(t)` ve `renderPoly(t)` her karede SVG üretir. Üçgen için adım başına çizim `STEP[i](c)` fonksiyonları, `c` içinde köşeler, açılar, kenarlar, alan ve merkezler hazır.
- Alt bilgi metinleri `foot([...])` ile sağ alta yazılır (kamera sol altta olduğu için).
- Tahta: canvas (kalem, vurgu, silgi), yazı katmanı, lazer. Çizimler 0-1 aralığında normalize saklanır, bu yüzden yeniden boyutlandırmada bozulmaz.
- Görünümler: `full` (ayar), `shoot` (çekim), `clean` (yalnız sahne). Yerleşim: yan yana ya da animasyonun üstüne.

## Yeni ders eklemek
1. `chapters` listesini yaz (ad, alt yazı, konuşma notu, `t` = adım × 8 sn).
2. Ders türüne göre `STEP[i]` ya da kendi `render(t)` fonksiyonunu ekle.
3. `<select id="lesson">` içine seçenek ekle, `setLesson` içinde derse bağla.

## Kısayollar
→ / Boşluk ileri, ← geri, H görünüm, M yerleşim, C alt yazı, N notlar, P kalem, V vurgu, L lazer, E silgi, T yazı, D tut, Z geri al, X X temizle, 1-4 renk, F tam ekran.

## Bilinen eksikler
- Dokunmatik ekran ve kalem tabletinde denenmedi.
- Notlar tarayıcı depolamasında, başka cihaza taşınmaz.
- Tam ekran düğmesi claude.ai görüntüleyicisinde çalışmayabilir, kendi sayfasında çalışması beklenir.
- Matematik içeriği (ispatlar, sayısal ifadeler) çekimden önce gözden geçirilmeli.
