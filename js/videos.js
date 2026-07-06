/* ============================================================
   ANİMASYON LİSTESİ
   Yeni animasyon eklemek için:
   1. MP4 dosyasını  videos/  klasörüne koy
   2. (İstersen) bir poster karesi (jpg) koy
   3. Aşağıdaki listeye yeni bir blok ekle — hepsi bu.
   İlk sıradaki video "öne çıkan" olarak büyük gösterilir,
   diğerleri altta ızgara halinde listelenir.
   ============================================================ */

const VIDEOLAR = [
  {
    slug: "trigonometrik-ozdeslik",
    baslik: "Trigonometrik Özdeşliğin İspatı",
    // formulHtml boş bırakılabilir; renkler: f-sin (turkuaz), f-cos (amber), f-esit (beyaz)
    formulHtml: '<span class="f-sin">sin²θ</span> + <span class="f-cos">cos²θ</span> <span class="f-esit">= 1</span>',
    aciklama:
      "Sinüs ve kosinüs neden hep 1'e tamamlanır? Birim çember üzerinde dönen bir " +
      "nokta ve Pisagor Teoremi ile, özdeşliğe 70 saniyede ulaşan görsel bir ispat.",
    src: "videos/trigonometrik-ozdeslik.mp4",
    poster: "videos/trigonometrik-ozdeslik.jpg",
    etiketler: ["70 SN", "9:16", "1080×1920", "60 FPS", "SESLİ"]
  }
  // Yeni video örneği:
  // ,{
  //   slug: "yeni-video",
  //   baslik: "Videonun Başlığı",
  //   formulHtml: "",
  //   aciklama: "Kısa açıklama.",
  //   src: "videos/yeni-video.mp4",
  //   poster: "videos/yeni-video.jpg",
  //   etiketler: ["60 SN", "9:16", "60 FPS"]
  // }
];
