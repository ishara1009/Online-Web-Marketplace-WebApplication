import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TechMartLandingPage.css';

const Icon = ({ name }) => {
  const icons = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5a5.5 5.5 0 0 0 1.1-8.9Z"/>,
    cart: <><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.5 11h11l2-7H7"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <path d="m5 12 14 0m-5-5 5 5-5 5"/>,
  };
  return <svg className="tm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
};

const categories = [
  ['📱','Smartphones'],['💻','Laptops'],['🖥️','Desktop Computers'],['▣','Tablets'],['⌚','Smartwatches'],['📺','Televisions'],['📷','Cameras'],['🎮','Gaming Consoles'],['🎧','Headphones'],['🔊','Speakers'],['⌨️','Keyboards'],['🖱️','Mouse'],['🖥','Monitors'],['🖨️','Printers'],['💾','SSD & HDD'],['▤','RAM'],['◫','Graphics Cards'],['📡','Routers'],['🔋','UPS'],['🪑','Office Chairs'],['▯','Phone Cases'],['⚡','Chargers'],['🔋','Power Banks'],['🎵','Earbuds'],['🔉','Bluetooth Speakers'],['▱','Screen Protectors'],['🤳','Selfie Sticks'],['🚗','Car Phone Holders'],['⌁','USB Cables']
];
const brands = ['Apple','Samsung','Dell','HP','Lenovo','ASUS','Acer','MSI','LG','SONY','Canon','Nikon','Kingston','Logitech','Razer','intel','AMD','NVIDIA','TP-Link','Xiaomi'];
const deals = [
  { tag:'LAPTOP WEEK', title:'Up to 40% Off Laptops', text:'Powerful performance for work, study, and play.', color:'blue', cta:'Shop laptops' },
  { tag:'LIMITED TIME', title:'Smartphone Flash Sale', text:'Save big on the latest smartphones and bundles.', color:'purple', cta:'View flash sale' },
  { tag:'LEVEL UP', title:'Gaming Accessories Sale', text:'Keyboards, headsets, mice, and more from top brands.', color:'dark', cta:'Shop gaming' },
  { tag:'THIS WEEKEND', title:'Free Shipping Weekend', text:'Enjoy islandwide delivery on eligible online orders.', color:'cyan', cta:'Start shopping' },
];

