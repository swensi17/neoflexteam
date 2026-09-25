/**
 * #about-work — Team cards (1 rectangle + 2 squares).
 */
(function () {
  "use strict";

  var MARK = "data-neoflex-about";
  var VER = "team7";
  var PHOTO = "/neoflexteam/img/team/";
  var sectionEl = null;
  var lastLang = "";

  var I18N = {
    en: {
      num: "[ 01 / 09 ]",
      enTag: "TEAM",
      label: "OUR TEAM",
      title: "Meet neoflex",
      asadName: "Asad",
      asadRole: "Fullstack developer",
      asadText: "Built products at Yandex. Full cycle: web, API, bots and shipping.",
      sardorName: "Sardor",
      sardorRole: "Frontend developer",
      sardorText: "Interfaces, motion and clean UI that feel fast on every device.",
      shamsName: "Shams",
      shamsRole: "AI-specialists",
      shamsText: "People, hiring and keeping the team sharp.",
    },
    ru: {
      num: "[ 01 / 09 ]",
      enTag: "TEAM",
      label: "НАША КОМАНДА",
      title: "Команда neoflex",
      asadName: "Asad",
      asadRole: "Fullstack-разработчик",
      asadText: "Работал в Яндексе. Полный цикл: веб, API, боты и выкладка в прод.",
      sardorName: "Sardor",
      sardorRole: "Frontend-разработчик",
      sardorText: "Интерфейсы, анимация и чистый UI, который быстро работает везде.",
      shamsName: "Shams",
      shamsRole: "AI-specialists",
      shamsText: "Люди, найм и сильная команда.",
    },
    uz: {
      num: "[ 01 / 09 ]",
      enTag: "TEAM",
      label: "JAMOAMIZ",
      title: "neoflex jamoasi",
      asadName: "Asad",
      asadRole: "Fullstack dasturchi",
      asadText: "Yandexda ishlagan. To'liq sikl: web, API, botlar va prod.",
      sardorName: "Sardor",
      sardorRole: "Frontend dasturchi",
      sardorText: "Interfeys, animatsiya va tez ishlaydigan toza UI.",
      shamsName: "Shams",
      shamsRole: "AI-specialists",
      shamsText: "Odamlar, hiring va kuchli jamoa.",
    },
  };

  // Three equal square cards
  var CARDS = [
    {
      shape: "square",
      name: "asadName",
      role: "asadRole",
      text: "asadText",
      img: "asad.png",
      href: "https://t.me/Ashf555",
    },
    {
      shape: "square",
      name: "sardorName",
      role: "sardorRole",
      text: "sardorText",
      img: "sardor.png",
      href: "https://t.me/Ashf555",
    },
    {
      shape: "square",
      name: "shamsName",
      role: "shamsRole",
      text: "shamsText",
      img: "shams.png",
      href: "https://t.me/Ashf555",
    },
  ];

  function getLang() {
    var lang = localStorage.getItem("lang") || "ru";
    return I18N[lang] ? lang : "ru";
  }

  function t() {
    return I18N[getLang()];
  }

  function cardHtml(c) {
    return (
      '<article class="aw-card aw-card--' +
      c.shape +
      '">' +
      '  <div class="aw-card__photo">' +
      '    <img src="' +
      PHOTO +
      c.img +
      "?v=team7" +
      '" alt="" draggable="false" />' +
      "  </div>" +
      '  <div class="aw-card__copy">' +
      '    <p class="aw-card__role" data-i18n="' +
      c.role +
      '"></p>' +
      '    <h3 class="aw-card__title" data-i18n="' +
      c.name +
      '"></h3>' +
      '    <p class="aw-card__text" data-i18n="' +
      c.text +
      '"></p>' +
      '    <a class="aw-card__go" href="' +
      c.href +
      '" target="_blank" rel="noopener noreferrer" aria-label="Telegram">' +
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '        <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      "      </svg>" +
      "    </a>" +
      "  </div>" +
      "</article>"
    );
  }

  function buildSection() {
    var section = document.createElement("section");
    section.id = "about-work";
    section.className = "aw-section";
    section.setAttribute(MARK, "1");
    section.setAttribute("data-aw-ver", VER);

    section.innerHTML =
      '<div class="aw-inner">' +
      '  <div class="aw-topbar">' +
      '    <span class="aw-mono" data-i18n="num"></span>' +
      '    <span class="aw-mono" data-i18n="enTag"></span>' +
      "  </div>" +
      '  <header class="aw-head">' +
      '    <div class="aw-head__text">' +
      '      <p class="aw-label" data-i18n="label"></p>' +
      '      <h2 class="aw-title" data-i18n="title"></h2>' +
      "    </div>" +
      '    <span class="aw-big--head" aria-hidden="true">01</span>' +
      "  </header>" +
      '  <div class="aw-cols aw-cols--team">' +
      CARDS.map(cardHtml).join("") +
      "  </div>" +
      "</div>";
    return section;
  }

  function applyLang() {
    if (!sectionEl) return;
    var lang = getLang();
    if (lang === lastLang) return;
    lastLang = lang;
    var dict = t();
    sectionEl.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
  }

  function findHeroSection() {
    var home = document.getElementById("home");
    if (home) return home.closest("section") || home;
    var shader = document.getElementById("neoflex-hero-shader");
    if (shader) return shader.closest("section") || shader.parentElement;
    return null;
  }

  function isCorrectPlace(el) {
    if (!el || !el.parentNode) return false;
    var services = document.getElementById("services");
    var hero = findHeroSection();
    if (services && el.nextElementSibling === services && el.parentNode === services.parentNode)
      return true;
    if (!services && hero && el.previousElementSibling === hero && el.parentNode === hero.parentNode)
      return true;
    return false;
  }

  function killDrag(root) {
    if (!root || root.getAttribute("data-aw-nodrag") === "1") return;
    root.setAttribute("data-aw-nodrag", "1");
    root.addEventListener(
      "dragstart",
      function (e) {
        e.preventDefault();
        return false;
      },
      true
    );
    root.querySelectorAll("img, a").forEach(function (el) {
      el.setAttribute("draggable", "false");
    });
  }

  function ensurePlacement() {
    var services = document.getElementById("services");
    var hero = findHeroSection();
    if (!services && !hero) return false;

    var existing = document.querySelector("[" + MARK + '="1"]');
    if (
      existing &&
      (!existing.classList.contains("aw-section") || existing.getAttribute("data-aw-ver") !== VER)
    ) {
      existing.remove();
      existing = null;
      sectionEl = null;
      lastLang = "";
    }
    if (existing) sectionEl = existing;
    if (!sectionEl) {
      sectionEl = buildSection();
      lastLang = "";
    }

    if (!isCorrectPlace(sectionEl)) {
      if (services && services.parentNode) {
        services.parentNode.insertBefore(sectionEl, services);
      } else if (hero && hero.parentNode) {
        if (hero.nextSibling) hero.parentNode.insertBefore(sectionEl, hero.nextSibling);
        else hero.parentNode.appendChild(sectionEl);
      } else {
        return false;
      }
    }

    applyLang();
    killDrag(sectionEl);
    return true;
  }

  var tries = 0;
  function boot() {
    if (ensurePlacement()) return;
    tries += 1;
    if (tries < 50) setTimeout(boot, 120);
  }

  setInterval(function () {
    ensurePlacement();
  }, 400);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
