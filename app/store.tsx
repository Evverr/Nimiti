'use client';

import { useEffect, useId, useState } from 'react';

const IMAGE_ASSET = '/graphics/nimiti/images';
const ICON_ASSET = '/graphics/nimiti/icons';

type IconName = 'search' | 'user' | 'bag' | 'heart' | 'plus' | 'minus' | 'trash' | 'lock';

function Icon({ name, size = 24, alt = '' }: { name: IconName; size?: number; alt?: string }) {
  return <img className="nimiti-icon" src={`${ICON_ASSET}/${name}.svg`} width={size} height={size} alt={alt} />;
}

function ChipWithIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="chip chip-with-icon" type="button" data-figma-node="59:2701">
      <span>{children}</span>
      <span className="chip-icon-box" aria-hidden="true">
        <img className="chip-chevron" src={`${ICON_ASSET}/chevron-down.svg`} alt="" />
      </span>
    </button>
  );
}

export function HomeScreen() {
  return (
    <main className="home-screen" data-figma-node="129:4283">
      <section className="hero" data-figma-node="129:4285">
        <img className="hero-image" src="/graphics/nimiti/home-alt/hero-overlay.png" alt="Медицинские специалисты в форме Minti" />
        <div className="hero-shade" />
        <div className="home-header-shell">
        <header className="alt-catalog-header home-header" data-figma-node="129:4292">
          <div className="home-menu-trigger alt-menu-trigger">
            <button className="alt-header-control" type="button" aria-label="Открыть меню каталога" aria-haspopup="true">
              <img src="/graphics/nimiti/home-alt/menu.svg" width="36" height="36" alt="" />
            </button>
            <CatalogPopup />
          </div>
          <a className="alt-catalog-logo home-logo" href="/" aria-label="Minti — на главную">
            <img src="/graphics/nimiti/home-alt/logo.svg" width="185" height="45" alt="Minti" />
          </a>
        </header>
        </div>
        <div className="hero-content" data-figma-node="129:4287">
          <span className="hero-accent" />
          <h1>Создано для тех,<br />кто заботится</h1>
          <p>Профессиональная форма. Честный комфорт. Каждый день.</p>
          <a href="/catalog" className="home-cta">Смотреть каталог</a>
        </div>
      </section>
    </main>
  );
}

const compactCatalogProducts = [
  ['Жакет Grace Молочный', '10 000 р', '+2 цвета'],
  ['Брюки со стрелками Молочные', '4 900 р', '+2 цвета'],
  ['Брюки со стрелками Белые', '4 900 р', '+2 цвета'],
  ['Жакет Select Молочный', '10 000 р', '+2 цвета'],
  ['Брюки со стрелками Мокко', '4 900 р', '+2 цвета'],
  ['Коробка подарочная большая', '1 090 р', ''],
  ['Жакет Select Мокко', '10 000 р', '+2 цвета'],
  ['Жакет Select Белый', '10 000 р', '+2 цвета'],
  ['Жакет Grace Мокко', '10 000 р', '+2 цвета'],
  ['Жакет Grace Белый', '10 000 р', '+2 цвета'],
  ['Топ Kimono с длинным рукавом Космический', '4 600 р', '+6 цветов'],
  ['Брюки палаццо 111 Космические', '4 300 р', '+10 цветов'],
  ['Топ Kimono с длинным рукавом Белый', '4 600 р', '+6 цветов'],
  ['Брюки палаццо 111 Белые', '4 300 р', '+10 цветов'],
  ['Сумка Tote “Call” Изумрудный', '2 700 р', ''],
  ['Топ Kimono 112 Космический', '4 100 р', '+9 цветов'],
  ['Брюки палаццо 111 Бордовые', '4 300 р', '+10 цветов'],
  ['Топ Kimono 112 Бордовый', '4 100 р', '+9 цветов'],
].map(([name, price, colors], index) => ({
  id: index + 1,
  name,
  price,
  colors: [0, 4, 10, 15].includes(index) ? colors : '',
  image: `/graphics/nimiti/photo-sandbox/photo-${String(index + 1).padStart(2, '0')}.png`,
}));

const catalogMenuItems = [
  'Инвестиции', 'Новинки', 'Одежда', 'Цвета', 'Аксессуары',
  'Подарочные сертификаты', 'Коллекция икс', 'Лаборатория', 'Подборки',
  'Магазины', 'Корпоративным клиентам', 'О компании', 'Покупателям',
];

const catalogSubmenuItems = [
  ['Топы', 'search'], ['Брюки', 'task'], ['Жакеты', 'people'],
  ['Халаты', 'file'], ['Футболки', 'copy'], ['Лонгсливы', 'chats'],
  ['Худи', 'question'], ['Шопперы', 'info'], ['Аксессуары', 'search'],
] as const;

