import { config } from '../data/listing'

export interface BookingRequest {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  infants: number
  pets: boolean
  name: string
  email: string
  phone: string
  message: string
  estimate: PriceBreakdown
}

export interface PriceBreakdown {
  nights: number
  lodging: number
  cleaning: number
  touristTax: number
  total: number
}

/** Local-time ISO date (YYYY-MM-DD), avoiding UTC shifts from toISOString(). */
export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const fromISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

export const nightsBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000)

export const formatDate = (d: Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) =>
  d.toLocaleDateString('en-GB', opts)

export const money = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: config.currency, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n)

export const isUnavailable = (d: Date) => config.unavailableDates.includes(toISO(d))

/** True if any night in [checkIn, checkOut) is already booked. */
export const rangeHasUnavailable = (checkIn: Date, checkOut: Date) => {
  for (let d = checkIn; d < checkOut; d = addDays(d, 1)) if (isUnavailable(d)) return true
  return false
}

export function estimatePrice(checkIn: Date, checkOut: Date, adults: number): PriceBreakdown {
  const nights = nightsBetween(checkIn, checkOut)
  const lodging = nights * config.nightlyRate
  const cleaning = config.cleaningFee
  const touristTax = nights * adults * config.touristTaxPerAdultNight
  return { nights, lodging, cleaning, touristTax, total: lodging + cleaning + touristTax }
}

/**
 * Sends a booking request to the host.
 * TODO: replace with a real backend call (e.g. POST /api/booking that emails config.bookingEmail).
 */
export async function submitBookingRequest(request: BookingRequest): Promise<{ ok: true }> {
  console.info('Booking request (not sent yet — no backend):', request)
  await new Promise((r) => setTimeout(r, 900))
  return { ok: true }
}
