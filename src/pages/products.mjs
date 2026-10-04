import { products, photos } from '../config.mjs';
import { esc, icon, photo, pic, pageHero, productTable, growTags, ctaBand, faqBlock, schemaFaq, schemaProducts, figure, yt, contactButtons } from '../layout.mjs';

const cr = (name, path) => [['ホーム', '/'], [name, path]];
const of = (cat) => products.filter((p) => p.cat === cat);
const shipNote = (komi) => `<p class="small">${komi ? '価格は送料込みです。' : '価格に送料は含まれていません。送料はお届け先の地域と箱の数によって変わるため、ご注文の際にお知らせします。'}　状況は収穫量によって変わります。</p>`;

// ------------------------------------------------------------ サツマイモ
const imoFaq = [
  ['紅はるかと紅あずまは、どう違いますか？', '紅はるかは、ねっとりとして甘みが強い「蜜芋」です。焼き芋にいちばん向いています。紅あずまは、ほくほくとした食感で、甘さは控えめ。スイートポテト、大学芋、天ぷら、ポタージュなど料理に向いています。'],
  ['安納芋はありますか？', '少量だけ育てています。とれた年だけのご案内になるため、ご希望の方はお問い合わせください。'],
  ['鳴門金時はありますか？', '以前は育てていましたが、今は育てていません。ほくほく系がお好きな方には、紅あずまをおすすめしています。'],
  ['届いてすぐ食べられますか？', 'はい。もみ殻の中で約2か月寝かせ、甘みがのってから出荷しています。届いたら、新聞紙に包んで冷蔵庫に入れずに保存してください。'],
  ['皮ごと食べられますか？', '皮も食べられます。農薬も除草剤も使っていないので、よく洗って皮ごと焼くのがおすすめです。'],
];
const satsumaimo = {
  path: '/satsumaimo/',
  title: '鹿児島県産サツマイモ通販｜紅はるか・紅あずま 農家直送｜田舎野菜',
  description: '鹿児島県薩摩川内市の農家から直送するサツマイモ。紅はるか10kg・5kg、紅あずま5kg。農薬・除草剤・化学肥料は栽培期間中不使用、肥料は草木灰だけ。天日干しともみ殻貯蔵で約2か月寝かせてから出荷します。',
  crumbs: cr('サツマイモ', '/satsumaimo/'),
  schema: () => [...schemaProducts(of('satsumaimo'), photos.dug), schemaFaq(imoFaq)],
  body: (c) => `${pageHero(c, { eyebrow: 'Sweet Potato', h1: '鹿児島のサツマイモ<small>紅はるか・紅あずま・安納芋</small>', lead: '肥料は、畑の草を燃やした草木灰だけ。収穫のあと天日で干し、もみ殻の中で約2か月寝かせて、甘みがのってからお届けします。', crumbs: cr('サツマイモ', '/satsumaimo/'), image: 'dug' })}

<section class="sec"><div class="wrap">
  <div class="grow-box">${growTags('imo')}</div>
  <header class="sec__head"><h2>商品と価格</h2></header>
  ${productTable(of('satsumaimo'))}
  ${shipNote(false)}
  <div class="center mt">${contactButtons(c)}</div>
</div></section>

<section class="sec sec--tint"><div class="wrap">
  <header class="sec__head"><p class="eyebrow">Varieties</p><h2>品種のちがい</h2></header>
  <div class="variety">
    <article class="variety__item">${figure(c, 'yakiClose', '紅はるかの焼き芋。ねっとりとした断面')}<h3>紅はるか<small>べにはるか</small></h3><p class="variety__tag">ねっとり・甘い／焼き芋に</p><p>じっくり加熱すると、ねっとりとした食感と強い甘みが出る「蜜芋」です。皮をむきやすいのも特徴。いちばん人気の品種で、たくさん育てています。</p></article>
    <article class="variety__item">${figure(c, 'beniazumaDug', '掘りたての紅あずま')}<h3>紅あずま<small>べにあずま</small></h3><p class="variety__tag">ほくほく・甘さ控えめ／料理に</p><p>どっしりとした形が多く、ほくほくとした食感。焼いても形がくずれにくいので、スイートポテト、大学芋、天ぷら、豚汁やみそ汁、ポタージュに向いています。</p></article>
    <article class="variety__item">${figure(c, 'yakiBowl2', '焼き芋の断面')}<h3>安納芋<small>あんのういも・少量</small></h3><p class="variety__tag">しっとり・濃い甘さ</p><p>中はオレンジ色で、しっとりとして甘みが濃い品種です。たくさんは作っていないため、とれた年だけのご案内です。</p></article>
  </div>
  <aside class="past">${figure(c, 'narutoDug', '以前育てていた鳴門金時')}<div><p class="past__label">以前育てていた品種</p><h3>鳴門金時<small>なるときんとき</small></h3><p>黄金色の中身で、ほくほくとした食感。甘さは控えめで、どこか懐かしい味のサツマイモです。以前はこの畑でも育てていましたが、今はお休みしています。ほくほく系がお好きな方には、紅あずまがおすすめです。</p></div></aside>
</div></section>

<section class="sec"><div class="wrap split">
  <div class="split__media">${figure(c, 'hero', '掘りたてのサツマイモ。このあと天日で干します')}</div>
  <div class="split__txt">
    <p class="eyebrow">Curing &amp; Storage</p><h2>すぐには送りません。</h2>
    <p>掘ったサツマイモは、まず鹿児島の太陽で天日干しにします。そのあと、昔ながらの方法で、もみ殻の中に約2か月。</p>
    <p>保存のための機械は使っていません。寒さに弱いサツマイモのうち、冬を自分の力でこえた、生命力の強い芋だけを、一つずつ手で選んで出荷しています。</p>
    <a class="more" href="${c.u('/kodawari/')}">栽培のこだわり${icon('arrow')}</a>
  </div>
</div></section>

<section class="sec sec--tint"><div class="wrap wrap--narrow">
  <header class="sec__head"><p class="eyebrow">Video</p><h2>紅はるかと安納芋を、焼いて食べ比べ</h2><p>実際にどんなお芋かを見ていただくために撮った動画です。</p></header>
  ${yt('PkbAtTkf9Kw', '安納芋と紅はるかの食べ比べ')}
  <div class="center mt"><a class="btn btn--soil" href="${c.u('/yakiimo/')}">おいしい焼き芋の焼き方${icon('arrow')}</a></div>
</div></section>

<section class="sec"><div class="wrap wrap--narrow">
  <header class="sec__head"><h2>サツマイモのよくある質問</h2></header>
  ${faqBlock(imoFaq)}
</div></section>
${ctaBand(c)}`,
};

