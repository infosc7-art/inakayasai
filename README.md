# 田舎野菜（Inakayasai）公式サイト

鹿児島県薩摩川内市の農家「田舎野菜」のサイトです。
しくみは Inakappe English と同じで、GitHub、Cloudflare（Workers）、microCMS（ブログ）を使います。

## フォルダの中身
| 場所 | 内容 |
|---|---|
| `src/config.mjs` | 連絡先・商品と価格・写真のファイル名・FAQ。**ふだん書き換えるのはここ** |
| `src/pages/` | 各ページの文章（home / products / info） |
| `src/posts.mjs` | 旧サイトから移した記事（3本） |
| `static/assets/img/photos/` | 写真 |
| `static/assets/img/people/` | Aki・Yoko・祖父・祖母のイラスト |
| `wrangler.jsonc` | Cloudflareの設定（name は inakayasai） |

## 公開の手順
1. GitHubで新しいリポジトリ（例：`inakayasai`）を作り、このフォルダの中身をすべてアップロードします。
2. https://github.com/settings/installations → Cloudflare Workers and Pages → Configure で、新しいリポジトリへのアクセスを追加します。
3. Cloudflareで Workers & Pages → Create application → Import a repository。
   - Build command：`npm run build`
   - Deploy command：`npx wrangler deploy`
4. `https://inakayasai.<あなたのID>.workers.dev` で表示されます。この段階では全ページ noindex です。

## 公開前に書き換えるところ（config.mjs）
- `email`：お問い合わせ用のメールアドレス
- `formUrl`：Googleフォームの URL
- `products`：価格・内容量・状況（open／season／few）。旧サイトの価格を仮に入れています。鷹の爪は内容量と価格が空欄です
- `photos`：写真の元のファイル名が分かったら書き換え（ファイルも同じ名前で置き換え）
- 特定商取引法に基づく表記（`src/pages/info.mjs` の tokushoho）：運営責任者・お支払い方法・返品の扱いを確定させる

## ブログ（microCMS）
Inakappe English と同じ手順です。カテゴリー名は「畑の日記」「レシピ・食べ方」「お知らせ」に合わせます。

## 本番公開
ドメインを接続 → Variables に `SITE_URL`（例 `https://inakayasai.com`）→ 組み立て直し → Search Console に sitemap.xml を送信 → Googleビジネスプロフィール。
**workers.dev のアドレスは SITE_URL に入れないでください。**

## 表示のルール
「無農薬」「無化学肥料」「有機」「オーガニック」は使いません。「農薬：栽培期間中不使用」などの表示は `config.mjs` の `growing` にまとまっています。
