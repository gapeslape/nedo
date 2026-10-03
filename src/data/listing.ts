import { PHOTO_URLS } from './photoUrls'

/** Business settings — edit these to change prices, rules and contact details. */
export const config = {
  name: 'Nedo Farmhouse',
  tagline: 'An old Istrian farmhouse among vineyards, above the Adriatic',
  /** Booking requests will eventually be emailed here. */
  bookingEmail: 'nejcdolinsek141@gmail.com',
  phone: '+386 40 650 689',
  currency: 'EUR',
  nightlyRate: 280,
  cleaningFee: 50,
  /** Tourist tax is charged separately, per adult per night. */
  touristTaxPerAdultNight: 2.5,
  minNights: 2,
  maxGuests: 5,
  checkIn: '15:00',
  checkOut: '10:00',
  /** ISO dates (YYYY-MM-DD) that are already booked. */
  unavailableDates: [] as string[],
}

export type PhotoCategory = 'House & garden' | 'Inside' | 'Bedrooms & baths' | 'Surroundings' | 'Activities'

export interface Photo {
  src: string
  alt: string
  category: PhotoCategory
}

const photoMeta: [number, string, PhotoCategory][] = [
  [0, 'Stone farmhouse with blue shutters and the pergola entrance', 'House & garden'],
  [5, 'Sun loungers in the garden beside the house', 'House & garden'],
  [1, 'Garden table on the lawn under the trees', 'House & garden'],
  [3, 'Patio table by the blue-shuttered windows', 'House & garden'],
  [7, 'Green garden looking out over the hills', 'House & garden'],
  [20, 'Balcony with a view of the valley', 'House & garden'],
  [21, 'Hammock in the garden', 'House & garden'],
  [22, 'Barbecue grill', 'House & garden'],
  [28, 'Lavender in the garden', 'House & garden'],
  [31, 'Olive grove next to the house', 'House & garden'],
  [2, 'Fully equipped kitchen and dining area', 'Inside'],
  [11, 'Living room with stone walls', 'Inside'],
  [12, 'Wood-burning fireplace', 'Inside'],
  [13, 'Long wooden dining table', 'Inside'],
  [9, 'Kitchen counter', 'Inside'],
  [8, 'Gas stove and oven', 'Inside'],
  [10, 'A bottle of house wine on the table', 'Inside'],
  [6, 'Working lobby with a desk', 'Inside'],
  [14, 'Traditional details throughout the house', 'Inside'],
  [23, 'Local wine and glasses', 'Inside'],
  [4, 'Master bedroom with a queen bed', 'Bedrooms & baths'],
  [15, 'Master bedroom', 'Bedrooms & baths'],
  [16, 'Second bedroom with a queen bed', 'Bedrooms & baths'],
  [17, 'Third bedroom with a single bed', 'Bedrooms & baths'],
  [18, 'Bathroom with blue tiles', 'Bedrooms & baths'],
  [19, 'Bathroom vanity', 'Bedrooms & baths'],
  [32, 'Sunset over the Istrian hills', 'Surroundings'],
  [33, 'Vineyards running down towards the sea', 'Surroundings'],
  [24, 'The valley below the house', 'Surroundings'],
  [25, 'Morning mist over the hills', 'Surroundings'],
  [26, 'Hilltop village nearby', 'Surroundings'],
  [34, 'Cliffs and beach on the Slovenian coast', 'Surroundings'],
  [36, 'Quiet bay on the coast', 'Surroundings'],
  [37, 'Waterfall in the area', 'Surroundings'],
  [27, 'The farmhouse cat', 'Surroundings'],
  [30, 'A friendly dog at the front door', 'Surroundings'],
  [29, 'Horse in a nearby meadow', 'Surroundings'],
  [35, 'Guided e-bike tour along the coast', 'Activities'],
  [38, 'Sailing on the Adriatic with a skipper', 'Activities'],
  [39, 'On deck during a sailing trip', 'Activities'],
]

export const photos: Photo[] = photoMeta.map(([i, alt, category]) => ({ src: PHOTO_URLS[i], alt, category }))

