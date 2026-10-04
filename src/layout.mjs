import { site, nav, categories, products, growing, team, photos } from './config.mjs';

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

// ---------- 相対リンク（どこに置いても動くように） ----------
export function makeCtx(pagePath, preview) {
  const depth = pagePath.split('/').filter(Boolean).length - (pagePath.endsWith('.html') ? 1 : 0);
  const up = depth ? '../'.repeat(depth) : './';
  const u = (p) => {
    if (/^(https?:|mailto:|tel:|#)/.test(p)) return p;
    const [pth, hash] = p.split('#');
    let rel = up + pth.replace(/^\//, '');
    if (preview && (rel.endsWith('/') || rel === '')) rel += 'index.html';
    if (rel === './') rel = preview ? './index.html' : './';
    return rel + (hash ? '#' + hash : '');
  };
  const img = (f) => u('/assets/img/' + f);
  return { path: pagePath, u, img, preview };
}
export const photo = (c, key) => c.img(photos[key]);

// ---------- アイコン ----------
const ICONS = {
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  form: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  leaf: '<path d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19z"/><path d="M5 19 13 11"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10.5V4a1.5 1.5 0 0 1 3 0v7"/><path d="M14 10.5V5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5A6.5 6.5 0 0 1 4 16.4L3 13.5a1.5 1.5 0 0 1 2.6-1.4L8 15"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  fire: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 7-1-1-2-2-2-4-2 2-3 5-3 9 0 4 3 7 7 7z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  basket: '<path d="M3 10h18l-2 10H5z"/><path d="m8 10 4-6 4 6"/>',
};
export const icon = (n) => `<svg class="ico" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

// 写真のない品目用の小さなイラスト
const PICS = {
  potato: '<svg viewBox="0 0 120 90" aria-hidden="true"><ellipse cx="62" cy="50" rx="44" ry="30" fill="#d9b382" stroke="#5a4030" stroke-width="3"/><ellipse cx="40" cy="58" rx="22" ry="16" fill="#b8475f" stroke="#5a4030" stroke-width="3"/><g fill="#5a4030"><circle cx="70" cy="40" r="2.5"/><circle cx="86" cy="55" r="2.5"/><circle cx="58" cy="62" r="2"/><circle cx="34" cy="54" r="2"/></g></svg>',
  garlic: '<svg viewBox="0 0 120 90" aria-hidden="true"><path d="M60 14c-6 10-34 18-34 46 0 16 16 24 34 24s34-8 34-24c0-28-28-36-34-46z" fill="#f3ead8" stroke="#5a4030" stroke-width="3"/><path d="M60 20c-6 18-14 34-10 62M60 20c6 18 14 34 10 62" stroke="#c9b48c" stroke-width="2.5" fill="none"/><path d="M60 14V4" stroke="#5f8a4a" stroke-width="4" stroke-linecap="round"/><path d="M100 30c6 6 8 16 2 26-6 8-12 4-10-4 2-6 2-12 8-22z" fill="#c8323a" stroke="#5a4030" stroke-width="2.5"/></svg>',
};
export const pic = (k) => `<div class="pic pic--${k}">${PICS[k] || ''}</div>`;

// ---------- 構造化データ ----------
export function schemaOrg() {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': site.url + '/#farm',
    name: `${site.name}（${site.nameEn}）`,
    alternateName: [site.tagline, 'Inakayasai Kagoshima'],
    url: site.url + '/',
    logo: site.url + '/assets/img/logo.png',
    image: site.url + '/assets/img/' + photos.hero,
    description: '鹿児島県薩摩川内市の小さな農家。農薬・除草剤を栽培期間中使わずに育てたサツマイモ、ジャガイモ、にんにく、唐辛子を農家から直接お届けします。',
    address: { '@type': 'PostalAddress', addressRegion: site.pref, addressLocality: site.city, addressCountry: 'JP' },
    founder: { '@type': 'Person', name: 'Aki' },
    sameAs: [site.instagram].filter(Boolean),
  };
  if (site.email) o.email = site.email;
  if (site.phone) o.telephone = site.phone;
  return o;
}
export function schemaFaq(list) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
}
const AVAIL = { open: 'InStock', season: 'OutOfStock', few: 'LimitedAvailability' };
export function schemaProducts(list, image) {
  return list.filter((p) => p.price).map((p) => ({
    '@context': 'https://schema.org', '@type': 'Product',
    name: `${p.name}${p.weight ? ' ' + p.weight : ''}（鹿児島県薩摩川内市産）`,
    description: [p.note, growing[p.grow].labels.join('・')].filter(Boolean).join(' '),
    image: site.url + '/assets/img/' + image,
    brand: { '@type': 'Brand', name: site.name },
    offers: { '@type': 'Offer', price: p.price, priceCurrency: 'JPY', availability: 'https://schema.org/' + AVAIL[p.status], seller: { '@id': site.url + '/#farm' } },
  }));
}
function schemaCrumbs(crumbs) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site.url + p })) };
}

// ---------- ご注文の導線 ----------
export const orderHref = (c) => site.formUrl || c.u('/order/');
const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');
export const orderBtn = (c, label = 'ご注文・お問い合わせ', cls = 'btn btn--imo') => `<a class="${cls}" href="${orderHref(c)}"${ext(orderHref(c))}>${label}${icon('arrow')}</a>`;

export function contactButtons(c, big = false) {
  const b = [];
  if (site.formUrl) b.push(`<a class="btn btn--imo${big ? ' btn--lg' : ''}" href="${site.formUrl}" target="_blank" rel="noopener">${icon('form')}ご注文フォーム</a>`);
  if (site.email) b.push(`<a class="btn btn--soil${big ? ' btn--lg' : ''}" href="mailto:${site.email}?subject=${encodeURIComponent('田舎野菜のご注文・お問い合わせ')}">${icon('mail')}メールで連絡</a>`);
  if (site.instagram) b.push(`<a class="btn btn--ghost${big ? ' btn--lg' : ''}" href="${site.instagram}" target="_blank" rel="noopener">${icon('insta')}InstagramのDM</a>`);
  return `<div class="btns">${b.join('')}</div>`;
}

export function ctaBand(c, { title, text } = {}) {
  return `<section class="cta-band"><div class="wrap cta-band__in">
  <div class="cta-band__txt"><p class="cta-band__h">${title || '畑から、そのままお届けします。'}</p>
  <p>${text || 'ご注文フォーム、メール、InstagramのDMのいずれかでご連絡ください。在庫と送料、お届けの目安をお知らせします。'}</p></div>
  <div class="cta-band__btns">${orderBtn(c, 'ご注文の方法を見る', 'btn btn--gold btn--lg')}${site.instagram ? `<a class="btn btn--ghost-light" href="${site.instagram}" target="_blank" rel="noopener">${icon('insta')}Instagram</a>` : ''}</div>
  </div></section>`;
}

export function faqBlock(list, open = 0) {
  return `<div class="faq">${list.map(([q, a], i) => `<details${i === open ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;
}

// ---------- 商品 ----------
const STATUS = { open: ['受付中', 'open'], season: ['次の収穫期にご案内', 'season'], few: ['少量のみ', 'few'] };
const yen = (n) => Number(n).toLocaleString('ja-JP');
export function growTags(g) {
  return `<ul class="grow-tags">${growing[g].labels.map((l) => `<li>${icon('leaf')}${esc(l)}</li>`).join('')}</ul><p class="grow-fert">肥料：${esc(growing[g].fert)}</p>`;
}
export function productTable(list) {
  return `<div class="ptable-wrap"><table class="ptable"><thead><tr><th scope="col">品目</th><th scope="col">内容量</th><th scope="col">価格</th><th scope="col">状況</th></tr></thead><tbody>${list.map((p) => {
    const [st, cls] = STATUS[p.status];
    const price = p.price && p.weight ? `<b>${yen(p.price)}円</b><small>${p.ship === 'komi' ? '送料込み' : '＋送料'}</small>` : '<span class="muted">お問い合わせください</span>';
    return `<tr><th scope="row">${esc(p.name)}${p.note ? `<small>${esc(p.note)}</small>` : ''}</th><td>${esc(p.weight || '—')}</td><td>${price}</td><td><span class="status status--${cls}">${st}</span></td></tr>`;
  }).join('')}</tbody></table></div>`;
}
export function catCards(c) {
  return `<ul class="cat-grid">${categories.map((k) => {
    const open = products.filter((p) => p.cat === k.slug && p.status === 'open').length;
    const media = k.img.startsWith('icon:') ? pic(k.img.slice(5)) : `<img src="${photo(c, k.img)}" width="790" height="529" alt="${esc(k.name)}" loading="lazy">`;
    return `<li class="cat"><a href="${c.u(k.path)}"><div class="cat__media">${media}</div><div class="cat__body">
    <p class="cat__en">${esc(k.en)}</p><h3>${esc(k.name)}</h3><p>${esc(k.lead)}</p>
    <p class="cat__foot"><span class="status status--${open ? 'open' : 'season'}">${open ? '受付中の商品あり' : '次の収穫期にご案内'}</span><span class="more">くわしく${icon('arrow')}</span></p></div></a></li>`;
  }).join('')}</ul>`;
}

export function teamGrid(c, keys = Object.keys(team)) {
  return `<ul class="team">${keys.map((k) => { const t = team[k]; return `<li class="team__item"><img src="${c.img(t.img)}" width="160" height="160" alt="${esc(t.name)}のイラスト" loading="lazy"><h3>${esc(t.name)}<small>${esc(t.role)}</small></h3><p>${esc(t.text)}</p></li>`; }).join('')}</ul>`;
}

export function pageHero(c, { eyebrow, h1, lead, crumbs, image }) {
  const bc = crumbs.map(([n, p], i) => (i < crumbs.length - 1 ? `<li><a href="${c.u(p)}">${esc(n)}</a></li>` : `<li aria-current="page">${esc(n)}</li>`)).join('');
  return `<section class="page-hero${image ? ' page-hero--img' : ''}"${image ? ` style="background-image:url('${photo(c, image)}')"` : ''}><div class="wrap page-hero__in">
  <nav class="crumbs" aria-label="パンくずリスト"><ol>${bc}</ol></nav>
  ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
  <h1>${h1}</h1>
  ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
  </div></section>`;
}

export const figure = (c, key, cap, cls = '') => `<figure class="fig ${cls}"><img src="${photo(c, key)}" alt="${esc(cap)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`;
export const yt = (id, title) => `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${esc(title)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;

// ---------- フッター ----------
function footer(c) {
  return `<footer class="site-footer"><div class="wrap site-footer__grid">
  <div class="site-footer__brand"><p class="site-footer__logo"><img src="${c.img('favicon.svg')}" width="40" height="40" alt="">${site.name}<small>${site.nameEn}</small></p>
    <p>${site.tagline}。<br>${site.area}、川内川のほとりの小さな畑から、農家が直接お届けします。</p>
    ${site.email ? `<p><a href="mailto:${site.email}">${site.email}</a></p>` : ''}
    ${site.instagram ? `<p><a class="more" href="${site.instagram}" target="_blank" rel="noopener">${icon('insta')}Instagram</a></p>` : ''}</div>
  <nav class="site-footer__nav" aria-label="商品"><p class="site-footer__h">商品</p><ul>${categories.map((k) => `<li><a href="${c.u(k.path)}">${esc(k.name)}</a></li>`).join('')}<li><a href="${c.u('/yakiimo/')}">おいしい焼き芋の焼き方</a></li></ul></nav>
  <nav class="site-footer__nav" aria-label="ご案内"><p class="site-footer__h">ご案内</p><ul>
    <li><a href="${c.u('/kodawari/')}">栽培のこだわり</a></li><li><a href="${c.u('/story/')}">田舎野菜の物語</a></li><li><a href="${c.u('/order/')}">ご注文・配送</a></li><li><a href="${c.u('/faq/')}">よくある質問</a></li>
    <li><a href="${c.u('/blog/')}">ブログ</a></li><li><a href="${c.u('/tokushoho/')}">特定商取引法に基づく表記</a></li><li><a href="${c.u('/privacy/')}">プライバシーポリシー</a></li></ul></nav>
</div>
<div class="wrap site-footer__bottom"><small>&copy; ${new Date().getFullYear()} ${site.name}（${site.nameEn}）</small>${site.sunchildren || site.inakappe ? `<small>関連サイト：${site.sunchildren ? `<a href="${site.sunchildren}" target="_blank" rel="noopener">SunChildren（旅）</a>` : ''}${site.inakappe ? ` ／ <a href="${site.inakappe}" target="_blank" rel="noopener">Inakappe English（英語）</a>` : ''}</small>` : ''}</div></footer>`;
}

// ---------- ページ全体 ----------
export function layout(c, { title, description, body, crumbs, schema = [], ogType = 'website', ogImage, noindex = false }) {
  const canonical = site.url + c.path;
  const img = ogImage || site.url + '/assets/img/og.jpg';
  const ld = [...schema];
  if (crumbs && crumbs.length > 1) ld.push(schemaCrumbs(crumbs));
  const navHtml = nav.map(([n, p]) => `<li><a href="${c.u(p)}"${c.path === p ? ' aria-current="page"' : ''}>${n}</a></li>`).join('');
  const ga = site.gaId && !c.preview ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.gaId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}');</script>` : '';
  const head = `<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex || site.url.includes('example.jp') ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${img}">
<meta property="og:site_name" content="${site.name}（${site.nameEn}）">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#3b2a20">
<link rel="icon" href="${c.img('favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${c.img('logo.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho:wght@600;700;800&family=Cormorant+Garamond:ital,wght@1,600&display=swap">
<link rel="stylesheet" href="${c.u('/assets/css/style.css')}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
${ga}`;

  const inner = `<a class="skip" href="#main">本文へ移動</a>
<header class="site-header" id="top"><div class="wrap site-header__in">
  <a class="brand" href="${c.u('/')}" aria-label="${site.name} トップへ"><img src="${c.img('favicon.svg')}" width="44" height="44" alt=""><span class="brand__txt"><b>${site.name}<i>${site.nameEn}</i></b><small>${site.tagline}｜鹿児島・薩摩川内</small></span></a>
  <nav class="gnav" id="gnav" aria-label="メインメニュー"><ul>${navHtml}</ul>
    <a class="btn btn--imo gnav__cta" href="${orderHref(c)}"${ext(orderHref(c))}>ご注文</a></nav>
  <button class="menu-btn" type="button" aria-controls="gnav" aria-expanded="false"><span></span><span></span><span></span><b>メニュー</b></button>
</div></header>
<main id="main">
${body}
</main>
${footer(c)}
<nav class="dock" aria-label="ご注文">
  <a href="${c.u('/satsumaimo/')}">${icon('basket')}<span>商品</span></a>
  ${site.instagram ? `<a href="${site.instagram}" target="_blank" rel="noopener">${icon('insta')}<span>Instagram</span></a>` : ''}
  <a class="dock__main" href="${orderHref(c)}"${ext(orderHref(c))}>${icon('form')}<span>ご注文・お問い合わせ</span></a>
</nav>
<script src="${c.u('/assets/js/main.js')}" defer></script>`;

  if (c.preview) return { head, inner, lang: 'ja' };
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
${inner}
</body>
</html>
`;
}

export { site };
