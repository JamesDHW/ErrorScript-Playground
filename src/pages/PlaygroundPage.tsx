import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { defaultCode } from '../lib/defaultCode'
import { loadSandbox, type SandboxApi } from '../lib/loadSandbox'

const BRAND_COLOR = '#c43333'

type OutputTab = 'JS' | 'DTS' | 'Errors'

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
  const [errors, setErrors] = useState<Array<{ message: string; line?: number; code?: number }>>([])
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
      const program = await sb.createTSProgram()
      const rootNames = program.getRootFileNames()
      const fileName = rootNames[0]
      if (!fileName) {
        setErrors([])
        return
      }
      const sourceFile = program.getSourceFile(fileName)
      if (!sourceFile) {
        setErrors([])
        return
      }
      const syn = program.getSyntacticDiagnostics(sourceFile)
      const sem = program.getSemanticDiagnostics(sourceFile)
      const ts = sb.ts
      const all = [...syn, ...sem]
      setErrors(
        all.map((d) => ({
          message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
          line: d.file && d.start !== undefined ? ts.getLineAndCharacterOfPosition(d.file, d.start).line + 1 : undefined,
          code: d.code,
        })),
      )
    } catch {
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
      <div style={{ padding: '2rem', color: '#f14c4c', backgroundColor: '#1e1e1e', minHeight: 'calc(100vh - 52px)' }}>
        <p>{loadError}</p>
        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>
          Ensure Monaco is under /cdn/monaco/ and ErrorScript under /cdn/errorscript/ (see public/cdn/errorscript/README.md).
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 52px)',
        backgroundColor: '#1e1e1e',
      }}
    >
      <div
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2d2d2d',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Playground</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>ErrorScript</span>
        <select
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          style={{
            padding: '0.35rem 0.5rem',
            background: '#3c3c3c',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
          }}
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
          style={{
            padding: '0.35rem 0.5rem',
            background: '#3c3c3c',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
          }}
        >
          {MODULE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.9)' }}>
          <input
            type="checkbox"
            checked={strict}
            onChange={(e) => setStrict(e.target.checked)}
          />
          Strict
        </label>
        <select
          value={jsx}
          onChange={(e) => setJsx(Number(e.target.value))}
          style={{
            padding: '0.35rem 0.5rem',
            background: '#3c3c3c',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
          }}
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
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.875rem',
            background: '#3c3c3c',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
          }}
        >
          {showConfig ? 'Hide config' : 'Show config'}
        </button>
        {sandbox?.ts && (
          <span
            style={{
              marginLeft: 'auto',
              marginRight: '0.5rem',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
            }}
            title="Main thread (Errors tab, Emit, DTS) uses this TypeScript"
          >
            TS: {(sandbox.ts as { version?: string }).version ?? '?'}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopyLink}
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.875rem',
            background: BRAND_COLOR,
            border: 'none',
            color: 'white',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Copy link
        </button>
      </div>
      {showConfig && sandbox && (
        <pre
          style={{
            margin: 0,
            padding: '0.5rem 1rem',
            background: '#252526',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.8rem',
            overflow: 'auto',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {JSON.stringify(sandbox.getCompilerOptions(), null, 2)}
        </pre>
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          minHeight: 0,
        }}
      >
        <div id="monaco-editor-embed" style={{ flex: 1, minWidth: 0 }} />
        <div
          style={{
            width: '50%',
            minWidth: 300,
            backgroundColor: '#1e1e1e',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 0,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '0 0.5rem',
            }}
          >
            {(['JS', 'DTS', 'Errors'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab === 'DTS' ? 'DTS' : tab === 'JS' ? 'JS' : 'Errors')}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: activeTab === tab ? BRAND_COLOR : 'rgba(255,255,255,0.7)',
                  borderBottom:
                    activeTab === tab ? `2px solid ${BRAND_COLOR}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
              >
                {tab === 'DTS' ? '.D.TS' : tab}
              </button>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '1rem',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.85)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {loading && 'Loading editor…'}
            {!loading && activeTab === 'JS' && jsOutput}
            {!loading && activeTab === 'DTS' && dtsOutput}
            {!loading && activeTab === 'Errors' && (
              <div>
                {errors.length === 0 && 'No errors.'}
                {errors.map((e, i) => (
                  <div key={i} style={{ marginBottom: '0.5rem' }}>
                    {e.line != null && (
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Line {e.line}: </span>
                    )}
                    {e.code != null && (
                      <span style={{ color: BRAND_COLOR }}>TS{e.code} </span>
                    )}
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
