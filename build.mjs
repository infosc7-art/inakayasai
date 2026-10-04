// ============================================================
// 田舎野菜（Inakayasai）静的サイト生成スクリプト（外部ライブラリ不要・Node 18以上）
//   node build.mjs            … 本番用（dist/ に出力）
//   node build.mjs --preview  … ローカル/プレビュー用（リンクに index.html を付ける）
// ============================================================
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, layout, makeCtx } from './src/layout.mjs';
import { fetchPosts, blogPages } from './src/blog.mjs';
import home from './src/pages/home.mjs';
import productPages from './src/pages/products.mjs';
import info from './src/pages/info.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const PREVIEW = args.includes('--preview');
const OUT = path.join(ROOT, process.env.OUT_DIR || 'dist');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d); else await fs.copyFile(s, d);
  }
}

const fileFor = (p) => (p.endsWith('.html') ? p : p + 'index.html');

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await copyDir(path.join(ROOT, 'static'), OUT);

  const posts = await fetchPosts({ outDir: OUT });
  const pages = [home, ...productPages, ...info, ...blogPages(posts)];

  for (const pg of pages) {
    let c = makeCtx(pg.path, PREVIEW);
    if (pg.path === '/404.html') c = { ...c, u: (p) => p, img: (f) => '/assets/img/' + f, path: '/404.html' };
    c.posts = posts;
    const out = layout(c, {
      title: pg.title,
      description: pg.description,
      crumbs: pg.crumbs,
      ogType: pg.ogType,
      ogImage: pg.ogImage,
      noindex: pg.noindex,
      schema: pg.schema ? pg.schema() : [],
      body: pg.body(c, { posts }),
    });
    let html = out;
    if (PREVIEW) {
      // プレビュー：トップは外枠なし（公開ツールが付与）、その他は完全なHTML
      html = pg.path === '/'
        ? `${out.head}\n${out.inner}`
        : `<!doctype html>\n<html lang="${out.lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${out.head}\n</head>\n<body>\n${out.inner}\n</body>\n</html>\n`;
    }
    const dest = path.join(OUT, fileFor(pg.path));
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, html);
  }

  // sitemap.xml / robots.txt
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages.filter((p) => !p.noindex && !/\/page\/\d+\/$/.test(p.path)).map((p) => {
    const post = posts.find((x) => p.path === `/blog/${x.id}/`);
    return `<url><loc>${site.url}${p.path}</loc><lastmod>${post ? post.modified.slice(0, 10) : today}</lastmod></url>`;
  });
  await fs.writeFile(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  const demo = site.url.includes('example.jp'); // SITE_URL未設定＝見本公開中は検索させない
  await fs.writeFile(path.join(OUT, 'robots.txt'), demo ? 'User-agent: *\nAllow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

  console.log(`✔ ${pages.length}ページを生成しました（記事 ${posts.length}件）→ ${path.relative(ROOT, OUT)}/`);
  if (site.url.includes('example.jp')) console.warn('⚠ SITE_URL が未設定です。CloudflareのVariablesに本番URLを設定するまで、検索に出ない設定（noindex）になります。');
}

main().catch((e) => { console.error(e); process.exit(1); });
