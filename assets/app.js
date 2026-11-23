/* =========================================================================
   SITE ENGINE  -  builds the pages from the files in content/ and data/
   -------------------------------------------------------------------------
   You normally don't need to edit this file. Page text lives in content/,
   and settings/lists live in data/.
   Pages:    #/ (home)   #/research   #/teaching   #/code
   Language: chosen with the EN/ES buttons. A visitor whose browser is in
   Spanish sees Spanish automatically. A link can force it: ?lang=es
   ========================================================================= */

(function () {
  "use strict";

  // ----------------------------------------------------------------------
  // 1. Interface words in both languages
  // ----------------------------------------------------------------------
  const UI = {
    en: {
      nav: { home: "Home", research: "Research", teaching: "Teaching", code: "Code & Data", cv: "CV" },
      titles: { research: "Research", teaching: "Teaching", code: "Code & Data" },
      toolkit: "Toolkit",
      disclaimer: "This is a personal page. Its content does not represent the views of the institutions I am affiliated with.",
      error: "This page could not be loaded."
    },
    es: {
      nav: { home: "Inicio", research: "Investigación", teaching: "Docencia", code: "Código y datos", cv: "CV" },
      titles: { research: "Investigación", teaching: "Docencia", code: "Código y datos" },
      toolkit: "Herramientas",
      disclaimer: "Esta es una página personal. Su contenido no representa la opinión de las instituciones a las que estoy afiliado.",
      error: "No se pudo cargar esta página."
    }
  };
  const PAGES = ["home", "research", "teaching", "code"];
  const S = window.SITE;

  // ----------------------------------------------------------------------
  // 2. Language: ?lang=  →  saved choice  →  browser language  →  English
  // ----------------------------------------------------------------------
  function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "es") return fromUrl;
    try { const saved = localStorage.getItem("lang"); if (saved === "en" || saved === "es") return saved; } catch (e) {}
    return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  }
  let lang = initialLang();

  function setLang(next) {
    lang = next;
    try { localStorage.setItem("lang", next); } catch (e) {}
    render(false);
  }
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // ----------------------------------------------------------------------
  // 3. Small helpers
  // ----------------------------------------------------------------------
  const t = obj => (obj && typeof obj === "object" && !Array.isArray(obj)) ? (obj[lang] ?? obj.en) : obj;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const mdCache = {};
  async function loadMarkdown(page) {
    const key = `${lang}/${page}`;
    if (!mdCache[key]) {
      const res = await fetch(`content/${lang}/${page}.md`, { cache: "no-cache" });
      if (!res.ok) throw new Error(res.status);
      mdCache[key] = await res.text();
    }
    return mdCache[key];
  }

  // Line icons (24 x 24) for the profile links
  const ICON = {
    cv: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    orcid: '<circle cx="12" cy="12" r="9.5"/><path d="M8.5 10v6.5M8.5 7.4v.1M11.5 16.5V7.8h2.2a4.35 4.35 0 0 1 0 8.7z"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

  // ----------------------------------------------------------------------
  // 4. Home: left column with photo, name, titles and links
  // ----------------------------------------------------------------------
  function profileHTML() {
    const links = [
      ["cv", "CV", S.cv], ["orcid", "ORCID", S.orcid], ["github", "GitHub", S.github],
      ["linkedin", "LinkedIn", S.linkedin], ["email", "Email", S.email && `mailto:${S.email}`]
    ].filter(([, , href]) => href);
    return `<aside class="profile">
      <img class="photo" src="images/photo.jpg" alt="${esc(S.name)}">
      <h1>${esc(S.name)}</h1>
      ${S.titles.map(x => `<p class="ptitle">${esc(t(x))}</p>`).join("")}
      <p class="ploc">${esc(S.location)}</p>
      <div class="plinks">${links.map(([k, label, href]) =>
        `<a href="${href}" ${k === "email" ? "" : 'target="_blank" rel="noopener"'} title="${label}" aria-label="${label}">${icon(k)}</a>`).join("")}</div>
    </aside>`;
  }

  // ----------------------------------------------------------------------
  // 5. Toolkit cards (Code & Data page)
  // ----------------------------------------------------------------------
  const TK_ICONS = {
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    flow: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="12" r="2.5"/><path d="M6 8.5v7M8.3 7.2 15.7 11M8.3 16.8l7.4-3.8"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'
  };
  const tkIcon = name => `<span class="tk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${TK_ICONS[name] || TK_ICONS.code}</svg></span>`;

  function mountToolkit(el) {
    const L = window.LANGUAGES;
    const cards = (window.TOOLKIT || []).map(g => {
      const items = Array.isArray(g.items) ? g.items : (g.items[lang] || g.items.en);
      return `<div class="tk-card"><div class="tk-head">${tkIcon(g.icon)}<h3>${esc(t(g.title))}</h3></div>
        <div class="tk-items">${items.map(i => `<span>${esc(i)}</span>`).join("")}</div></div>`;
    });
    if (L) {
      cards.push(`<div class="tk-card"><div class="tk-head">${tkIcon("globe")}<h3>${esc(t(L.title))}</h3></div>
        <div class="tk-langs">${L.list.map(x => `<div class="tk-lang"><div><b>${esc(t(x.name))}</b><small>${esc(t(x.note))}</small></div>
          <div class="tk-dots" aria-label="${x.level} / 5">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= x.level ? "on" : ""}"></i>`).join("")}</div></div>`).join("")}</div></div>`);
    }
    el.innerHTML = `<h2>${UI[lang].toolkit}</h2><div class="tk-grid">${cards.join("")}</div>`;
  }

  const BLOCKS = { toolkit: mountToolkit };

  // ----------------------------------------------------------------------
  // 6. Page rendering
  // ----------------------------------------------------------------------
  function currentPage() {
    const p = location.hash.replace(/^#\/?/, "").split("?")[0];
    return PAGES.includes(p) ? p : "home";
  }

  function renderChrome(page) {
    const U = UI[lang];
    document.documentElement.lang = lang;
    const items = PAGES.map(p => `<a href="#/${p === "home" ? "" : p}" class="${p === page ? "on" : ""}">${U.nav[p]}</a>`);
    items.push(`<a href="${S.cv}" target="_blank" rel="noopener">${U.nav.cv}</a>`);
    document.getElementById("nav").innerHTML = items.join("");
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    document.getElementById("footer").innerHTML = `<div class="wrap">
      <p><b>${esc(S.name)}</b> · <a href="mailto:${S.email}">${esc(S.email)}</a> · ${esc(S.location)}</p>
      <p class="disclaimer">${U.disclaimer}</p></div>`;
    document.title = page === "home" ? `${S.name} · ${t(S.titles[0])}` : `${U.titles[page]} · ${S.name}`;
  }

  async function render(scrollTop) {
    const page = currentPage();
    renderChrome(page);
    let html;
    try {
      html = marked.parse(await loadMarkdown(page));
    } catch (e) {
      html = `<p>${UI[lang].error}</p>`;
    }
    // {{name}} on its own line becomes a block (e.g. {{toolkit}})
    html = html.replace(/<p>\s*\{\{\s*(\w+)\s*\}\}\s*<\/p>/g, '<div class="block" data-block="$1"></div>');

    const app = document.getElementById("app");
    app.innerHTML = page === "home"
      ? `<div class="home">${profileHTML()}<div class="prose">${html}</div></div>`
      : `<div class="prose"><h1 class="page-title">${UI[lang].titles[page]}</h1>${html}</div>`;
    app.querySelectorAll("[data-block]").forEach(el => { const fn = BLOCKS[el.dataset.block]; if (fn) fn(el); });
    // Links to other websites and PDFs open in a new tab
    app.querySelectorAll(".prose a[href^='http'], .prose a[href$='.pdf']").forEach(a => { a.target = "_blank"; a.rel = "noopener"; });
    if (scrollTop) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", () => render(true));
  render(false);
})();
