import { site, faqAll, products } from '../config.mjs';
import { esc, icon, photo, schemaOrg, schemaFaq, faqBlock, ctaBand, catCards, teamGrid, orderBtn, contactButtons, pickCards } from '../layout.mjs';
import { postCards } from '../blog.mjs';

const steps = [
  ['planted', '春', '畝を立てて、一株ずつ植える', '何もない畑を耕して畝をつくり、苗を手で植えていきます。'],
  ['weeds', '夏', '真夏の草取りは、手で', '除草剤を使わないので、草はどんどん伸びます。35℃をこえる炎天下、ひと月かけて手で抜きます。'],
  ['ash', '夏', '抜いた草が、肥料になる', '集めた草を乾かして燃やし、草木灰に。サツマイモの肥料は、この灰だけです。'],
  ['dense', '秋', '台風をこえて、畑いっぱいに', '倒れても起き上がった蔓が、畑一面に茂ります。'],
  ['hero', '冬', '天日干しと、もみ殻の中で約2か月', '掘ったら天日で干し、昔ながらにもみ殻の中で寝かせて、甘みをのせてから手で選んで出荷します。'],
];

export default {
  path: '/',
  title: '田舎野菜｜鹿児島・薩摩川内の農家直送サツマイモ（紅はるか・紅あずま）とにんにく',
  description: '鹿児島県薩摩川内市、川内川のほとりの小さな畑から。農薬・除草剤を栽培期間中使わず、手で草を取って育てたサツマイモ（紅はるか・紅あずま）、ジャガイモ、にんにく、唐辛子を農家から直接お届けします。',
  schema: () => [schemaOrg(), { '@context': 'https://schema.org', '@type': 'WebSite', name: `${site.name}（${site.nameEn}）`, url: site.url + '/', inLanguage: 'ja' }, schemaFaq(faqAll.slice(0, 4))],
  body: (c, { posts }) => `
<section class="hero" style="background-image:url('${photo(c, 'hero')}')">
  <div class="wrap hero__in">
    <p class="eyebrow eyebrow--light">Inakayasai, Kagoshima</p>
    <h1 class="hero__h">旅する<br>鹿児島の<br class="sp">田舎野菜</h1>
    <p class="hero__lead">忙しい毎日の中で、あなたが健やかに、活力をもって生きるために。<br class="pc">鹿児島の太陽を浴びた、自然まかせの野菜をお届けします。</p>
    <div class="hero__btns"><a class="btn btn--gold btn--lg" href="${c.u('/satsumaimo/')}">サツマイモを見る${icon('arrow')}</a><a class="btn btn--ghost-light" href="${c.u('/order/')}">ご注文の方法</a></div>
  </div>
</section>

<section class="promise"><div class="wrap"><ul class="promise__list">
  <li>${icon('leaf')}<div><b>農薬・除草剤</b><span>栽培期間中不使用</span></div></li>
  <li>${icon('fire')}<div><b>サツマイモの肥料は</b><span>畑の草を燃やした草木灰だけ</span></div></li>
  <li>${icon('sun')}<div><b>天日干し＋もみ殻貯蔵</b><span>約2か月寝かせてから出荷</span></div></li>
  <li>${icon('hand')}<div><b>機械を使わず</b><span>一つずつ手で選んでお届け</span></div></li>
</ul></div></section>

<section class="sec sec--picks" id="products"><div class="wrap">
  <header class="sec__head"><p class="eyebrow">From the Farm</p><h2>いま、お届けできるもの</h2><p>その年にとれた分だけを、順番にご案内しています。</p></header>
  ${pickCards(c)}
  <div class="center mt"><a class="more" href="${c.u('/order/')}">ご注文の流れ・送料・お届けの時期${icon('arrow')}</a></div>
</div></section>

<section class="mosaic" aria-label="畑の写真"><div class="mosaic__grid">
  <img src="${photo(c, 'garlicTray')}" alt="竹ざるで干すにんにく" loading="lazy">
  <img src="${photo(c, 'andesRed')}" alt="掘りたてのアンデスレッド" loading="lazy">
  <img src="${photo(c, 'yakiClose')}" alt="焼き芋の断面" loading="lazy">
  <img src="${photo(c, 'mayQueen')}" alt="畝に並ぶメークイン" loading="lazy">
  <img src="${photo(c, 'kuromame')}" alt="丹波黒大豆" loading="lazy">
</div></section>

<section class="manifesto"><div class="wrap">
  <header class="manifesto__head"><p class="eyebrow">Manifesto</p><h2>非効率で、地味な野菜。<br>だから、おいしい。</h2></header>
  <ul class="manifesto__list">
    <li><b>大量生産の、逆を行く。</b><span>土と水と、野菜の力を信じて、自然にまかせて育てます。</span></li>
    <li><b>自分が食べたくないものは、まかない。</b><span>除草剤をまくと、なんだか食べたくない。家族にも食べてほしくない。ただ、それだけです。</span></li>
    <li><b>崖から落とすように、育てる。</b><span>鹿児島の熱い日差しに耐えさせ、草に埋もれさせる。厳しく、そして愛情を込めて。</span></li>
    <li><b>皮も根も、食べられる。</b><span>虫食いもあります。形もふぞろいです。そのかわり、まるごと安心して食べられる野菜です。</span></li>
  </ul>
  <p class="manifesto__sign">ひと芋、入魂。</p>
</div></section>

<section class="sec sec--tint"><div class="wrap">
  <header class="sec__head"><p class="eyebrow">Our Vegetables</p><h2>畑でとれるもの</h2><p>大量生産はしていません。サツマイモ、ジャガイモ、にんにく、唐辛子、黒大豆。</p></header>
  ${catCards(c)}
</div></section>

<section class="sec"><div class="wrap split">
  <div class="split__media"><img src="${photo(c, 'yakiHand')}" width="791" height="530" alt="手で割った焼き芋。中から蜜があふれている" loading="lazy"></div>
  <div class="split__txt">
    <p class="eyebrow">How to bake</p><h2>甘さは、熟成と焼き方で決まる。</h2>
    <p>はじめて出荷した年、形のいい大きな芋から急いで送りました。ところが手元に残した一本を焼いてみると、思ったほど甘くない。10日以上寝かせた小さな芋のほうが、はるかに甘かったのです。</p>
    <p>それからは、収穫後すぐには送らず、天日干しともみ殻貯蔵で甘みがのるのを待ってからお届けしています。届いたあとの焼き方も、ぜひ知ってください。</p>
    <a class="btn btn--soil" href="${c.u('/yakiimo/')}">おいしい焼き芋の焼き方${icon('arrow')}</a>
  </div>
</div></section>

<section class="sec sec--tint"><div class="wrap">
  <header class="sec__head"><p class="eyebrow">Our Way</p><h2>一本のサツマイモができるまで</h2><p>効率は悪くても、自分と家族が食べたいと思える育て方をしています。</p></header>
  <ol class="steps">${steps.map(([k, s, h, t]) => `<li class="step"><figure><img src="${photo(c, k)}" alt="${esc(h)}" loading="lazy"><span class="step__season">${s}</span></figure><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join('')}</ol>
  <div class="center mt"><a class="btn btn--ghost" href="${c.u('/kodawari/')}">栽培のこだわりを読む${icon('arrow')}</a></div>