function TechMartLandingPage() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem('techmart-theme') === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(12);

  useEffect(() => {
    localStorage.setItem('techmart-theme', dark ? 'dark' : 'light');
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [dark]);

  const go = (path) => { setMenuOpen(false); navigate(path); };
  const scroll = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); };
  const submitSearch = (e) => { e.preventDefault(); if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`); };

  return (
    <div className={`techmart-page ${dark ? 'tm-dark' : ''}`}>
      <div className="tm-topbar"><div className="tm-shell"><span>🚚 Free islandwide delivery on eligible orders</span><div><a href="tel:+94112345678">+94 11 234 5678</a><span>Order Tracking</span><span>Help Center</span></div></div></div>
      <header className="tm-header">
        <div className="tm-shell tm-nav">
          <button className="tm-logo" onClick={() => scroll('home')} aria-label="TechMart home"><span className="tm-logo-mark">T</span>Tech<span>Mart</span></button>
          <nav className={`tm-menu ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <button onClick={() => scroll('home')}>Home</button><button onClick={() => go('/products')}>Shop</button><button onClick={() => scroll('categories')}>Categories</button><button onClick={() => scroll('deals')}>Deals</button><button onClick={() => scroll('brands')}>Brands</button><button onClick={() => scroll('why')}>About</button><button onClick={() => scroll('contact')}>Contact</button>
          </nav>
          <div className="tm-actions">
            <form className="tm-search" onSubmit={submitSearch}><Icon name="search"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products"/>{search && <div className="tm-suggestions"><small>Search suggestions</small>{categories.filter(([,name])=>name.toLowerCase().includes(search.toLowerCase())).slice(0,4).map(([icon,name])=><button key={name} type="button" onClick={()=>go(`/products?search=${encodeURIComponent(name)}`)}>{icon}<span>{name}</span></button>)}</div>}</form>
            <button className="tm-icon-btn tm-desktop-action" aria-label="Wishlist"><Icon name="heart"/><span className="tm-count">2</span></button>
            <button className="tm-icon-btn tm-desktop-action" onClick={()=>go('/cart')} aria-label="Cart"><Icon name="cart"/><span className="tm-count">3</span></button>
            <button className="tm-theme" onClick={()=>setDark(!dark)} aria-label="Toggle dark mode"><Icon name={dark?'sun':'moon'}/></button>
            <button className="tm-login tm-desktop-action" onClick={()=>go('/login')}>Login</button><button className="tm-register tm-desktop-action" onClick={()=>go('/signup')}>Register</button>
            <button className="tm-mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name={menuOpen?'close':'menu'}/></button>
          </div>
        </div>
      </header>

      <main>
        <section className="tm-hero" id="home"><div className="tm-shell tm-hero-grid">
          <div className="tm-hero-copy"><span className="tm-eyebrow"><i></i> Your trusted electronics destination</span><h1>Discover the Latest Technology at the <span>Best Prices</span></h1><p>Shop smartphones, laptops, gaming gear, computer accessories, and mobile essentials from trusted brands with fast delivery and secure payments.</p><div className="tm-hero-buttons"><button className="tm-primary" onClick={()=>go('/products')}>Shop Now <Icon name="arrow"/></button><button className="tm-secondary" onClick={()=>scroll('categories')}>View Categories</button></div><div className="tm-hero-stats"><div><strong>10,000+</strong><span>Products</span></div><div><strong>20+</strong><span>Top Brands</span></div><div><strong>4.9/5</strong><span>Customer Rating</span></div></div></div>
          <div className="tm-hero-visual"><div className="tm-image-glow"></div><img src="/images/techmart-hero.png" alt="Laptop, smartphone, headphones, smartwatch and gaming accessories"/><span className="tm-deal-badge"><small>LIMITED OFFER</small><strong>Save up to 40%</strong><em>Shop today's deals →</em></span><span className="tm-stock-badge">✓ <span><strong>Genuine Products</strong><small>Manufacturer warranty</small></span></span></div>
        </div></section>

        <section className="tm-features"><div className="tm-shell tm-feature-grid">{[['🚚','Fast Delivery','Free shipping on eligible orders.'],['🔒','Secure Payments','100% secure online payment options.'],['🛡️','Warranty','Official manufacturer warranty available.'],['🎧','24/7 Customer Support','Friendly support whenever you need help.']].map(([icon,title,text])=><article key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

        <section className="tm-section" id="categories"><div className="tm-shell"><header className="tm-section-head"><div><span className="tm-kicker">Explore our range</span><h2>Shop by Category</h2><p>Everything you need, from everyday essentials to high-performance tech.</p></div><button onClick={()=>go('/products')}>View all products <Icon name="arrow"/></button></header><div className="tm-category-grid">{categories.slice(0,visibleCategories).map(([icon,name])=><button key={name} className="tm-category-card" onClick={()=>go(`/products?category=${encodeURIComponent(name)}`)}><span className="tm-category-icon">{icon}</span><strong>{name}</strong><small>Explore products</small><i>→</i></button>)}</div>{visibleCategories<categories.length&&<button className="tm-load-more" onClick={()=>setVisibleCategories(categories.length)}>Show all 29 categories</button>}</div></section>

        <section className="tm-section tm-brand-section" id="brands"><div className="tm-shell"><header className="tm-section-head"><div><span className="tm-kicker">Brands you trust</span><h2>Popular Brands</h2></div></header><div className="tm-brand-grid">{brands.map(brand=><button key={brand} onClick={()=>go(`/products?brand=${encodeURIComponent(brand)}`)}>{brand}</button>)}</div></div></section>

        <section className="tm-section" id="deals"><div className="tm-shell"><header className="tm-section-head"><div><span className="tm-kicker">Limited-time savings</span><h2>Today's Best Deals</h2><p>Don't miss these hand-picked offers on customer favorites.</p></div><button onClick={()=>go('/products')}>Explore all deals <Icon name="arrow"/></button></header><div className="tm-deals-grid">{deals.map(deal=><article key={deal.title} className={`tm-deal-card ${deal.color}`}><span>{deal.tag}</span><h3>{deal.title}</h3><p>{deal.text}</p><button onClick={()=>go('/products')}>{deal.cta} →</button><div className="tm-deal-art">{deal.color==='blue'?'💻':deal.color==='purple'?'📱':deal.color==='dark'?'🎮':'📦'}</div></article>)}</div></div></section>

        <section className="tm-why" id="why"><div className="tm-shell tm-why-grid"><div className="tm-why-visual"><div className="tm-why-card"><span>✓</span><strong>100% Authentic</strong><small>Every product quality checked</small></div><div className="tm-package">TM<span>TECHMART</span></div></div><div className="tm-why-copy"><span className="tm-kicker">The TechMart difference</span><h2>Technology shopping you can trust.</h2><p>We make buying electronics simple, secure, and satisfying—from discovery to delivery.</p><div className="tm-check-grid">{['Genuine Products','Trusted Brands','Secure Checkout','Fast Islandwide Delivery','Easy Returns','Competitive Prices','Warranty Support'].map(item=><div key={item}><span>✓</span>{item}</div>)}</div><button className="tm-primary" onClick={()=>scroll('contact')}>Learn More <Icon name="arrow"/></button></div></div></section>

        <section className="tm-section tm-testimonials"><div className="tm-shell"><header className="tm-section-head centered"><div><span className="tm-kicker">Real customer stories</span><h2>Loved by Tech Shoppers</h2></div></header><div className="tm-testimonial-grid">{[["I purchased my gaming laptop from TechMart. Delivery was fast and the product was genuine.",'Michael Fernando','MF'],['Excellent customer service and affordable prices. The team helped me choose the perfect phone.','Nadeesha Silva','NS'],['Highly recommend TechMart for electronics. My order arrived safely and exactly as described.','Kasun Perera','KP']].map(([quote,name,initials])=><article key={name}><div className="tm-stars">★★★★★</div><p>“{quote}”</p><footer><span>{initials}</span><div><strong>{name}</strong><small>Verified customer</small></div><b>✓</b></footer></article>)}</div></div></section>

        <section className="tm-newsletter"><div className="tm-shell tm-news-grid"><div><span>✉</span><div><h2>Stay Updated</h2><p>Subscribe to receive the latest offers, product launches, and exclusive discounts.</p></div></div><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Enter your email address" required aria-label="Email address"/><button type="submit">Subscribe</button></form></div></section>

        <section className="tm-contact" id="contact"><div className="tm-shell"><header className="tm-section-head centered"><div><span className="tm-kicker">We're here to help</span><h2>Contact TechMart</h2><p>Questions about a product or an order? Our friendly team is ready to assist.</p></div></header><div className="tm-contact-grid"><article><span>⌖</span><h3>Visit Our Store</h3><p><strong>TechMart (Pvt) Ltd.</strong><br/>No. 125, Galle Road,<br/>Colombo 03, Sri Lanka.</p></article><article><span>☎</span><h3>Call Us</h3><p><a href="tel:+94112345678">+94 11 234 5678</a><br/><a href="tel:+94774567890">+94 77 456 7890</a></p></article><article><span>✉</span><h3>Email Us</h3><p><a href="mailto:support@techmart.lk">support@techmart.lk</a><br/><a href="mailto:sales@techmart.lk">sales@techmart.lk</a></p></article><article><span>◷</span><h3>Business Hours</h3><p>Mon – Fri: 9:00 AM – 6:00 PM<br/>Saturday: 9:00 AM – 2:00 PM<br/><em>Sunday: Closed</em></p></article></div></div></section>
      </main>

      <footer className="tm-footer"><div className="tm-shell tm-footer-grid"><div className="tm-footer-brand"><div className="tm-logo"><span className="tm-logo-mark">T</span>Tech<span>Mart</span></div><p>Sri Lanka's trusted destination for genuine electronics, great prices, and dependable service.</p><div className="tm-socials">{['f','◎','𝕏','in','▶'].map((x,i)=><a key={i} href="#social" aria-label={['Facebook','Instagram','X','LinkedIn','YouTube'][i]}>{x}</a>)}</div></div><div><h3>Quick Links</h3>{['Home','Shop','Categories','Deals','Brands','About Us','Contact','FAQs'].map(x=><a href="#home" key={x}>{x}</a>)}</div><div><h3>Customer Service</h3>{['Shipping Policy','Return Policy','Privacy Policy','Terms & Conditions'].map(x=><a href="#policy" key={x}>{x}</a>)}<h3 className="tm-footer-sub">Categories</h3>{['Smartphones','Laptops','Gaming','Computer Accessories','Mobile Accessories'].map(x=><a href="#categories" key={x}>{x}</a>)}</div><div><h3>Get In Touch</h3><p>No. 125, Galle Road,<br/>Colombo 03, Sri Lanka.</p><a href="tel:+94112345678">+94 11 234 5678</a><a href="mailto:support@techmart.lk">support@techmart.lk</a><h3 className="tm-footer-sub">We Accept</h3><div className="tm-payments"><b>VISA</b><b>MC</b><b>PayPal</b><b>Pay</b><b>G Pay</b></div></div></div><div className="tm-shell tm-copyright"><span>© 2026 TechMart (Pvt) Ltd. All Rights Reserved.</span><span>Made for smarter shopping in Sri Lanka.</span></div></footer>

      <a className="tm-whatsapp" href="https://wa.me/94774567890" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">◉<span>WhatsApp</span></a><button className="tm-chat" onClick={()=>setChatOpen(!chatOpen)} aria-label="Live chat">☏<span>Live Chat</span></button>{chatOpen&&<div className="tm-chat-box"><header><span>TechMart Support</span><button onClick={()=>setChatOpen(false)}>×</button></header><div><strong>Hi there! 👋</strong><p>How can we help you today?</p><button>Start a conversation</button></div></div>}{showTop&&<button className="tm-back-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">↑</button>}
    </div>
  );
}

export default TechMartLandingPage;
