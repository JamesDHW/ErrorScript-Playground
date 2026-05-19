import { buildPlaygroundCompilerOptions } from '../lib/playgroundCompilerDefaults'
import { SLIDE_EDITOR_FONT_PX, SLIDE_EDITOR_LINE_HEIGHT_PX } from './slideMonacoTypography'

export const SLIDES_SANDBOX_COMPILER_OPTIONS = buildPlaygroundCompilerOptions({
  target: 99,
  module: 2,
  strict: true,
  jsx: 2,
})

export const SLIDES_SANDBOX_PANEL_MONACO_SETTINGS: Record<string, unknown> = {
  fontSize: SLIDE_EDITOR_FONT_PX,
  lineHeight: SLIDE_EDITOR_LINE_HEIGHT_PX,
  minimap: { enabled: false },
  padding: { top: 24, bottom: 28 },
  scrollBeyondLastLine: false,
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
}