// ------------------------------------------------------------ 焼き芋
const yakiimo = {
  path: '/yakiimo/',
  title: 'サツマイモがもっと甘くなる焼き方と熟成の話｜オーブン・トースターで焼き芋｜田舎野菜',
  description: 'サツマイモの甘さは、熟成と焼き方で決まります。鹿児島の農家が、出荷で失敗して気づいた熟成の大切さと、家庭のオーブンやトースターでおいしい焼き芋を焼くコツをまとめました。',
  crumbs: cr('焼き芋の焼き方', '/yakiimo/'),
  body: (c) => `${pageHero(c, { eyebrow: 'How to Bake', h1: 'サツマイモが<br class="sp">もっと甘くなる焼き方', lead: '甘さは、熟成と焼き方で決まります。出荷で失敗して気づいたことと、家庭でおいしく焼くコツです。', crumbs: cr('焼き芋の焼き方', '/yakiimo/'), image: 'yakiDark' })}

<article class="sec"><div class="wrap wrap--read prose">
  <h2>はじめての出荷で、失敗しました</h2>
  <p>はじめてサツマイモを発送したとき、「早く食べてもらいたい」「おいしいと知ってもらいたい」という気持ちで、収穫してすぐ、形のいい大きな芋から送りました。</p>
  <p>ところが、手元に残しておいた大きな安納芋（傷のあるもの）をオーブンで30分以上焼いて食べてみると、色はとてもおいしそうなのに、思ったほど甘くないのです。10日以上寝かせておいた、売り物にならないような小さな芋とは、甘さがまるで違いました。</p>
  <p>芋の味は、大きさでも見た目でもない。そのとき「しまった」と思いました。</p>
  ${figure(c, 'yakiBowl', '寝かせたサツマイモは、割るとやわらかく、蜜が出てきます')}
  <h2>だから、寝かせてからお届けします</h2>
  <p>それからは、収穫してすぐにはお送りしていません。天日干しのあと、もみ殻の中で約2か月寝かせて、甘みがのるのを待ってから出荷しています。作って終わり、選んで終わりではなく、おいしくなったと思えるまで待つ。大きく売れなくても、「また食べたい」と言っていただけるものを届けたいと思っています。</p>

  <h2>家庭でおいしく焼くコツ</h2>
  <ol class="howto">
    <li><b>洗って、水気をつけたままアルミホイルで包む</b><span>皮ごと焼けます。ホイルで包むと焦げすぎず、しっとり仕上がります。</span></li>
    <li><b>オーブン（またはトースター）で45分以上</b><span>動画では30分以上とお話ししていますが、45分以上がおすすめです。太い芋なら1時間ほどかけても大丈夫。焦げそうなときは温度を少し下げてください。</span></li>
    <li><b>竹串がすっと通ればできあがり</b><span>寝かせた芋は、割ると蜜が出て、とてもやわらかくなっています。</span></li>
  </ol>
  <p>時間をかけてゆっくり加熱するほど、甘みが引き出されます。急いで高温で焼くより、低めの温度で長く焼くのがコツです。</p>
  ${yt('i0m1nvzMOls', '焼き方で変わるサツマイモの甘さ')}
  <p class="small">小ぶりの芋を使って、焼き方で甘さがどう変わるかを説明しています。</p>

  <h2>焼き芋の、ちょっと楽しい食べ方</h2>
  <p>朝ごはんに、焼き芋とスープとサラダ。紅あずまなら、ゆでてつぶしてポタージュにも。皮ごと食べられるので、むかずにそのままどうぞ。</p>
  <div class="gallery">${figure(c, 'yakiFoil', 'ホイル焼き芋の朝ごはん')}${figure(c, 'potage', '紅あずまのポタージュ')}</div>
</div></article>
${ctaBand(c, { title: '寝かせたサツマイモを、ご家庭で。', text: '紅はるか・紅あずまのご注文はこちらから。在庫と送料、お届けの目安をお知らせします。' })}`,
};

