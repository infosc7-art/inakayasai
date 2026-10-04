// ============================================================
// ブログ：microCMSから記事を取得して静的ページにする
// 環境変数 MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が無い場合はサンプル記事で表示
// ============================================================
import fs from 'node:fs/promises';
import path from 'node:path';
import { blogCategories as categories, site, team } from './config.mjs';
import { esc, icon, pageHero, ctaBand, contactButtons } from './layout.mjs';
import { localPosts } from './posts.mjs';

const PER_PAGE = 12;

export async function fetchPosts({ outDir, sample }) {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;
  const local = localPosts.map((p) => ({ author: 'Aki', ...p, cat: categories.find((c) => c.slug === p.cat) || categories[0], modified: p.modified || p.date }));
  if (!domain || !key) {
    if (!sample) console.warn('⚠ microCMSの環境変数が未設定のため、移行した記事のみで生成します');
    return sortPosts(local);
  }
  const endpoint = process.env.MICROCMS_ENDPOINT || 'blogs';
  const all = [];
  for (let offset = 0; ; offset += 100) {
    const res = await fetch(`https://${domain}.microcms.io/api/v1/${endpoint}?limit=100&offset=${offset}&orders=-publishedAt`, { headers: { 'X-MICROCMS-API-KEY': key } });
    if (!res.ok) throw new Error(`microCMS取得エラー: ${res.status} ${await res.text()}`);
    const json = await res.json();
    all.push(...json.contents);
    if (all.length >= json.totalCount) break;
  }
  const posts = [];
  for (const p of all) {
    // カテゴリー：セレクト（文字）でも、テンプレートの「カテゴリーAPI参照」（{id,name}）でも対応
    let raw = Array.isArray(p.category) ? p.category[0] : p.category;
    const catName = raw && typeof raw === 'object' ? raw.name : raw;
    let cat = categories.find((c) => c.name === catName);
    if (!cat && raw && typeof raw === 'object' && raw.id) cat = { name: raw.name, slug: String(raw.id).toLowerCase().replace(/[^a-z0-9-]/g, '') || 'cat' };
    if (!cat) cat = categories[0];
    let content = p.content || '';
    // 本文中の画像をサイト内に保存（microCMSの転送量を使わない・表示も速い）
    content = await localizeImages(content, outDir);
    const eyecatch = p.eyecatch ? await downloadImage(p.eyecatch.url, outDir, 'w=1200') : '';
    posts.push({
      id: p.id,
      title: p.title,
      description: p.description || stripText(p.content).slice(0, 110),
      content,
      cat,
      eyecatch,
      author: authorName(p.author),
      date: p.publishedAt,
      modified: p.revisedAt || p.updatedAt || p.publishedAt,
    });
  }
  return sortPosts([...posts, ...local.filter((l) => !posts.some((p) => p.id === l.id))]);
}

// 書いた人：microCMSの author フィールド（テキスト・セレクト・コンテンツ参照のどれでも可）。未設定なら Aki
function authorName(v) {
  const raw = Array.isArray(v) ? v[0] : v;
  const name = raw && typeof raw === 'object' ? raw.name || raw.title || '' : raw || '';
  return String(name).trim() || 'Aki';
}
// 畑の人（config.mjs の team）と名前で照合
function authorInfo(name) {
  const n = name.toLowerCase();
  const key = ['aki', 'yoko'].find((k) => n.startsWith(k) || team[k].name.toLowerCase().startsWith(n));
  return key ? { ...team[key], key, display: team[key].name } : { name, display: name, role: '田舎野菜', img: 'favicon.svg' };
}

const sortPosts = (list) => list.sort((a, b) => new Date(b.date) - new Date(a.date));

