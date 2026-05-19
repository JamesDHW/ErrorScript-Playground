import * as ts from 'typescript'

declare global {
  interface Window {
    ts: typeof ts
    require: {
      config: (cfg: { paths: Record<string, string>; ignoreDuplicateModules?: string[] }) => void
      (deps: string[], cb: (...args: unknown[]) => void): void
    }
  }
}

export interface SandboxApi {
  getModel: () => { getValue: () => string }
  setText: (text: string) => void
  getEmitResult: (emitOnlyDts?: boolean, forceDtsEmit?: boolean) => Promise<{ outputFiles: Array<{ name: string; text: string }> }>
  getDTSForCode: () => Promise<string>
  createTSProgram: () => Promise<ts.Program>
  setCompilerSettings: (opts: Record<string, unknown>) => void
  updateCompilerSettings: (opts: Record<string, unknown>) => void
  getCompilerOptions: () => Record<string, unknown>
  ts: typeof ts
}

const ERRORSCRIPT_TYPESCRIPT_URL = '/cdn/errorscript/typescript.js'
const ERRORSCRIPT_TS_WORKER_PATH = '/cdn/errorscript/tsWorkerWrapper.js'
const PLAYGROUND_CDN_LIB_PREFIX = 'https://playgroundcdn.typescriptlang.org/cdn/'
const ERRORSCRIPT_LIB_PREFIX = '/cdn/errorscript/'

function errorScriptTsWorkerUrl(): string {
  return window.location.origin + ERRORSCRIPT_TS_WORKER_PATH
}

let fetchPatched = false

function patchFetchForErrorScriptLibs(): void {
  if (fetchPatched) return
  fetchPatched = true
  const origFetch = window.fetch
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString()
    if (url.startsWith(PLAYGROUND_CDN_LIB_PREFIX) && url.includes('/typescript/lib/')) {
      const libPath = url.slice(url.indexOf('/typescript/lib/') + '/typescript/lib/'.length)
      const localUrl = window.location.origin + ERRORSCRIPT_LIB_PREFIX + libPath
      return origFetch(localUrl, init)
    }
    return origFetch(input, init)
  }
}

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.head.appendChild(script)
  })
}

export type SandboxRuntime = {
  createTypeScriptSandbox: (config: unknown, monaco: unknown, tsc: typeof ts) => SandboxApi
  monacoMain: unknown
  tsForSandbox: typeof ts
}

let runtimePromise: Promise<SandboxRuntime> | null = null

export function ensureSandboxRuntime(): Promise<SandboxRuntime> {
  if (runtimePromise) return runtimePromise

  const w = window as Window & { ts?: typeof ts }
  const baseUrl = window.location.origin
  const errorscriptUrl = baseUrl + ERRORSCRIPT_TYPESCRIPT_URL

  patchFetchForErrorScriptLibs()

  runtimePromise = loadScript(errorscriptUrl).then((ok) => {
    if (!ok) throw new Error('Failed to load ErrorScript typescript.js')
    if (!w.ts) w.ts = ts
    const tsForSandbox = w.ts

    return new Promise<SandboxRuntime>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://www.typescriptlang.org/js/vs.loader.js'
      script.async = true
      script.onload = () => {
        try {
          w.require.config({
            paths: {
              vs: `${baseUrl}/cdn/monaco/min/vs`,
              sandbox: 'https://www.typescriptlang.org/js/sandbox',
            },
            ignoreDuplicateModules: [
              'vs/editor/editor.main',
              'vs/language/typescript/tsWorker',
              'vs/language/typescript/tsMode',
            ],
          })
          w.require(
            ['vs/editor/editor.main', 'vs/language/typescript/tsWorker', 'sandbox/index'],
            (main: unknown, _tsWorker: unknown, sandboxFactory: unknown) => {
              const createTypeScriptSandbox = (sandboxFactory as {
                createTypeScriptSandbox?: (config: unknown, monaco: unknown, tsc: typeof ts) => SandboxApi
              })?.createTypeScriptSandbox
              if (!main || !tsForSandbox || !createTypeScriptSandbox) {
                reject(new Error('Sandbox deps failed: main, window.ts, or createTypeScriptSandbox missing'))
                return
              }
              resolve({
                createTypeScriptSandbox,
                monacoMain: main,
                tsForSandbox: tsForSandbox as typeof ts,
              })
            },
          )
        } catch (e) {
          reject(e)
        }
      }
      script.onerror = () => reject(new Error('Failed to load vs.loader.js'))
      document.head.appendChild(script)
    })
  })

  runtimePromise.catch(() => {
    runtimePromise = null
  })

  return runtimePromise
}

export type SlideStaticMonacoModel = {
  uri: { toString: () => string }
}

export type SlideStaticMonacoEditor = {
  dispose: () => void
  layout: (dimension?: { width: number; height: number }) => void
  getModel?: () => SlideStaticMonacoModel | null
}

