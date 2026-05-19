import type { CSSProperties, ReactNode } from 'react'
import type { SlideCodeLanguage } from '../../slideTypes'
import { LANGUAGE_LABELS, LANGUAGE_THEME } from './slideCodeLanguageTheme'

export function SlideCodeChrome({
  language,
  children,
  className = '',
  style,
}: {
  language: SlideCodeLanguage
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const theme = LANGUAGE_THEME[language]
  return (
    <div
      className={`flex flex-col w-full min-w-0 overflow-hidden border border-2 text-left ${theme.border} bg-[#0d0d0d] ${theme.ring} ring-1 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}
      style={style}
    >
      <div className="relative z-0 flex shrink-0 items-center gap-2 border-b border-white/[0.08] bg-black/50 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full border ${theme.pillBorder} ${theme.pillBg} ${theme.pillText} px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${theme.pillDot}`} />
          {LANGUAGE_LABELS[language]}
        </span>
      </div>
      {children}
    </div>
  )
}
