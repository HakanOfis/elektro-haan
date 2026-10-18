import '@fontsource/archivo/700.css';
import '@fontsource/archivo/900.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import './style.css';
import site from './content/site.json';

const B = site.business;
const LANGS = ['nl', 'tr'];

/* Afbeeldingen staan in public/img/ ; in site.json staat het pad relatief, bv. "img/hero.webp" */

const ICONS = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8a2.1 2.1 0 0 1-3-3l8-8z"/><path d="M14 7l3-3"/>',
  panel: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h3M8 12h3M8 16h3M15 8h1M15 12h1M15 16h1"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.5h6c0-1.2.4-1.9 1-2.5A6 6 0 0 0 12 3z"/>',
  cable: '<path d="M4 8h6a4 4 0 0 1 4 4v0a4 4 0 0 0 4 4h2M4 16h3M17 8h3"/><circle cx="4" cy="8" r="1"/><circle cx="20" cy="16" r="1"/>',
  camera: '<path d="M3 8h12a2 2 0 0 1 2 2v6H3zM17 11l4-2v8l-4-2"/>',
  bell: '<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  wa: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9 9c0 3 3 6 6 6l1.2-1.5-2-1-1 .7a4 4 0 0 1-1.9-1.9l.7-1-1-2z"/>'
};

const icon = (n) =>
  `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ICONS.bolt}</svg>`;

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function getLang() {
  try {
    const s = localStorage.getItem('lang');
    if (LANGS.includes(s)) return s;
  } catch (e) { /* localStorage kan geblokkeerd zijn */ }
  return 'nl';
}
function saveLang(l) {
  try { localStorage.setItem('lang', l); } catch (e) { /* negeren */ }
}

const photo = (src, alt, label, cls = '') =>
  src
    ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" />`
    : `<div class="ph ${cls}" role="img" aria-label="${esc(label)}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-9 8"/></svg><span>${esc(label)}</span></div>`;

