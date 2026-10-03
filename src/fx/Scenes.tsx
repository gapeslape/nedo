import { seeded } from './random'

/* ------------------------------------------------------------------ */
/* Hero: layered Istrian hills with vineyards and cypresses            */
/* ------------------------------------------------------------------ */

function Cypress({ x, y, h = 30 }: { x: number; y: number; h?: number }) {
  return <ellipse cx={x} cy={y - h} rx={h * 0.24} ry={h} />
}

export function HeroHills() {
  return (
    <svg className="fx hero-hills" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <g className="hill-back">
        <path fill="#b9c3ad" d="M0 120 C180 70 360 92 520 110 S860 58 1040 88 S1300 66 1440 98 V260 H0Z" />
        <g fill="#8e9c83">
          <Cypress x={210} y={100} h={14} />
          <Cypress x={226} y={102} h={11} />
          <Cypress x={1180} y={82} h={13} />
        </g>
      </g>
      <g className="hill-mid">
        <path fill="#7b8a52" d="M0 172 C200 122 380 150 560 140 S900 110 1100 150 S1340 122 1440 140 V260 H0Z" />
        <g className="vine-rows" fill="none" stroke="#5d6b3a" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 11">
          <path d="M640 168 C760 146 900 132 1060 160" />
          <path d="M660 182 C780 160 920 148 1080 176" />
          <path d="M690 196 C800 176 930 166 1090 190" />
          <path d="M120 176 C220 150 320 146 420 160" />
          <path d="M100 190 C210 166 330 162 440 176" />
        </g>
        <g fill="#3f4a2c">
          <Cypress x={300} y={150} h={30} />
          <Cypress x={322} y={152} h={24} />
          <Cypress x={1210} y={146} h={34} />
          <Cypress x={1236} y={148} h={26} />
          <Cypress x={560} y={144} h={22} />
        </g>
      </g>
      <path className="hill-front" d="M0 214 C240 184 480 204 720 198 S1200 178 1440 204 V260 H0Z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* About: a grapevine that grows over the photos                       */
/* ------------------------------------------------------------------ */

const LEAF = 'M0 0 C-14 -6 -22 -22 -12 -30 C-8 -38 4 -38 6 -30 C16 -36 26 -26 18 -16 C26 -10 18 2 8 -2 C6 2 2 2 0 0Z'

const leaves: [number, number, number, number][] = [
  [48, 500, -40, 0.08], [16, 430, 30, 0.17], [50, 350, -30, 0.28], [22, 262, 35, 0.4], [40, 160, -25, 0.52],
  [66, 78, 15, 0.63], [150, 40, -10, 0.72], [238, 34, 25, 0.8], [330, 52, -15, 0.88], [430, 36, 30, 0.96],
]

const grapes: [number, number, number][] = [
  [118, 52, 0.7], [292, 54, 0.86], [404, 44, 0.98],
]

function GrapeCluster() {
  const dots: [number, number][] = [[-8, 0], [0, 0], [8, 0], [-4, 7], [4, 7], [-8, 14], [0, 14], [8, 14], [-4, 21], [4, 21], [0, 28]]
  return (
    <>
      <path d="M0 -6 V0" stroke="#5b4a2e" strokeWidth="2" />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y + 4} r={4.6} />)}
    </>
  )
}

