import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { lockScroll } from '../fx/smooth'
import { img, photos, type Photo, type PhotoCategory } from '../data/listing'

const CATEGORIES: ('All' | PhotoCategory)[] = ['All', 'House & garden', 'Inside', 'Bedrooms & baths', 'Surroundings', 'Activities']

export function Lightbox({ items, index, onClose, onIndex }: {
  items: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void
}) {
  const go = useCallback((delta: number) => onIndex((index + delta + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [go, onClose])

  const photo = items[index]
  return (
    <div className="lightbox" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
        <span>{index + 1} / {items.length}</span>
        <button className="icon-btn light" aria-label="Close" onClick={onClose}><X size={22} /></button>
      </div>
      <button className="lightbox-arrow left" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1) }}>
        <ChevronLeft size={28} />
      </button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img key={photo.src} src={img(photo.src, 1440)} alt={photo.alt} />
        <figcaption>{photo.alt}</figcaption>
      </figure>
      <button className="lightbox-arrow right" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1) }}>
        <ChevronRight size={28} />
      </button>
    </div>
  )
}

// Two large tiles per 10 photos tile a 4-column grid with no gaps.
const isFeature = (i: number) => i % 10 === 0 || i % 10 === 7

export function Gallery() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [open, setOpen] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const items = filter === 'All' ? photos : photos.filter((p) => p.category === filter)
  const limit = 10
  const shown = expanded ? items : items.slice(0, limit)

  return (
    <>
      <div className="chips" role="tablist" aria-label="Photo categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            className={`chip ${filter === c ? 'active' : ''}`}
            onClick={() => { setFilter(c); setExpanded(false) }}
          >
            {c}
            <span className="chip-count">{c === 'All' ? photos.length : photos.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {shown.map((p, i) => (
          <button key={p.src} className={`gallery-item ${isFeature(i) ? 'feature' : ''}`} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.alt}`}>
            <img src={img(p.src, isFeature(i) ? 1200 : 720)} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>
      {items.length > limit && !expanded && (
        <div className="center mt">
          <button className="btn btn-ghost" onClick={() => setExpanded(true)}>
            <Images size={18} /> Show all {items.length} photos
          </button>
        </div>
      )}
      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}
