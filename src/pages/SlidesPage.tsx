import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SLIDE_COUNT, SLIDE_DECK } from '../slides/SlidesContent'
import { SLIDES_PAGE_MAIN_CLASS } from '../appSurface'
import { SlideChrome } from '../slides/components/chrome/SlideChrome'
import { SlideSandboxCodeChrome } from '../slides/components/sandbox/SlideSandboxCodeChrome'
import { SlidesMonacoRoot } from '../slides/components/runtime/SlidesMonacoRoot'
import { computeCodePanelFrame } from '../slides/deck/computeCodePanelFrame'
import { monacoAncestorFocused } from '../slides/deck/monacoAncestorFocused'
import { SlideDeckMainBody } from '../slides/deck/SlideDeckMainBody'
import { SlideDeckProgressBar } from '../slides/deck/SlideDeckProgressBar'
import { layoutSandboxEditor } from '../slides/lib/layoutSandboxEditor'
import { resolveSlideDeckAccent, slideDeckAccentBgClass } from '../slides/slideActAccent'
import type { SandboxApi } from '../lib/loadSandbox'

const SLIDE_EDITOR_DOM_ID = 'slides-monaco-embed'

export function SlidesPage() {
  const { slideIndex } = useParams()
  const navigate = useNavigate()
  const didFocusDeckRef = useRef(false)
  const sandboxRef = useRef<SandboxApi | null>(null)
  const [viewport, setViewport] = useState({ w: 1200, h: 800 })

  const parsed = slideIndex === undefined ? 0 : Number.parseInt(slideIndex, 10)
  const safe = Number.isFinite(parsed) ? Math.min(SLIDE_COUNT - 1, Math.max(0, parsed)) : 0

  const { act, content, panelCode, panelFullBleed, panelLanguage } = SLIDE_DECK[safe]
  const hasPanel = panelCode != null && panelCode.length > 0
  const cardLanguage = panelLanguage ?? 'errorscript'
  const noCopy = content == null || content === false
  const codeOnlyPanel = Boolean(hasPanel && (panelFullBleed || noCopy))

  useEffect(() => {
    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const panelFrame = useMemo(() => {
    if (!hasPanel || !panelCode) return null
    const splitLayout = !codeOnlyPanel
    return computeCodePanelFrame(panelCode, viewport.w, viewport.h, codeOnlyPanel, splitLayout)
  }, [codeOnlyPanel, hasPanel, panelCode, viewport.h, viewport.w])

  useLayoutEffect(() => {
    if (!hasPanel) return
    layoutSandboxEditor(sandboxRef.current)
  }, [hasPanel, panelFrame])

  const onPanelReady = useCallback((sb: SandboxApi) => {
    sandboxRef.current = sb
  }, [])

  const deckRef = useCallback((el: HTMLElement | null) => {
    if (!el) {
      didFocusDeckRef.current = false
      return
    }
    if (didFocusDeckRef.current) return
    didFocusDeckRef.current = true
    el.focus()
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (monacoAncestorFocused()) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = Math.max(0, safe - 1)
        if (prev !== safe) navigate(`/slides/${prev}`)
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        const next = Math.min(SLIDE_COUNT - 1, safe + 1)
        if (next !== safe) navigate(`/slides/${next}`)
        return
      }

      if (e.key === ' ') {
        e.preventDefault()
        const next = Math.min(SLIDE_COUNT - 1, safe + 1)
        if (next !== safe) navigate(`/slides/${next}`)
      }
    },
    [navigate, safe],
  )

  if (slideIndex !== undefined && slideIndex !== String(safe)) {
    return <Navigate to={`/slides/${safe}`} replace />
  }

  const progress = ((safe + 1) / SLIDE_COUNT) * 100
  const deckAccentBgClass = slideDeckAccentBgClass(resolveSlideDeckAccent(act))

  const codeCardChromeClass = codeOnlyPanel
    ? 'shrink-0'
    : 'shrink-0 w-full min-w-0 min-h-0 flex flex-col'

  const codeCardChromeStyle = panelFrame
    ? codeOnlyPanel
      ? { width: panelFrame.width, height: panelFrame.height }
      : {
          width: '100%',
          maxWidth: panelFrame.width,
          height: panelFrame.height,
        }
    : undefined

  const codeCard =
    hasPanel && panelCode && panelFrame ? (
      <SlideSandboxCodeChrome
        key={safe}
        domId={SLIDE_EDITOR_DOM_ID}
        language={cardLanguage}
        initialCode={panelCode}
        className={codeCardChromeClass}
        style={codeCardChromeStyle}
        editorClassName="absolute inset-0 min-h-0 min-w-0"
        editorMinHeightClass="min-h-0"
        onReady={onPanelReady}
      />
    ) : null

  return (
    <main
      ref={deckRef}
      tabIndex={-1}
      role="application"
      aria-label="Slide presentation"
      onKeyDown={onKeyDown}
      className={SLIDES_PAGE_MAIN_CLASS}
    >
      <SlideChrome act={act} deckAccentBgClass={deckAccentBgClass} index={safe} total={SLIDE_COUNT} />
      <SlideDeckProgressBar progress={progress} deckAccentBgClass={deckAccentBgClass} />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] flex-1 flex-col items-center justify-center text-sm text-zinc-950/45">
            Loading presentation…
          </div>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <SlidesMonacoRoot>
            <SlideDeckMainBody
              slideKey={safe}
              content={content}
              hasPanel={hasPanel}
              codeOnlyPanel={codeOnlyPanel}
              codeCard={codeCard}
            />
          </SlidesMonacoRoot>
        </div>
      </Suspense>
      <footer className="absolute bottom-0 left-0 right-0 z-20 shrink-0 border-t border-zinc-300 px-4 py-2 text-center text-[10px] text-zinc-300 sm:text-xs">
        Arrow keys, Enter, or Space – navigation pauses while the code editor is focused
      </footer>
    </main>
  )
}
