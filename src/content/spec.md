# ErrorScript checkedErrors Spec

## 1. Overview

checkedErrors introduces checked error semantics to TypeScript by tracking effects:

- Thrown effects for synchronous code (throws)
- Rejected effects for Promise-like/async code (rejects)

The compiler enforces that any potentially thrown/rejected effect at a call site is either:

- Handled locally (e.g. try/catch, .catch(...), void), or
- Propagated outward to an enclosing function's effect (implicitly, via inference), or
- Suppressed by a directive that targets only checkedErrors diagnostics (// @ts-expect-exception)

Two new diagnostics are introduced:

- **TS18063:** Unhandled thrown type: \<E\>.
- **TS18064:** Unhandled promise rejection type: \<E\>.

## 2. Enabling

### 2.1 Compiler option

A compiler option named checkedErrors exists (boolean).

When enabled, the checker emits TS18063/TS18064.

(Your IDE/playground plumbing decides whether it's "on by default" for demo projects; the type system behaviour is as below when enabled.)

## 3. Core Semantics

### 3.1 Throw inference (sync)

#### 3.1.1 throw expr

A throw expr contributes the type of expr to the enclosing function's inferred thrown type.

Example:

```typescript
function boom() {
  throw new Error("x"); // contributes Error
}
```

#### 3.1.2 Non-Error throws are allowed

Throwing primitives is supported and tracked precisely.

Example:

```typescript
async function a() { throw "a"; }  // rejects "a"
function b() { throw 123; }        // throws 123
```

#### 3.1.3 Propagation through calls

If a function body calls another function that can throw, the caller is inferred to throw the callee's thrown type.

Baseline: checkedErrorsPropagation

```typescript
function inner() { throw 123; }
function outer() { inner(); } // outer throws 123 (inferred)
outer(); // TS18063 Unhandled thrown type: 123
```

### 3.2 Rejection inference (async)

#### 3.2.1 async function converts throw → reject

Any throw inside an async function contributes to that function's rejection type.

Baseline: checkedErrorsAsync

```typescript
async function boom() { throw new Error("x"); } // rejects Error
```

#### 3.2.2 Awaited rejection must be handled/propagated

When awaiting an expression P, enforcement applies to **Throws(P)** (at evaluation/call time) and **Rejects(P)** (at await time). Both must be handled or propagated. In an async function, both ultimately contribute to the enclosing function's rejection effect when propagated.

So: if await expr awaits a Promise-like with rejection type E, or if expr can throw at call time, the await site must handle or propagate those effects.

Baseline: checkedErrorsAsync

```typescript
async function awaitRequiresHandling() {
  await boom(); // TS18064: Unhandled promise rejection type: Error
}
```

#### 3.2.3 Fire-and-forget Promise values are disallowed unless explicit

Calling a Promise-returning/rejecting function without awaiting/handling is an error (stance 2).

Baseline: checkedErrorsAsync

```typescript
function fireAndForget() {
  boom(); // TS18064: Unhandled promise rejection type: Error
  void boom();            // ok
  boom().catch(() => {}); // ok
}
```

#### 3.2.4 Propagation across non-async wrapper functions

Returning a Promise from a non-async function propagates the rejection effect to callers who await it.

Baseline: checkedErrorsAsync

```typescript
function wrap() { return boom(); } // wrap returns Promise that rejects Error
async function wrapperPropagation() {
  await wrap(); // TS18064
}
```

### 3.3 try/catch/finally effect semantics

#### 3.3.1 try/catch absorbs throws from try block

- **catch** absorbs **throws** from the try block: thrown effects from the try block do not escape the try statement when a catch clause is present.
- **catch does not absorb rejects** from non-awaited promises created in the try block; those rejections are unaffected by try/catch.
- **.catch(...)** on a promise value absorbs rejects on that specific promise.
- Effects thrown from the catch block do escape normally.
- **finally** always contributes to escaping effects.

Baseline: checkedErrorsFinally

```typescript
function withFinally() {
  try { boom(); } catch (e) { } finally { throw "finally"; }
}
withFinally(); // TS18063 Unhandled thrown type: "finally"
```

#### 3.3.2 Catch variable typing (sync+async)

**TypeOf(e) = Throws(tryBlock)**

The catch variable (e.g. catch (e)) is typed from **throws only** in the try block. Rejections appear in the catch variable **only when they become throws via await** in the try block: at an await site, a rejection manifests as a throw, so it is part of Throws(tryBlock).

Additionally, **await expr** contributes **Throws(expr) ∪ Rejects(expr)** to Throws(tryBlock) (because await-time rejection manifests as a throw at the await point). So the catch variable is the union of all synchronous throws in the try block plus, for each await expr, Throws(expr) and Rejects(expr).

Baseline: checkedErrorsAsyncCatchVariable

```typescript
async function loadConfig(remote: boolean) {
  if (remote) {
    const text = await fetchJson("https://cfg");
    // TS18064 at await site (unhandled NetworkError)
    return readConfig(text);
  }
}
```

In a handler:

```typescript
try {
  const c = await loadConfig(true);
} catch (e) {
  // e is Throws(tryBlock): sync throws + (for each await in try) Throws(expr) ∪ Rejects(expr)
}
```

#### 3.3.3 Rethrow

throw e inside catch contributes the type of e to the enclosing function's effect (throw/reject depending on sync/async context).

Baseline: checkedErrorsRethrow

```typescript
function c() {
  try { boom3(); } catch (e) { throw e; }
}
c(); // TS18063 Unhandled thrown type: Error
```

### 3.4 Recursion / cyclic call graphs

If a function is part of a cycle (direct or indirect recursion), its inferred thrown/rejected type becomes unknown.

Baseline: checkedErrorsRecursion

```typescript
function r1() { r2(); }
function r2() { r1(); throw new Error("x"); }
r1(); // TS18063 Unhandled thrown type: unknown
```

## 4. Explicit Contracts: throws and rejects

ErrorScript supports explicit effect clauses on signatures.

### 4.1 Syntax

#### 4.1.1 throws on non-Promise returns

```typescript
function f(): number throws Error { ... }
declare function g(): number throws RangeError;
type Fn = (x: string) => number throws Error;
interface X { m(): number throws Error; }
```

#### 4.1.2 rejects requires Promise-like return type

```typescript
declare function g(): Promise<number> rejects TypeError;
async function h(): Promise<void> rejects NetworkError { ... }
```

### 4.2 Constraints & diagnostics

#### 4.2.1 rejects clause requires Promise-like return type

Baseline: checkedErrorsDeclared

```typescript
declare function badRejects(): number rejects Error;
// TS18066: rejects clause requires a Promise-like return type.
```

#### 4.2.2 throws clause is not allowed on async functions

**throws** is forbidden only on **async** functions. **throws** is allowed on non-async Promise-returning functions and may co-exist with **rejects** (e.g. a non-async function that returns Promise\<T\> may declare both throws E1 and rejects E2).

Baseline: checkedErrorsDeclared

```typescript
async function illegalAsyncThrows(): Promise<void> throws Error { ... }
// TS18067: throws clause is not allowed on async functions.
```

### 4.3 Declaration-site effects are authoritative at call sites

A .d.ts declaration with throws/rejects affects call-site enforcement exactly like an inferred effect.

Baseline: checkedErrorsDeclared

```typescript
declare function f(): number throws RangeError;
f(); // TS18063 Unhandled thrown type: RangeError
```

### 4.4 Implementation validation: inferred effect must be assignable to declared effect

If a function body throws a type not assignable to the declared clause, it is an error.

Baseline: checkedErrorsDeclared (two cases implied by your example + baseline intent)

```typescript
function implThrowsStricter(): number throws Error {
  throw new TypeError("x"); // ok: TypeError ⊆ Error
}

function implThrowsNarrower(): number throws RangeError {
  throw new TypeError("x"); // error: TypeError not assignable to RangeError
}
```

### 4.5 Overloads

Overload signatures may declare different effects (including mixing throws and rejects across overloads), and call sites use the selected overload's effect.

Baseline: checkedErrorsDeclared

```typescript
declare function overload(x: string): number throws Error;
declare function overload(x: number): Promise<number> rejects TypeError;

async function unhandledOverload() {
  await overload(1); // TS18064 Unhandled promise rejection type: TypeError
}
```

## 5. Standard library modelling (observed)

Stdlib throw/reject annotations are provided via a **curated compiler-internal mapping**, since .d.ts declarations have no bodies and cannot infer effects.

### 5.1 JSON.parse is modelled as throwing SyntaxError

Baseline: checkedErrorsAsync

```typescript
JSON.parse("{"); // TS18063 Unhandled thrown type: SyntaxError
```

(Other stdlib mappings may exist, but only JSON.parse is asserted by the provided baselines.)

## 6. Call-site Enforcement Rules

Propagation is valid when the callee effect is assignable to the enclosing function’s effect on the corresponding channel (reject/throw).

### 6.1 Synchronous: TS18063

A sync throw is **handled** if the call/expression node is syntactically contained within the tryBlock of a try statement that has a catchClause. 

Inside a function body, a potentially-throwing expression may appear outside a handler provided its thrown effect is included in the enclosing function’s declared or inferred throws effect (i.e. it is propagated).

A call/expression that may throw type E triggers TS18063 unless it is:

- inside a try with a catch (i.e. handled as above), or
- within a function where the effect is allowed to propagate (via inference or explicit throws), or
- suppressed by // @ts-expect-exception, or
- otherwise handled (implementation-defined beyond try/catch; e.g. no other sync handlers are asserted)

Example:

```typescript
function boom2() { throw new Error("x"); }
boom2(); // TS18063
```

### 6.2 Async: TS18064

When awaiting an expression P, both Throws(P) (call-time) and Rejects(P) (await-time) are subject to enforcement; unhandled call-time throws can trigger TS18063 and unhandled await-time rejects trigger TS18064.

Inside a function body, a promise rejection may be left unhandled at that site provided its rejection effect is included in the enclosing function’s declared or inferred rejects effect (i.e. it is propagated).

A Promise-like expression with reject type E triggers TS18064 if:

- it is awaited without handling, or
- it is ignored (fire-and-forget), unless explicitly handled by .catch or suppressed by void.

Example:

```typescript
boom(); // TS18064
void boom(); // ok
boom().catch(() => {}); // ok
```

### 6.3 Promise combinators (current coverage)

Baseline: checkedErrorsCombinators

- Promise.race([p1, p2]) rejects with E1 | E2
- Promise.any([p1, p2]) rejects with E1 | E2
- Promise.allSettled([...]) requires no handling (no diagnostic emitted)
- Promise.reject(x) produces a Promise that rejects with type of x and requires handling when awaited/dropped

Examples:

```typescript
await Promise.race([a(), b()]); // TS18064: "a" | 123
await Promise.any([a(), b()]);  // TS18064: "a" | 123
await Promise.allSettled([a(), b()]); // OK
await Promise.reject(new Error("reject")); // TS18064: Error
```

## 7. Suppression Directive: // @ts-expect-exception

### 7.1 Scope

A comment directive // @ts-expect-exception suppresses only:

- TS18063 (unhandled throw)
- TS18064 (unhandled rejection)

It does not suppress unrelated type errors.

Baseline: checkedErrorsIgnoreDirective

```typescript
async function fail() { throw new Error("x"); }

async function ignoreThrowsSuppressesRejection() {
  // @ts-expect-exception
  await fail(); // no TS18064
}

async function ignoreThrowsDoesNotSuppressTypeError() {
  // @ts-expect-exception
  const x: number = await fail(); // TS2322 still reported
}
```

### 7.2 Contrast with // @ts-ignore

// @ts-ignore suppresses all errors on the next line (standard TS behaviour), including checkedErrors diagnostics.

## 8. Quick Fixes and Code Actions (non-normative tooling)

*This section describes editor/tooling behaviour; it is non-normative and cannot be used to argue type-system or enforcement semantics.*

The following quick fixes are evidenced directly in baselines as suggested fix lines printed beneath diagnostics.

### 8.1 Quick fix: "Add void" for unhandled promise rejection (fire-and-forget)

When TS18064 occurs on a dropped Promise call:

Suggested fix:

```typescript
void g();
```

Baseline: checkedErrorsDeclared

```typescript
function fireAndForgetDeclared() {
  g();
  // suggested:
  void g();
}
```

### 8.2 Quick fix: "Add .catch(() => {})" for unhandled promise rejection

Suggested fix:

```typescript
g().catch(() => {});
```

Baseline: checkedErrorsDeclared, checkedErrorsAsync

```typescript
boom().catch(() => {});
```

### 8.3 Quick fix: "Wrap in try/catch"

You stated you've added this; it isn't printed in the baselines above, but it's part of your current feature set.

Expected behaviour (consistent with the rest of the system):

For TS18063 at a synchronous expression statement expr;, wrap the smallest statement region:

```typescript
try {
  expr;
} catch (e) {
}
```

For TS18064 on await expr, wrap the containing statement:

```typescript
try {
  await expr;
} catch (e) {
}
```

### 8.4 Refactors (code actions)

Your example lists several refactors as targets. These are not evidenced in the baselines, so treat as "implemented if present" rather than normative; if they exist, they should align with current semantics:

- "Add throws clause to function" (from inferred thrown type)
- "Add rejects clause to function" (from inferred rejection type)
- "Add instanceof narrowing scaffold in catch block"

(If you want the spec to be strictly "what's proven by tests", you should add baseline tests for these code actions; otherwise keep them under "experimental editor actions".)

## 9. Examples (compact)

### 9.1 Basic unhandled throw

```typescript
function boom() { throw new Error("x"); }
boom(); // TS18063 Unhandled thrown type: Error.
```

### 9.2 Handling with try/catch

```typescript
try { boom(); } catch (e) { e; } // OK
```

### 9.3 Unhandled await

```typescript
async function f() { await g(); } // TS18064 if g rejects
```

### 9.4 Fire-and-forget must be explicit

```typescript
g();                 // TS18064
void g();            // OK
g().catch(() => {}); // OK
```

### 9.5 Declared throws validation

```typescript
function bad(): void throws RangeError {
  throw new TypeError("x"); // error: TypeError not assignable to RangeError
}
```

### 9.6 Recursion yields unknown

```typescript
function a(){ b(); }
function b(){ a(); throw new Error("x"); }
a(); // TS18063 Unhandled thrown type: unknown.
```

## 10. Known limitations (current)

These are either explicit in your example or implied by test coverage:

- Recursive/cyclic call graphs degrade inferred effect to unknown.
- Higher-order function effect inference (propagating throws from function arguments) is not specified/guaranteed by current tests.
- Stdlib throw mappings are limited (JSON.parse is mapped; others unspecified here).
