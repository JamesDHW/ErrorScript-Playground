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
const PLAYGROUND_CDN_LIB_PREFIX = 'https://playgroundcdn.typescriptlang.org/cdn/'
const ERRORSCRIPT_LIB_PREFIX = '/cdn/errorscript/'

function patchFetchForErrorScriptLibs(): void {
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

let sandboxPromise: Promise<SandboxApi> | null = null

export function loadSandbox(options: {
  domId: string
  initialCode: string
  compilerOptions: Record<string, unknown>
}): Promise<SandboxApi> {
  if (sandboxPromise) return sandboxPromise

  const w = window as Window & { ts?: typeof ts }
  const baseUrl = window.location.origin
  const errorscriptUrl = baseUrl + ERRORSCRIPT_TYPESCRIPT_URL

  patchFetchForErrorScriptLibs()

  sandboxPromise = loadScript(errorscriptUrl).then(() => {
    if (!w.ts) w.ts = ts
    const tsForSandbox = w.ts

    return new Promise<SandboxApi>((resolve, reject) => {
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
            [
              'vs/editor/editor.main',
              'vs/language/typescript/tsWorker',
              'sandbox/index',
            ],
            (main: unknown, _tsWorker: unknown, sandboxFactory: unknown) => {
              const create = (sandboxFactory as { createTypeScriptSandbox?: (config: unknown, monaco: unknown, tsc: typeof ts) => SandboxApi })?.createTypeScriptSandbox
              if (!main || !tsForSandbox || !create) {
                reject(new Error('Sandbox deps failed: main, window.ts, or sandboxFactory missing'))
                return
              }
              const sandbox = create(
                {
                  text: options.initialCode,
                  domID: options.domId,
                  filetype: 'ts',
                  compilerOptions: options.compilerOptions,
                  acquireTypes: false,
                  supportTwoslashCompilerOptions: false,
                  suppressAutomaticallyGettingDefaultText: true,
                  suppressAutomaticallyGettingCompilerFlags: true,
                  logger: { log: () => { }, error: () => { }, groupCollapsed: () => { }, groupEnd: () => { } },
                  monacoSettings: { theme: 'vs-dark' },
                  customTypeScriptWorkerPath: `${baseUrl}/cdn/errorscript/tsWorkerWrapper.js`,
                },
                main,
                tsForSandbox as typeof ts,
              )
              const monaco = (sandbox as { monaco?: { editor?: { setTheme: (theme: string) => void } } }).monaco
              if (monaco?.editor?.setTheme) monaco.editor.setTheme('vs-dark')
              resolve(sandbox as SandboxApi)
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

  sandboxPromise.catch(() => {
    sandboxPromise = null
  })

  return sandboxPromise
}
