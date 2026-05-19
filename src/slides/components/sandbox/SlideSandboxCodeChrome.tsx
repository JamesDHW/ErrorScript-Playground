import { startTransition, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { SandboxMonacoEmbed } from '../../../components/SandboxMonacoEmbed'
import type { SandboxApi } from '../../../lib/loadSandbox'
import { layoutSandboxEditor } from '../../lib/layoutSandboxEditor'
import type { SlideCodeLanguage } from '../../slideTypes'
import {
  SLIDES_SANDBOX_COMPILER_OPTIONS,
  SLIDES_SANDBOX_PANEL_MONACO_SETTINGS,
} from '../../slidesSandboxPanelConfig'
import { SlideCodeChrome } from '../chrome/SlideCodeChrome'

type LoadPhase = 'loading' | 'ready' | 'error'

export function SlideSandboxCodeChrome({
  language,
  initialCode,
  domId,
  className = '',
  style,
  editorClassName = 'absolute inset-0 min-h-0 min-w-0',
  editorMinHeightClass = 'min-h-[min(55vh,480px)]',
  onReady,
}: {
  language: SlideCodeLanguage
  initialCode: string
  domId: string
  className?: string
  style?: CSSProperties
  editorClassName?: string
  editorMinHeightClass?: string
  onReady?: (sandbox: SandboxApi) => void
}) {
  const [phase, setPhase] = useState<LoadPhase>('loading')
  const [loadError, setLoadError] = useState<string | null>(null)
  const sandboxRef = useRef<SandboxApi | null>(null)

  const handleReady = (sb: SandboxApi): void => {
    sandboxRef.current = sb
    startTransition(() => {
      setPhase('ready')
      setLoadError(null)
    })
    queueMicrotask(() => layoutSandboxEditor(sb))
    onReady?.(sb)
  }

  const handleLoadError = (message: string): void => {
    startTransition(() => {
      setPhase('error')
      setLoadError(message)
    })
  }

  useLayoutEffect(() => {
    if (phase !== 'ready') return
    layoutSandboxEditor(sandboxRef.current)
  }, [phase, style, className])

  const showLoadingOverlay = phase === 'loading'

  return (
    <SlideCodeChrome
      language={language}
      className={`w-full min-w-0 min-h-0 flex flex-col ${className}`}
      style={style}
    >
      {loadError ? (
        <div className="shrink-0 border-b border-white/[0.06] px-4 py-3 text-sm text-red-400">
          {loadError}
        </div>
      ) : null}
      <div className={`relative z-10 flex ${editorMinHeightClass} min-w-0 w-full flex-1 flex-col`}>
        {showLoadingOverlay ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#121212]/80 text-base text-zinc-950/45">
            Loading editor…
          </div>
        ) : null}
        <SandboxMonacoEmbed
          domId={domId}
          initialCode={initialCode}
          compilerOptions={SLIDES_SANDBOX_COMPILER_OPTIONS}
          monacoSettings={{ ...SLIDES_SANDBOX_PANEL_MONACO_SETTINGS }}
          readOnly={false}
          className={editorClassName}
          onReady={handleReady}
          onLoadError={handleLoadError}
        />
      </div>
    </SlideCodeChrome>
  )
}
