// ============================================================
// 田舎野菜（Inakayasai）サイト設定 ― ふだん書き換えるのはこのファイルです
// ============================================================
export const site = {
  // 本番URL：Cloudflareの環境変数 SITE_URL で設定（例 https://inakayasai.com）。末尾の / は不要
  // 未設定（example.jp のまま）の間は、全ページに noindex が付き検索に出ません
  url: (process.env.SITE_URL || 'https://www.example.jp').replace(/\/$/, ''),
  name: '田舎野菜',
  nameEn: 'Inakayasai',
  tagline: '旅する鹿児島の田舎野菜',
  area: '鹿児島県薩摩川内市',
  city: '薩摩川内市',
  pref: '鹿児島県',
  // ご注文・お問い合わせ（空欄の項目はサイトに表示されません）
  email: '', // 例：info@inakayasai.com
  formUrl: '', // Googleフォームの URL（作ったらここに貼る）
  instagram: 'https://www.instagram.com/inakayasai/',
  phone: '',
  // 関連サイト（空欄なら表示しません）
  sunchildren: 'https://www.sunchildren.net/',
  inakappe: '', // Inakappe English の本番URLが決まったら
  gaId: process.env.GA_ID || '',
};

// 写真（ファイル名はアップロードされたまま。元のファイル名が分かったら、ここと写真ファイルを同じ名前に置き換え）
export const photos = {
  hero: 'photos/77fa42d2-image.jpg', // 一輪車に収穫したサツマイモと青菜
  silhouette: 'photos/bdd2bc62-image.jpg', // 逆光の芋畑で作業
  planted: 'photos/4432bbf2-image.jpg', // 植え付け直後の畝
  young: 'photos/a7ff4ad2-image.jpg', // 苗が根づいた畝
  weeds: 'photos/e3efec16-image.jpg', // 草に埋もれた畝と、草を取った畝
  weedsHand: 'photos/a98498ef-image.jpg', // 草に手をかざす
  ash: 'photos/6bd220fc-image.jpg', // 一輪車の草木灰
  lush: 'photos/0841413c-image.jpg', // 茂りはじめた芋畑
  dense: 'photos/7fe66de0-image.jpg', // 一面に茂った芋畑
  dense2: 'photos/4a34c178-image.jpg', // 一面に茂った芋畑（別角度）
  evening: 'photos/8e861354-image.jpg', // 夕方の光の畝
  leaves: 'photos/c6656535-image.jpg', // 芋の葉のアップ
  dug: 'photos/3478e85d-image.jpg', // 掘りたてのサツマイモ
  beniazumaDug: 'photos/816149d3-image.jpg', // 掘りたての紅あずま（ロゴ入り）
  narutoDug: 'photos/232dea67-image.jpg', // 掘りたての鳴門金時（ロゴ入り）
  yakiHand: 'photos/972ccb1c-image.jpg', // 焼き芋を手で割る
  yakiClose: 'photos/7cf3f1f0-image.jpg', // 焼き芋の断面アップ
  yakiBowl: 'photos/f70cd83e-image.jpg', // 白い皿の焼き芋
  yakiBowl2: 'photos/8df2844b-image.jpg', // 焼き芋の断面（皿）
  yakiDark: 'photos/651aebd9-image.jpg', // 焼き芋（暗い背景）
  yakiFoil: 'photos/3611189c-image.jpg', // ホイル焼き芋の朝ごはん
  yakiFoil2: 'photos/e6701e47-image.jpg', // ホイル焼き芋のアップ
  potage: 'photos/9ee36ee4-image.jpg', // 紅あずまのポタージュ（ロゴ入り）
  vegSet: 'photos/a2597a90-image.jpg', // 野菜の詰め合わせ
  vegSquash: 'photos/9a24a4f4-image.jpg', // 南瓜と青菜・唐辛子
  breakfast: 'photos/ca30b2a3-image.jpg', // 田舎の朝ごはん
  breakfast2: 'photos/10c863f8-image.jpg', // 田舎の朝ごはん（別角度）
  salad: 'photos/be785ac6-image.jpg', // ミニトマトのサラダ
  salad2: 'photos/340770fe-image.jpg', // サラダ（縦）
  toast: 'photos/c8482519-image.jpg', // バジルのトースト（縦）
  basilPlant: 'photos/efa48195-image.jpg',
  basilBowl: 'photos/81e57eaf-image.jpg',
  basilColander: 'photos/8b627024-image.jpg',
  basilWash: 'photos/7d6300d2-image.jpg',
  walnutPan: 'photos/c4dd85ca-image.jpg',
  walnutMixer: 'photos/f32a1bdb-image.jpg',
  garlicWalnut: 'photos/c9d88e2c-image.jpg',
  pestoSpoon: 'photos/2a69b182-image.jpg',
  pestoJar: 'photos/b683db28-image.jpg',
  radish: 'photos/cd06f591-image.jpg', // 紅芯大根を抜いたところ
  greenTomato: 'photos/6e9c2148-image.jpg', // 青いミニトマト
  blueberry: 'photos/da634628-image.jpg',
  // ジャガイモ
  jagaMix: 'photos/3ad1b444-image.jpg', // ノーザンルビーとメークインの収穫
  jagaMix2: 'photos/d5fbcbe4-image.jpg',
  northernRuby: 'photos/7ee26730-image.jpg', // ノーザンルビー（寄り）
  mayQueen: 'photos/2f88afcd-image.jpg', // メークインの畝
  andesRed: 'photos/d9fa7147-image.jpg', // アンデスレッド
  // にんにく
  garlicBulbs: 'photos/965bb513-image.jpg', // 収穫したにんにく（寄り）
  garlicTray: 'photos/2aeb22ee-image.jpg', // 竹ざるで干すにんにく
  garlicTray2: 'photos/421d9933-image.jpg',
  garlicField: 'photos/18cdf3ea-image.jpg', // にんにくの畝
  garlicField2: 'photos/27cf641a-image.jpg',
  // 丹波黒大豆
  kuromameSet: 'photos/5a8ba6bd-image.jpg', // さやと豆
  kuromame: 'photos/aae0f37e-image.jpg', // 黒大豆（皿）
  kuromame2: 'photos/12855400-image.jpg',
  kuromamePods: 'photos/94a4380a-image.jpg', // 乾いたさや
};

