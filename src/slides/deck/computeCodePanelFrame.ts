import {
  SLIDE_EDITOR_FONT_PX,
  SLIDE_EDITOR_LINE_HEIGHT_PX,
  SLIDE_EDITOR_LINE_NUMBER_GUTTER_PX,
} from '../slideMonacoTypography'

/** Progress bar + slide chrome + footer + main padding (approx). */
const VIEWPORT_VERTICAL_RESERVE = 148
const OUTER_MARGIN_PX = 20
const TITLE_BAR_PX = 44
const EDITOR_PAD_H_PX = 32
const EDITOR_PAD_V_PX = 24 + SLIDE_EDITOR_LINE_HEIGHT_PX

export type PanelFrame = { width: number; height: number }

export function computeCodePanelFrame(
  source: string,
  vw: number,
  vh: number,
  fullViewportWidth: boolean,
  splitLayout: boolean,
): PanelFrame {
  const margin = OUTER_MARGIN_PX
  const half = vw / 2
  const maxW = fullViewportWidth ? vw - margin * 2 : half - margin * 2
  const maxH = vh - VIEWPORT_VERTICAL_RESERVE - margin * 2
  const lines = source.split('\n')
  const lineCount = Math.max(1, lines.length)
  const needH = Math.ceil(lineCount * SLIDE_EDITOR_LINE_HEIGHT_PX + TITLE_BAR_PX + EDITOR_PAD_V_PX)
  if (splitLayout) {
    return {
      width: Math.max(280, maxW),
      height: Math.min(maxH, Math.max(180, needH)),
    }
  }
  const charW = SLIDE_EDITOR_FONT_PX * 0.58
  const maxCols = Math.min(110, lines.reduce((m, l) => Math.max(m, l.length), 1))
  const needW = Math.ceil(maxCols * charW + SLIDE_EDITOR_LINE_NUMBER_GUTTER_PX + EDITOR_PAD_H_PX)
  return {
    width: Math.min(maxW, Math.max(280, needW)),
    height: Math.min(maxH, Math.max(180, needH)),
  }
}
