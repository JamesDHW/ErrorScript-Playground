import type { SlideCodeLanguage } from './slideTypes'

export type SlideActTitleVariant = Extract<SlideCodeLanguage, 'javascript' | 'typescript' | 'errorscript'>

export type SlideDeckAccentKind = 'brand' | SlideActTitleVariant

/** Tailwind background classes — same as act title slide full-bleed surfaces. */
export const ACCENT_BG_CLASS: Record<SlideDeckAccentKind, string> = {
  brand: 'bg-brand',
  javascript: 'bg-yellow-400',
  typescript: 'bg-sky-700',
  errorscript: 'bg-brand',
}

export function slideActTitleSurfaceClass(variant: SlideActTitleVariant): string {
  return ACCENT_BG_CLASS[variant]
}

export function resolveSlideDeckAccent(act: string | undefined): SlideDeckAccentKind {
  if (!act) return 'brand'
  if (act.includes('JavaScript')) return 'javascript'
  if (act.includes('TypeScript')) return 'typescript'
  return 'errorscript'
}

export function slideDeckAccentBgClass(kind: SlideDeckAccentKind): string {
  return ACCENT_BG_CLASS[kind]
}