async function localizeImages(html, outDir) {
  const urls = [...new Set([...html.matchAll(/https:\/\/images\.microcms-assets\.io\/[^"'\s)]+/g)].map((m) => m[0].replace(/&amp;/g, '&')))];
  for (const u of urls) {
    const local = await downloadImage(u, outDir, 'w=1400');
    html = html.split(u).join(local).split(u.replace(/&/g, '&amp;')).join(local);
  }
  // 画像に遅延読み込みを付与
  return html.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');
}

async function downloadImage(url, outDir, params) {
  const clean = url.split('?')[0];
  const name = clean.split('/').slice(-2).join('-').replace(/[^a-zA-Z0-9._-]/g, '');
  const rel = '/blog/img/' + name;
  const dest = path.join(outDir, rel);
  try {
    await fs.access(dest);
  } catch {
    const res = await fetch(clean + '?' + params + '&fm=webp&q=80');
    if (!res.ok) return url;
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  }
  return rel;
}

const stripText = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const fmt = (iso) => { const d = new Date(iso); return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`; };
const fmtJ = (iso) => { const d = new Date(iso); return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`; };
// 画像パス（/blog/img/..）をページ位置に合わせて相対化
const media = (c, src) => (src && src.startsWith('/') ? c.u(src) : src);

export function postCards(c, posts) {
  if (!posts.length) return '<p class="empty">記事は準備中です。</p>';
  return `<div class="cards">${posts.map((p) => `<article class="card"><a href="${c.u(`/blog/${p.id}/`)}">
    <div class="card__thumb${p.eyecatch ? '' : ' card__thumb--none'}">${p.eyecatch ? `<img src="${media(c, p.eyecatch)}" width="720" height="450" alt="" loading="lazy">` : `<span>${esc(p.cat.name)}</span>`}</div>
    <div class="card__body"><p class="card__meta"><time datetime="${p.date}">${fmt(p.date)}</time><span class="card__cat">${esc(p.cat.name)}</span></p>
    <h3 class="card__title">${esc(p.title)}</h3><p class="card__ex">${esc(p.description)}</p></div></a></article>`).join('')}</div>`;
}

// 記事で使われているカテゴリー（設定にない名前も含む）
function usedCats(posts) {
  const list = categories.filter((cat) => posts.some((p) => p.cat.slug === cat.slug));
  for (const p of posts) if (!list.some((c) => c.slug === p.cat.slug)) list.push(p.cat);
  return list;
}

function catNav(c, current) {
  const used = usedCats(c.posts);
  return `<ul class="cat-nav"><li><a href="${c.u('/blog/')}"${!current ? ' aria-current="page"' : ''}>すべて</a></li>${used.map((cat) => `<li><a href="${c.u(`/blog/category/${cat.slug}/`)}"${current === cat.slug ? ' aria-current="page"' : ''}>${esc(cat.name)}</a></li>`).join('')}</ul>`;
}

function pager(c, base, page, pages) {
  if (pages < 2) return '';
  const link = (n) => (n === 1 ? base : `${base}page/${n}/`);
  let h = '<nav class="pager" aria-label="ページ送り">';
  if (page > 1) h += `<a class="page-numbers" href="${c.u(link(page - 1))}">前へ</a>`;
  for (let n = 1; n <= pages; n++) h += n === page ? `<span class="page-numbers current">${n}</span>` : `<a class="page-numbers" href="${c.u(link(n))}">${n}</a>`;
  if (page < pages) h += `<a class="page-numbers" href="${c.u(link(page + 1))}">次へ</a>`;
  return h + '</nav>';
}

// 一覧・カテゴリー・記事ページの定義を返す
export function blogPages(posts) {
  const pages = [];
  const lists = [{ base: '/blog/', list: posts, title: 'ブログ', cat: null }];
  for (const cat of usedCats(posts)) {
    const list = posts.filter((p) => p.cat.slug === cat.slug);
    if (list.length) lists.push({ base: `/blog/category/${cat.slug}/`, list, title: cat.name, cat });
  }
  for (const L of lists) {
    const total = Math.max(1, Math.ceil(L.list.length / PER_PAGE));
    for (let n = 1; n <= total; n++) {
      const p = n === 1 ? L.base : `${L.base}page/${n}/`;
      const crumbs = [['ホーム', '/'], ['ブログ', '/blog/']];
      if (L.cat) crumbs.push([L.cat.name, L.base]);
      pages.push({
        path: p,
        title: `${L.cat ? L.cat.name + '｜' : ''}畑の日記・食べ方${n > 1 ? `（${n}ページ目）` : ''}｜田舎野菜`,
        description: L.cat ? `鹿児島・薩摩川内の農家、田舎野菜のブログ「${L.cat.name}」の記事一覧です。` : '鹿児島・薩摩川内の小さな畑の日記と、とれた野菜の食べ方。農家、田舎野菜のブログです。',
        crumbs,
        body: (c) => `${pageHero(c, { eyebrow: 'Blog', h1: esc(L.cat ? L.cat.name : '畑の日記・食べ方'), lead: L.cat ? '' : '川内川のほとりの小さな畑のこと、とれた野菜の食べ方を書いています。', crumbs })}
<section class="sec sec--tight"><div class="wrap">${catNav(c, L.cat && L.cat.slug)}${postCards(c, L.list.slice((n - 1) * PER_PAGE, n * PER_PAGE))}${pager(c, L.base, n, total)}</div></section>
${ctaBand(c)}`,
      });
    }
  }
  posts.forEach((p, i) => {
    const prev = posts[i + 1];
    const next = posts[i - 1];
    const crumbs = [['ホーム', '/'], ['ブログ', '/blog/'], [p.cat.name, `/blog/category/${p.cat.slug}/`], [p.title, `/blog/${p.id}/`]];
    pages.push({
      path: `/blog/${p.id}/`,
      title: `${p.title}｜田舎野菜`,
      description: p.description,
      crumbs,
      ogType: 'article',
      ogImage: p.eyecatch && p.eyecatch.startsWith('/') ? site.url + p.eyecatch : undefined,
      schema: () => [{
        '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
        datePublished: p.date, dateModified: p.modified,
        author: (() => { const a = authorInfo(p.author); return { '@type': 'Person', name: a.display, url: site.url + '/story/' }; })(),
        publisher: { '@id': site.url + '/#farm' }, mainEntityOfPage: site.url + `/blog/${p.id}/`,
        image: p.eyecatch && p.eyecatch.startsWith('/') ? site.url + p.eyecatch : site.url + '/assets/img/og.jpg',
      }],
      body: (c) => `<article class="post">
  <header class="post__head wrap wrap--read">
    <nav class="crumbs" aria-label="パンくずリスト"><ol>${crumbs.slice(0, -1).map(([n, u]) => `<li><a href="${c.u(u)}">${esc(n)}</a></li>`).join('')}</ol></nav>
    <p class="post__meta"><time datetime="${p.date}">${fmtJ(p.date)}</time><a class="card__cat" href="${c.u(`/blog/category/${p.cat.slug}/`)}">${esc(p.cat.name)}</a></p>
    <h1 class="post__title">${esc(p.title)}</h1>
    ${(() => { const a = authorInfo(p.author); return `<p class="post__author"><img src="${c.img(a.img)}" width="40" height="40" alt="">書いた人：${a.key ? `<a href="${c.u('/story/')}">${esc(a.display)}</a>` : esc(a.display)}（${esc(a.role)}）</p>`; })()}
  </header>
  ${p.eyecatch ? `<figure class="post__eye wrap wrap--read"><img src="${media(c, p.eyecatch)}" alt=""></figure>` : ''}
  <div class="post__body wrap wrap--read entry">${p.content.replace(/(src|href)="(\/[^"/][^"]*)"/g, (m, a, s) => `${a}="${c.u(s)}"`)}</div>
  <aside class="post__cta wrap wrap--read"><img src="${c.img(team.aki.img)}" width="72" height="72" alt="">
    <div><p class="post__cta-h">この畑の野菜を、ご家庭で。</p><p>農薬・除草剤を栽培期間中使わずに育てたサツマイモ、ジャガイモ、にんにく、唐辛子を、農家から直接お届けします。</p>
    <div class="post__cta-btns"><a class="btn btn--imo" href="${c.u('/satsumaimo/')}">サツマイモを見る${icon('arrow')}</a><a class="btn btn--ghost" href="${c.u('/order/')}">ご注文の方法</a></div></div></aside>
  <nav class="post__nav wrap wrap--read">${prev ? `<a class="prev" href="${c.u(`/blog/${prev.id}/`)}"><small>前の記事</small>${esc(prev.title)}</a>` : ''}${next ? `<a class="next" href="${c.u(`/blog/${next.id}/`)}"><small>次の記事</small>${esc(next.title)}</a>` : ''}</nav>
</article>`,
    });
  });
  return pages;
}

