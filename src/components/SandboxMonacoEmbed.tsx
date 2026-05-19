import { useCallback, useLayoutEffect, useRef } from 'react'
import { createSandboxEditor, disposeSandboxApi, type SandboxApi } from '../lib/loadSandbox'

export type SandboxMonacoEmbedProps = {
  domId: string
  initialCode: string
  compilerOptions: Record<string, unknown>
  readOnly?: boolean
  monacoSettings?: Record<string, unknown>
  className?: string
  onReady?: (sb: SandboxApi) => void
  onLoadError?: (message: string) => void
}

export function SandboxMonacoEmbed({
  domId,
  initialCode,
  compilerOptions,
  readOnly = false,
  monacoSettings,
  className = 'min-h-[200px] w-full min-w-0',
  onReady,
  onLoadError,
}: SandboxMonacoEmbedProps) {
  const compilerRef = useRef(compilerOptions)
  const monacoExtraRef = useRef(monacoSettings)
  const onReadyRef = useRef(onReady)
  const onLoadErrorRef = useRef(onLoadError)

  useLayoutEffect(() => {
    compilerRef.current = compilerOptions
    monacoExtraRef.current = monacoSettings
    onReadyRef.current = onReady
    onLoadErrorRef.current = onLoadError
  }, [compilerOptions, monacoSettings, onReady, onLoadError])

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return undefined
      let cancelled = false
      let sandbox: SandboxApi | null = null
      createSandboxEditor({
        domId,
        initialCode,
        compilerOptions: compilerRef.current,
        monacoSettings: { ...monacoExtraRef.current, readOnly },
      })
        .then((sb) => {
          if (cancelled) {
            disposeSandboxApi(sb)
            return
          }
          sandbox = sb
          onReadyRef.current?.(sb)
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : 'Failed to load editor'
          onLoadErrorRef.current?.(msg)
        })

      return () => {
        cancelled = true
        if (sandbox) disposeSandboxApi(sandbox)
        sandbox = null
      }
    },
    [domId, initialCode, readOnly],
  )

  return <div id={domId} ref={ref} className={className} />
}
