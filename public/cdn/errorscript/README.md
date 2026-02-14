# ErrorScript CDN

This folder is served at `/cdn/errorscript/` and provides Monaco Editor and the TypeScript runtime used by the Playground.

## Contents

- **monaco/min/vs/** — Monaco Editor (copied from `node_modules/monaco-editor/min/vs`). Do not remove.
- **typescript.js** — Your ErrorScript build. Copy from your fork’s build output (e.g. `built/local/typescript.js`).
- **tsserverlibrary.js** — Same build. Copy from `built/local/tsserverlibrary.js` if present.
- **lib.*.d.ts** — Lib files from the same build so the in-browser compiler can resolve standard types.

## Setup

1. Build your ErrorScript fork (the one with checked errors).
2. Copy into this directory:
   - `typescript.js`
   - `tsserverlibrary.js` (if your worker or tooling needs it)
   - All `lib.*.d.ts` files from the build’s `lib` folder.
3. Ensure the script that loads `typescript.js` in the browser can use it as the TypeScript runtime. The Playground expects `window.ts` to be set to that runtime (e.g. a UMD bundle that assigns to `window.ts`, or a small loader that does so after loading the file).

Once these files are in place, the Playground will use your ErrorScript build for emit, DTS, and the Errors tab (via the sandbox’s in-main-thread language service). Editor squiggles use Monaco’s built-in TypeScript worker; for full checked-error squiggles in the editor you would need a custom worker build (see plan.md Approach B).
