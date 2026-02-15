import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { defaultCode } from '../lib/defaultCode'
import { loadSandbox, type SandboxApi } from '../lib/loadSandbox'

type OutputTab = 'JS' | 'DTS' | 'Errors'

type ErrorItem = { message: string; line?: number; code?: number }

type MessageChain = string | { messageText: string | MessageChain; next?: MessageChain[] }

function flattenMessageText(messageText: MessageChain): string {
  if (typeof messageText === 'string') return messageText
  const first =
    typeof messageText.messageText === 'string'
      ? messageText.messageText
      : flattenMessageText(messageText.messageText)
  const rest = (messageText.next ?? []).map(flattenMessageText)
  return [first, ...rest].join('\n')
}

const TARGET_OPTIONS = [
  { value: 1, label: 'ES5' },
  { value: 2, label: 'ES2015' },
  { value: 3, label: 'ES2016' },
  { value: 4, label: 'ES2017' },
  { value: 5, label: 'ES2018' },
  { value: 6, label: 'ES2019' },
  { value: 7, label: 'ES2020' },
  { value: 8, label: 'ES2021' },
  { value: 9, label: 'ES2022' },
  { value: 99, label: 'ESNext' },
] as const

const MODULE_OPTIONS = [
  { value: 1, label: 'CommonJS' },
  { value: 2, label: 'ESNext' },
  { value: 99, label: 'NodeNext' },
] as const

const JSX_OPTIONS = [
  { value: 0, label: 'preserve' },
  { value: 2, label: 'react-jsx' },
] as const

function getInitialCode(searchParams: URLSearchParams): string {
  const codeParam = searchParams.get('code')
  if (!codeParam) return defaultCode
  try {
    return decodeURIComponent(atob(codeParam))
  } catch {
    return defaultCode
  }
}

function buildShareUrl(code: string): string {
  const base = `${window.location.origin}/play`
  try {
    const encoded = btoa(encodeURIComponent(code))
    return `${base}?code=${encoded}`
  } catch {
    return base
  }
}

