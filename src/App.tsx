import { useEffect, useState } from 'react'
import { ArrowRight, Award, BadgeCheck, BedDouble, Check, MapPin, Menu, Phone, Mail, Quote, Star, X } from 'lucide-react'
import {
  about, amenityGroups, bedrooms, config, experiences, featuredAmenities, heroPhoto, highlights, host,
  houseRules, img, location, nearby, photos, reviews, stats,
} from './data/listing'
import { Icon } from './components/Icon'
import { Gallery } from './components/Gallery'
import { Booking } from './components/Booking'
import { formatDate, money } from './lib/booking'
import { Sky } from './fx/Sky'
import { Beach, HeroHills, NightHouse, NightSky, Ride, RoadScene, StoneWall, Vine } from './fx/Scenes'
import { useFx } from './fx/useFx'
import { lockScroll } from './fx/smooth'

const NAV = [
  ['About', '#about'],
  ['Photos', '#photos'],
  ['Amenities', '#amenities'],
  ['Reviews', '#reviews'],
  ['Location', '#location'],
] as const

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav ${scrolled || open ? 'nav-solid' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand"><span className="brand-sun" aria-hidden />{config.name}</a>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#book" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Book your stay</a>
        </nav>
        <button className="icon-btn nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

const HERO_LINES: [string, boolean][][] = [
  [['Relax', false], ['in', false], ['the', false]],
  [['countryside,', false]],
  [['near', true], ['the', true], ['sea', true]],
]

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <img className="hero-img" src={img(heroPhoto.src, 2048)} alt={heroPhoto.alt} fetchPriority="high" />
      </div>
      <div className="hero-shade" />
      <div className="hero-glow" />
      <HeroHills />
      <div className="container hero-content">
        <p className="eyebrow light"><MapPin size={14} /> {location.area}</p>
        <h1 aria-label="Relax in the countryside, near the sea">
          {HERO_LINES.map((line, li) => (
            <span key={li} className="hero-line" aria-hidden>
              {line.map(([word, em], wi) => (
                <span key={wi} className="w">
                  <span className={em ? 'em' : undefined} style={{ ['--i' as string]: li * 3 + wi }}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-sub">{config.tagline}. A whole house for up to {stats.guests} guests, 15 minutes from Koper.</p>
        <div className="hero-actions">
          <a href="#book" className="btn btn-primary btn-lg">Check availability <ArrowRight size={18} /></a>
          <a href="#photos" className="btn btn-glass btn-lg">View photos</a>
        </div>
        <div className="hero-badges">
          <span><Star size={15} fill="currentColor" /> {stats.rating} · {stats.reviewCount} reviews</span>
          <span><Award size={15} /> Guest favourite</span>
          <span><BadgeCheck size={15} /> Superhost</span>
        </div>
      </div>
    </section>
  )
}

function Facts() {
  const items = [
    [stats.guests, 'guests'],
    [stats.bedrooms, 'bedrooms'],
    [stats.beds, 'beds'],
    [stats.baths, 'baths'],
  ] as const
  return (
    <div className="container">
      <div className="facts card">
        {items.map(([n, l]) => (
          <div key={l} className="fact"><strong>{n}</strong><span>{l}</span></div>
        ))}
        <div className="fact fact-price">
          <span className="muted small">from</span>
          <strong>{money(config.nightlyRate)}</strong>
          <span>per night</span>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <div className="about-text">
          <p className="eyebrow">The house</p>
          <h2>An ancient farmhouse in the <em>green Istrian hills</em></h2>
          <p className="lead">{about.intro}</p>
          {about.body.map((p) => <p key={p}>{p}</p>)}
          <div className="highlights">
            {highlights.map((h) => (
              <div key={h.title} className="highlight">
                <div className="icon-tile"><Icon name={h.icon} /></div>
                <div>
                  <h4>{h.title}</h4>
                  <p className="muted">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-photos">
          <img src={img(photos[1].src, 900)} alt={photos[1].alt} loading="lazy" />
          <img src={img(photos.find((p) => p.alt.startsWith('Sunset'))!.src, 900)} alt="Sunset over the Istrian hills" loading="lazy" />
          <Vine />
        </div>
      </div>
    </section>
  )
}

function Bedrooms() {
  return (
    <section className="section section-tint">
      <div className="container">
        <p className="eyebrow">Where you’ll sleep</p>
        <h2>Three bedrooms, <em>room for five</em></h2>
        <div className="rooms">
          {bedrooms.map((b) => (
            <article key={b.name} className="room card">
              <img src={img(b.photo.src, 720)} alt={b.photo.alt} loading="lazy" />
              <div className="room-body">
                <h4>{b.name}</h4>
                <p className="muted"><BedDouble size={16} /> {b.beds}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="muted mt">Plus 1.5 bathrooms, a cozy living room with a wood-burning fireplace and a working lobby with a desk.</p>
      </div>
    </section>
  )
}

function Amenities() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])
  return (
    <section className="section" id="amenities">
      <div className="container">
        <p className="eyebrow">What this place offers</p>
        <h2>Everything for a <em>slow, easy</em> holiday</h2>
        <div className="amenities">
          {featuredAmenities.map((a) => (
            <div key={a.label} className="amenity"><Icon name={a.icon} /> {a.label}</div>
          ))}
        </div>
        <button className="btn btn-ghost mt" onClick={() => setOpen(true)}>Show all amenities</button>
      </div>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="amenities-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3 id="amenities-title">All amenities</h3>
              <button className="icon-btn" aria-label="Close" onClick={() => setOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body" data-lenis-prevent>
              {amenityGroups.map((g) => (
                <div key={g.title} className="amenity-group">
                  <h4>{g.title}</h4>
                  <ul>
                    {g.items.map((i) => (
                      <li key={i} className={g.title === 'Not available' ? 'struck' : ''}>
                        {g.title === 'Not available' ? <X size={16} /> : <Check size={16} />} {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Experiences() {
  return (
    <section className="section section-sea">
      <div className="container">
        <p className="eyebrow light">Beyond the garden</p>
        <h2>Sail, ride and <em>explore the coast</em></h2>
        <p className="lead narrow">Prefer an active holiday? Your host can arrange guided e-bike tours and sailing trips on the Adriatic — just mention it in your booking request.</p>
        <div className="experiences">
          {experiences.map((e) => (
            <article key={e.title} className="experience">
              <img src={img(e.photo.src, 900)} alt={e.photo.alt} loading="lazy" />
              <div className="experience-body">
                <h4>{e.title}</h4>
                <p>{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="reviews-head">
          <div className="score">
            <span className="laurel"><span className="laurel-value">{stats.rating}</span></span>
            <div>
              <h2>Guest favourite</h2>
              <p className="muted">One of the most loved homes in the area, based on {stats.reviewCount} reviews.</p>
            </div>
          </div>
          <div className="ratings">
            {stats.categoryRatings.map((r) => (
              <div key={r.label} className="rating-row">
                <span>{r.label}</span>
                <div className="bar"><div style={{ width: `${(r.value / 5) * 100}%` }} /></div>
                <strong>{r.value.toFixed(1)}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((r) => (
            <figure key={r.name} className="review card">
              <Quote size={20} className="quote-mark" />
              <div className="stars" aria-label="5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <span className="avatar">{r.name[0]}</span>
                <span><strong>{r.name}</strong><span className="muted small">{r.date}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location() {
  const d = 0.035
  const bbox = [location.lng - d * 1.6, location.lat - d, location.lng + d * 1.6, location.lat + d].join(',')
  return (
    <section className="section section-tint" id="location">
      <div className="container location">
        <div>
          <p className="eyebrow">Where you’ll be</p>
          <h2>On a hilltop <em>above Koper</em></h2>
          <p className="lead">Quiet countryside with a breeze almost every day — yet shops, restaurants and the sea are only minutes away.</p>
          <ul className="nearby">
            {nearby.map((n) => (
              <li key={n.place}><span>{n.place}</span><span className="muted">{n.time}</span></li>
            ))}
          </ul>
          <p className="note">{location.note}</p>
        </div>
        <div className="map card">
          <iframe
            title="Map showing the area around the farmhouse"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lng}`}
            loading="lazy"
          />
          <a className="map-link" href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=13/${location.lat}/${location.lng}`} target="_blank" rel="noreferrer">
            Open larger map
          </a>
        </div>
      </div>
      <div className="container"><RoadScene /></div>
    </section>
  )
}

function HostAndRules() {
  return (
    <section className="section section-wall">
      <div className="container host-rules">
        <div className="host card">
          <div className="host-top">
            <div className="host-avatar">{host.name[0]}{host.superhost && <span className="host-badge"><BadgeCheck size={16} /></span>}</div>
            <div>
              <p className="eyebrow">Your host</p>
              <h3>{host.name}</h3>
              <p className="muted small">Superhost · {host.yearsHosting} years hosting</p>
            </div>
          </div>
          <p>{host.bio}</p>
          <ul className="host-facts">
            <li><Check size={16} /> 100% response rate</li>
            <li><Check size={16} /> {host.responseTime}</li>
            <li><Check size={16} /> Greets every guest in person</li>
          </ul>
          <div className="host-contact">
            <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="btn btn-ghost btn-sm"><Phone size={16} /> Call</a>
            <a href={`mailto:${config.bookingEmail}`} className="btn btn-ghost btn-sm"><Mail size={16} /> Email</a>
          </div>
        </div>
        {/* Absolutely positioned at the section top on desktop; sits between host and rules on mobile */}
        <StoneWall />
        <div>
          <p className="eyebrow">Things to know</p>
          <h2>House rules</h2>
          <ul className="rules">
            {houseRules.map((r) => (
              <li key={r.label}><Icon name={r.icon} size={20} /> {r.label}</li>
            ))}
          </ul>
          <p className="muted small">Please treat the house with care — it’s a much-loved home. There are no security cameras on the property. The house has no smoke or carbon monoxide alarms reported; you may wish to bring a portable detector.</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand">{config.name}</div>
          <p className="muted">{location.area}</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${config.bookingEmail}`}><Mail size={16} /> {config.bookingEmail}</a>
          <a href={`tel:${config.phone.replace(/\s/g, '')}`}><Phone size={16} /> {config.phone}</a>
        </div>
        <p className="muted small">© {new Date().getFullYear()} {config.name} · Operated by {host.business}</p>
      </div>
    </footer>
  )
}

function MobileBar({ checkIn, checkOut }: { checkIn: Date | null; checkOut: Date | null }) {
  return (
    <div className="mobile-bar">
      <div>
        <strong>{money(config.nightlyRate)}</strong> <span className="muted small">/ night</span>
        <div className="mobile-bar-sub small muted">{checkIn && checkOut ? `${formatDate(checkIn)} – ${formatDate(checkOut)}` : <><Star size={12} fill="currentColor" /> {stats.rating} · {stats.reviewCount} reviews</>}</div>
      </div>
      <a href="#book" className="btn btn-primary">Reserve</a>
    </div>
  )
}

export default function App() {
  useFx()
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const setDates = (a: Date | null, b: Date | null) => {
    setCheckIn(a)
    setCheckOut(b)
  }
  return (
    <>
      <Sky />
      <Nav />
      <main>
        <Hero />
        <Facts />
        <About />
        <section className="section" id="photos">
          <div className="container">
            <p className="eyebrow">Gallery</p>
            <h2>Take a <em>look around</em></h2>
            <Gallery />
          </div>
        </section>
        <Bedrooms />
        <Amenities />
        <Beach />
        <Experiences />
        <Ride />
        <Reviews />
        <Location />
        <HostAndRules />
        <section className="section section-night" id="book">
          <NightSky />
          <div className="container night-content">
            <p className="eyebrow">Book your stay</p>
            <h2>Spend your evenings <em>under these stars</em></h2>
            <p className="lead narrow">Booking directly is simple: choose your dates, tell us who’s coming and {host.name} will confirm personally by email.</p>
            <Booking checkIn={checkIn} checkOut={checkOut} onDatesChange={setDates} />
          </div>
          <NightHouse />
        </section>
      </main>
      <Footer />
      <MobileBar checkIn={checkIn} checkOut={checkOut} />
    </>
  )
}
