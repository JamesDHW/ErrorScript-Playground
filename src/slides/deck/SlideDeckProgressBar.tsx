export function SlideDeckProgressBar({
  progress,
  deckAccentBgClass,
}: {
  progress: number
  deckAccentBgClass: string
}) {
  return (
    <div className="relative z-20 h-1 w-full shrink-0 bg-zinc-200/90">
      <div
        className={`h-full transition-[width,background-color] duration-500 ease-out ${deckAccentBgClass}`.trim()}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