function render(lang) {
  const t = site[lang];
  const ui = t.ui;
  const addr = `${B.street}, ${B.postalCode} ${B.city}`;

  document.documentElement.lang = lang;
  document.title = t.meta.title;
  document.querySelector('meta[name="description"]').setAttribute('content', t.meta.description);

  const hasProjects = t.projects.items.length > 0;
  const hasReviews = t.reviews.items.length > 0;

  const nav = t.nav
    .map((n) => `<a href="#${n.id}">${esc(n.label)}</a>`)
    .join('');

  const langSwitch = LANGS.map(
    (l) =>
      `<button type="button" class="lang-btn" data-lang="${l}" aria-pressed="${l === lang}" lang="${l}">${l.toUpperCase()}</button>`
  ).join('');

  const serviceOptions = t.services.items
    .map((s) => `<option value="${esc(s.title)}">${esc(s.title)}</option>`)
    .join('');

  const f = t.contact.form;

  document.getElementById('app').innerHTML = `
  <a class="skip" href="#main">${esc(ui.skip)}</a>
  <header class="topbar">
    <div class="wrap topbar-in">
      <a class="brand" href="#top" aria-label="${esc(B.name)}"><span class="badge"><img src="${esc(site.images.logoTrim)}" alt="" width="42" height="52" /></span><span class="brand-name">${esc(B.name)}</span></a>
      <nav class="nav" aria-label="${esc(ui.menu)}">${nav}</nav>
      <a class="top-phone" href="tel:${B.phoneRaw}">${icon('phone')}<span>${esc(B.phone)}</span></a>
      <div class="lang" role="group" aria-label="${esc(ui.lang)}">${langSwitch}</div>
    </div>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <div class="wrap hero-in">
        <div class="hero-text">
          <p class="eyebrow">${esc(B.name)} · ${esc(B.city)}</p>
          <h1>${esc(t.hero.title)}</h1>
          <p class="lead">${esc(t.hero.text)}</p>
          <div class="btns">
            <a class="btn btn-primary" href="tel:${B.phoneRaw}">${icon('phone')}${esc(t.hero.ctaCall)}</a>
            <a class="btn btn-ghost" href="${B.whatsapp}" target="_blank" rel="noopener">${icon('wa')}${esc(t.hero.ctaWhatsapp)}</a>
          </div>
        </div>
        <div class="hero-media">${site.images.hero ? photo(site.images.hero, B.name, ui.photoSoon, 'hero-img') : `<div class="logo-card"><img src="${esc(site.images.logoTrim)}" alt="${esc(B.name)}" width="837" height="1029" decoding="async" /></div>`}</div>
      </div>
    </section>

    <section class="trust" aria-label="${esc(B.name)}">
      <ul class="wrap trust-list">
        ${t.trust.map((i) => `<li>${icon(i.icon)}<div><strong>${esc(i.title)}</strong><span>${esc(i.text)}</span></div></li>`).join('')}
      </ul>
    </section>

    <section class="section" id="diensten">
      <div class="wrap">
        <h2>${esc(t.services.title)}</h2>
        <p class="intro">${esc(t.services.intro)}</p>
        <ul class="grid">
          ${t.services.items.map((s) => `<li class="card">${icon(s.icon)}<h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="section alt" id="werkwijze">
      <div class="wrap">
        <h2>${esc(t.steps.title)}</h2>
        <ol class="steps">
          ${t.steps.items.map((s, i) => `<li><span class="num" aria-hidden="true">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}
        </ol>
      </div>
    </section>

    ${hasProjects ? `
    <section class="section" id="werk">
      <div class="wrap">
        <h2>${esc(t.projects.title)}</h2>
        <ul class="grid projects">
          ${t.projects.items.map((p) => `<li class="card">${photo(p.image, p.title, ui.photoSoon, 'proj-img')}<h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('')}
        </ul>
      </div>
    </section>` : ''}

    ${hasReviews ? `
    <section class="section alt" id="reviews">
      <div class="wrap">
        <h2>${esc(t.reviews.title)}</h2>
        <ul class="grid">
          ${t.reviews.items.map((r) => `<li class="card"><blockquote>“${esc(r.text)}”</blockquote><p class="who">${esc(r.author)}</p></li>`).join('')}
        </ul>
        ${B.googleReviewsUrl ? `<p><a href="${esc(B.googleReviewsUrl)}" target="_blank" rel="noopener">Google</a></p>` : ''}
      </div>
    </section>` : ''}

    <section class="section" id="faq">
      <div class="wrap narrow">
        <h2>${esc(t.faq.title)}</h2>
        ${t.faq.items.map((q) => `<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('')}
      </div>
    </section>

    <section class="section alt" id="over">
      <div class="wrap about">
        <div>
          <h2>${esc(t.about.title)}</h2>
          ${t.about.text.map((p) => `<p>${esc(p)}</p>`).join('')}
        </div>
        <div>${photo(site.images.about, t.about.photoAlt, ui.photoSoon, 'about-img')}</div>
      </div>
    </section>

    <section class="section" id="contact">
      <div class="wrap contact">
        <div>
          <h2>${esc(t.contact.title)}</h2>
          <p class="intro">${esc(t.contact.intro)}</p>
          <ul class="info">
            <li>${icon('phone')}<div><span>${esc(t.contact.labels.phone)}</span><a href="tel:${B.phoneRaw}">${esc(B.phone)}</a></div></li>
            <li>${icon('wa')}<div><span>WhatsApp</span><a href="${B.whatsapp}" target="_blank" rel="noopener">${esc(B.phone)}</a></div></li>
            <li>${icon('mail')}<div><span>${esc(t.contact.labels.email)}</span><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></div></li>
            <li>${icon('pin')}<div><span>${esc(t.contact.labels.address)}</span>${esc(addr)}</div></li>
            <li>${icon('clock')}<div><span>${esc(t.contact.labels.hours)}</span>${esc(t.contact.hoursText)}</div></li>
            <li>${icon('bolt')}<div><span>${esc(t.contact.labels.area)}</span>${esc(t.contact.areaText)}</div></li>
          </ul>
        </div>
        <form id="form" class="form" novalidate>
          <label>${esc(f.name)}<input name="name" autocomplete="name" required /></label>
          <label>${esc(f.phone)}<input name="phone" type="tel" autocomplete="tel" required /></label>
          <label>${esc(f.service)}
            <select name="service"><option value="">${esc(f.servicePlaceholder)}</option>${serviceOptions}<option value="${esc(f.other)}">${esc(f.other)}</option></select>
          </label>
          <label>${esc(f.message)}<textarea name="message" rows="4"></textarea></label>
          <div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off" /></label></div>
          <button class="btn btn-primary" type="submit">${icon('mail')}${esc(f.submit)}</button>
          <p class="note">${esc(f.note)}</p>
        </form>
      </div>
      <div class="wrap map">
        <iframe title="${esc(t.contact.mapTitle)}" src="${esc(B.mapEmbed)}" loading="lazy" referrerpolicy="no-referrer"></iframe>
        <a href="${esc(B.mapLink)}" target="_blank" rel="noopener">${esc(t.contact.mapOpen)}</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="wrap">
      <p><strong>${esc(t.footer.legal)}</strong></p>
      <p>${esc(addr)} · ${esc(t.footer.vat)} ${esc(B.vat)}</p>
      <p><a href="tel:${B.phoneRaw}">${esc(B.phone)}</a> · <a href="mailto:${esc(B.email)}">${esc(B.email)}</a></p>
      <p class="privacy">${esc(t.footer.privacy)}</p>
    </div>
  </footer>

  <div class="bar" role="group" aria-label="${esc(ui.ctaBar)}">
    <a class="btn btn-primary" href="tel:${B.phoneRaw}">${icon('phone')}${esc(ui.call)}</a>
    <a class="btn btn-wa" href="${B.whatsapp}" target="_blank" rel="noopener">${icon('wa')}${esc(ui.whatsapp)}</a>
  </div>`;

  bind(lang);
  jsonld(lang);
}

function bind(lang) {
  document.querySelectorAll('.lang-btn').forEach((b) =>
    b.addEventListener('click', () => {
      const l = b.dataset.lang;
      if (l === lang) return;
      saveLang(l);
      render(l);
    })
  );

  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    if (d.get('website')) return; // honeypot: bots vullen dit in
    if (!d.get('name') || !d.get('phone')) {
      form.reportValidity?.();
      form.querySelectorAll('[required]').forEach((i) => { if (!i.value) i.setAttribute('aria-invalid', 'true'); });
      return;
    }
    const f = site[lang].contact.form;
    const body = [
      `${f.name}: ${d.get('name')}`,
      `${f.phone}: ${d.get('phone')}`,
      `${f.service}: ${d.get('service') || '-'}`,
      '',
      d.get('message') || ''
    ].join('\n');
    window.location.href = `mailto:${B.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
  });
}

function jsonld(lang) {
  const t = site[lang];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: B.name,
    alternateName: B.nameTr,
    description: t.meta.description,
    telephone: B.phoneRaw,
    email: B.email,
    vatID: B.vat,
    founder: { '@type': 'Person', name: B.legalName },
    address: {
      '@type': 'PostalAddress',
      streetAddress: B.street,
      postalCode: B.postalCode,
      addressLocality: B.city,
      addressCountry: B.country
    },
    areaServed: { '@type': 'City', name: B.city },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    ...(B.siteUrl ? { url: B.siteUrl } : {})
  };
  document.getElementById('jsonld').textContent = JSON.stringify(data);
}

render(getLang());
