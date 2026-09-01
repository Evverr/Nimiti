'use client';

import { useEffect, useMemo, useState } from 'react';

const IMAGE_ASSET = '/graphics/nimiti/images';
const ICON_ASSET = '/graphics/nimiti/icons';

const products = [
  { name: 'Костюм Atlas Navy', price: '8 900 ₽', image: 'product-1.png', badge: 'NEW', category: 'Костюмы' },
  { name: 'Жакет Grace White', price: '10 000 ₽', image: 'product-2.png', badge: 'NEW', category: 'Халаты' },
  { name: 'Костюм Pulse Terracotta', price: '7 800 ₽', image: 'product-3.png', badge: 'PRO', category: 'Костюмы' },
  { name: 'Костюм Air Blue', price: '7 400 ₽', image: 'product-4.png', badge: 'PRO', category: 'Костюмы' },
  { name: 'Топ Kimono Graphite', price: '4 600 ₽', image: 'product-5.png', badge: 'PRO', category: 'Топы' },
  { name: 'Костюм Line Burgundy', price: '8 200 ₽', image: 'product-6.png', badge: 'PRO', category: 'Костюмы' },
  { name: 'Брюки Flow Navy', price: '4 300 ₽', image: 'product-7.png', badge: 'PRO', category: 'Брюки' },
  { name: 'Жакет Select White', price: '9 600 ₽', image: 'product-8.png', badge: 'PRO', category: 'Халаты' },
];

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

export function Header() {
  const [pathname, setPathname] = useState('');
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setPathname(window.location.pathname);
    const savedTheme = window.localStorage.getItem('nimiti-theme');
    const darkTheme = savedTheme === 'dark';
    setIsDark(darkTheme);
    document.documentElement.dataset.theme = darkTheme ? 'dark' : 'light';
  }, []);

  function toggleTheme() {
    setIsDark((currentTheme) => {
      const darkTheme = !currentTheme;
      document.documentElement.dataset.theme = darkTheme ? 'dark' : 'light';
      window.localStorage.setItem('nimiti-theme', darkTheme ? 'dark' : 'light');
      return darkTheme;
    });
  }
  const pages = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/product', label: 'Товар' },
    { href: '/cart', label: 'Корзина' },
    { href: '/checkout', label: 'Заказ' },
  ];

  return (
    <header className="site-header" data-figma-node="41:38">
      <div className="header-left">
        <button
          className="logo-link theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
          aria-pressed={isDark}
          title={isDark ? 'Светлая тема' : 'Тёмная тема'}
          data-figma-node="34:553"
        >
          <img src={`${ICON_ASSET}/logo.svg`} width="146" height="36" alt="Nimiti" />
        </button>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              className={pathname === page.href ? 'active' : undefined}
              aria-current={pathname === page.href ? 'page' : undefined}
            >
              {page.label}
            </a>
          ))}
        </nav>
      </div>
      <nav className="header-actions" aria-label="Действия">
        <a href="/catalog" className="icon-button" aria-label="Поиск"><Icon name="search" /></a>
        <a href="/checkout" className="icon-button" aria-label="Профиль"><Icon name="user" /></a>
        <a href="/cart" className="icon-button" aria-label="Корзина"><Icon name="bag" /></a>
      </nav>
    </header>
  );
}

function Shell({ children, node }: { children: React.ReactNode; node: string }) {
  return <main className="store-shell" data-figma-node={node}><Header />{children}</main>;
}

export function HomeScreen() {
  return (
    <Shell node="43:52">
      <section className="hero" data-figma-node="43:92">
        <img className="hero-image" src={`${IMAGE_ASSET}/hero.png`} alt="Медицинские специалисты в форме Nimiti" />
        <div className="hero-shade" />
        <div className="hero-content"><span className="hero-accent" /><h1>Создано для тех,<br />кто заботится</h1><p>Профессиональная форма. Честный комфорт. Каждый день.</p><a href="/catalog" className="button button-primary">Смотреть каталог</a></div>
      </section>
    </Shell>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <a className="product-card" href="/product" aria-label={`${product.name}, ${product.price}`}>
      <div className="product-media"><img src={`${IMAGE_ASSET}/${product.image}`} alt={product.name} /><span className="badge">{product.badge}</span><span className="heart"><Icon name="heart" /></span></div>
      <h2>{product.name}</h2><p><strong>{product.price}</strong><span>· 4 цвета</span></p>
    </a>
  );
}

