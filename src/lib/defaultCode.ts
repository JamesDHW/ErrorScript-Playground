export const defaultCode = `/* =========================================================
   ErrorScript / checkedErrors Example Program
========================================================= */

declare function throwsError(): void throws Error;
throwsError(); // TS18063: Unhandled thrown type: Error.

declare function asyncThrows(): Promise<void> rejects Error;
asyncThrows(); // TS18064: Unhandled promise rejection type: Error.


function assertNever(x: never): never {
    throw new Error(\`Unreachable: \${ x }\`);
}

try {
    throwsError();
} catch (e) { 
    if (e instanceof Error) {
        /* e is correctly typed as Error! */
    } else {
        // Code never reaches here, so no error is thrown
        assertNever(e);
    }
}











/* =========================================================
   Conventions:
   - "EXPECT ERROR" means your checker should report an error.
   - "EXPECT OK" means no diagnostic.
   - "EXPECT e: ..." means hover/type of catch variable.

   This file tries to be "real-ish": domain errors, parsing, IO, async, and rethrow.
========================================================= */

/* =========================================================
   0) Domain error classes + helpers
========================================================= */

class NetworkError extends Error {
    readonly kind = "NetworkError";
    constructor(message: string, readonly status?: number) { super(message); }
}

class AuthError extends Error {
    readonly kind = "AuthError";
    constructor(message: string) { super(message); }
}

class ParseError extends Error {
    readonly kind = "ParseError";
    constructor(message: string) { super(message); }
}

class ValidationError extends Error {
    readonly kind = "ValidationError";
    constructor(message: string, readonly field?: string) { super(message); }
}

class StorageError extends Error {
    readonly kind = "StorageError";
    constructor(message: string) { super(message); }
}

/* =========================================================
   1) Synchronous inference from throw + propagation
========================================================= */

function parseIntStrict(s: string) {
    if (!/^-?\\d+$/.test(s)) throw new ParseError(\`Not an int: \${ s } \`);
    const n = Number(s);
    if (!Number.isSafeInteger(n)) throw new RangeError(\`Out of range: \${ s } \`);
    return n;
}

function computeUserId(raw: string): number throws ParseError | RangeError {
    return parseIntStrict(raw);
}

function computeShard(userIdRaw: string) {
    const id = computeUserId(userIdRaw);
    if (id < 0) throw new ValidationError("id must be positive", "userId");
    return id % 16;
}

/* =========================================================
   2) try/catch absorption + catch typing
========================================================= */

function demoTryCatchTyping(input: string) {
    try {
        const shard = computeShard(input);
        return shard;
    } catch (e) {
        // EXPECT e: ParseError | RangeError | ValidationError
        if (e instanceof ParseError) return 0;
        if (e instanceof RangeError) return 1;
        if (e instanceof ValidationError) return 2;
        assertNever(e);
    }
}

function demoTryCatchTyping2(input: string): number throws Error {
    try {
        const shard = computeShard(input);
        return shard;
    } catch (e) {
        return 0;
    }
}

demoTryCatchTyping("123");

/* =========================================================
   3) Unhandled throws at top-level
========================================================= */

function unhandledSyncTopLevel() {
    computeShard("not-a-number");
}

// EXPECT ERROR: Unhandled thrown type ParseError | RangeError | ValidationError
unhandledSyncTopLevel();

/* =========================================================
   4) Rethrow semantics
========================================================= */

function rethrowExample(input: string) {
    try {
        computeShard(input);
    } catch (e) {
        throw e;
    }
}

// EXPECT ERROR: Unhandled thrown type ParseError | RangeError | ValidationError
rethrowExample("wat");

/* =========================================================
   5) Declared throws/rejects in signatures
========================================================= */

declare function readFromDisk(path: string): string throws StorageError;

// EXPECT ERROR: Unhandled thrown type StorageError
readFromDisk("/tmp/x");

try {
    readFromDisk("/tmp/x");
} catch (e) {
    if (e instanceof StorageError) { }
}

function declaredTooNarrow(): void throws ValidationError {
    // EXPECT ERROR: inferred throws TypeError not assignable to declared ValidationError
    throw new TypeError("boom");
}

function declaredWideEnough(): void throws Error {
    if (Math.random() > 0.5) throw new TypeError("t");
    throw new ValidationError("v");
}

declare function fetchJson(url: string): Promise<string> rejects NetworkError;

// EXPECT ERROR: Unhandled promise rejection type NetworkError
fetchJson("https://x");

void fetchJson("https://x");
fetchJson("https://x").catch(() => { });

async function awaitWithoutHandling() {
    const s = await fetchJson("https://x");
    return s.length;
}
void awaitWithoutHandling();

/* =========================================================
   6) Async inference: throw inside async becomes reject type
========================================================= */

async function apiCall(kind: "ok" | "401" | "500") {
    if (kind === "401") throw new AuthError("not authorised");
    if (kind === "500") throw new NetworkError("server error", 500);
    return { ok: true as const };
}

async function demoAsyncHandled() {
    try {
        const r = await apiCall("500");
        return r.ok;
    } catch (e) {
        if (e instanceof AuthError) return false;
        if (e instanceof NetworkError) return false;
        assertNever(e);
    }
}

void demoAsyncHandled();

// EXPECT ERROR: dropped rejecting promise
apiCall("401");
void apiCall("401");

/* =========================================================
   7) Promise.all reject union
========================================================= */

async function pAll() {
    try {
        const [a, b] = await Promise.all([apiCall("401"), apiCall("500")]);
        return [a.ok, b.ok] as const;
    } catch (e) {
        if (e instanceof AuthError) return [false, false] as const;
        if (e instanceof NetworkError) return [false, false] as const;
        assertNever(e);
    }
}
void pAll();

/* =========================================================
   8) Errors in catch still count
========================================================= */

function catchThrowsStillCounts(input: string) {
    try {
        computeShard(input);
    } catch (e) {
        throw new Error("failed to handle");
    }
}

// EXPECT ERROR: Unhandled thrown type Error
catchThrowsStillCounts("nope");

/* =========================================================
   9) finally always contributes
========================================================= */

function finallyAlwaysThrows() {
    try {
        computeShard("1");
    } finally {
        throw new Error("finally wins");
    }
}

// EXPECT ERROR: Unhandled thrown type Error
finallyAlwaysThrows();

/* =========================================================
   10) Overloads with different throws
========================================================= */

declare function parseThing(x: "a"): number throws ParseError;
declare function parseThing(x: "b"): number throws ValidationError;
declare function parseThing(x: string): number;

// EXPECT ERROR: ParseError
parseThing("a");
// EXPECT ERROR: ValidationError
parseThing("b");

try {
    parseThing("a");
} catch (e) {
    if (e instanceof ParseError) { }
}

/* =========================================================
   11) Function types and interface methods
========================================================= */

type SyncFn = (x: string) => number throws ParseError;
declare const syncFn: SyncFn;

// EXPECT ERROR: ParseError
syncFn("x");

interface Store {
    get(key: string): string throws StorageError;
    set(key: string, value: string): void throws StorageError;
}
declare const store: Store;

// EXPECT ERROR: StorageError
store.get("k");

try {
    store.set("k", "v");
} catch (e) {
    if (e instanceof StorageError) { }
}

/* =========================================================
   12) Throwing non-Error values
========================================================= */

function throwString() {
    throw "oops";
}

// EXPECT ERROR: Unhandled thrown type string
throwString();

try {
    throwString();
} catch (e) {
    if (typeof e === "string") { }
}

/* =========================================================
   13) Recursion/cycle -> unknown
========================================================= */

function cycleA() { cycleB(); }
function cycleB() { cycleA(); }

function callCycle() {
    cycleA();
}
// EXPECT ERROR: Unhandled thrown type unknown
callCycle();

/* =========================================================
   14) Higher-order functions (known limitation)
========================================================= */

function runCallback(cb: () => void) {
    cb();
}

function callbackThrows() {
    throw new ValidationError("bad");
}

function demoHOF() {
    runCallback(callbackThrows);
}
demoHOF();

/* =========================================================
   15) Narrowing with discriminated error shapes
========================================================= */

type ApiErr =
    | { tag: "timeout"; ms: number }
    | { tag: "bad_request"; msg: string };

function throwApiErr(): void {
    if (Math.random() > 0.5) throw { tag: "timeout", ms: 5000 } satisfies ApiErr;
    throw { tag: "bad_request", msg: "nope" } satisfies ApiErr;
}

try {
    throwApiErr();
} catch (e) {
    if (typeof e === "object" && e && "tag" in e) {
        const tag = (e as ApiErr).tag;
        if (tag === "timeout") { }
        else if (tag === "bad_request") { }
    }
}

/* =========================================================
   16) Mixed sync+async boundary
========================================================= */

function readConfig(raw: string) {
    const obj = JSON.parse(raw);
    if (typeof obj !== "object" || obj === null) throw new ParseError("not an object");
    return obj as Record<string, unknown>;
}

async function loadConfig(remote: boolean) {
    if (remote) {
        const text = await fetchJson("https://cfg");
        return readConfig(text);
    }
    const local = readFromDisk("config.json");
    return readConfig(local);
}

async function demoLoadConfigHandled() {
    try {
        const c = await loadConfig(true);
        return c;
    } catch (e) {
        if (e instanceof NetworkError) return {};
        if (e instanceof StorageError) return {};
        if (e instanceof SyntaxError) return {};
        if (e instanceof ParseError) return {};
        assertNever(e);
    }
}
void demoLoadConfigHandled();

/* =========================================================
   17) @ts-expect-exception directive
   Suppresses only TS18063 (unhandled throw) and TS18064 (unhandled rejection).
   Type errors on the next line are still reported.
========================================================= */

function syncThrows() {
    throw new ParseError("sync");
}

// EXPECT OK: directive suppresses unhandled-throw diagnostic
// @ts-expect-exception
syncThrows();

async function asyncRejects(): Promise<void> rejects NetworkError {
    return Promise.reject(new NetworkError("async"));
}

async function expectExceptionSuppressesRejection() {
    // @ts-expect-exception
    await asyncRejects();
}
void expectExceptionSuppressesRejection();

async function expectExceptionDoesNotSuppressTypeError() {
    // @ts-expect-exception suppresses only throw/rejection; type errors on this line still report
    const x: number = await asyncRejects();
}

/* =========================================================
   18) Quick fixes and refactors – demo targets
   Put cursor on the marked line and try the suggested fix/refactor.
========================================================= */

// --- Quick fix: "Wrap in try/catch" ---
// Cursor on next line; quick fix on TS18063.
// EXPECT ERROR: Unhandled thrown type StorageError
readFromDisk("/tmp/demo");

// --- Quick fix: "Wrap in try/catch with type narrowing" ---
// Same as above but choose "Wrap in try/catch with type narrowing" to get
// catch (e) { if (e instanceof StorageError) { } ... throw e; }

// --- Quick fix: "Add void to unhandled promise" ---
// Cursor on next line; quick fix on TS18064. Adds void prefix.
// EXPECT ERROR: Unhandled promise rejection type NetworkError
fetchJson("https://example.com");

// --- Refactor: "Infer function throws type" → "Add throws clause to function" ---
// Cursor on JSON.parse (or the call); refactor → Add throws clause to function.
// Adds ": any throws SyntaxError" (or inferred type) to parseStrict.
function parseStrict(s: string) {
    return JSON.parse(s);
}

// --- Refactor: "Infer function throws type" → "Add rejects clause to function" ---
// Cursor on the bare "await fetchJson(...)" call; refactor → Add rejects clause to loadUrlBare.
async function loadUrlBare() {
    await fetchJson("https://example.com");
}

// --- Refactor: "Add instanceof narrowing to catch block" ---
// Cursor inside the catch block (or on e); refactor adds if (e instanceof X) branches + throw e.
function demoInstanceofRefactor(input: string) {
    try {
        const n = computeUserId(input);
        return n;
    } catch (e) {
        // e: ParseError | RangeError — refactor adds instanceof branches
        return -1;
    }
}

// --- Combined: unhandled call then wrap with narrowing ---
// EXPECT ERROR on next line; apply "Wrap in try/catch with type narrowing".
readFromDisk("config.json");
`