</div></section>

<section class="sec sec--soil"><div class="wrap">
  <header class="sec__head sec__head--light"><p class="eyebrow eyebrow--light">Our Story</p><h2>祖父母の畑を、もう一度。</h2>
  <p>先祖代々の土地で、もう一度。猫岳（ねこだけ）の対岸、川内川の目の前の、わずか数百坪の畑から。</p></header>
  ${teamGrid(c)}
  <div class="center mt"><a class="btn btn--gold" href="${c.u('/story/')}">田舎野菜の物語${icon('arrow')}</a></div>
</div></section>

<section class="sec"><div class="wrap">
  <header class="sec__head"><p class="eyebrow">How to Order</p><h2>ご注文の流れ</h2></header>
  <ol class="flow">
    <li><span class="flow__n">1</span><h3>${icon('form')}ご連絡</h3><p>ご注文フォーム、メール、InstagramのDMで、品目・量・お届け先をお知らせください。</p></li>
    <li><span class="flow__n">2</span><h3>${icon('mail')}在庫と送料のご案内</h3><p>在庫、送料、お届けの目安をお返事します。</p></li>
    <li><span class="flow__n">3</span><h3>${icon('truck')}発送</h3><p>ご確認いただいたら、畑から直接お送りします。</p></li>
  </ol>
  <div class="center mt">${contactButtons(c)}</div>
</div></section>

${posts && posts.length ? `<section class="sec sec--tint"><div class="wrap">
  <header class="sec__head"><p class="eyebrow">Blog</p><h2>畑の日記・食べ方</h2></header>
  ${postCards(c, posts.slice(0, 3))}
  <div class="center mt"><a class="more" href="${c.u('/blog/')}">ブログの一覧${icon('arrow')}</a></div>
</div></section>` : ''}

<section class="sec"><div class="wrap wrap--narrow">
  <header class="sec__head"><p class="eyebrow">FAQ</p><h2>よくある質問</h2></header>
  ${faqBlock(faqAll.slice(0, 4))}
  <div class="center mt"><a class="more" href="${c.u('/faq/')}">すべての質問を見る${icon('arrow')}</a></div>
</div></section>

${ctaBand(c)}`,
};