export function CatalogScreen() {
  const [filter, setFilter] = useState('Все');
  const filters = ['Все', 'Новинки', 'Костюмы', 'Топы', 'Брюки', 'Халаты'];
  const visible = useMemo(() => products.filter((p) => filter === 'Все' || (filter === 'Новинки' ? p.badge === 'NEW' : p.category === filter)), [filter]);
  return (
    <Shell node="43:53">
      <section className="catalog-page">
        <div className="page-heading"><h1>Медицинская одежда</h1><p>Форма, которая работает вместе с вами</p></div>
        <div className="chips" aria-label="Фильтры каталога">{filters.map((item) => <button key={item} className={`chip ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="catalog-grid">{visible.map((product) => <ProductCard product={product} key={product.name} />)}</div>
      </section>
    </Shell>
  );
}

function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="quantity" aria-label="Количество"><button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Уменьшить количество"><Icon name="minus" size={20} /></button><output>{value}</output><button onClick={() => onChange(value + 1)} aria-label="Увеличить количество"><Icon name="plus" size={20} /></button></div>;
}

export function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('графит');
  const colors = [['графит', '#33363c'], ['тёмно-синий', '#0e2948'], ['голубой', '#c6dcef'], ['бордовый', '#7c1728'], ['белый', '#eeeeee']];
  return (
    <Shell node="43:54">
      <section className="product-page">
        <div className="product-detail-media"><img src={`${IMAGE_ASSET}/product-detail.png`} alt="Топ Kimono Graphite" /></div>
        <div className="product-info"><p className="eyebrow">NIMITI / WOMEN</p><h1>Топ Kimono Graphite</h1><p className="big-price">4 600 ₽</p><span className="installment">1 150 ₽ × 4 платежа&nbsp; ›</span><h2>Цвет: {color}</h2>
          <div className="swatches">{colors.map(([name, hex]) => <button key={name} aria-label={name} className={color === name ? 'active' : ''} style={{ background: hex }} onClick={() => setColor(name)} />)}</div>
          <p className="muted">Параметры модели: Рост 172, 86/61/87<br />Размер на модели: S</p><button className="text-link">Гид по размерам&nbsp; ›</button>
          <div className="product-controls"><ChipWithIcon>S 40/42</ChipWithIcon><Quantity value={quantity} onChange={setQuantity} /></div>
          <a className="button button-primary" href="/cart">Добавить в корзину · {quantity * 4600} ₽</a><button className="info-link">Намекнуть о подарке&nbsp; ›</button><button className="info-link">Узнать наличие в магазине&nbsp; ›</button><p className="muted about">О товаре<br />Мягкая дышащая ткань, свободная посадка и функциональные карманы для долгой смены.</p>
        </div>
      </section>
    </Shell>
  );
}

function CartItem({ name, meta, price, image }: { name: string; meta: string; price: string; image: string }) {
  const [quantity, setQuantity] = useState(1); const [visible, setVisible] = useState(true); if (!visible) return null;
  return <article className="cart-item"><img src={`${IMAGE_ASSET}/${image}`} alt={name} /><div className="cart-copy"><h2>{name}</h2><p>{meta}</p><strong>{price}</strong></div><div className="cart-item-actions"><Quantity value={quantity} onChange={setQuantity} /><button className="trash" onClick={() => setVisible(false)} aria-label={`Удалить ${name}`}><Icon name="trash" /></button></div></article>;
}

export function CartScreen() {
  return <Shell node="43:55"><section className="two-column cart-page"><div className="cart-list"><h1>Корзина</h1><p className="muted">2 товара</p><CartItem name="Топ Kimono Graphite" meta="Графит · S 40/42" price="4 600 ₽" image="cart-1.png" /><CartItem name="Брюки Flow Navy" meta="Тёмно-синий · M 44/46" price="4 300 ₽" image="cart-2.png" /></div><aside className="summary-card"><h2>Ваш заказ</h2><div className="summary-lines"><span>Товары · 2</span><span>8 900 ₽</span><span>Доставка</span><span>Бесплатно</span></div><div className="summary-total"><strong>Итого</strong><strong>8 900 ₽</strong></div><label className="field"><span>Промокод</span><input placeholder="Введите промокод" /></label><a className="button button-danger wide" href="/checkout" data-figma-node="49:20">Перейти к оформлению</a><p className="secure"><Icon name="lock" size={18} />Безопасная оплата</p></aside></section></Shell>;
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) { return <label className="field"><span>{label}</span><input type={type} placeholder={placeholder} /></label>; }

export function CheckoutScreen() {
  const [delivery, setDelivery] = useState('Курьер');
  return <Shell node="43:56"><section className="two-column checkout-page"><form className="checkout-form" onSubmit={(event) => event.preventDefault()}><h1>Оформление заказа</h1><p className="muted">Шаг 1 из 2 · Контакты и доставка</p><h2>Контактные данные</h2><div className="form-grid"><Field label="Имя и фамилия" placeholder="Евгений Ерёмин" /><Field label="Телефон" placeholder="+7 900 000-00-00" type="tel" /><Field label="Email" placeholder="name@example.com" type="email" /><Field label="Город" placeholder="Калининград" /></div><h2>Способ доставки</h2><div className="chips">{['Курьер', 'Самовывоз'].map((item) => <button type="button" key={item} className={`chip ${delivery === item ? 'selected' : ''}`} onClick={() => setDelivery(item)}>{item}</button>)}</div><Field label="Адрес доставки" placeholder="Улица, дом, квартира" /><Field label="Комментарий курьеру" placeholder="Необязательно" /></form><aside className="summary-card checkout-summary"><h2>Ваш заказ</h2><div className="order-product"><img src={`${IMAGE_ASSET}/checkout-product.png`} alt="Топ Kimono Graphite" /><p>Топ Kimono Graphite<br />Графит · S 40/42 · 1 шт.<br />4 600 ₽</p></div><div className="summary-lines"><span>Товары</span><span>4 600 ₽</span><span>Доставка</span><span>Бесплатно</span></div><div className="summary-total"><strong>Итого</strong><strong>4 600 ₽</strong></div><button className="button button-primary wide" type="button">Перейти к оплате</button><p className="secure"><Icon name="lock" size={18} />Данные защищены · SSL</p></aside></section></Shell>;
}