// 人（イラスト）
export const team = {
  aki: { name: 'Aki', role: 'ファウンダー・畑の担当', img: 'people/aki.svg', text: '新鮮な野菜を食べて、体も人生も、健康的にかっこよく生きてほしい。' },
  yoko: { name: 'Yoko', role: 'パートナー', img: 'people/yoko.svg', text: '国産の野菜と、食べることが大好き。食を通じて、健康と平和を。' },
  sofu: { name: '祖父', role: '翁（おきな）', img: 'people/sofu.svg', text: '今は亡き、Akiの祖父。節約と忍耐、そして農業の精神を叩き込んでくれた人。' },
  sobo: { name: '祖母', role: '媼（おうな）', img: 'people/sobo.svg', text: '今は亡き、Akiの祖母。ユーモアとやさしさを伝えてくれた人。' },
};

// 栽培の表示（国の「特別栽培農産物に係る表示ガイドライン」に合わせた言い方。「無農薬」「有機」「オーガニック」は使わない）
export const growing = {
  imo: { labels: ['農薬：栽培期間中不使用', '除草剤：栽培期間中不使用', '化学肥料：栽培期間中不使用'], fert: '草木灰（畑の草を燃やした灰）のみ' },
  jaga: { labels: ['農薬：栽培期間中不使用', '除草剤：栽培期間中不使用', '化学肥料：栽培期間中不使用'], fert: '草木灰・鶏糞・堆肥・腐葉土' },
  spice: { labels: ['農薬：栽培期間中不使用', '除草剤：栽培期間中不使用'], fert: '米ぬか・堆肥・鶏糞（化学肥料を一部使用）' },
  mame: { labels: ['農薬：栽培期間中不使用', '除草剤：栽培期間中不使用'], fert: '' }, // 肥料が確定したら書く
};