type SlidesMonacoTypeScriptDefaults = {
  setWorkerOptions?: (options: { customWorkerPath: string }) => void
  getDiagnosticsOptions?: () => Record<string, unknown>
  setDiagnosticsOptions?: (options: Record<string, unknown>) => void
}

/** Narrow view of `vs/editor/editor.main` for slide static editors + shared runtime. */
export type SlidesMonacoApi = {
  editor: {
    setTheme: (theme: string) => void
    create: (domElement: HTMLElement, options?: Record<string, unknown>) => SlideStaticMonacoEditor
    setModelMarkers?: (
      model: SlideStaticMonacoModel,
      owner: string,
      markers: Array<Record<string, unknown>>,
    ) => void
  }
  languages?: {
    typescript?: {
      typescriptDefaults?: SlidesMonacoTypeScriptDefaults
    }
  }
}

let slidesMonacoConfigured = false

function configureSlidesMonaco(monaco: SlidesMonacoApi): void {
  if (slidesMonacoConfigured) return
  slidesMonacoConfigured = true

  const defaults = monaco.languages?.typescript?.typescriptDefaults
  if (!defaults) return

  defaults.setWorkerOptions?.({
    customWorkerPath: errorScriptTsWorkerUrl(),
  })

  const prior = defaults.getDiagnosticsOptions?.() ?? {}
  defaults.setDiagnosticsOptions?.({
    ...prior,
    noSyntaxValidation: true,
    noSemanticValidation: true,
  })
}

export function getSlidesMonacoEditorApi(): Promise<SlidesMonacoApi> {
  return ensureSandboxRuntime().then(({ monacoMain }) => {
    const api = monacoMain as SlidesMonacoApi
    configureSlidesMonaco(api)
    api.editor.setTheme('vs-dark')
    return api
  })
}

export function getMonacoOverflowWidgetsDomNode(): HTMLElement | undefined {
  if (typeof document === 'undefined') return undefined
  return document.getElementById('app-monaco-overflow-widgets') ?? undefined
}

export type CreateSandboxEditorOptions = {
  domId: string
  initialCode: string
  compilerOptions: Record<string, unknown>
  monacoSettings?: Record<string, unknown>
}

export function createSandboxEditor(options: CreateSandboxEditorOptions): Promise<SandboxApi> {
  const baseUrl = window.location.origin
  const overflowHost = getMonacoOverflowWidgetsDomNode()
  const monacoSettings = {
    theme: 'vs-dark' as const,
    fixedOverflowWidgets: true,
    ...(overflowHost ? { overflowWidgetsDomNode: overflowHost } : {}),
    ...options.monacoSettings,
  }

  return ensureSandboxRuntime().then(({ createTypeScriptSandbox, monacoMain, tsForSandbox }) => {
    const sandbox = createTypeScriptSandbox(
      {
        text: options.initialCode,
        domID: options.domId,
        filetype: 'ts',
        compilerOptions: options.compilerOptions,
        acquireTypes: false,
        supportTwoslashCompilerOptions: false,
        suppressAutomaticallyGettingDefaultText: true,
        suppressAutomaticallyGettingCompilerFlags: true,
        logger: { log: () => {}, error: () => {}, groupCollapsed: () => {}, groupEnd: () => {} },
        monacoSettings,
        customTypeScriptWorkerPath: baseUrl + ERRORSCRIPT_TS_WORKER_PATH,
      },
      monacoMain,
      tsForSandbox,
    )
    const monaco = (sandbox as { monaco?: { editor?: { setTheme: (theme: string) => void } } }).monaco
    if (monaco?.editor?.setTheme) monaco.editor.setTheme('vs-dark')
    return sandbox as SandboxApi
  })
}

type MonacoEditorModel = {
  dispose: () => void
  isDisposed?: () => boolean
}

export function disposeSandboxApi(sandbox: SandboxApi): void {
  const ex = sandbox as {
    editor?: {
      getModel?: () => MonacoEditorModel | null
      setModel?: (model: MonacoEditorModel | null) => void
      dispose: () => void
    }
  }
  const { editor } = ex
  if (!editor) return

  const model = typeof editor.getModel === 'function' ? editor.getModel() : null

  if (typeof editor.setModel === 'function') {
    try {
      editor.setModel(null)
    } catch {
      /* detach before dispose */
    }
  }

  editor.dispose()

  if (!model) return
  if (typeof model.isDisposed === 'function' && model.isDisposed()) return

  try {
    model.dispose()
  } catch {
    /* already disposed with editor in some Monaco builds */
  }
}

/** @deprecated Use createSandboxEditor – kept for any external callers */
export function loadSandbox(options: CreateSandboxEditorOptions): Promise<SandboxApi> {
  return createSandboxEditor(options)
}