export function PlaygroundPage() {
  const [searchParams] = useSearchParams()
  const [sandbox, setSandbox] = useState<SandboxApi | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<OutputTab>('Errors')
  const [jsOutput, setJsOutput] = useState('')
  const [dtsOutput, setDtsOutput] = useState('')
  const [errors, setErrors] = useState<ErrorItem[]>([])
  const [target, setTarget] = useState(99)
  const [moduleKind, setModuleKind] = useState(2)
  const [strict, setStrict] = useState(true)
  const [jsx, setJsx] = useState(2)
  const [showConfig, setShowConfig] = useState(false)
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sandboxRef = useRef<SandboxApi | null>(null)

  const refreshOutputs = useCallback(async (sb: SandboxApi) => {
    try {
      const emit = await sb.getEmitResult()
      const jsFile = emit.outputFiles?.find((f) => f.name?.endsWith('.js'))
      setJsOutput(jsFile?.text ?? '')
      const dts = await sb.getDTSForCode()
      setDtsOutput(dts ?? '')
    } catch {
      setJsOutput('')
      setDtsOutput('')
    }
    try {
      const sbEx = sb as SandboxApi & {
        monaco?: {
          languages: {
            typescript: {
              getTypeScriptWorker(): Promise<
                (uri: { toString(): string }) => Promise<{
                  getSyntacticDiagnostics(uri: string): Promise<
                    Array<{
                      start: number
                      messageText: MessageChain
                      code?: number
                    }>
                  >
                  getSemanticDiagnostics(uri: string): Promise<
                    Array<{
                      start: number
                      messageText: MessageChain
                      code?: number
                    }>
                  >
                }>
              >
            }
          }
        }
        editor?: {
          getModel(): {
            uri: { toString(): string }
            getPositionAt(offset: number): { lineNumber: number }
          }
        }
      }
      const monaco = sbEx.monaco
      const model = sbEx.editor?.getModel?.()
      if (!monaco?.languages?.typescript?.getTypeScriptWorker || !model) {
        setErrors([])
        return
      }
      const uri = model.uri.toString()
      const getWorker = await monaco.languages.typescript.getTypeScriptWorker()
      const worker = await getWorker(model.uri)
      const [syntactic, semantic] = await Promise.all([
        worker.getSyntacticDiagnostics(uri),
        worker.getSemanticDiagnostics(uri),
      ])
      const errorsList: ErrorItem[] = [...syntactic, ...semantic].map((d) => ({
        message: flattenMessageText(d.messageText),
        line: model.getPositionAt(d.start).lineNumber,
        code: d.code,
      }))
      const errorsDebug = window.location.search.includes('errorsDebug=1')
      if (errorsDebug) console.log('[Playground Errors] worker diagnostics:', errorsList.length)
      setErrors(errorsList)
    } catch (err) {
      console.error('[Playground Errors] worker diagnostics failed:', err)
      setErrors([])
    }
  }, [])

  useEffect(() => {
    const initialCode = getInitialCode(searchParams)
    const compilerOptions: Record<string, unknown> = {
      target,
      module: moduleKind,
      strict,
      jsx,
      noEmit: false,
      checkedThrows: true,
    }

    loadSandbox({
      domId: 'monaco-editor-embed',
      initialCode,
      compilerOptions,
    })
      .then((sb) => {
        sandboxRef.current = sb
        setSandbox(sb)
        setLoading(false)
        refreshOutputs(sb).catch(() => {})
      })
      .catch((err) => {
        setLoadError(err?.message ?? 'Failed to load sandbox')
        setLoading(false)
      })

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!sandbox) return
    const model = sandbox.getModel()
    if (!model) return
    const disposable = (sandbox as unknown as { editor?: { onDidChangeModelContent: (fn: () => void) => { dispose: () => void } } }).editor?.onDidChangeModelContent?.(() => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = setTimeout(() => refreshOutputs(sandbox), 500)
    })
    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
      disposable?.dispose?.()
    }
  }, [sandbox, refreshOutputs])

  useEffect(() => {
    if (!sandbox) return
    sandbox.setCompilerSettings({ target, module: moduleKind, strict, jsx, checkedThrows: true })
    refreshOutputs(sandbox)
  }, [sandbox, target, moduleKind, strict, jsx, refreshOutputs])

  const handleCopyLink = useCallback(() => {
    const sb = sandboxRef.current ?? sandbox
    if (!sb) return
    const code = sb.getModel().getValue()
    const url = buildShareUrl(code)
    navigator.clipboard.writeText(url)
  }, [sandbox])

  if (loadError) {
    return (
      <div className="p-4 text-red-500 bg-[#1e1e1e] min-h-[calc(100vh-52px)] md:p-8">
        <p className="break-words">{loadError}</p>
        <p className="mt-4 text-sm text-white/70 md:text-base">
          Ensure Monaco is under /cdn/monaco/ and ErrorScript under /cdn/errorscript/ (see
          public/cdn/errorscript/README.md).
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-52px)] bg-[#1e1e1e] min-h-0">
      <div className="py-2 px-3 bg-[#2d2d2d] border-b border-white/10 flex items-center gap-2 flex-wrap md:px-4 md:gap-4">
        <span className="font-semibold text-white/90 text-sm md:text-base">Playground</span>
        <span className="text-white/70 text-sm md:text-base">ErrorScript</span>
        <select
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="py-1.5 px-2 bg-[#3c3c3c] border border-white/20 text-white/90 rounded text-sm min-w-0"
        >
          {TARGET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={moduleKind}
          onChange={(e) => setModuleKind(Number(e.target.value))}
          className="py-1.5 px-2 bg-[#3c3c3c] border border-white/20 text-white/90 rounded text-sm min-w-0"
        >
          {MODULE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 text-white/90 text-sm md:text-base">
          <input type="checkbox" checked={strict} onChange={(e) => setStrict(e.target.checked)} />
          Strict
        </label>
        <select
          value={jsx}
          onChange={(e) => setJsx(Number(e.target.value))}
          className="py-1.5 px-2 bg-[#3c3c3c] border border-white/20 text-white/90 rounded text-sm min-w-0"
        >
          {JSX_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowConfig((s) => !s)}
          className="py-1.5 px-3 text-sm bg-[#3c3c3c] border border-white/20 text-white/90 rounded"
        >
          {showConfig ? 'Hide config' : 'Show config'}
        </button>
        {sandbox?.ts && (
          <span
            className="ml-auto mr-2 text-xs text-white/50 hidden sm:inline"
            title="Errors, JS, and DTS come from the same ErrorScript worker as the editor"
          >
            TS: {(sandbox.ts as { version?: string }).version ?? '?'}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopyLink}
          className="py-1.5 px-3 text-xs bg-brand border-0 text-white rounded cursor-pointer md:text-sm"
        >
          Copy link
        </button>
      </div>
      {showConfig && sandbox && (
        <pre className="m-0 py-2 px-3 bg-[#252526] text-white/85 text-[0.75rem] overflow-auto border-b border-white/10 md:px-4 md:text-[0.8rem]">
          {JSON.stringify(sandbox.getCompilerOptions(), null, 2)}
        </pre>
      )}
      <div className="flex-1 flex flex-col min-h-0 md:flex-row">
        <div id="monaco-editor-embed" className="flex-1 min-w-0 min-h-[200px] md:min-h-0" />
        <div className="w-full flex-shrink-0 flex flex-col border-t border-white/10 min-h-[180px] md:w-1/2 md:min-w-[300px] md:border-t-0 md:border-l md:min-h-0">
          <div className="flex gap-0 border-b border-white/10 px-2">
            {(['JS', 'DTS', 'Errors'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab === 'DTS' ? 'DTS' : tab === 'JS' ? 'JS' : 'Errors')}
                className={`py-2 px-4 bg-transparent border-none cursor-pointer font-normal border-b-2 border-transparent ${
                  activeTab === tab
                    ? 'text-brand border-b-brand font-semibold'
                    : 'text-white/70'
                }`}
              >
                {tab === 'DTS' ? '.D.TS' : tab}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto p-3 font-mono text-xs text-white/85 whitespace-pre-wrap break-all min-h-0 md:p-4 md:text-sm">
            {loading && 'Loading editor…'}
            {!loading && activeTab === 'JS' && jsOutput}
            {!loading && activeTab === 'DTS' && dtsOutput}
            {!loading && activeTab === 'Errors' && (
              <div>
                {searchParams.get('errorsDebug') === '1' && (
                  <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', opacity: 0.8 }}>
                    Debug: {errors.length} diagnostics. Open DevTools Console for full logs.
                  </div>
                )}
                {errors.length === 0 && 'No errors.'}
                {errors.map((e, i) => (
                  <div key={i} className="mb-2">
                    {e.line != null && (
                      <span className="text-white/50">Line {e.line}: </span>
                    )}
                    {e.code != null && <span className="text-brand">TS{e.code} </span>}
                    {e.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
