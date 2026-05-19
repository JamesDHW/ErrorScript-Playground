import type { ReactNode } from 'react'

export type SlideCodeLanguage = 'javascript' | 'typescript' | 'errorscript'

export type SlideStaticMarkerSeverity = 'error' | 'warning' | 'info' | 'hint'

export type SlideStaticMarker = {
  startLineNumber: number
  startColumn: number
  endLineNumber: number
  endColumn: number
  message: string
  severity?: SlideStaticMarkerSeverity
}

export type SlideEntry = {
  act?: string
  /** Slide copy. Omit (or pass `null`) with `panelCode` for a code-only fullscreen slide. */
  content?: ReactNode
  /** ErrorScript source for the shared right-hand Monaco panel. Omit for full-width slides. */
  panelCode?: string
  /** Language label/accent for the Monaco panel chrome. Defaults to `errorscript` when `panelCode` is set. */
  panelLanguage?: SlideCodeLanguage
  /**
   * With `panelCode`: hide the copy column and expand the editor card to the full viewport
   * (minus margins). Same effect as omitting `content` when you still want an explicit flag.
   */
  panelFullBleed?: boolean
}
