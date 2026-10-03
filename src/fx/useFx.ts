import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Lenis from 'lenis'
import { setLenis } from './smooth'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/** Scroll effects run everywhere except for people who prefer reduced motion. */
export const FX_QUERY = '(prefers-reduced-motion: no-preference)'

const q = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)
const all = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel)
const clamp01 = gsap.utils.clamp(0, 1)

/* ---------------- Sky: colour, sun, clouds, birds ---------------- */

function setupSky() {
  const root = document.documentElement
  const page = { trigger: document.body, start: 'top top', end: 'bottom bottom' }

  gsap.timeline({ scrollTrigger: { ...page, scrub: true } })
    .to(root, { '--sky': '#faf6ee', duration: 0.3, ease: 'none' })
    .to(root, { '--sky': '#f8f5ef', duration: 0.25, ease: 'none' })
    .to(root, { '--sky': '#f8ecd8', duration: 0.15, ease: 'none' })
    .to(root, { '--sky': '#f6dcc0', duration: 0.12, ease: 'none' })
    .to(root, { '--sky': '#efc6a8', duration: 0.1, ease: 'none' })
    .to(root, { '--sky': '#e9b79e', duration: 0.08, ease: 'none' })

  const sun = q('.sun')!
  const dusk = q('.sun-dusk')!
  const state = { p: 0 }
  const placeSun = () => {
    const p = state.p
    gsap.set(sun, {
      x: (0.07 + 0.84 * p) * window.innerWidth,
      y: (0.9 - Math.sin(Math.PI * p) * 0.76) * window.innerHeight,
      scale: 1 + Math.max(0, p - 0.7) * 1.1,
    })
    gsap.set(dusk, { opacity: clamp01((p - 0.6) / 0.3) })
  }
  placeSun()
  gsap.to(state, {
    p: 1,
    ease: 'none',
    onUpdate: placeSun,
    scrollTrigger: { trigger: document.body, start: 'top top', endTrigger: '#book', end: 'top 20%', scrub: 0.8 },
  })

  all('.cloud').forEach((c) => {
    gsap.to(c, { x: -Number(c.dataset.speed) * 650, ease: 'none', scrollTrigger: { ...page, scrub: true } })
  })

  gsap.timeline({ scrollTrigger: { ...page, scrub: 1, invalidateOnRefresh: true } })
    .fromTo('.flock', { x: -220, y: () => window.innerHeight * 0.4 }, { x: () => window.innerWidth + 60, y: () => window.innerHeight * 0.1, ease: 'none', duration: 0.2 }, 0.06)
    .fromTo('.flock', { x: () => window.innerWidth + 60, y: () => window.innerHeight * 0.18 }, { x: -220, y: () => window.innerHeight * 0.32, ease: 'none', duration: 0.2, immediateRender: false }, 0.62)

  ScrollTrigger.create({
    ...page,
    onUpdate: (self) => {
      // Night falls at the same scroll point the time-of-day clock used to reach 20:30
      root.classList.toggle('is-night', 6 + self.progress * 16.5 >= 20.5)
    },
  })
}

/* ---------------- Hero ---------------- */

function setupHero() {
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero-media', { yPercent: 22, ease: 'none' }, 0)
    .to('.hill-back', { y: 70, ease: 'none' }, 0)
    .to('.hill-mid', { y: 34, ease: 'none' }, 0)
    .to('.hero-content', { y: -90, opacity: 0, ease: 'none' }, 0)
}

/* ---------------- Generic reveals ---------------- */

