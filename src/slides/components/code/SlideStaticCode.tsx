import { useCallback, useRef } from 'react'
import type { SlideCodeLanguage, SlideStaticMarker } from '../../slideTypes'
import {
  SLIDE_EDITOR_FONT_PX,
  SLIDE_EDITOR_LINE_HEIGHT_PX,
} from '../../slideMonacoTypography'
import { useSlidesMonaco } from '../../hooks/useSlidesMonaco'
import {
  getMonacoOverflowWidgetsDomNode,
  type SlideStaticMonacoEditor,
} from '../../../lib/loadSandbox'
import { SlideCodeChrome } from '../chrome/SlideCodeChrome'
import {
  clearEditorMarkers,
  slideLanguageToMonacoId,
  STATIC_MARKER_OWNER,
  toMonacoMarkers,
} from './slideStaticMarkers'

const SLIDE_STATIC_EDITOR_PAD = { top: 24, bottom: 28 } as const

export function SlideStaticCode({
  code,
  className = '',
  language = 'typescript',
  lineNumbers = 'on',
  markers,
}: {
  code: string
  className?: string
  language?: SlideCodeLanguage
  lineNumbers?: 'on' | 'off' | 'interval'
  markers?: SlideStaticMarker[]
}) {
  const monaco = useSlidesMonaco()
  const monacoLang = slideLanguageToMonacoId(language)
  const lineCount = Math.max(1, code.split('\n').length)
  const contentHeightPx = lineCount * SLIDE_EDITOR_LINE_HEIGHT_PX
  const chromePadV = SLIDE_STATIC_EDITOR_PAD.top + SLIDE_STATIC_EDITOR_PAD.bottom
  const editorBodyHeightPx = contentHeightPx + chromePadV

  const editorRef = useRef<SlideStaticMonacoEditor | null>(null)
  const resizeRef = useRef<ResizeObserver | null>(null)
  const markersSerialized = JSON.stringify(markers ?? [])

  const bindHost = useCallback(
    (container: HTMLDivElement | null) => {
      resizeRef.current?.disconnect()
      resizeRef.current = null

      if (editorRef.current) {
        clearEditorMarkers(monaco, editorRef.current)
        editorRef.current.dispose()
        editorRef.current = null
      }

      if (!container) return

      const width = Math.max(1, container.clientWidth || 320)
      const overflowHost = getMonacoOverflowWidgetsDomNode()

      const editor = monaco.editor.create(container, {
        value: code,
        language: monacoLang,
        theme: 'vs-dark',
        domReadOnly: true,
        automaticLayout: false,
        fixedOverflowWidgets: true,
        ...(overflowHost ? { overflowWidgetsDomNode: overflowHost } : {}),
        contextmenu: false,
        fontSize: SLIDE_EDITOR_FONT_PX,
        lineHeight: SLIDE_EDITOR_LINE_HEIGHT_PX,
        minimap: { enabled: false },
        padding: { top: SLIDE_STATIC_EDITOR_PAD.top, bottom: SLIDE_STATIC_EDITOR_PAD.bottom },
        scrollBeyondLastLine: false,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
        wordWrap: 'off',
        lineNumbers,
        lineNumbersMinChars: 2,
        lineDecorationsWidth: 15,
        glyphMargin: false,
        folding: false,
        stickyScroll: { enabled: false },
        renderLineHighlight: 'none',
        selectionHighlight: false,
        occurrencesHighlight: 'off',
        scrollbar: {
          vertical: 'hidden',
          horizontal: 'auto',
          alwaysConsumeMouseWheel: false,
        },
        dimension: { width, height: editorBodyHeightPx },
      })

      editorRef.current = editor

      const model = editor.getModel?.()
      const setMarkers = monaco.editor.setModelMarkers
      if (model && setMarkers) {
        const parsed = JSON.parse(markersSerialized) as SlideStaticMarker[]
        const list = toMonacoMarkers(parsed)
        if (list.length) setMarkers(model, STATIC_MARKER_OWNER, list)
      }

      const layout = (): void => {
        const nextWidth = Math.max(1, container.clientWidth)
        editor.layout({ width: nextWidth, height: editorBodyHeightPx })
      }

      const ro = new ResizeObserver(() => {
        layout()
      })
      ro.observe(container)
      resizeRef.current = ro
      queueMicrotask(layout)
    },
    [monaco, code, monacoLang, editorBodyHeightPx, lineNumbers, markersSerialized],
  )

  return (
    <SlideCodeChrome language={language} className={className}>
      <div className="relative z-10 min-h-0 min-w-0 w-full max-h-[60rem] overflow-y-auto">
        <div
          ref={bindHost}
          className="min-w-0 w-full overflow-x-auto"
          style={{ height: editorBodyHeightPx }}
        />
      </div>
    </SlideCodeChrome>
  )
}
