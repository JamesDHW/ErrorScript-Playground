import { SlideFrame } from './SlideFrame'

export function SlideInterstitial({ lines }: { lines: string[] }) {
  return (
    <SlideFrame>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4 text-center sm:gap-8">
        {lines.map((line, i) => (
          <p
            key={i}
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl md:text-6xl"
          >
            {line}
          </p>
        ))}
      </div>
    </SlideFrame>
  )
}