// 商品（※価格・状況は旧サイトの表示をもとにした仮の内容。確定したらここを書き換え）
//   status: 'open'＝受付中 / 'season'＝次の収穫期にご案内 / 'few'＝少量のみ・お問い合わせ
//   ship: 'betsu'＝送料別 / 'komi'＝送料込み
//   price を空欄にすると「お問い合わせください」と表示します
export const products = [
  { id: 'beniharuka-10', cat: 'satsumaimo', grow: 'imo', name: '紅はるか', weight: '10kg', price: 11000, ship: 'betsu', status: 'open', pick: true, img: 'yakiHand', copy: 'ねっとり、蜜があふれる。', note: 'ねっとり甘い、焼き芋向きの蜜芋。いちばん人気です。' },
  { id: 'beniharuka-5', cat: 'satsumaimo', grow: 'imo', name: '紅はるか', weight: '5kg', price: 6500, ship: 'betsu', status: 'open', note: 'はじめての方や、ご家族で食べきりたい方に。' },
  { id: 'beniazuma-5', cat: 'satsumaimo', grow: 'imo', name: '紅あずま', weight: '5kg', price: 6300, ship: 'betsu', status: 'open', pick: true, img: 'yakiBowl', copy: 'ほくほく。料理の主役に。', note: 'ほくほく系。スイートポテト、大学芋、天ぷら、ポタージュに。' },
  { id: 'annou', cat: 'satsumaimo', grow: 'imo', name: '安納芋', weight: '', price: '', ship: 'betsu', status: 'few', note: '少量だけ育てています。ある年だけのご案内です。' },
  { id: 'imo-jaga-10', cat: 'jagaimo', grow: 'jaga', name: 'サツマイモ・ジャガイモセット', weight: '10kg', price: 11000, ship: 'betsu', status: 'season', note: '両方を一度に楽しめるセット。' },
  { id: 'jaga-mix-5', cat: 'jagaimo', grow: 'jaga', name: 'ジャガイモ 品種おまかせ', weight: '5kg', price: 6000, ship: 'betsu', status: 'season', note: 'メークイン、ノーザンルビー、アンデスレッド、男爵、デジマ、ニシユタカなど、その年にとれた品種を混ぜてお送りします。', pick: true, img: 'jagaMix', copy: '赤、ピンク、黄金色。品種おまかせの詰め合わせ。' },
  { id: 'jaga-mix-10', cat: 'jagaimo', grow: 'jaga', name: 'ジャガイモ 品種おまかせ', weight: '10kg', price: 9400, ship: 'betsu', status: 'season', note: '' },
  { id: 'danshaku-10', cat: 'jagaimo', grow: 'jaga', name: '男爵', weight: '10kg', price: 7500, ship: 'betsu', status: 'season', note: '粉質でほくほく。ポテトサラダ、コロッケ、塩で蒸すだけでも。' },
  { id: 'mayqueen-10', cat: 'jagaimo', grow: 'jaga', name: 'メークイン', weight: '10kg', price: 7800, ship: 'betsu', status: 'season', note: '煮くずれしにくく、肉じゃがやカレーに。' },
  { id: 'northernruby-5', cat: 'jagaimo', grow: 'jaga', name: 'ノーザンルビー', weight: '5kg', price: 6800, ship: 'betsu', status: 'season', note: '赤い皮にピンクの中身。サラダやスープの彩りに。' },
  { id: 'northernruby-10', cat: 'jagaimo', grow: 'jaga', name: 'ノーザンルビー', weight: '10kg', price: 12800, ship: 'betsu', status: 'season', note: '' },
  { id: 'dejima-ask', cat: 'jagaimo', grow: 'jaga', name: 'デジマ・ニシユタカ', weight: '', price: '', ship: 'betsu', status: 'season', note: '量が少ないため、品種おまかせのセットに入ることが多い品種です。単品はお問い合わせください。' },
  { id: 'andesred-5', cat: 'jagaimo', grow: 'jaga', name: 'アンデスレッド', weight: '5kg', price: 6800, ship: 'betsu', status: 'season', note: '赤い皮で、男爵に近いほくほく感。塩バターやグリルに。' },
  { id: 'ninniku-5', cat: 'spice', grow: 'spice', name: 'にんにく', weight: '5kg', price: 10000, ship: 'komi', status: 'open', pick: true, img: 'garlicBulbs', copy: '竹ざるで干した、香りの強いにんにく。', note: '' },
  { id: 'ninniku-10', cat: 'spice', grow: 'spice', name: 'にんにく', weight: '10kg', price: 18500, ship: 'komi', status: 'open', note: '' },
  { id: 'takanotsume-nama', cat: 'spice', grow: 'spice', name: '唐辛子（鷹の爪）生', weight: '', price: '', ship: 'komi', status: 'season', note: '' },
  { id: 'takanotsume-dry', cat: 'spice', grow: 'spice', name: '唐辛子（鷹の爪）天日干し', weight: '', price: '', ship: 'komi', status: 'season', note: '昔ながらの天日干しです。' },
  { id: 'kuromame', cat: 'mame', grow: 'mame', name: '丹波黒大豆（乾燥豆）', weight: '', price: '', ship: 'betsu', status: 'season', note: '品種は丹波黒、鹿児島県薩摩川内市で育てた黒大豆です。量と価格はお問い合わせください。' },
  { id: 'jalapeno-5', cat: 'spice', grow: 'spice', name: 'ハラペーニョ 生', weight: '5kg', price: 11000, ship: 'komi', status: 'season', note: 'ピクルスにおすすめです。' },
];

