# Nedo Farmhouse — guesthouse website

A single-page React + Vite site for the farmhouse in Pobegi, Koper: photos, details, amenities,
reviews, location and a booking-request form.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Editing content

Everything lives in `src/data/listing.ts`:

- `config` — name, nightly rate, cleaning fee, tourist tax, minimum stay, max guests,
  check-in/out times, booked dates (`unavailableDates`) and the email booking requests go to.
- `photos` — gallery order, captions and categories.
- Text for the about section, rooms, amenities, experiences, reviews, host and house rules.

Photos are currently served from Airbnb's image CDN. Before going live, download them into
`public/photos/` and point `src/data/photoUrls.ts` at the local files.

## Booking

The form builds a `BookingRequest` (dates, guests, contact details and price estimate) and passes it
to `submitBookingRequest` in `src/lib/booking.ts`. Right now that only logs the request. To send
real emails, replace it with a call to a backend endpoint (or a service such as Resend, Postmark or
Formspree) that emails `config.bookingEmail`.
