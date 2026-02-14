<img src="public/favicon.ico" width="100" alt="ErrorScript Playground logo" />

# ErrorScript Playground

A browser playground that runs your [ErrorScript](https://github.com/your-org/ErrorScript) TypeScript fork instead of the default compiler. Use it to try checked throws, inferred checked errors, and other fork features with instant emit, DTS, and editor diagnostics.

## Stack

- **React 19** + **Vite 7** for the app
- **Monaco Editor** + **@typescript/sandbox** for the code editor and TypeScript integration
- **ErrorScript** (your fork) for both the main-thread compiler and the editor’s TypeScript worker

## Quick start

1. **Install and run**

   ```bash
   pnpm install
   pnpm dev
   ```

2. **Ensure the CDN assets are present**

   - **`public/cdn/errorscript/`** — Your fork’s build: `typescript.js`, `lib.*.d.ts`, and `tsWorkerWrapper.js` (see [CDN setup](#cdn-setup)).
   - **`public/cdn/monaco/`** — Monaco editor assets (`min/vs/...`). If missing, copy from `node_modules/monaco-editor/min` into `public/cdn/monaco/`.

3. Open the app, go to **Play**, and start typing. The header shows the active TS version (e.g. `TS: 6.0.0-errorscript`).

## CDN setup

The app loads TypeScript from your own paths so it never uses the npm `typescript` or the official CDN for the compiler.

### ErrorScript (`public/cdn/errorscript/`)

- **`typescript.js`** — Your ErrorScript build (e.g. from your fork’s `built/local/typescript.js`). Must assign to `window.ts` when loaded (UMD or equivalent).
- **`tsWorkerWrapper.js`** — Custom Monaco worker hook that loads `typescript.js` in the editor worker and uses it for diagnostics (included in this repo).
- **`lib.*.d.ts`** — Lib files from the same build so the in-browser compiler can resolve standard types.

You can replace the contents of this folder with a copy of your fork’s `built/local` (plus the wrapper). The app patches `fetch` so lib requests to the official playground CDN are served from `/cdn/errorscript/` instead, avoiding 404s for custom versions.

### Monaco (`public/cdn/monaco/`)

- **`min/vs/...`** — Monaco editor runtime (editor UI, language workers). Separate from ErrorScript so updating your fork doesn’t overwrite editor assets. If this tree is missing, copy it from `node_modules/monaco-editor/min` into `public/cdn/monaco/`.

## Scripts

| Command      | Description                |
| ------------ | -------------------------- |
| `pnpm dev`   | Start dev server           |
| `pnpm build` | TypeScript + Vite build; verifies `dist/cdn/monaco/` has the TS worker |
| `pnpm preview` | Serve `dist` locally    |
| `pnpm lint`  | Run ESLint                 |

## Compiler options

The playground sets **`checkedThrows: true`** by default so ErrorScript’s checked-throws behavior is enabled. Other options (target, module, strict, jsx) are configurable in the Playground UI.

## How it works

- **Main thread** — The app loads `/cdn/errorscript/typescript.js` first, then passes `window.ts` into `createTypeScriptSandbox(..., ts)`. Emit, DTS, and the Errors tab use that instance.
- **Editor worker** — Monaco’s TypeScript worker is created with `customTypeScriptWorkerPath` pointing at `/cdn/errorscript/tsWorkerWrapper.js`. The wrapper loads your `typescript.js` in the worker and builds a language service from it so editor squiggles use ErrorScript too.
- **Lib files** — The sandbox would request libs from `playgroundcdn.typescriptlang.org/cdn/${ts.version}/typescript/lib/...`. Those requests are intercepted and served from `/cdn/errorscript/` so your version (e.g. 6.0.0-errorscript) doesn’t 404.

See `public/cdn/errorscript/README.md` for more detail on the ErrorScript CDN folder.