export const categories = [
  { slug: 'satsumaimo', path: '/satsumaimo/', name: 'サツマイモ', en: 'Sweet potato', lead: '紅はるか・紅あずま・安納芋。天日干しともみ殻貯蔵で、甘みをのせてから出荷します。', img: 'dug' },
  { slug: 'jagaimo', path: '/jagaimo/', name: 'ジャガイモ', en: 'Potato', lead: 'メークイン、ノーザンルビー、アンデスレッド、男爵、デジマ、ニシユタカ。色とりどりのジャガイモです。', img: 'jagaMix' },
  { slug: 'spice', path: '/ninniku-tougarashi/', name: 'にんにく・唐辛子', en: 'Garlic & Chili', lead: '竹ざるで天日に干したにんにく、鷹の爪、ハラペーニョ。料理の香りと辛みを、畑から。', img: 'garlicBulbs' },
  { slug: 'mame', path: '/kuromame/', name: '丹波黒大豆', en: 'Black soybean', lead: '品種は丹波黒。鹿児島の畑で、さやごと乾かして収穫した黒大豆です。', img: 'kuromameSet' },
];

export const nav = [
  ['サツマイモ', '/satsumaimo/'],
  ['ジャガイモ', '/jagaimo/'],
  ['にんにく・唐辛子', '/ninniku-tougarashi/'],
  ['黒大豆', '/kuromame/'],
  ['こだわり', '/kodawari/'],
  ['物語', '/story/'],
  ['ブログ', '/blog/'],
];

// ブログのカテゴリー（microCMSのカテゴリー名と同じ名前にしてください）
export const blogCategories = [
  { name: '畑の日記', slug: 'farm' },
  { name: 'レシピ・食べ方', slug: 'recipe' },
  { name: 'お知らせ', slug: 'news' },
];

export const faqAll = [
  ['「無農薬」と書かないのはなぜですか？', '私たちが育てる作物には、農薬も除草剤も使っていません。ただ、国のガイドラインでは「無農薬」という表示を使わないよう求められているため、「栽培期間中不使用」という正確な言い方で表示しています。'],
  ['化学肥料は使っていますか？', 'サツマイモとジャガイモには使っていません。サツマイモの肥料は、畑の草を燃やした草木灰だけです。にんにくと唐辛子は、米ぬか・堆肥・鶏糞を中心に、化学肥料を一部使っています。'],
  ['どうやって注文しますか？', 'ご注文フォーム、メール、InstagramのDMのいずれかでご連絡ください。在庫と送料、お届けの目安をお知らせします。'],
  ['送料はいくらですか？', 'サツマイモとジャガイモは送料別、にんにくと唐辛子は送料込みです。送料はお届け先の地域と箱の数で変わるため、ご注文の際にお知らせします。'],
  ['いつ届きますか？', 'サツマイモは秋に収穫し、天日干しのあと、もみ殻の中で約2か月寝かせてから出荷します。そのため、出荷は冬が中心です。ジャガイモは春から初夏が中心です。'],
  ['届いたサツマイモはどう保存すればいいですか？', '冷蔵庫には入れず、新聞紙に包んで、風通しのよい涼しい場所（13〜15℃くらい）に置いてください。寒さに弱いので、冬は冷えすぎない場所がおすすめです。'],
  ['形や大きさがそろっていないのですが。', '機械で選別せず、手で一つずつ見て出荷しています。虫食いや形のふぞろいがあることもありますが、味を優先しています。皮ごと食べていただけます。'],
  ['贈り物にできますか？', 'できます。お届け先とお届け希望日を、ご注文の際にお知らせください。のしの対応などはご相談ください。'],
];
