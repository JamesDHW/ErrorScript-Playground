export const defaultCode = `// @checkedThrows: true
//
// Exhaustive demonstration of checked errors per BRIEF.md:
// - Thrown type inference (throw expr, rethrow)
// - Call-site enforcement (try/catch, propagation, unhandled → error)
// - try/catch absorption and catch variable typing
// - Declaration-site throws/rejects
// - Async: await enforcement, fire-and-forget (void / .catch), Promise.all
// - Recursion → unknown
// Lines with @ts-expect-error document the diagnostic that would be reported.

// ========== 3.1 Thrown type inference (throw expr) ==========

function throwsError(): number {
    throw new Error("e");
}
function throwsString(): number {
    throw "oops";
}
function throwsNumber(): number {
    throw 42;
}
class CustomError extends Error { }
function throwsCustom(): number {
    throw new CustomError();
}

// ========== 3.3 Call-site enforcement: unhandled sync throw → error ==========

// @ts-expect-error TS18063: Unhandled thrown type: Error.
throwsError();

// Handled by try/catch (absorption)
try {
    throwsError();
    throwsCustom();
} catch (e) {
    e.message;
}

// ========== Propagation: call inside a function that propagates ==========

function propagatesSync(): number {
    throwsError();
    return 0;
}

// @ts-expect-error TS18063: Unhandled thrown type: Error.
propagatesSync();

try {
    propagatesSync();
} catch (e) {
    e;
}

// ========== 4.1 Absorption: try/catch absorbs T_try; only T_catch | T_finally escape ==========

function throwsInCatch(): void {
    try {
        throwsError();
    } catch (e) {
        throw e;
    }
}

function throwsInFinally(): void {
    try {
        return;
    } finally {
        throw new Error("finally");
    }
}

// @ts-expect-error TS18063: Unhandled thrown type: Error.
throwsInCatch();

// @ts-expect-error TS18063: Unhandled thrown type: Error.
throwsInFinally();

// ========== 4.2 Catch variable typing: e is union of types thrown from TRY ==========

try {
    if (Math.random() > 0.5) throw new Error("a");
    throw new RangeError("b");
} catch (e) {
    if (e instanceof Error) e.message;
    if (e instanceof RangeError) e.message;
}

// ========== 3.1 Rule 2: rethrow (throw;) contributes TypeOf(e) ==========

function rethrows(): number {
    try {
        throwsError();
    } catch (e) {
        throw e;
    }
    return 0;
}

// @ts-expect-error TS18063: Unhandled thrown type: Error.
rethrows();

// ========== 3.4 Declaration-site effects (throws / rejects) ==========

function declaredThrows(): number throws Error {
    return 1;
}
declare function fromDts(): number throws RangeError;

// @ts-expect-error TS18063: Unhandled thrown type: Error.
declaredThrows();

try {
    fromDts();
} catch (e) {
    e;
}

// ========== 5. Async: rejection effect, await enforcement ==========

async function asyncThrows(): Promise<number> {
    throw new Error("async");
}
async function asyncRejectsWithString(): Promise<number> {
    throw "rejected";
}

async function unhandledAwait() {
    // @ts-expect-error TS18064: Unhandled promise rejection type: Error.
    await asyncThrows();
}

async function handledAwait() {
    try {
        await asyncThrows();
    } catch (e) {
        e;
    }
}

// ========== 5.3 Fire-and-forget: void and .catch() allowed; bare call errors ==========

async function bareFireAndForget() {
    // @ts-expect-error TS18064: Unhandled promise rejection type: Error.
    asyncThrows();
}

async function explicitIgnore() {
    void asyncThrows();
}
async function explicitCatch() {
    asyncThrows().catch(() => { });
}

// ========== 5.4 Promise.all: union of reject types ==========

async function a(): Promise<number> {
    throw "a";
}
async function b(): Promise<number> {
    throw 123;
}

async function unhandledPromiseAll() {
    // @ts-expect-error TS18064: Unhandled promise rejection type: "a" | 123.
    await Promise.all([a(), b()]);
}

async function handledPromiseAll() {
    try {
        await Promise.all([a(), b()]);
    } catch (e) {
        e;
    }
}

// ========== 7. Recursion (BRIEF §7) ==========
// Call-graph cycles degrade to ThrownType = unknown. Not demonstrated here
// to avoid implementation-specific behavior.

// ========== Mixed: declared rejects, compatibility ==========

declare function returnsPromiseRejects(): Promise<number> rejects TypeError;

async function unhandledDeclaredReject() {
    // @ts-expect-error TS18064: Unhandled promise rejection type: TypeError.
    await returnsPromiseRejects();
}

async function handledDeclaredReject() {
    try {
        await returnsPromiseRejects();
    } catch (e) {
        e;
    }
}
`
