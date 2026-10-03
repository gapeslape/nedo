import { Moon, Sun } from 'lucide-react'

const CLOUD = 'M30 60 Q8 60 12 44 Q16 30 32 32 Q36 14 58 16 Q72 2 94 12 Q116 4 128 22 Q150 18 156 36 Q180 36 178 52 Q176 64 158 62 Z'

const clouds = [
  { top: '9vh', left: '12vw', width: 190, speed: 1.4, drift: 38 },
  { top: '22vh', left: '58vw', width: 140, speed: 0.8, drift: 52 },
  { top: '6vh', left: '80vw', width: 230, speed: 1.9, drift: 30 },
  { top: '34vh', left: '30vw', width: 110, speed: 0.6, drift: 64 },
  { top: '16vh', left: '104vw', width: 170, speed: 1.2, drift: 44 },
]

function Bird({ x, y, s, d }: { x: number; y: number; s: number; d: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="bird-wing" style={{ animationDelay: `${d}s` }} d="M-14 0 Q-7 -8 0 0 Q7 -8 14 0" />
    </g>
  )
}

/** Fixed background layer: sun, clouds and birds that move with the time of day. */
export function Sky() {
  return (
    <>
      <div className="fx sky" aria-hidden>
        <div className="sun">
          <div className="sun-rays" />
          <div className="sun-core" />
          <div className="sun-core sun-dusk" />
        </div>
        {clouds.map((c, i) => (
          <div key={i} className="cloud" data-speed={c.speed} style={{ top: c.top, left: c.left, width: c.width }}>
            <svg viewBox="0 0 190 70" style={{ animationDuration: `${c.drift}s` }}>
              <path d={CLOUD} />
            </svg>
          </div>
        ))}
        <svg className="flock" viewBox="0 0 160 70" width="160" height="70">
          <Bird x={20} y={30} s={1} d={0} />
          <Bird x={52} y={14} s={0.8} d={0.2} />
          <Bird x={60} y={46} s={0.9} d={0.35} />
          <Bird x={92} y={28} s={0.7} d={0.1} />
          <Bird x={126} y={40} s={0.6} d={0.45} />
        </svg>
      </div>
      <div className="fx clock" aria-hidden>
        <span className="clock-icon clock-sun"><Sun size={16} /></span>
        <span className="clock-icon clock-moon"><Moon size={16} /></span>
        <span className="clock-time">06:00</span>
        <span className="clock-label">Sunrise at Nedo</span>
      </div>
    </>
  )
}