function setupReveals() {
  all('main .section h2, main .section .eyebrow, main .section .lead').forEach((el) => {
    gsap.from(el, { y: 34, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  })
  gsap.from('.facts .fact', { y: 24, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.6 })
  gsap.from('.highlight', { x: -40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.highlights', start: 'top 85%' } })
  gsap.from('.room', { y: 90, rotation: (i) => [-3, 2, -2][i % 3], opacity: 0, stagger: 0.14, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.rooms', start: 'top 85%' } })
  gsap.from('.amenity', { scale: 0.8, y: 20, opacity: 0, stagger: 0.04, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: '.amenities', start: 'top 85%' } })
  gsap.from('.experience', { y: 120, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.experiences', start: 'top 85%' } })
  gsap.from('.host', { x: -60, rotation: -2, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.host-rules', start: 'top 80%' } })
  gsap.from('.rules li', { x: 30, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.rules', start: 'top 85%' } })
  gsap.from('.nearby li', { x: -30, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.nearby', start: 'top 85%' } })
  gsap.from('.booking-step, .booking-summary', { y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.booking', start: 'top 85%' } })
}

/* ---------------- About: the vine grows ---------------- */

function setupVine() {
  const stem = q<SVGPathElement>('.vine-stem')
  if (!stem) return
  const len = stem.getTotalLength()
  gsap.set(stem, { strokeDasharray: len, strokeDashoffset: len })
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.about', start: 'top 70%', end: 'center 30%', scrub: 1 } })
  tl.to(stem, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
  tl.from('.vine-tendril', { opacity: 0, duration: 0.1, stagger: 0.25 }, 0.55)
  all<SVGGElement>('.vine-leaf').forEach((leaf) => {
    tl.from(leaf, { scale: 0, rotation: -50, transformOrigin: '50% 100%', duration: 0.12, ease: 'back.out(3)' }, Number(leaf.dataset.t))
  })
  all<SVGGElement>('.vine-grapes').forEach((g) => {
    tl.from(g, { scale: 0, transformOrigin: '50% 0%', duration: 0.1, ease: 'back.out(2.5)' }, Number(g.dataset.t))
  })
}

/* ---------------- Gallery: photos tossed onto the table ---------------- */

function setupGallery() {
  ScrollTrigger.batch('.gallery-item', {
    start: 'top 92%',
    once: true,
    onEnter: (els) =>
      gsap.from(els, {
        y: 160, rotation: () => gsap.utils.random(-12, 12), scale: 0.8, opacity: 0,
        duration: 1.1, ease: 'back.out(1.3)', stagger: 0.08,
      }),
  })
}

/* ---------------- Beach: parasols, boat, dolphin ---------------- */

function setupBeach() {
  all('.umbrella-canopy').forEach((c, i) => {
    gsap.fromTo(
      c,
      { scaleX: 0.08, scaleY: 1.25, transformOrigin: '50% 0%' },
      {
        scaleX: 1, scaleY: 1, duration: 1.4, delay: i * 0.18, ease: 'elastic.out(1, 0.4)',
        scrollTrigger: { trigger: '.beach', start: 'top 80%', toggleActions: 'play none none reverse' },
      },
    )
  })

  const tl = gsap.timeline({ scrollTrigger: { trigger: '.beach', start: 'top bottom', end: 'bottom top', scrub: 1 } })
  tl.fromTo('.boat', { x: -80, y: 276 }, { x: 1540, y: 276, ease: 'none', duration: 1 }, 0)
  tl.fromTo('.beach-ball', { x: 600 }, { x: 860, ease: 'none', duration: 1 }, 0)
  tl.fromTo('.beach-ball-inner', { rotation: 0, transformOrigin: '50% 50%' }, { rotation: 540, ease: 'none', duration: 1 }, 0)
  tl.set('.dolphin', { opacity: 1 }, 0.42)
  tl.to('.dolphin', { motionPath: { path: 'M770 300 Q860 150 950 300', autoRotate: true }, ease: 'none', duration: 0.28 }, 0.42)
  tl.set('.dolphin', { opacity: 0 }, 0.7)
  tl.fromTo('.splash-a', { scale: 0, transformOrigin: '50% 100%' }, { scale: 1.2, duration: 0.04, yoyo: true, repeat: 1 }, 0.42)
  tl.fromTo('.splash-b', { scale: 0, transformOrigin: '50% 100%' }, { scale: 1.3, duration: 0.05, yoyo: true, repeat: 1 }, 0.69)
}

/* ---------------- Ride: cyclists over the coastal hills ---------------- */

function setupRide() {
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.ride', start: 'top bottom', end: 'bottom top', scrub: 1 } })
  const path = { path: '.ride-path', align: '.ride-path', alignOrigin: [0.5, 1] as [number, number], autoRotate: true }
  tl.to('.rider-1', { motionPath: { ...path, start: 0.1, end: 1 }, ease: 'none', duration: 1 }, 0)
  tl.to('.rider-2', { motionPath: { ...path, start: 0, end: 0.9 }, ease: 'none', duration: 1 }, 0)
  tl.to('.ride .wheel', { rotation: 360 * 14, transformOrigin: '50% 50%', ease: 'none', duration: 1 }, 0)
}

/* ---------------- Reviews ---------------- */

function setupReviews() {
  const laurel = q('.laurel-value')
  if (laurel) {
    const n = { v: 0 }
    laurel.textContent = '0.00'
    gsap.to(n, {
      v: 4.97, duration: 2, ease: 'power3.out',
      onUpdate: () => { laurel.textContent = n.v.toFixed(2) },
      scrollTrigger: { trigger: '.reviews-head', start: 'top 80%' },
    })
  }
  gsap.from('.bar div', { scaleX: 0, transformOrigin: 'left center', stagger: 0.1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '.ratings', start: 'top 85%' } })
  gsap.from('.review', {
    y: 80, rotation: (i) => (i % 2 ? 3 : -3), opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.review-grid', start: 'top 85%' },
  })
}

/* ---------------- Location: the drive up the hill ---------------- */

function setupRoad() {
  const carBody = q('.car-body')
  if (!carBody) return
  const scene = q('.road-scene')!
  const svg = q('.road-scene svg')!
  gsap.timeline({ scrollTrigger: { trigger: '.road-scene', start: 'top 90%', end: 'bottom 35%', scrub: 1 } })
    .to('.car', {
      motionPath: { path: '.road-line', align: '.road-line', alignOrigin: [0.5, 0.75], autoRotate: true },
      ease: 'none',
      onUpdate: () => {
        const r = Number(gsap.getProperty('.car', 'rotation'))
        gsap.set(carBody, { scaleY: Math.cos((r * Math.PI) / 180) < 0 ? -1 : 1, transformOrigin: '50% 50%' })
        // On narrow screens the scene is wider than its frame: pan so the car stays in view.
        const overflow = svg.getBoundingClientRect().width - scene.clientWidth
        if (overflow <= 0) return gsap.set(svg, { x: 0 })
        const carX = Number(gsap.getProperty('.car', 'x')) * (svg.getBoundingClientRect().height / 260)
        gsap.set(svg, { x: gsap.utils.clamp(-overflow, 0, scene.clientWidth / 2 - carX) })
      },
    })
  gsap.from('.pin', { y: -60, opacity: 0, duration: 1, ease: 'bounce.out', scrollTrigger: { trigger: '.road-scene', start: 'top 70%' } })
}

/* ---------------- Cat on the stone wall ---------------- */

function setupCat() {
  const cat = q('.cat')
  const wall = q('.wall')
  if (!cat || !wall) return
  let timer = 0
  ScrollTrigger.create({
    trigger: wall,
    start: 'top bottom',
    end: 'top 10%',
    scrub: 0.6,
    invalidateOnRefresh: true,
    animation: gsap.fromTo(cat, { x: 12 }, { x: () => Math.min(wall.offsetWidth * 0.8, wall.offsetWidth - cat.offsetWidth - 12), ease: 'none' }),
    onUpdate: (self) => {
      cat.classList.add('walking')
      cat.classList.toggle('facing-left', self.direction < 0)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => cat.classList.remove('walking'), 220)
    },
  })
  return () => window.clearTimeout(timer)
}

/* ---------------- Night falls over the booking section ---------------- */

function setupNight() {
  gsap.timeline({ scrollTrigger: { trigger: '#book', start: 'top bottom', end: 'top 10%', scrub: 1 } })
    .from('.night-sky .night-stars', { opacity: 0, ease: 'none' }, 0)
    .from('.night-sky .moon', { y: 220, opacity: 0, ease: 'power1.out' }, 0)
  gsap.from('.window-light', {
    opacity: 0, stagger: 0.3, duration: 0.5,
    scrollTrigger: { trigger: '.night-house', start: 'top 98%', toggleActions: 'play none none reverse' },
  })
}

export function useFx() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(FX_QUERY, () => {
      document.documentElement.classList.add('fx-on')
      const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.09 })
      setLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (t: number) => lenis.raf(t * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      setupSky()
      setupHero()
      setupReveals()
      setupVine()
      setupGallery()
      setupBeach()
      setupRide()
      setupReviews()
      setupRoad()
      const stopCat = setupCat()
      setupNight()

      let t = 0
      const ro = new ResizeObserver(() => {
        window.clearTimeout(t)
        t = window.setTimeout(() => ScrollTrigger.refresh(), 250)
      })
      ro.observe(document.body)

      return () => {
        ro.disconnect()
        window.clearTimeout(t)
        stopCat?.()
        gsap.ticker.remove(raf)
        lenis.destroy()
        setLenis(null)
        document.documentElement.classList.remove('fx-on', 'is-night')
      }
    })
    return () => mm.revert()
  }, [])
}
