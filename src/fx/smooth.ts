import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
  if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis | null }).__lenis = instance
}

/** Freeze page scrolling while a modal or lightbox is open. */
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : ''
  if (locked) lenis?.stop()
  else lenis?.start()
}

export function scrollToEl(el: Element | null, offset = -90) {
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
