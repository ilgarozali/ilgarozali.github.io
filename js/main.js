/* ============================================================
   Ilgar Özali — site etkileşimleri
   (parçacıklar · birim çember · θ göstergesi · galeri · lightbox)
   ============================================================ */
(function () {
  "use strict";

  const AZ_HAREKET = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Süzülen parçacıklar (videolardaki doku) ---------- */
  (function parcaciklar() {
    if (AZ_HAREKET) return;
    const tuval = document.getElementById("parcaciklar");
    const ctx = tuval.getContext("2d");
    const N = 34;
    let W, H, dpr;
    let noktalar = [];

    function boyutla() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      tuval.width = W * dpr;
      tuval.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function kur() {
      noktalar = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.8 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.09,
        a: 0.05 + Math.random() * 0.07,
        faz: Math.random() * Math.PI * 2,
        hiz: 0.3 + Math.random() * 0.5
      }));
    }

    let sonZaman = performance.now();
    function ciz(zaman) {
      const dt = Math.min((zaman - sonZaman) / 16.7, 3);
      sonZaman = zaman;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#F5F7FA";
      for (const p of noktalar) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5;
        const parilti = 0.5 + 0.5 * Math.sin(zaman / 1000 * p.hiz + p.faz);
        ctx.globalAlpha = p.a * (0.45 + 0.55 * parilti);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(ciz);
    }

    boyutla(); kur();
    window.addEventListener("resize", () => { boyutla(); kur(); });
    requestAnimationFrame(ciz);
  })();

  /* ---------- 2. Kahraman: canlı birim çember ---------- */
  (function birimCember() {
    const svg = document.getElementById("birim-cember");
    if (!svg) return;

    const CX = 280, CY = 280, R = 200, ARC_R = 44;
    const el = (id) => document.getElementById(id);
    const yay = el("uc-arc"), cosL = el("uc-cos"), sinL = el("uc-sin"),
          yaricap = el("uc-yaricap"), nokta = el("uc-nokta"), glow = el("uc-glow"),
          pL = el("uc-p-l"), rL = el("uc-r-l"), sinEt = el("uc-sin-l"),
          cosEt = el("uc-cos-l"), thetaEt = el("uc-theta-l");

    function yerlestir(theta) {
      const c = Math.cos(theta), s = Math.sin(theta);
      const px = CX + R * c, py = CY - R * s;

      yaricap.setAttribute("x2", px); yaricap.setAttribute("y2", py);
      cosL.setAttribute("x2", CX + R * c); cosL.setAttribute("y2", CY);
      sinL.setAttribute("x1", px); sinL.setAttribute("y1", CY);
      sinL.setAttribute("x2", px); sinL.setAttribute("y2", py);
      nokta.setAttribute("cx", px); nokta.setAttribute("cy", py);
      glow.setAttribute("cx", px); glow.setAttribute("cy", py);

      // açı yayı (0'dan θ'ya, saat yönünün tersi)
      const tn = ((theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const ax = CX + ARC_R * Math.cos(tn), ay = CY - ARC_R * Math.sin(tn);
      const buyuk = tn > Math.PI ? 1 : 0;
      yay.setAttribute("d", `M ${CX + ARC_R} ${CY} A ${ARC_R} ${ARC_R} 0 ${buyuk} 0 ${ax} ${ay}`);

      // etiketler
      pL.setAttribute("x", CX + (R + 26) * c); pL.setAttribute("y", CY - (R + 26) * s);
      rL.setAttribute("x", CX + 112 * c - 20 * s); rL.setAttribute("y", CY - 112 * s - 20 * c);
      // yarıçap dikeye yaklaşınca "r = 1", "sin θ" ile çakışır — geçici gizle
      rL.style.opacity = Math.abs(c) < 0.32 ? "0" : "1";
      sinEt.setAttribute("x", px + (c >= 0 ? 46 : -46)); sinEt.setAttribute("y", (CY + py) / 2);
      cosEt.setAttribute("x", (CX + px) / 2); cosEt.setAttribute("y", CY + (s >= 0 ? 27 : -27));
      thetaEt.setAttribute("x", CX + 66 * Math.cos(tn / 2)); thetaEt.setAttribute("y", CY - 66 * Math.sin(tn / 2));
    }

    let theta = 0.9; // videodaki başlangıç açısı (~52°)
    yerlestir(theta);

    // çizilme animasyonunu başlat
    requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.add("cizildi")));

    if (AZ_HAREKET) return; // azaltılmış harekette sabit kalır

    let aktif = true, sonZaman = null;
    const HIZ = 0.21; // rad/sn — sakin bir tur ~30 sn

    function dongu(zaman) {
      if (sonZaman !== null && aktif) {
        theta += HIZ * Math.min((zaman - sonZaman) / 1000, 0.1);
        yerlestir(theta);
      }
      sonZaman = zaman;
      requestAnimationFrame(dongu);
    }
    requestAnimationFrame(dongu);

    new IntersectionObserver((giris) => { aktif = giris[0].isIntersecting; })
      .observe(svg);
  })();

  /* ---------- 3. θ kaydırma göstergesi ---------- */
  (function thetaMetre() {
    const deger = document.getElementById("theta-deger");
    const dot = document.getElementById("theta-nokta");
    if (!deger || !dot) return;
    let bekliyor = false;

    function guncelle() {
      const kayan = document.documentElement.scrollTop || document.body.scrollTop;
      const boy = document.documentElement.scrollHeight - window.innerHeight;
      const oran = boy > 0 ? Math.min(Math.max(kayan / boy, 0), 1) : 0;
      deger.textContent = "θ = " + (oran * 2).toFixed(2) + "π";
      const a = oran * Math.PI * 2;
      dot.setAttribute("cx", (10 + 7.5 * Math.cos(a)).toFixed(2));
      dot.setAttribute("cy", (10 - 7.5 * Math.sin(a)).toFixed(2));
      bekliyor = false;
    }

    window.addEventListener("scroll", () => {
      if (!bekliyor) { bekliyor = true; requestAnimationFrame(guncelle); }
    }, { passive: true });
    guncelle();
  })();

  /* ---------- 4. Galeri (js/videos.js verisinden) ---------- */
  const galeri = document.getElementById("galeri");
  const onizlemeler = [];

  if (galeri && typeof VIDEOLAR !== "undefined" && VIDEOLAR.length) {
    const oynatSvg = '<svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true"><path d="M4.5 2.5v11l8.5-5.5z" fill="currentColor"/></svg>';

    function telefonHtml(v, i) {
      return (
        '<button class="telefon" data-index="' + i + '" aria-label="' + v.baslik + ' — sesli izle">' +
          '<span class="telefon-ekran">' +
            '<video muted loop playsinline preload="metadata" data-onizleme' +
              ' poster="' + (v.poster || "") + '" src="' + v.src + '"></video>' +
            '<span class="oynat-rozeti"><span>' + oynatSvg + "</span></span>" +
          "</span>" +
        "</button>"
      );
    }

    const one = VIDEOLAR[0];
    let html =
      '<div class="one-cikan reveal">' +
        '<div class="telefon-sutun">' +
          telefonHtml(one, 0) +
          '<p class="telefon-notu">SESSİZ ÖNİZLEME · SESLİ İZLEMEK İÇİN TIKLA</p>' +
        "</div>" +
        '<div class="video-meta">' +
          (one.formulHtml ? '<p class="formul">' + one.formulHtml + "</p>" : "") +
          "<h3>" + one.baslik + "</h3>" +
          '<p class="aciklama">' + one.aciklama + "</p>" +
          '<div class="etiket-satiri">' +
            one.etiketler.map((e) => '<span class="etiket">' + e + "</span>").join("") +
          "</div>" +
          '<div class="cta-satiri"><button class="btn btn-birincil" data-index="0">' +
            oynatSvg + " Sesli izle</button></div>" +
        "</div>" +
      "</div>";

    if (VIDEOLAR.length > 1) {
      html += '<div class="galeri-izgara">' +
        VIDEOLAR.slice(1).map((v, k) =>
          '<div class="telefon-sutun reveal">' +
            telefonHtml(v, k + 1) +
            '<p class="izgara-baslik">' + v.baslik + "</p>" +
          "</div>"
        ).join("") +
      "</div>";
    }

    galeri.innerHTML = html;

    // görünüme girince sessiz önizleme
    galeri.querySelectorAll("[data-onizleme]").forEach((vid) => {
      onizlemeler.push(vid);
      if (AZ_HAREKET) return;
      new IntersectionObserver((giris) => {
        giris.forEach((g) => {
          if (g.isIntersecting) { vid.play().catch(() => {}); }
          else { vid.pause(); }
        });
      }, { threshold: 0.35 }).observe(vid);
    });
  }

  /* ---------- 5. Işık kutusu (sesli oynatıcı) ---------- */
  (function isikKutusu() {
    const kutu = document.getElementById("isik-kutusu");
    const video = document.getElementById("isik-video");
    const baslik = document.getElementById("isik-baslik");
    const kapatBtn = kutu.querySelector(".isik-kapat");
    let sonOdak = null;

    function ac(v) {
      sonOdak = document.activeElement;
      if (video.getAttribute("src") !== v.src) {
        video.setAttribute("src", v.src);
        if (v.poster) video.setAttribute("poster", v.poster);
      }
      baslik.textContent = v.baslik + " · 🔊 sesli";
      kutu.hidden = false;
      document.body.style.overflow = "hidden";
      onizlemeler.forEach((o) => o.pause());
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {});
      kapatBtn.focus();
    }

    function kapat() {
      video.pause();
      kutu.hidden = true;
      document.body.style.overflow = "";
      if (!AZ_HAREKET) onizlemeler.forEach((o) => o.play().catch(() => {}));
      if (sonOdak) sonOdak.focus();
    }

    document.addEventListener("click", (e) => {
      const acici = e.target.closest("[data-index]");
      if (acici) { ac(VIDEOLAR[+acici.dataset.index]); return; }
      const slugla = e.target.closest("[data-video-ac]");
      if (slugla) {
        const v = VIDEOLAR.find((x) => x.slug === slugla.dataset.videoAc) || VIDEOLAR[0];
        if (v) ac(v);
        return;
      }
      if (e.target.closest("[data-kapat]")) kapat();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !kutu.hidden) kapat();
    });
  })();

  /* ---------- 6. Ses çipleri ---------- */
  (function sesCipleri() {
    const onbellek = {};
    document.querySelectorAll(".ses-cip").forEach((cip) => {
      cip.addEventListener("click", () => {
        const yol = cip.dataset.ses;
        if (!onbellek[yol]) onbellek[yol] = new Audio(yol);
        const ses = onbellek[yol];
        ses.currentTime = 0;
        ses.play().catch(() => {});
        cip.classList.remove("caliyor");
        void cip.offsetWidth; // animasyonu sıfırla
        cip.classList.add("caliyor");
      });
    });
  })();

  /* ---------- 7. Kaydırma ile belirme ---------- */
  (function belirmeler() {
    const hepsi = document.querySelectorAll(".reveal, .bolum-baslik");
    if (AZ_HAREKET) { hepsi.forEach((el) => el.classList.add("in")); return; }
    const gozcu = new IntersectionObserver((giris) => {
      giris.forEach((g) => {
        if (g.isIntersecting) { g.target.classList.add("in"); gozcu.unobserve(g.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    hepsi.forEach((el) => gozcu.observe(el));
  })();

  /* ---------- 8. Yıl ---------- */
  const yil = document.getElementById("yil");
  if (yil) yil.textContent = new Date().getFullYear();
})();
