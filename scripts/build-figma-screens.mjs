import sharp from '/Users/ever/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';
import { mkdir } from 'node:fs/promises';

const W = 1672;
const heroPath = new URL('../graphics/source/medics-onboarding.png', import.meta.url).pathname;
const sheetPath = new URL('../graphics/source/catalog-contact-sheet.png', import.meta.url).pathname;
const outDir = new URL('../graphics/screens/', import.meta.url).pathname;
await mkdir(outDir, { recursive: true });

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const svg = (w, h, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><style>
  text{font-family:Inter,Arial,Helvetica,sans-serif}.muted{fill:#7b7d82}.ink{fill:#17191d}.small{font-size:18px}.body{font-size:22px}.label{font-size:20px;font-weight:600}.title{font-size:54px;font-weight:500}.price{font-size:42px;font-weight:600}
  </style>${body}</svg>`);

const header = (dark = false) => {
  const ink = dark ? '#fff' : '#14171a';
  const sub = dark ? '#d7dfeb' : '#7b7d82';
  return `<text x="120" y="74" font-size="34" font-weight="700" fill="${ink}">◒ Nimiti</text>
  <text x="785" y="72" font-size="18" fill="${sub}">Женщинам</text><text x="930" y="72" font-size="18" fill="${sub}">Мужчинам</text><text x="1065" y="72" font-size="18" fill="${sub}">Коллекции</text>
  <circle cx="1472" cy="64" r="22" fill="none" stroke="${ink}" opacity=".5"/><path d="M1461 64h22M1472 53v22" stroke="${ink}" opacity=".75" stroke-width="2"/>
  <path d="M1540 48h28v30h-28z" fill="none" stroke="${ink}" opacity=".55" stroke-width="2"/>`;
};

// Onboarding
const onboardingOverlay = svg(W, 1050, `
  <defs><linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#061326" stop-opacity=".82"/><stop offset=".58" stop-color="#061326" stop-opacity=".18"/><stop offset="1" stop-color="#061326" stop-opacity="0"/></linearGradient></defs>
  <rect width="1672" height="1050" fill="url(#shade)"/>
  ${header(true)}
  <g transform="translate(120 278)">
    <rect x="0" y="0" width="54" height="8" rx="4" fill="#20d565"/>
    <text x="0" y="118" font-size="76" font-weight="600" fill="#fff">Создано для тех,</text>
    <text x="0" y="205" font-size="76" font-weight="600" fill="#fff">кто заботится</text>
    <text x="0" y="274" font-size="24" fill="#d7dfeb">Профессиональная форма. Честный комфорт. Каждый день.</text>
  </g>
  <text x="120" y="960" font-size="18" fill="#c4cfdd">Nimiti · medical wear</text>
`);
await sharp(heroPath).resize(W, 1050, { fit: 'cover', position: 'center' }).composite([{ input: onboardingOverlay }]).png().toFile(`${outDir}/01-onboarding.png`);

// Product crops from the 3x2 contact sheet.
const sheetMeta = await sharp(sheetPath).metadata();
const cellW = Math.floor(sheetMeta.width / 3);
const cellH = Math.floor(sheetMeta.height / 2);
const crops = [];
for (let i = 0; i < 6; i++) {
  const col = i % 3, row = Math.floor(i / 3);
  crops.push(await sharp(sheetPath).extract({ left: col * cellW, top: row * cellH, width: cellW, height: cellH }).resize(330, 390, { fit: 'cover' }).png().toBuffer());
}

const catalogH = 1320;
let catalogBody = `<rect width="${W}" height="${catalogH}" fill="#f5f6f6"/>${header(false)}
  <text x="120" y="138" class="small muted">Каталог  /  Медицинская одежда</text>
  <text x="120" y="220" class="title ink">Медицинская одежда</text>
  <text x="120" y="265" class="body muted">Форма, которая работает вместе с вами</text>`;
const chips = ['Все', 'Новинки', 'Костюмы', 'Топы', 'Брюки', 'Халаты'];
let chipX = 120;
for (const [i, chip] of chips.entries()) {
  const cw = 50 + chip.length * 13;
  catalogBody += `<rect x="${chipX}" y="310" width="${cw}" height="48" rx="24" fill="${i===0?'#17191d':'#fff'}" stroke="${i===0?'#17191d':'#dfe1e3'}"/><text x="${chipX+25}" y="341" font-size="18" fill="${i===0?'#fff':'#303237'}">${esc(chip)}</text>`;
  chipX += cw + 12;
}
catalogBody += `<text x="1400" y="341" font-size="18" fill="#303237">Фильтры 2  ↓</text>`;
const names = ['Костюм Atlas Navy','Жакет Grace White','Костюм Pulse Terracotta','Костюм Air Blue','Топ Kimono Graphite','Костюм Line Burgundy','Брюки Flow Navy','Жакет Select White'];
const prices = ['8 900 ₽','10 000 ₽','7 800 ₽','7 400 ₽','4 600 ₽','8 200 ₽','4 300 ₽','9 600 ₽'];
const composites = [{ input: svg(W, catalogH, catalogBody) }];
for (let i = 0; i < 8; i++) {
  const col = i % 4, row = Math.floor(i / 4);
  const x = 120 + col * 365, y = 400 + row * 440;
  composites.push({ input: crops[i % 6], left: x, top: y });
  const cardText = svg(W, catalogH, `<rect x="${x}" y="${y}" width="330" height="390" rx="18" fill="none" stroke="#e6e7e8"/>
    <rect x="${x+16}" y="${y+16}" width="52" height="26" rx="13" fill="#fff" opacity=".9"/><text x="${x+28}" y="${y+35}" font-size="13" fill="#444">${i<2?'NEW':'PRO'}</text>
    <text x="${x}" y="${y+424}" font-size="19" font-weight="600" fill="#17191d">${esc(names[i])}</text><text x="${x}" y="${y+453}" font-size="18" fill="#17191d">${prices[i]}</text><text x="${x+108}" y="${y+453}" font-size="15" fill="#92959a">· 4 цвета</text>
    <path d="M${x+297} ${y+22}h18v24l-9-6-9 6z" fill="#fff" stroke="#8c9095"/>`);
  composites.push({ input: cardText });
}
await sharp({ create:{ width:W,height:catalogH,channels:4,background:'#f5f6f6' } }).composite(composites).png().toFile(`${outDir}/02-catalog.png`);

// Product detail
const detailH = 1420;
const largeProduct = await sharp(sheetPath).extract({ left: cellW, top: cellH, width: cellW, height: cellH }).resize(760, 950, { fit:'cover' }).png().toBuffer();
let detail = `<rect width="${W}" height="${detailH}" fill="#f7f7f6"/>${header(false)}
  <text x="120" y="138" class="small muted">Каталог  /  Женская одежда  /  Топ Kimono</text>
  <rect x="120" y="182" width="760" height="950" rx="24" fill="#e9e7e3"/>
  <rect x="150" y="205" width="64" height="30" rx="15" fill="#fff"/><text x="169" y="226" font-size="13" fill="#444">NEW</text>
  <path d="M823 210h24v31l-12-8-12 8z" fill="#fff" stroke="#6f7378" stroke-width="2"/>
  <text x="950" y="220" font-size="19" fill="#7b7d82">NIMITI / WOMEN</text>
  <text x="950" y="280" font-size="46" font-weight="500" fill="#17191d">Топ Kimono Graphite</text>
  <text x="950" y="348" class="price ink">4 600 ₽</text>
  <rect x="950" y="380" width="260" height="46" rx="23" fill="#fff" stroke="#d9dbde"/><text x="976" y="409" font-size="16" fill="#26292d">◉ 1 150 ₽ × 4 платежа  ›</text>
  <text x="950" y="474" class="label ink">Цвет: графит</text>
  <rect x="950" y="500" width="74" height="90" rx="12" fill="#33363c" stroke="#17191d" stroke-width="3"/>
  <rect x="1036" y="500" width="74" height="90" rx="12" fill="#0e2948"/><rect x="1122" y="500" width="74" height="90" rx="12" fill="#c6dcef"/><rect x="1208" y="500" width="74" height="90" rx="12" fill="#7c1728"/><rect x="1294" y="500" width="74" height="90" rx="12" fill="#eee"/>
  <text x="950" y="645" class="body muted">Параметры модели: Рост 172, 86/61/87</text><text x="950" y="680" class="body muted">Размер на модели: S</text>
  <text x="950" y="735" class="label ink">⌑  Гид по размерам  ›</text>
  <rect x="950" y="775" width="300" height="62" rx="31" fill="#fff" stroke="#d9dbde"/><text x="980" y="815" class="label ink">◇ Онлайн примерка</text>
  <rect x="950" y="870" width="180" height="64" rx="32" fill="#fff" stroke="#d9dbde"/><text x="980" y="910" class="label ink">S 40/42   ⌄</text>
  <rect x="1148" y="870" width="180" height="64" rx="32" fill="#fff" stroke="#d9dbde"/><text x="1178" y="910" class="label ink">−      1      +</text>
  <rect x="950" y="960" width="420" height="72" rx="36" fill="#17191d"/><text x="990" y="1005" font-size="21" font-weight="600" fill="#fff">Добавить в корзину · 4 600 ₽</text>
  <circle cx="1418" cy="996" r="36" fill="#fff"/><path d="M1407 981h22v28l-11-7-11 7z" fill="none" stroke="#17191d" stroke-width="2"/>
  <text x="950" y="1090" class="label ink">▦ Намекнуть о подарке  ›</text><text x="950" y="1140" class="label ink">▥ Узнать наличие в магазине  ›</text>
  <line x1="950" y1="1178" x2="1460" y2="1178" stroke="#dedfe1"/>
  <text x="950" y="1230" class="label ink">О товаре</text><text x="950" y="1270" class="body muted">Мягкая дышащая ткань, свободная посадка</text><text x="950" y="1304" class="body muted">и функциональные карманы для долгой смены.</text>
  <rect x="120" y="1162" width="170" height="190" rx="16" fill="#33363c"/><rect x="310" y="1162" width="170" height="190" rx="16" fill="#0e2948"/><rect x="500" y="1162" width="170" height="190" rx="16" fill="#c6dcef"/>`;
await sharp({ create:{ width:W,height:detailH,channels:4,background:'#f7f7f6' } }).composite([{input:svg(W,detailH,detail)},{input:largeProduct,left:120,top:182}]).png().toFile(`${outDir}/03-product-detail.png`);

console.log('Built graphics/screens/01-onboarding.png, graphics/screens/02-catalog.png, graphics/screens/03-product-detail.png');
