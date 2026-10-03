import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { addDays, formatDate, isUnavailable, nightsBetween, rangeHasUnavailable } from '../lib/booking'
import { config } from '../data/listing'

interface Props {
  checkIn: Date | null
  checkOut: Date | null
  onChange: (checkIn: Date | null, checkOut: Date | null) => void
  months?: number
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const startOfToday = () => {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && a.getTime() === b.getTime()

export function Calendar({ checkIn, checkOut, onChange, months = 2 }: Props) {
  const today = startOfToday()
  const [cursor, setCursor] = useState(() => {
    const base = checkIn ?? today
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const [hover, setHover] = useState<Date | null>(null)

  const canGoBack = cursor > new Date(today.getFullYear(), today.getMonth(), 1)

  const pick = (d: Date) => {
    if (!checkIn || checkOut || d <= checkIn) {
      onChange(d, null)
      return
    }
    if (nightsBetween(checkIn, d) < config.minNights || rangeHasUnavailable(checkIn, d)) {
      onChange(d, null)
      return
    }
    onChange(checkIn, d)
  }

  const previewEnd = checkIn && !checkOut ? hover : checkOut
  const hasRange = !!checkIn && !!previewEnd && previewEnd > checkIn

  return (
    <div className="calendar">
      <div className="calendar-nav">
        <button
          type="button"
          className="icon-btn"
          aria-label="Previous month"
          disabled={!canGoBack}
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Next month"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="calendar-months" style={{ ['--months' as string]: months }}>
        {Array.from({ length: months }, (_, i) => {
          const month = new Date(cursor.getFullYear(), cursor.getMonth() + i, 1)
          const lead = (month.getDay() + 6) % 7
          const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
          return (
            <div className="calendar-month" key={month.toISOString()}>
              <div className="calendar-title">{formatDate(month, { month: 'long', year: 'numeric' })}</div>
              <div className="calendar-grid" role="grid">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="calendar-weekday">{w}</div>
                ))}
                {Array.from({ length: lead }, (_, j) => <div key={`e${j}`} />)}
                {Array.from({ length: days }, (_, j) => {
                  const d = new Date(month.getFullYear(), month.getMonth(), j + 1)
                  const past = d < today
                  const booked = isUnavailable(d)
                  // A booked night can still be a checkout day.
                  const disabled = past || (booked && !(checkIn && !checkOut && d > checkIn))
                  const isStart = sameDay(d, checkIn)
                  const isEnd = sameDay(d, previewEnd) && !!checkIn && d > checkIn
                  const inRange = !!checkIn && !!previewEnd && d > checkIn && d < previewEnd
                  const tooShort = !!checkIn && !checkOut && d > checkIn && d < addDays(checkIn, config.minNights)
                  const cls = [
                    'day',
                    isStart && 'is-start',
                    isStart && hasRange && 'range-start',
                    isEnd && 'is-end',
                    inRange && 'in-range',
                    booked && 'is-booked',
                    tooShort && 'is-short',
                    sameDay(d, today) && 'is-today',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <button
                      type="button"
                      key={j}
                      className={cls}
                      disabled={disabled}
                      aria-pressed={isStart || isEnd}
                      aria-label={formatDate(d, { weekday: 'long', day: 'numeric', month: 'long' })}
                      onClick={() => pick(d)}
                      onMouseEnter={() => setHover(d)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <span>{j + 1}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="calendar-foot">
        <span className="muted small">Minimum stay {config.minNights} nights</span>
        {(checkIn || checkOut) && (
          <button type="button" className="link-btn" onClick={() => onChange(null, null)}>
            Clear dates
          </button>
        )}
      </div>
    </div>
  )
}
