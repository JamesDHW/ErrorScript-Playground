import type { SlideStaticMarker } from '../../slideTypes'
import type { SlideStaticMonacoEditor, SlidesMonacoApi } from '../../../lib/loadSandbox'

export const STATIC_MARKER_OWNER = 'slide-static'

const MARKER_SEVERITY: Record<NonNullable<SlideStaticMarker['severity']>, number> = {
  error: 8,
  warning: 4,
  info: 2,
  hint: 1,
}

export function toMonacoMarkers(markers: SlideStaticMarker[] | undefined): Array<Record<string, unknown>> {
  if (!markers?.length) return []
  return markers.map((m) => ({
    severity: MARKER_SEVERITY[m.severity ?? 'error'],
    startLineNumber: m.startLineNumber,
    startColumn: m.startColumn,
    endLineNumber: m.endLineNumber,
    endColumn: m.endColumn,
    message: m.message,
  }))
}

export function clearEditorMarkers(monaco: SlidesMonacoApi, editor: SlideStaticMonacoEditor): void {
  const model = editor.getModel?.()
  const setMarkers = monaco.editor.setModelMarkers
  if (!model || !setMarkers) return
  setMarkers(model, STATIC_MARKER_OWNER, [])
}

export function slideLanguageToMonacoId(language: 'javascript' | 'typescript' | 'errorscript'): string {
  if (language === 'javascript') return 'javascript'
  return 'typescript'
}
