import { seeded } from './random'

const STARS = (() => {
  const rand = seeded(2024)
  return Array.from({ length: 140 }, () => ({
    left: rand() * 100, top: rand() * 100, size: 1 + rand() * 2.2, delay: rand() * 4, dur: 2 + rand() * 3,
  }))
})()

const GLINTS = (() => {
  const rand = seeded(77)
  return Array.from({ length: 34 }, (_, i) => {
    const depth = i / 34
    return { top: 2 + depth * 92, width: 14 + depth * 46 + rand() * 18, offset: (rand() - 0.5) * (6 + depth * 30), delay: rand() * 2 }
  })
})()

/** Pinned scene between the house rules and booking: the sun sinks into the sea and night falls. */
export function Sunset() {
  return (
    <section className="sunset" aria-label="Sunset over the Adriatic">
      <div className="sunset-stage">
        <div className="sunset-layer sky-golden" />
        <div className="sunset-layer sky-vivid" />
        <div className="sunset-layer sky-dusk" />
        <div className="sunset-layer sky-night" />

        <div className="sunset-skyclip">
          <div className="sunset-sun">
            <div className="sunset-sun-glow" />
            <div className="sunset-sun-core" />
            <div className="sunset-sun-core sunset-sun-red" />
          </div>
        </div>

        <div className="sunset-sea">
          <div className="sunset-layer sea-golden" />
          <div className="sunset-layer sea-vivid" />
          <div className="sunset-layer sea-night" />
          <div className="sea-ripples" />
          <div className="sunset-reflection">
            {GLINTS.map((g, i) => (
              <span
                key={i}
                style={{ top: `${g.top}%`, width: `${g.width}%`, marginLeft: `${g.offset}%`, animationDelay: `${g.delay}s` }}
              />
            ))}
          </div>
        </div>

        <svg className="sunset-boat" viewBox="-40 -60 80 66" aria-hidden>
          <path d="M2 -4 L2 -56 L28 -4Z M-2 -6 L-2 -46 L-22 -6Z M-30 -2 L32 -2 L24 6 L-24 6Z" />
        </svg>

        <div className="sunset-stars" aria-hidden>
          {STARS.map((s, i) => (
            <span key={i} style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />
          ))}
        </div>

        <div className="sunset-fade-top" />

        <div className="sunset-copy">
          <p className="sunset-line line-1">Every evening, the sun <em>sinks into the Adriatic</em></p>
          <p className="sunset-line line-2">…and the night sky <em>takes over</em></p>
        </div>
      </div>
    </section>
  )
}
