import type { SlideCodeLanguage } from '../../slideTypes'

export const LANGUAGE_LABELS: Record<SlideCodeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  errorscript: 'ErrorScript',
}

type LanguageTheme = {
  border: string
  ring: string
  pillBorder: string
  pillText: string
  pillBg: string
  pillDot: string
}

export const LANGUAGE_THEME: Record<SlideCodeLanguage, LanguageTheme> = {
  javascript: {
    border: 'border-yellow-500/95',
    ring: 'ring-yellow-400/10',
    pillBorder: 'border-yellow-500/95',
    pillText: 'text-yellow-200',
    pillBg: 'bg-yellow-400/10',
    pillDot: 'bg-yellow-300',
  },
  typescript: {
    border: 'border-sky-700',
    ring: 'ring-sky-400/10',
    pillBorder: 'border-sky-700',
    pillText: 'text-sky-200',
    pillBg: 'bg-sky-400/10',
    pillDot: 'bg-sky-300',
  },
  errorscript: {
    border: 'border-brand/95',
    ring: 'ring-red-400/10',
    pillBorder: 'border-brand/95',
    pillText: 'text-red-200',
    pillBg: 'bg-red-400/10',
    pillDot: 'bg-red-300',
  },
}