export function Vine() {
  return (
    <svg className="fx vine" viewBox="0 0 560 560" aria-hidden>
      <path
        className="vine-stem"
        d="M30 560 C70 500 0 440 34 380 S76 270 30 210 S20 90 90 50 S230 30 300 46 S420 60 470 24"
      />
      <path className="vine-tendril" d="M90 50 c-10 -18 8 -26 14 -16 s-4 12 -8 6" />
      <path className="vine-tendril" d="M300 46 c4 -20 22 -18 20 -6 s-12 6 -10 -2" />
      {leaves.map(([x, y, r, t], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <g className="vine-leaf" data-t={t}>
            <path d={LEAF} fill={i % 3 ? '#7f9b4b' : '#6b8a3c'} />
            <path d="M0 0 L2 -26" stroke="#56702e" strokeWidth="1.4" fill="none" />
          </g>
        </g>
      ))}
      {grapes.map(([x, y, t], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="vine-grapes" data-t={t} fill={i === 1 ? '#5f3a69' : '#734579'}>
            <GrapeCluster />
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Beach: sand, opening parasols, waves, a sailboat and a dolphin      */
/* ------------------------------------------------------------------ */

const wave = (y: number, amp: number, len: number, width = 2880) => {
  let d = `M0 ${y}`
  for (let x = 0; x < width; x += len) d += ` Q${x + len / 4} ${y - amp} ${x + len / 2} ${y} T${x + len} ${y}`
  return `${d} V400 H0Z`
}

function Umbrella({ x, colors, tilt = 0 }: { x: number; colors: [string, string]; tilt?: number }) {
  const xs = [-72, -36, 0, 36, 72]
  return (
    <g transform={`translate(${x} 232) rotate(${tilt})`}>
      <ellipse cx={22} cy={4} rx={70} ry={9} fill="rgba(120, 90, 40, 0.16)" />
      <line x1={0} y1={0} x2={0} y2={-128} stroke="#6b5a3a" strokeWidth={4} strokeLinecap="round" />
      <g className="umbrella-canopy">
        {xs.slice(0, -1).map((x0, i) => (
          <path
            key={i}
            d={`M${x0} -102 Q${x0 + 18} -92 ${xs[i + 1]} -102 L0 -140Z`}
            fill={colors[i % 2]}
            stroke="rgba(0,0,0,0.08)"
          />
        ))}
        <circle cx={0} cy={-142} r={4} fill="#6b5a3a" />
      </g>
    </g>
  )
}

function Towel({ x, color }: { x: number; color: string }) {
  return (
    <g transform={`translate(${x} 246) skewX(-35)`}>
      <rect width={70} height={16} rx={2} fill={color} />
      <rect y={4} width={70} height={2.5} fill="rgba(255,255,255,0.7)" />
      <rect y={10} width={70} height={2.5} fill="rgba(255,255,255,0.7)" />
    </g>
  )
}

export function Beach() {
  return (
    <div className="fx beach" aria-hidden>
      <svg viewBox="0 0 1440 330" preserveAspectRatio="xMidYMax slice">
        <path fill="#efdcb2" d="M0 196 C300 168 600 186 900 174 S1300 160 1440 182 V330 H0Z" />
        <path fill="#e6cf9f" d="M0 250 C300 236 640 252 980 240 S1300 236 1440 246 V330 H0Z" />
        <g fill="#d9bd85">
          <circle cx={140} cy={220} r={2} /><circle cx={410} cy={208} r={2} /><circle cx={760} cy={214} r={2.4} />
          <circle cx={1090} cy={204} r={2} /><circle cx={1330} cy={212} r={2.2} />
        </g>
        <Towel x={250} color="#2c5a8a" />
        <Towel x={940} color="#b5653f" />
        <Umbrella x={230} colors={['#b5653f', '#fbf3e4']} tilt={-4} />
        <Umbrella x={560} colors={['#2c5a8a', '#fbf3e4']} tilt={3} />
        <Umbrella x={930} colors={['#e0a73e', '#fbf3e4']} tilt={-2} />
        <Umbrella x={1230} colors={['#5f6b3f', '#fbf3e4']} tilt={5} />
        <g className="beach-ball" transform="translate(740 236)">
          <g className="beach-ball-inner">
            <circle r={13} fill="#fffaf0" />
            <path d="M0 -13 A13 13 0 0 1 13 0 L0 0Z" fill="#b5653f" />
            <path d="M0 13 A13 13 0 0 1 -13 0 L0 0Z" fill="#2c5a8a" />
            <path d="M-13 0 A13 13 0 0 1 0 -13 L0 0Z" fill="#e0a73e" />
          </g>
        </g>
        <g className="dolphin">
          <path fill="#5b7f99" d="M-30 6 C-20 -8 6 -14 26 -6 L34 -14 L32 -3 C36 0 34 5 28 4 C14 12 -12 12 -30 6Z" />
          <path fill="#5b7f99" d="M0 -10 L6 -22 L10 -8Z" />
          <circle cx={22} cy={-3} r={1.3} fill="#1f2a33" />
        </g>
        <path className="wave wave-back" fill="#2b6a8f" d={wave(276, 7, 160)} />
        <g className="boat">
          <g className="boat-bob">
            <line x1={0} y1={-4} x2={0} y2={-92} stroke="#5a4630" strokeWidth={2.5} />
            <path d="M3 -8 L3 -90 L44 -8Z" fill="#fffaf0" />
            <path d="M-3 -10 L-3 -78 L-34 -10Z" fill="#f2d9b8" />
            <path d="M0 -92 L14 -88 L0 -84Z" fill="#b5653f" />
            <path d="M-46 -4 L50 -4 L38 12 L-36 12Z" fill="#fffdf9" />
            <path d="M-44 0 L48 0" stroke="#2c5a8a" strokeWidth={3} />
          </g>
        </g>
        <path className="wave wave-front" fill="#1c5274" d={wave(292, 6, 120)} />
        <g className="splash splash-a" transform="translate(770 296)" fill="#e9f4f8">
          <circle cx={-8} cy={-6} r={3} /><circle cx={0} cy={-12} r={4} /><circle cx={9} cy={-7} r={3} />
        </g>
        <g className="splash splash-b" transform="translate(950 296)" fill="#e9f4f8">
          <circle cx={-8} cy={-6} r={3} /><circle cx={0} cy={-12} r={4} /><circle cx={9} cy={-7} r={3} />
        </g>
        <rect y={306} width={1440} height={30} fill="#174565" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Coastline ride: two e-bikers cycling over the hills                  */
/* ------------------------------------------------------------------ */

function Rider({ shirt, helmet, className }: { shirt: string; helmet: string; className: string }) {
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} -12)`}>
      <g className="wheel">
        <circle r={12} fill="none" stroke="#26221d" strokeWidth={2.6} />
        <path d="M-12 0 H12 M0 -12 V12 M-8.5 -8.5 L8.5 8.5 M-8.5 8.5 L8.5 -8.5" stroke="#26221d" strokeWidth={0.9} />
      </g>
    </g>
  )
  return (
    <g className={className}>
      {wheel(-18)}
      {wheel(18)}
      <path d="M-18 -12 L-3 -12 L9 -28 L-9 -28Z M-3 -12 L-10 -33 M18 -12 L9 -28 L11 -35 L16 -36" fill="none" stroke="#2c5a8a" strokeWidth={2.6} strokeLinejoin="round" />
      <rect x={-14} y={-35} width={9} height={3} rx={1.5} fill="#26221d" />
      <path d="M-9 -34 L-4 -22 L-3 -12" fill="none" stroke="#3a3530" strokeWidth={4} strokeLinecap="round" />
      <path d="M-9 -34 L0 -52" stroke={shirt} strokeWidth={8} strokeLinecap="round" />
      <path d="M-1 -50 L13 -36" stroke={shirt} strokeWidth={4} strokeLinecap="round" />
      <circle cx={3} cy={-59} r={6} fill="#e9c4a0" />
      <path d="M-4 -60 A7.5 7.5 0 0 1 11 -60Z" fill={helmet} />
    </g>
  )
}

export function Ride() {
  const hill = 'M0 150 C200 100 380 92 560 122 S900 182 1100 112 S1340 74 1440 104'
  return (
    <div className="fx ride" aria-hidden>
      <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice">
        <rect width={1440} height={240} fill="#174565" />
        <path fill="#1d5677" d="M0 60 C240 54 520 70 760 62 S1200 52 1440 60 V240 H0Z" opacity={0.6} />
        <g className="far-town" fill="#0f3550">
          <rect x={1200} y={48} width={10} height={36} />
          <path d="M1198 48 L1205 36 L1212 48Z" />
          <rect x={1170} y={64} width={22} height={20} />
          <rect x={1214} y={62} width={26} height={22} />
          <rect x={1244} y={68} width={18} height={16} />
        </g>
        <path className="ride-land" d={`${hill} V240 H0Z`} />
        <path className="ride-path" d={hill} fill="none" stroke="#c9b48a" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" />
        <g fill="#5f6b3f">
          <ellipse cx={260} cy={86} rx={6} ry={22} /><ellipse cx={276} cy={88} rx={5} ry={18} />
          <ellipse cx={1010} cy={118} rx={6} ry={24} /><ellipse cx={1340} cy={66} rx={6} ry={22} />
        </g>
        <Rider className="rider rider-1" shirt="#b5653f" helmet="#2c5a8a" />
        <Rider className="rider rider-2" shirt="#2c5a8a" helmet="#e0a73e" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Location: a little car driving the winding road up to the house     */
/* ------------------------------------------------------------------ */

export function RoadScene() {
  const road = 'M150 196 C280 210 360 186 440 192 S560 204 600 176 S520 146 620 140 S770 152 810 124 S720 98 830 92 S960 98 1000 74 L1050 66'
  return (
    <div className="fx road-scene" aria-hidden>
      <svg viewBox="0 0 1200 260">
        <path fill="#d8dcc0" d="M160 260 C260 220 380 170 520 160 S800 70 980 60 S1160 80 1200 100 V260Z" opacity={0.7} />
        <path fill="#2b6a8f" d="M0 160 Q120 150 230 182 L260 260 H0Z" />
        <path fill="none" stroke="#e9f4f8" strokeWidth={2} strokeLinecap="round" d="M20 186 q10 -5 20 0 M70 206 q10 -5 20 0 M30 230 q10 -5 20 0 M120 222 q10 -5 20 0" />
        <path fill="#b3be84" d="M190 260 C300 210 420 214 520 186 S760 126 880 106 S1020 54 1080 60 S1180 84 1200 96 V260Z" />
        <g fill="none" stroke="#8b9a5a" strokeWidth={5} strokeLinecap="round" strokeDasharray="1 10">
          <path d="M640 210 C720 196 800 186 880 190" />
          <path d="M660 226 C740 212 820 204 900 208" />
          <path d="M880 150 C940 136 1000 130 1080 136" />
          <path d="M890 166 C950 152 1010 148 1100 152" />
        </g>
        <g className="koper">
          <rect x={150} y={150} width={10} height={40} fill="#e6d5b4" />
          <path d="M148 150 L155 136 L162 150Z" fill="#b5653f" />
          {[[60, 168, 26, 20], [90, 160, 24, 28], [118, 170, 28, 20], [168, 172, 26, 18], [196, 178, 22, 14]].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill={i % 2 ? '#f3e7cf' : '#ead9b8'} />
              <path d={`M${x - 3} ${y} L${x + w / 2} ${y - 9} L${x + w + 3} ${y}Z`} fill="#c0714a" />
            </g>
          ))}
          <text x={110} y={136} className="scene-label">Koper</text>
        </g>
        <path d={road} fill="none" stroke="#efe4ca" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
        <path className="road-line" d={road} fill="none" stroke="#c9b48a" strokeWidth={1.6} strokeDasharray="6 7" />
        <g className="olives" fill="#6f7d47">
          {[[480, 214], [520, 150], [700, 120], [760, 168], [940, 116], [1120, 100]].map(([x, y], i) => (
            <g key={i}><rect x={x - 1.5} y={y} width={3} height={10} fill="#6b5a3a" /><circle cx={x} cy={y - 4} r={9} /></g>
          ))}
        </g>
        <g className="farmhouse" transform="translate(1060 64)">
          <g className="smoke" fill="#ffffff">
            <circle className="puff" cx={22} cy={-36} r={5} />
            <circle className="puff" cx={22} cy={-36} r={5} />
            <circle className="puff" cx={22} cy={-36} r={5} />
          </g>
          <rect x={18} y={-38} width={8} height={14} fill="#b9a27c" />
          <rect x={-30} y={-24} width={66} height={30} fill="#d9c49d" />
          <path d="M-34 -24 L3 -42 L40 -24Z" fill="#b5653f" />
          {[-22, -4, 14].map((x) => (
            <g key={x}>
              <rect x={x} y={-16} width={8} height={8} fill="#5c4a35" />
              <rect x={x - 4} y={-16} width={3.5} height={8} fill="#2c5a8a" />
              <rect x={x + 8.5} y={-16} width={3.5} height={8} fill="#2c5a8a" />
            </g>
          ))}
          <rect x={26} y={-6} width={7} height={12} fill="#2c5a8a" />
          <ellipse cx={-44} cy={-8} rx={5} ry={18} fill="#4b5730" />
        </g>
        <g className="pin" transform="translate(1063 0)">
          <path d="M0 22 C-10 10 -10 0 0 0 C10 0 10 10 0 22Z" fill="#b5653f" />
          <circle cx={0} cy={7} r={3.5} fill="#fffaf0" />
        </g>
        <text x={1192} y={20} textAnchor="end" className="scene-label">Nedo · 15 min</text>
        <g className="car">
          <g className="car-body">
            <path d="M-20 0 L-20 -8 C-20 -12 -16 -13 -12 -13 L-8 -20 C-6 -23 6 -23 9 -20 L14 -13 C19 -13 22 -11 22 -6 L22 0Z" fill="#2c5a8a" />
            <path d="M-6 -13 L-4 -18 L2 -18 L2 -13Z M5 -13 L5 -18 L8 -18 L11 -13Z" fill="#cfe3f2" />
            <circle cx={-11} cy={0} r={4.5} fill="#26221d" /><circle cx={12} cy={0} r={4.5} fill="#26221d" />
            <circle cx={-11} cy={0} r={1.6} fill="#ddd" /><circle cx={12} cy={0} r={1.6} fill="#ddd" />
            <circle cx={21} cy={-7} r={1.8} fill="#ffe08a" />
          </g>
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Dry-stone wall with the farmhouse cat walking along it              */
/* ------------------------------------------------------------------ */

function stones() {
  const rand = seeded(7)
  const out: { x: number; y: number; w: number; h: number; c: string }[] = []
  const palette = ['#dccdb0', '#d2c1a1', '#e5d8be', '#cbb995']
  for (let row = 0; row < 3; row++) {
    let x = row % 2 ? -20 : 0
    while (x < 1440) {
      const w = 34 + rand() * 44
      out.push({ x, y: 4 + row * 14, w: w - 3, h: 12 + rand() * 3, c: palette[Math.floor(rand() * palette.length)] })
      x += w
    }
  }
  return out
}
const STONES = stones()

export function StoneWall() {
  return (
    <div className="fx wall" aria-hidden>
      <svg className="wall-svg" viewBox="0 0 1440 50" preserveAspectRatio="none">
        {STONES.map((s, i) => <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={6} fill={s.c} stroke="#bba982" strokeWidth={1} />)}
      </svg>
      <div className="cat">
        <svg viewBox="-60 -70 120 74" width="120" height="74">
          <path className="tail" d="M-26 -24 C-44 -28 -48 -48 -38 -58" fill="none" stroke="#d9843a" strokeWidth={6} strokeLinecap="round" />
          <g className="legs-back">
            <rect className="leg leg-a" x={-22} y={-18} width={6} height={18} rx={3} fill="#c97530" />
            <rect className="leg leg-b" x={-14} y={-18} width={6} height={18} rx={3} fill="#d9843a" />
          </g>
          <g className="legs-front">
            <rect className="leg leg-b" x={12} y={-18} width={6} height={18} rx={3} fill="#c97530" />
            <rect className="leg leg-a" x={20} y={-18} width={6} height={18} rx={3} fill="#d9843a" />
          </g>
          <ellipse cx={0} cy={-24} rx={28} ry={12} fill="#e08f42" />
          <path d="M-12 -34 q3 8 0 16 M-2 -36 q3 9 0 18 M8 -35 q3 8 0 16" stroke="#c46f2a" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <g className="cat-head">
            <circle cx={30} cy={-36} r={12} fill="#e08f42" />
            <path d="M21 -44 L22 -58 L31 -47Z M32 -47 L40 -58 L41 -42Z" fill="#e08f42" />
            <path d="M23.5 -47 L24 -53 L28 -48Z M35 -47 L38.5 -53 L39 -45Z" fill="#f2b8a0" />
            <ellipse className="cat-eye" cx={35} cy={-37} rx={1.8} ry={2.6} fill="#2b2a20" />
            <path d="M40 -32 l2 1.5 l-2 1.5Z" fill="#d46a6a" />
            <path d="M40 -31 l9 -2 M40 -30 l9 1" stroke="#7a5a40" strokeWidth={0.7} />
          </g>
        </svg>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Night: stars, moon, fireflies and the farmhouse lighting up         */
/* ------------------------------------------------------------------ */

const STARS = (() => {
  const rand = seeded(42)
  return Array.from({ length: 90 }, () => ({
    left: rand() * 100, top: rand() * 70, size: 1 + rand() * 2.2, delay: rand() * 4, dur: 2 + rand() * 3,
  }))
})()

const FIREFLIES = (() => {
  const rand = seeded(9)
  return Array.from({ length: 26 }, () => ({
    left: rand() * 100, top: 30 + rand() * 65, delay: rand() * 6, dur: 7 + rand() * 8, dx: (rand() - 0.5) * 160, dy: (rand() - 0.5) * 120,
  }))
})()

export function NightSky() {
  return (
    <div className="night-sky" aria-hidden>
      <div className="night-stars">
        {STARS.map((s, i) => (
          <span key={i} style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />
        ))}
        <span className="shooting-star" />
      </div>
      <div className="moon" />
      <div className="fireflies">
        {FIREFLIES.map((f, i) => (
          <span
            key={i}
            style={{
              left: `${f.left}%`, top: `${f.top}%`, animationDelay: `${f.delay}s, ${f.delay / 2}s`, animationDuration: `${f.dur}s, 2.4s`,
              ['--dx' as string]: `${f.dx}px`, ['--dy' as string]: `${f.dy}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function NightHouse() {
  const windows: [number, number][] = [[652, 132], [690, 132], [728, 132], [652, 164], [728, 164], [766, 164]]
  return (
    <svg className="night-house" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <path fill="#16213b" d="M0 120 C200 80 420 100 600 90 S1000 60 1200 92 S1380 100 1440 96 V220 H0Z" />
      <g fill="#0b1222">
        <path d="M0 170 C220 140 420 150 620 146 S1000 130 1200 150 S1380 156 1440 150 V220 H0Z" />
        <rect x={630} y={110} width={170} height={84} />
        <path d="M618 112 L715 72 L812 112Z" />
        <rect x={770} y={68} width={14} height={30} />
        <ellipse cx={590} cy={126} rx={10} ry={40} />
        <ellipse cx={608} cy={136} rx={8} ry={30} />
        <ellipse cx={860} cy={130} rx={11} ry={44} />
        <ellipse cx={300} cy={150} rx={9} ry={32} />
        <ellipse cx={1160} cy={130} rx={10} ry={38} />
        <path d="M820 194 L820 150 Q860 130 900 150 L900 194" />
      </g>
      {windows.map(([x, y], i) => (
        <rect key={i} className="window-light" x={x} y={y} width={18} height={20} rx={1} />
      ))}
      <rect className="window-light door-light" x={700} y={160} width={22} height={34} rx={1} />
    </svg>
  )
}
