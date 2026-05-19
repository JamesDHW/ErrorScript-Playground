function ActChip({ act }: { act: string }) {
  return (
    <span className="inline-block uppercase tracking-widest">
      {act}
    </span>
  )
}

export function SlideChrome({
  act,
  deckAccentBgClass,
  index,
  total,
}: {
  act?: string
  deckAccentBgClass: string
  index: number
  total: number
}) {
  return (
    <header
      className={`relative z-20 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 transition-colors duration-500 ease-out ${deckAccentBgClass}`.trim()}
    >
      <a href="/" className="flex items-center gap-2 min-w-0">
        <img src="/ErrorScript.png" alt="" className="w-8 h-8 shrink-0" />
        <span className="font-bold text-white truncate text-sm sm:text-base">ErrorScript</span>
      </a>
      <div className="flex items-center justify-center gap-4 shrink-0 text-white font-bold text-xs sm:text-sm tabular-nums">
        {act ? <ActChip act={act} /> : null}
        <span>
          [{index + 1} / {total}]
        </span>
      </div>
    </header>
  )
}