/** The photo CDN only serves certain widths, so round up to the nearest one. */
const CDN_WIDTHS = [320, 480, 720, 960, 1200, 1440, 1920, 2560]
export const img = (src: string, width: number) =>
  `${src}?im_w=${CDN_WIDTHS.find((w) => w >= width) ?? CDN_WIDTHS[CDN_WIDTHS.length - 1]}`

export const heroPhoto = photos[0]

export const stats = {
  rating: 4.97,
  reviewCount: 113,
  bedrooms: 3,
  beds: 3,
  baths: '1.5',
  guests: 5,
  categoryRatings: [
    { label: 'Cleanliness', value: 4.9 },
    { label: 'Accuracy', value: 5.0 },
    { label: 'Check-in', value: 5.0 },
    { label: 'Communication', value: 5.0 },
    { label: 'Location', value: 4.8 },
    { label: 'Value', value: 4.8 },
  ],
}

export const about = {
  intro:
    'Near Koper, deep in the green Istrian hills, stands an old farmhouse with a wonderful view of the Adriatic sea, surrounded by vineyards and olive groves. It is made for people who love nature, peace and the warm hospitality of rural life.',
  body: [
    'Built in the form of a traditional Istrian villa but with every modern comfort, the house will charm you with its calm, natural setting and give your family a holiday to remember.',
    'Spend your days in the large private garden with a grill and lounge chairs — a place to rest your mind, body and soul. In the evenings, the house bar has a selection of fine local and international liqueurs.',
  ],
}

export const highlights = [
  { icon: 'mountain', title: 'Vineyard & sea views', text: 'Look out over vineyards and valleys all the way to the Adriatic.' },
  { icon: 'key', title: 'Personal welcome', text: 'Your host meets you, shows you around and shares local tips.' },
  { icon: 'laptop', title: 'Dedicated workspace', text: 'A quiet room with a door and wifi, well suited to remote work.' },
  { icon: 'paw', title: 'Pets welcome', text: 'Bring the dog — there is plenty of garden to explore.' },
] as const

export const bedrooms = [
  { name: 'Master bedroom', beds: '1 queen bed', photo: photos.find((p) => p.alt.startsWith('Master bedroom with'))! },
  { name: 'Second bedroom', beds: '1 queen bed', photo: photos.find((p) => p.alt.startsWith('Second bedroom'))! },
  { name: 'Third bedroom', beds: '1 single bed', photo: photos.find((p) => p.alt.startsWith('Third bedroom'))! },
]

export const featuredAmenities = [
  { icon: 'wifi', label: 'Fast wifi' },
  { icon: 'chef', label: 'Fully equipped kitchen' },
  { icon: 'snowflake', label: 'Central air conditioning' },
  { icon: 'flame', label: 'Wood-burning fireplace' },
  { icon: 'grill', label: 'BBQ grill & fire pit' },
  { icon: 'car', label: 'Free parking for 2 cars' },
  { icon: 'bike', label: 'Bikes available' },
  { icon: 'umbrella', label: 'Beach essentials' },
  { icon: 'washer', label: 'Washing machine' },
  { icon: 'baby', label: 'Crib available' },
  { icon: 'door', label: 'Private entrance' },
  { icon: 'paw', label: 'Pets allowed' },
] as const

export const amenityGroups: { title: string; items: string[] }[] = [
  { title: 'Views', items: ['Sea view', 'Bay view', 'Vineyard view', 'Valley view', 'Garden view', 'Courtyard view'] },
  {
    title: 'Kitchen & dining',
    items: [
      'Fully equipped kitchen',
      'Refrigerator & freezer',
      'Dishwasher',
      'Stove & oven',
      'Coffee maker & coffee',
      'Kettle & toaster',
      'Wine glasses',
      'Baking sheet',
      'Barbecue utensils',
      'Dining table',
      'Cooking basics — pots, pans, oil, salt and pepper',
    ],
  },
  {
    title: 'Outdoor',
    items: ['Large private garden', 'Private patio', 'BBQ grill', 'Fire pit', 'Hammock', 'Sun loungers', 'Outdoor furniture', 'Bikes', 'Beach essentials — towels, chairs, umbrella'],
  },
  { title: 'Bathroom', items: ['Hair dryer', 'Shampoo', 'Shower gel & body soap', 'Hot water', 'Cleaning products'] },
  { title: 'Bedroom & laundry', items: ['Bed linen & towels', 'Washing machine', 'Iron', 'Hangers', 'Drying rack'] },
  { title: 'Heating & cooling', items: ['Central air conditioning', 'Heating', 'Wood-burning fireplace'] },
  { title: 'Work & play', items: ['Wifi', 'Dedicated workspace with a door', 'Books and reading material', 'Climbing wall'] },
  { title: 'Family', items: ['Crib (standard size)'] },
  { title: 'Parking & access', items: ['Free parking on premises for 2 cars', 'Private entrance', 'Host greets you'] },
  { title: 'Safety', items: ['Fire extinguisher', 'No security cameras on the property'] },
  { title: 'Not available', items: ['TV', 'Tumble dryer'] },
]