// ------------------------------------------------------------ ジャガイモ
const jagaimo = {
  path: '/jagaimo/',
  title: '鹿児島県産ジャガイモ通販｜男爵・メークイン・ノーザンルビー・アンデスレッド｜田舎野菜',
  description: '鹿児島県薩摩川内市の農家が育てるジャガイモ。男爵、メークイン、ノーザンルビー、アンデスレッドなど。農薬・除草剤・化学肥料は栽培期間中不使用。収穫期にご案内します。',
  crumbs: cr('ジャガイモ', '/jagaimo/'),
  schema: () => [...schemaProducts(of('jagaimo'), photos.vegSet)],
  body: (c) => `${pageHero(c, { eyebrow: 'Potato', h1: '鹿児島のジャガイモ', lead: '男爵、メークイン、ノーザンルビー、アンデスレッド。肥料は草木灰・鶏糞・堆肥・腐葉土で、化学肥料は使っていません。', crumbs: cr('ジャガイモ', '/jagaimo/') })}
<section class="sec"><div class="wrap">
  <div class="grow-box">${growTags('jaga')}</div>
  <header class="sec__head"><h2>商品と価格</h2><p>ジャガイモは、収穫期になったらご案内します。予約をご希望の方は、お気軽にご連絡ください。</p></header>
  ${productTable(of('jagaimo'))}
  ${shipNote(false)}
  <div class="center mt">${contactButtons(c)}</div>
</div></section>
<section class="sec sec--tint"><div class="wrap">
  <header class="sec__head"><h2>品種のちがい</h2></header>
  <div class="variety variety--4">
    <article class="variety__item">${pic('potato')}<h3>男爵</h3><p class="variety__tag">粉質・ほくほく</p><p>昔から愛される定番。ポテトサラダ、コロッケ、蒸して塩だけでも。</p></article>
    <article class="variety__item">${pic('potato')}<h3>メークイン</h3><p class="variety__tag">なめらか・煮くずれしにくい</p><p>肉じゃがやカレーなど、煮込み料理に。</p></article>
    <article class="variety__item">${pic('potato')}<h3>ノーザンルビー</h3><p class="variety__tag">赤い皮・ピンクの中身</p><p>ほんのり甘く、サラダやスープの彩りに。</p></article>
    <article class="variety__item">${pic('potato')}<h3>アンデスレッド</h3><p class="variety__tag">赤い皮・ほくほく</p><p>男爵に近い食感で、塩バターやグリルに。</p></article>
  </div>
</div></section>
${ctaBand(c, { title: '収穫期のご案内を受け取る', text: 'ジャガイモの予約やご質問は、ご注文フォーム、メール、InstagramのDMからどうぞ。' })}`,
};

