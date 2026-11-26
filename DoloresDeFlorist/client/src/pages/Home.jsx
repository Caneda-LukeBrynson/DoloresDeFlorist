import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, homeFor } from '../auth'
import roseBouquet from '../assets/red-rose-bouquet.jpg'
import giftBundle from '../assets/gift-bundle.jpg'
import moneyBouquet from '../assets/money-bouquet.jpg'
import funeralSpray from '../assets/funeral-flowers.jpg'

const collections = [
  { name: 'Bouquets', from: 1500, img: roseBouquet },
  { name: 'Gift Bundles', from: 2500, img: giftBundle },
  { name: 'Money Bouquets', from: 2000, img: moneyBouquet },
  { name: 'Sympathy', from: 2000, img: funeralSpray },
]
const occasions = [
  ['Birthday', '🎂'], ['Anniversary', '💞'], ['Congratulations', '🎉'],
  ['Thank You', '🌷'], ['Sympathy', '🕊️'], ['New Baby', '🧸'],
]
const bestSellers = [
  { id: 1, name: 'Red Rose Bouquet', price: 2500, img: roseBouquet, alt: 'Red roses with baby’s breath in black and gold wrapping' },
  { id: 2, name: 'Rose, Teddy and Chocolate Bundle', price: 3500, img: giftBundle, alt: 'Red rose bouquet with a large teddy bear and a chocolate box' },
  { id: 3, name: 'Money Bouquet', price: 3000, img: moneyBouquet, alt: 'Bouquet of 1000 peso bills with dried baby’s breath in blue wrapping' },
  { id: 4, name: 'Sympathy Standing Spray', price: 3000, img: funeralSpray, alt: 'White standing flower sprays with condolence ribbons' },
]
const perks = [
  ['🛵', 'Same day delivery', 'Within Naga City and nearby'],
  ['🌿', 'Fresh flowers', 'Handpicked with care'],
  ['✂️', 'Expert florists', 'Arranged by hand'],
  ['💚', 'Happiness guaranteed', 'Your satisfaction, always'],
]
const peso = (n) => `₱${n.toLocaleString()}`

export default function Home() {
  const { user } = useAuth()
  const [cart, setCart] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <>
      <div className="topbar">Same day delivery available in Naga City, Cebu. Call 0936 348 7471 to order.</div>

      <header className="nav">
        <a href="#top" className="brand" aria-label="Dolores de Florist home">
          <img src="/logo.jpg" alt="Dolores de Florist" />
        </a>
        <nav aria-label="Main">
          <a href="#collections">Flowers</a>
          <a href="#collections">Shop</a>
          <a href="#occasions">Occasions</a>
          <a href="#story">About us</a>
          <a href="#contact">Contact</a>
          <Link to="/customer/new">Order online</Link>
          <Link to="/track">Track order</Link>
          {user ? <Link to={homeFor(user)}>My dashboard</Link> : <Link to="/login">Log in</Link>}
        </nav>
        <div className="icons">
          <button aria-label="Search">🔍</button>
          <Link to={user ? homeFor(user) : '/login'} aria-label="Account" className="acct">👤</Link>
          <button aria-label={`Cart, ${cart} items`} className="cart">🛍️<span>{cart}</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>Flowers for every occasion.</h1>
            <p>Hand-tied bouquets and gifts from our shop in Naga City, Cebu, made to mark the big days and the small ones.</p>
            <Link className="btn" to="/customer/new">Order flowers</Link>
          </div>
          <div className="hero-art"><img src="/logo.jpg" alt="Dolores de Florist, cream roses and hydrangea" /></div>
        </section>

        <ul className="perks">
          {perks.map(([i, t, s]) => (
            <li key={t}><span aria-hidden>{i}</span><div><strong>{t}</strong><small>{s}</small></div></li>
          ))}
        </ul>

        <section id="collections" className="block">
          <div className="head"><h2>Shop our collections</h2><a className="pill" href="#collections">View all</a></div>
          <div className="grid4">
            {collections.map((c) => (
              <a key={c.name} href="#collections" className="card">
                <div className="photo"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <div className="meta"><div><strong>{c.name}</strong><small>From {peso(c.from)}</small></div><span className="go">›</span></div>
              </a>
            ))}
          </div>
        </section>

        <section id="story" className="story">
          <div>
            <h2>Flowers that tell beautiful stories</h2>
            <p>We choose the freshest blooms and arrange each one by hand, so every bouquet carries a little of the person it is meant for.</p>
            <a className="pill" href="#contact">Our story</a>
          </div>
          <div className="story-art" aria-hidden>🌿🌹🌿</div>
        </section>

        <section id="occasions" className="block">
          <div className="head"><h2>Shop by occasion</h2></div>
          <ul className="occ">
            {occasions.map(([n, i]) => (
              <li key={n}><a href="#bestsellers"><span aria-hidden>{i}</span>{n}</a></li>
            ))}
          </ul>
        </section>

        <section className="news">
          <div><strong>10% off your first order</strong><small>Join our list and get a code by email.</small></div>
          {subscribed ? (
            <p role="status">Thanks! Check your inbox for your code.</p>
          ) : (
            <div className="sub">
              <input type="email" placeholder="Enter your email address" value={email}
                onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
              <button className="btn gold" onClick={() => email.includes('@') && setSubscribed(true)}>Subscribe</button>
            </div>
          )}
        </section>

        <section id="bestsellers" className="block">
          <div className="head"><h2>Best sellers</h2><a className="pill" href="#bestsellers">View all</a></div>
          <div className="grid4">
            {bestSellers.map((p) => (
              <article key={p.id} className="card">
                <div className={`photo ${p.img ? 'has-img' : ''}`}>{p.img ? <img src={p.img} alt={p.alt} loading="lazy" /> : <span aria-hidden>{p.icon}</span>}</div>
                <div className="meta">
                  <div><strong>{p.name}</strong><small>From {peso(p.price)}</small></div>
                  <button className="add" onClick={() => setCart((c) => c + 1)} aria-label={`Add ${p.name} to cart`}>+</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact">
        <img src="/logo.jpg" alt="" />
        <div>
          <strong>Dolores de Florist</strong>
          <p>City of Naga, Cebu</p>
          <p><a href="tel:+639363487471">0936 348 7471</a></p>
          <p><Link to="/login">Log in</Link></p>
        </div>
        <small>© {new Date().getFullYear()} Dolores de Florist</small>
      </footer>
    </>
  )
}