export const experiences = [
  {
    title: 'Guided e-bike tours',
    text: 'Rent an e-bike and ride with a local guide along the Slovenian coast to panoramic viewpoints and hidden gems.',
    photo: photos.find((p) => p.alt.startsWith('Guided e-bike'))!,
  },
  {
    title: 'Sailing with a skipper',
    text: 'Your host is a professional skipper. Spend a day sailing the Adriatic — many guests call it the highlight of their trip.',
    photo: photos.find((p) => p.alt.startsWith('Sailing on'))!,
  },
  {
    title: 'Coast & villages',
    text: 'Swim at the bays near Strunjan, wander through Piran and Koper, or cross into Italy for a day in Trieste.',
    photo: photos.find((p) => p.alt.startsWith('Cliffs and beach'))!,
  },
]

export const nearby = [
  { place: 'Koper old town', time: '15 min drive' },
  { place: 'Shops & supermarkets', time: '10 min drive' },
  { place: 'Restaurants', time: 'under 10 min' },
  { place: 'Izola & Piran beaches', time: '20–30 min drive' },
  { place: 'Trieste, Italy', time: '≈ 35 min drive' },
  { place: 'Škocjan Caves', time: '≈ 40 min drive' },
]

export const location = {
  area: 'Pobegi, Koper, Slovenia',
  lat: 45.51907,
  lng: 13.80608,
  note: 'The house sits on a hilltop. The last stretch of road is narrow, winding and steep in places — quiet, but worth driving carefully. A car is recommended.',
}

export const reviews = [
  { name: 'Karine', date: 'July 2026', text: 'A nice house on top of a hill overlooking the vineyards, with the Adriatic in the background.' },
  { name: 'Jule', date: 'June 2026', text: 'A beautiful, spacious house in a wonderfully quiet and scenic location. The garden is stunning.' },
  { name: 'Matt', date: 'April 2026', text: 'Full of character and amazing detail. We will never forget the sunsets over the Adriatic.' },
  { name: 'Helmut', date: 'April 2026', text: 'Five of us travelled and there was more than enough space. A great view all the way to the sea.' },
  { name: 'Judith', date: 'May 2026', text: 'Impeccably clean, a very well-furnished kitchen — and the sailing trip was a highlight.' },
  { name: 'Lara', date: 'September 2026', text: 'Idyllic and quiet surroundings, a friendly welcome and a little tour of the house.' },
]

export const host = {
  name: 'Nejc',
  bio: 'Hi! I’m Nejc. I was born in Koper and I’m a skipper by trade. In my free time I’ve been lovingly renovating this old farmhouse.',
  yearsHosting: 6,
  superhost: true,
  responseTime: 'Usually replies within an hour',
  business: 'Bike Stay Relax',
}

export const houseRules = [
  { icon: 'clock', label: `Check-in after ${config.checkIn}` },
  { icon: 'clock', label: `Checkout before ${config.checkOut}` },
  { icon: 'users', label: `Up to ${config.maxGuests} guests` },
  { icon: 'paw', label: 'Pets allowed' },
  { icon: 'moon', label: 'Quiet hours 23:00 – 08:00' },
  { icon: 'ban', label: 'No parties or events' },
  { icon: 'cigarette', label: 'No smoking' },
  { icon: 'receipt', label: 'Tourist tax is paid separately' },
] as const