function CatalogMenuCell({ label, selected = false, icon }: { label: string; selected?: boolean; icon?: string }) {
  return (
    <a className={`catalog-menu-cell ${icon ? 'sub' : ''} ${selected ? 'selected' : ''}`} href="/catalog">
      {icon && <img src={`/graphics/nimiti/catalog-menu/${icon}.svg`} width="28" height="28" alt="" />}
      <span>{label}</span>
      {selected && <img className="catalog-menu-chevron" src="/graphics/nimiti/catalog-menu/chevron-right.svg" width="24" height="24" alt="" />}
    </a>
  );
}

function CatalogPopup() {
  return (
    <aside className="catalog-popup" aria-label="Категории каталога" data-figma-node="103:1248">
      <div className="catalog-popup-toolbar">
        <img src="/graphics/nimiti/catalog-menu/menu.svg" width="36" height="36" alt="" />
      </div>
      <div className="catalog-popup-columns">
        <nav className="catalog-popup-main" aria-label="Основные категории">
          {catalogMenuItems.map((label) => <CatalogMenuCell key={label} label={label} selected={label === 'Одежда'} />)}
        </nav>
        <span className="catalog-popup-divider" aria-hidden="true" />
        <nav className="catalog-popup-submenu" aria-label="Медицинская одежда">
          <h2>Медицинская одежда</h2>
          <div className="catalog-popup-submenu-list">
            {catalogSubmenuItems.map(([label, icon]) => <CatalogMenuCell key={label} label={label} icon={icon} />)}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function SearchGlyph() {
  return <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m21 21 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function HeaderSearch() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState({ top: 6, right: 0 });
  const matches = compactCatalogProducts.filter((product) => product.name.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru')));
  const alignSearchPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;
    setPosition({
      top: iconCenterY - 50,
      right: window.innerWidth - iconCenterX - 50,
    });
  };
  return (
    <div className="header-search">
      <button className="search-trigger" type="button" popoverTarget={id} onClick={alignSearchPopup} aria-label="Открыть поиск"><SearchGlyph /></button>
      <div id={id} popover="auto" className="search-popup" style={position} role="dialog" aria-label="Поиск товаров">
        <label className="search-field">
          <span className="sr-only">Поиск товаров</span>
          <input autoFocus type="search" placeholder="Поиск" value={query} onChange={(event) => setQuery(event.target.value)} />
          <SearchGlyph />
        </label>
        {query.trim() && <div className="search-results" aria-live="polite">
          {matches.length ? matches.map((product) => <a href="/product" key={product.id}>{product.name}<span>{product.price}</span></a>) : <p>Ничего не найдено</p>}
        </div>}
      </div>
    </div>
  );
}

function getSavedTheme() {
  return window.localStorage.getItem('nimiti-theme') === 'dark';
}

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  window.localStorage.setItem('nimiti-theme', dark ? 'dark' : 'light');
}

function getInitialTheme() {
  return typeof window !== 'undefined' && getSavedTheme();
}

function ModernHeader({ dark, onThemeToggle }: { dark: boolean; onThemeToggle: () => void }) {
  return (
    <header className="alt-catalog-header modern-header" data-figma-node="96:901">
      <div className="alt-menu-trigger">
        <button className="alt-header-control" type="button" aria-label="Открыть меню каталога" aria-haspopup="true"><img src="/graphics/nimiti/catalog-menu/menu.svg" width="36" height="36" alt="" /></button>
        <CatalogPopup />
      </div>
      <a className="alt-catalog-logo" href="/" aria-label="Minti — на главную">
        <img className="catalog-logo-light" src="/graphics/nimiti/catalog-alt/logo.svg" width="185" height="45" alt="Minti" />
        <img className="catalog-logo-dark" src="/graphics/nimiti/home-alt/logo.svg" width="185" height="45" alt="" aria-hidden="true" />
      </a>
      <div className="alt-header-actions">
        <button className={dark ? 'selected' : ''} type="button" onClick={onThemeToggle} aria-label="Переключить тёмную тему" aria-pressed={dark}>
          <span className="theme-toggle-icon" aria-hidden="true" />
        </button>
        <HeaderSearch />
      </div>
    </header>
  );
}

function ModernShell({ children, current, node }: { children: React.ReactNode; current: string; node: string }) {
  const [dark, setDark] = useState(getInitialTheme);
  useEffect(() => {
    applyTheme(dark);
  }, [dark]);
  const toggleTheme = () => setDark((value) => !value);
  return <main className="alt-catalog-shell modern-shell" data-figma-node={node}><ModernHeader dark={dark} onThemeToggle={toggleTheme} /><nav className="alt-breadcrumbs" aria-label="Хлебные крошки"><a href="/catalog">Каталог</a><span>—</span><a href="/catalog">Медицинская одежда</a><span>—</span><a href="/catalog">Новые коллекции</a><span>—</span><a href="/catalog">Женская одежда</a><span>—</span><strong>{current}</strong></nav>{children}</main>;
}

export function CompactCatalogScreen() {
  const [darkTheme, setDarkTheme] = useState(getInitialTheme);
  useEffect(() => {
    applyTheme(darkTheme);
  }, [darkTheme]);
  const toggleTheme = () => setDarkTheme((value) => !value);

  return (
    <main className={`alt-catalog-shell ${darkTheme ? 'dark' : ''}`} data-figma-node="96:1162">
      <header className="alt-catalog-header" data-figma-node="96:901">
        <div className="alt-menu-trigger">
          <button className="alt-header-control" type="button" aria-label="Открыть меню каталога" aria-haspopup="true">
            <img src="/graphics/nimiti/catalog-menu/menu.svg" width="36" height="36" alt="" />
          </button>
          <CatalogPopup />
        </div>
        <a className="alt-catalog-logo" href="/" aria-label="Minti — на главную">
          <img className="catalog-logo-light" src="/graphics/nimiti/catalog-alt/logo.svg" width="185" height="45" alt="Minti" />
          <img className="catalog-logo-dark" src="/graphics/nimiti/home-alt/logo.svg" width="185" height="45" alt="" aria-hidden="true" />
        </a>
        <div className="alt-header-actions">
          <button className={darkTheme ? 'selected' : ''} type="button" onClick={toggleTheme} aria-label="Переключить тёмную тему" aria-pressed={darkTheme}>
            <span className="theme-toggle-icon" aria-hidden="true" />
          </button>
          <HeaderSearch />
        </div>
      </header>

      <nav className="alt-breadcrumbs" aria-label="Хлебные крошки">
        <a href="/catalog">Каталог</a><span>—</span><a href="/catalog">Медицинская одежда</a><span>—</span><a href="/catalog">Новые коллекции</a><span>—</span><strong>Женская одежда</strong>
      </nav>

      <section className="alt-catalog-panel">
        <h1>Женская одежда</h1>
        <div className="alt-catalog-grid" data-figma-node="96:1165">
          {compactCatalogProducts.map((product) => (
            <a
              className="alt-product-card"
              key={product.id}
              href="/product"
              aria-label={`${product.name}, ${product.price}`}
              data-figma-node="96:1245"
            >
              <span className="alt-product-media" aria-hidden="true">
                <img className="alt-product-photo" src={product.image} alt="" draggable={false} />
                <img className="alt-product-bookmark" src="/graphics/nimiti/catalog-alt/product-bookmark.svg" width="32" height="32" alt="" />
              </span>
              <h2>{product.name}</h2>
              <p><strong>{product.price}</strong>{product.colors && <span>{product.colors}</span>}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="quantity" aria-label="Количество"><button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Уменьшить количество"><Icon name="minus" size={20} /></button><output>{value}</output><button onClick={() => onChange(value + 1)} aria-label="Увеличить количество"><Icon name="plus" size={20} /></button></div>;
}

function ProductStrip({ title }: { title: string }) {
  return <section className="modern-panel product-strip"><h2>{title}</h2><div className="product-strip-grid">{compactCatalogProducts.slice(0, 5).map((product) => <a className="alt-product-card" href="/product" key={`${title}-${product.id}`}><span className="alt-product-media"><img className="alt-product-photo" src={product.image} alt={product.name} draggable={false} /><img className="alt-product-bookmark" src="/graphics/nimiti/catalog-alt/product-bookmark.svg" width="32" height="32" alt="" /></span><h3>{product.name}</h3><p><strong>{product.price}</strong>{product.colors && <span>{product.colors}</span>}</p></a>)}</div></section>;
}

export function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('графит');
  const colors = [['графит', '#33363c'], ['тёмно-синий', '#0e2948'], ['голубой', '#c6dcef'], ['бордовый', '#7c1728'], ['белый', '#eeeeee']];
  return (
    <ModernShell node="129:4441" current="Карточка товара">
      <section className="modern-panel product-page">
        <h1 className="panel-title">Карточка товара</h1>
        <div className="product-detail-media"><img src="/graphics/nimiti/images/product-detail-new.png" alt="Топ Kimono Graphite" /></div>
        <div className="product-info"><p className="eyebrow">NIMITI / WOMEN</p><h1>Топ Kimono Graphite</h1><p className="big-price">4 600 ₽</p><span className="installment">1 150 ₽ × 4 платежа&nbsp; ›</span><h2>Цвет: {color}</h2>
          <div className="swatches">{colors.map(([name, hex]) => <button key={name} aria-label={name} className={color === name ? 'active' : ''} style={{ background: hex }} onClick={() => setColor(name)} />)}</div>
          <p className="muted">Параметры модели: Рост 172, 86/61/87<br />Размер на модели: S</p><button className="text-link">Гид по размерам&nbsp; ›</button>
          <div className="product-controls"><ChipWithIcon>S 40/42</ChipWithIcon><Quantity value={quantity} onChange={setQuantity} /></div>
          <a className="button button-primary" href="/cart">Добавить в корзину · {quantity * 4600} ₽</a><button className="info-link">Намекнуть о подарке&nbsp; ›</button><button className="info-link">Узнать наличие в магазине&nbsp; ›</button><p className="muted about">О товаре<br />Мягкая дышащая ткань, свободная посадка и функциональные карманы для долгой смены.</p>
        </div>
      </section>
      <ProductStrip title="Недавно просмотренные" />
      <ProductStrip title="Рекомендации" />
    </ModernShell>
  );
}

function CartItem({ name, meta, price, image }: { name: string; meta: string; price: string; image: string }) {
  const [quantity, setQuantity] = useState(1); const [visible, setVisible] = useState(true); if (!visible) return null;
  return <article className="cart-item"><img src={`${IMAGE_ASSET}/${image}`} alt={name} /><div className="cart-copy"><h2>{name}</h2><p>{meta}</p><strong>{price}</strong></div><div className="cart-item-actions"><Quantity value={quantity} onChange={setQuantity} /><button className="trash" onClick={() => setVisible(false)} aria-label={`Удалить ${name}`}><Icon name="trash" /></button></div></article>;
}

export function CartScreen() {
  return <ModernShell node="129:5018" current="Карточка товара"><section className="modern-panel two-column cart-page"><div className="cart-list"><h1>Корзина</h1><CartItem name="Топ Kimono Graphite" meta="Графит · S 40/42" price="4 600 ₽" image="cart-1.png" /><CartItem name="Брюки Flow Navy" meta="Тёмно-синий · M 44/46" price="4 300 ₽" image="cart-2.png" /></div><aside className="summary-card"><h2>Ваш заказ</h2><div className="summary-lines"><span>Товары · 2</span><span>8 900 ₽</span><span>Доставка</span><span>Бесплатно</span></div><div className="summary-total"><strong>Итого</strong><strong>8 900 ₽</strong></div><label className="field"><span>Промокод</span><input placeholder="Введите промокод" /></label><a className="button button-primary wide" href="/checkout" data-figma-node="49:20">Перейти к оформлению</a><p className="secure"><Icon name="lock" size={18} />Безопасная оплата</p></aside></section></ModernShell>;
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) { return <label className="field"><span>{label}</span><input type={type} placeholder={placeholder} /></label>; }

export function CheckoutScreen() {
  const [delivery, setDelivery] = useState('Курьер');
  return <ModernShell node="129:5271" current="Карточка товара"><section className="modern-panel two-column checkout-page"><form className="checkout-form" onSubmit={(event) => event.preventDefault()}><h1>Оформление заказа</h1><p className="muted">Шаг 1 из 2 · Контакты и доставка</p><h2>Контактные данные</h2><div className="form-grid"><Field label="Имя и фамилия" placeholder="Евгений Ерёмин" /><Field label="Телефон" placeholder="+7 900 000-00-00" type="tel" /><Field label="Email" placeholder="name@example.com" type="email" /><Field label="Город" placeholder="Калининград" /></div><h2>Способ доставки</h2><div className="chips">{['Курьер', 'Самовывоз'].map((item) => <button type="button" key={item} className={`chip ${delivery === item ? 'selected' : ''}`} onClick={() => setDelivery(item)}>{item}</button>)}</div><Field label="Адрес доставки" placeholder="Улица, дом, квартира" /><Field label="Комментарий курьеру" placeholder="Необязательно" /></form><aside className="summary-card checkout-summary"><h2>Ваш заказ</h2><div className="order-product"><img src={`${IMAGE_ASSET}/checkout-product.png`} alt="Топ Kimono Graphite" /><p>Топ Kimono Graphite<br />Графит · S 40/42 · 1 шт.<br />4 600 ₽</p></div><div className="summary-lines"><span>Товары</span><span>4 600 ₽</span><span>Доставка</span><span>Бесплатно</span></div><div className="summary-total"><strong>Итого</strong><strong>4 600 ₽</strong></div><button className="button button-primary wide" type="button">Перейти к оплате</button><p className="secure"><Icon name="lock" size={18} />Данные защищены · SSL</p></aside></section></ModernShell>;
}