// ------------------------------------------------------------ にんにく・唐辛子
const spice = {
  path: '/ninniku-tougarashi/',
  title: '鹿児島県産にんにく・唐辛子（鷹の爪）・ハラペーニョ 農家直送｜田舎野菜',
  description: '鹿児島県薩摩川内市の農家が育てるにんにく（5kg・10kg、送料込み）、唐辛子（鷹の爪・天日干し）、ハラペーニョ。農薬・除草剤は栽培期間中不使用。',
  crumbs: cr('にんにく・唐辛子', '/ninniku-tougarashi/'),
  schema: () => [...schemaProducts(of('spice'), photos.vegSet)],
  body: (c) => `${pageHero(c, { eyebrow: 'Garlic &amp; Chili', h1: 'にんにく・唐辛子', lead: 'にんにく、鷹の爪、ハラペーニョ。料理の香りと辛みを、畑から。価格はすべて送料込みです。', crumbs: cr('にんにく・唐辛子', '/ninniku-tougarashi/'), image: 'vegSet' })}
<section class="sec"><div class="wrap">
  <div class="grow-box">${growTags('spice')}</div>
  <header class="sec__head"><h2>商品と価格</h2></header>
  ${productTable(of('spice'))}
  ${shipNote(true)}
  <div class="center mt">${contactButtons(c)}</div>
</div></section>
<section class="sec sec--tint"><div class="wrap split">
  <div class="split__media">${figure(c, 'garlicWalnut', '畑のにんにくで、バジルペーストを作りました')}</div>
  <div class="split__txt">
    <p class="eyebrow">Recipe</p><h2>畑のにんにくで、バジルペースト</h2>
    <p>朝摘みのバジルと、畑のにんにく、炒ったクルミで作るバジルペースト。トーストにもパスタにも使えます。ハラペーニョは、自家製ピクルスにするのが我が家の定番です。</p>
    <a class="btn btn--soil" href="${c.u('/blog/basil-pesto/')}">バジルペーストの作り方${icon('arrow')}</a>
  </div>
</div></section>
${ctaBand(c)}`,
};

export default [satsumaimo, yakiimo, jagaimo, spice];
