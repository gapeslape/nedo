import { useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, Check, Minus, Plus, Star } from 'lucide-react'
import { Calendar } from './Calendar'
import { scrollToEl } from '../fx/smooth'
import { config, host, stats } from '../data/listing'
import { estimatePrice, formatDate, money, submitBookingRequest, toISO, type BookingRequest } from '../lib/booking'

interface Props {
  checkIn: Date | null
  checkOut: Date | null
  onDatesChange: (a: Date | null, b: Date | null) => void
}

function Counter({ label, hint, value, min, max, onChange }: {
  label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void
}) {
  return (
    <div className="counter">
      <div>
        <div className="counter-label">{label}</div>
        <div className="muted small">{hint}</div>
      </div>
      <div className="counter-controls">
        <button type="button" className="icon-btn round" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus size={16} />
        </button>
        <span aria-live="polite">{value}</span>
        <button type="button" className="icon-btn round" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

type Status = 'idle' | 'sending' | 'sent'

export function Booking({ checkIn, checkOut, onDatesChange }: Props) {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const estimate = useMemo(() => (checkIn && checkOut ? estimatePrice(checkIn, checkOut, adults) : null), [checkIn, checkOut, adults])
  const guestCount = adults + children

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut || !estimate) {
      setError('Please choose your check-in and check-out dates.')
      scrollToEl(document.getElementById('book-dates'))
      return
    }
    setError('')
    setStatus('sending')
    const request: BookingRequest = {
      checkIn: toISO(checkIn),
      checkOut: toISO(checkOut),
      adults,
      children,
      infants,
      pets,
      ...form,
      estimate,
    }
    await submitBookingRequest(request)
    setStatus('sent')
    scrollToEl(document.getElementById('book'))
  }

  const reset = () => {
    setStatus('idle')
    setForm({ name: '', email: '', phone: '', message: '' })
    onDatesChange(null, null)
  }

  if (status === 'sent' && checkIn && checkOut) {
    return (
      <div className="booking-done card">
        <div className="done-icon"><Check size={28} /></div>
        <h3>Thank you, {form.name.split(' ')[0]}!</h3>
        <p>
          Your request for <strong>{formatDate(checkIn, { day: 'numeric', month: 'long' })} – {formatDate(checkOut, { day: 'numeric', month: 'long', year: 'numeric' })}</strong>{' '}
          has been sent. {host.name} will confirm availability by email at <strong>{form.email}</strong>, usually within a few hours.
        </p>
        <p className="muted small">Nothing has been charged. Payment details are arranged once your stay is confirmed.</p>
        <button className="btn btn-ghost" onClick={reset}>Make another request</button>
      </div>
    )
  }

  return (
    <form className="booking" onSubmit={submit} noValidate={false}>
      <div className="booking-main">
        <section className="booking-step" id="book-dates">
          <h3><span className="step-num">1</span> Choose your dates</h3>
          <div className="date-display">
            <div className={`date-box ${checkIn ? 'filled' : ''}`}>
              <span className="eyebrow">Check-in</span>
              <span>{checkIn ? formatDate(checkIn, { weekday: 'short', day: 'numeric', month: 'short' }) : 'Add date'}</span>
            </div>
            <div className={`date-box ${checkOut ? 'filled' : ''}`}>
              <span className="eyebrow">Checkout</span>
              <span>{checkOut ? formatDate(checkOut, { weekday: 'short', day: 'numeric', month: 'short' }) : 'Add date'}</span>
            </div>
          </div>
          <Calendar checkIn={checkIn} checkOut={checkOut} onChange={onDatesChange} />
        </section>

        <section className="booking-step">
          <h3><span className="step-num">2</span> Who’s coming?</h3>
          <Counter label="Adults" hint="Age 13+" value={adults} min={1} max={config.maxGuests - children} onChange={setAdults} />
          <Counter label="Children" hint="Ages 2–12" value={children} min={0} max={config.maxGuests - adults} onChange={setChildren} />
          <Counter label="Infants" hint="Under 2 · crib available" value={infants} min={0} max={2} onChange={setInfants} />
          <label className="toggle-row">
            <div>
              <div className="counter-label">Bringing a pet?</div>
              <div className="muted small">Pets are welcome</div>
            </div>
            <input type="checkbox" className="switch" checked={pets} onChange={(e) => setPets(e.target.checked)} />
          </label>
          <p className="muted small">Up to {config.maxGuests} guests, not counting infants.</p>
        </section>

        <section className="booking-step">
          <h3><span className="step-num">3</span> Your details</h3>
          <div className="field-grid">
            <label className="field">
              <span>Full name</span>
              <input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="field">
              <span>Email</span>
              <input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="field">
              <span>Phone <em>(optional)</em></span>
              <input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
            <label className="field field-wide">
              <span>Message <em>(optional)</em></span>
              <textarea rows={4} placeholder="Arrival time, questions, interest in a sailing trip or e-bike tour…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
          </div>
        </section>
      </div>

      <aside className="booking-summary card">
        <div className="summary-head">
          <div>
            <span className="price-lg">{money(config.nightlyRate)}</span> <span className="muted">/ night</span>
          </div>
          <div className="rating-sm"><Star size={14} fill="currentColor" /> {stats.rating} · {stats.reviewCount} reviews</div>
        </div>

        <div className="summary-trip">
          <CalendarDays size={18} />
          <div>
            {checkIn && checkOut ? (
              <>
                <strong>{formatDate(checkIn)} – {formatDate(checkOut)}</strong>
                <div className="muted small">{estimate!.nights} nights · {guestCount} guest{guestCount > 1 ? 's' : ''}{infants ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}{pets ? ', pet' : ''}</div>
              </>
            ) : checkIn ? (
              <span className="muted">Now pick your checkout date</span>
            ) : (
              <span className="muted">Select dates to see the total</span>
            )}
          </div>
        </div>

        {estimate && (
          <dl className="breakdown">
            <div><dt>{money(config.nightlyRate)} × {estimate.nights} nights</dt><dd>{money(estimate.lodging)}</dd></div>
            <div><dt>Cleaning fee</dt><dd>{money(estimate.cleaning)}</dd></div>
            <div><dt>Tourist tax <span className="muted">({adults} adult{adults > 1 ? 's' : ''})</span></dt><dd>{money(estimate.touristTax)}</dd></div>
            <div className="total"><dt>Estimated total</dt><dd>{money(estimate.total)}</dd></div>
          </dl>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
          {status === 'sending' ? <span className="spinner" aria-label="Sending" /> : 'Request to book'}
        </button>
        <p className="muted small center">You won’t be charged yet. The host confirms every request personally.</p>
      </aside>
    </form>
  )
}
