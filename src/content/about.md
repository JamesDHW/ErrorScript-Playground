# ErrorScript

TypeScript helps us catch entire classes of bugs before our code ever runs.  
But there’s one major category of runtime failure that remains mostly unchecked:

**exceptions and promise rejections.**

ErrorScript is an experiment exploring what it would look like if TypeScript treated thrown and rejected errors as first-class, statically checked effects.

---

## The Problem in One Example

```ts
function parseIntStrict(s: string) {
  if (!/^-?\d+$/.test(s)) throw new Error("Not an int");
  return Number(s);
}

function demo() {
  const n = parseIntStrict("x"); // might throw
  return n;
}
```

In TypeScript today:

- `parseIntStrict` may throw
- `demo` silently propagates that possibility
- There is no compiler signal that an exception was never handled

Even inside a `catch` block:

```ts
try {
  parseIntStrict("x");
} catch (e) {
  // e: unknown
}
```

The type of `e` is `unknown`.  
There’s no built-in way to know what might have been thrown.

---

## What Is an Exception?

An **error** is a failure condition.

An **exception** is a control-flow mechanism: `throw` transfers execution non-locally until it reaches a `catch` (or crashes the program).

In JavaScript:

- Anything can be thrown
- Exceptions can cross function and module boundaries
- Async failures surface as Promise rejections

Exceptions are powerful — but invisible to the type system.

---

## What TypeScript Did for JavaScript

TypeScript added static type checking as a build-time safety net.

It can tell you:

- If you forgot to handle a union case
- If you called a function incorrectly
- If a value might be `undefined`

But it does not check:

- Whether a function might throw
- Whether a rejection was handled
- Whether your error handling is exhaustive

There’s no equivalent of “strictNullChecks” for exceptions.

---

## How Errors Are Handled in TypeScript Today

### 1. Exceptions (Status Quo)

Pros:
- Clean happy path
- Idiomatic JavaScript
- Minimal ceremony

Cons:
- Failure is invisible in the type system
- Call sites must rely on documentation
- `catch (e)` gives little type information

In general, `throw` in your code is not safe, as it is easy to unintentionally forget to catch the resulting exception.

---

### 2. Errors as Values

As TypeScript offers type checking, a common alternative is returning a `Result`-style type instead of throwing:

```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseIntStrict(s: string): Result<number, string> {
  if (!/^-?\d+$/.test(s)) return { ok: false, error: "Not an int" };
  return { ok: true, value: Number(s) };
}

const result = parseIntStrict("x");

if (!result.ok) {
  console.error(result.error);
}
```

This pattern is a natural consequence of `throw` being unsafe (❌) and type checking introducing type-safety (✅).

Libraries like [ErrorE](https://errore.org/) explore this approach further and provide ergonomic helpers.

This strategy is explicit and safe — but it pushes error handling directly into the happy path:

- Every call site must check for errors and early return (or unwrap)
- Failure plumbing spreads across the codebase
- You often end up wrapping or transforming errors at each level

It works well for domain logic, but it changes how you structure every function.

---

## Introducing Checked Exceptions

Some languages (Java, Swift, Kotlin in limited form) allow functions to declare that they may throw certain error types.

The compiler then enforces that:

- Callers handle those errors, or
- Propagate them explicitly

The idea is simple:

> Treat “may throw X” like a type-level effect that must be accounted for.

---

## What Is ErrorScript?

ErrorScript is a TypeScript fork that experiments with this idea — while trying to feel as *TypeScript-native* as possible.

It introduces:

- Inferred thrown types
- Inferred rejected types for async functions
- Typed `catch (e)` variables
- Compile-time errors for unhandled throws or rejections

Example:

```ts
function parseIntStrict(s: string) {
  if (!/^-?\d+$/.test(s)) throw new ParseError("Not an int");
  return Number(s);
}

function computeUserId(raw: string): number throws ParseError {
  return parseIntStrict(raw);
}
```

At a call site:

```ts
// ❌ Unhandled thrown type: ParseError
computeUserId("x"); 
```

You must either:

```ts
try {
  computeUserId("x");
} catch (e) {
  if (e instanceof ParseError) {
    // handle
  }
}
```

or propagate.

---

## Decoupling Error Handling from the Happy Path

Unlike “errors as values”, ErrorScript does **not** require you to manually thread error checks through every function.

Instead:

- Functions can propagate errors naturally
- Callers decide where handling boundaries live
- The compiler ensures nothing is silently dropped

This allows you to:

- Keep happy-path logic clean
- Define explicit error-handling boundaries
- Avoid coupling domain logic to plumbing

In other words:

> Exceptions stay ergonomic, but become visible and enforced.

---

## Async Matters Too

JavaScript failures are often asynchronous.

ErrorScript treats promise rejections as typed effects:

```ts
async function fetchJson(): Promise<string> rejects NetworkError;

// ❌ Unhandled promise rejection type: NetworkError
await fetchJson(); 
```

You must:

- `try/catch` the `await`, or
- explicitly ignore with `void`, or
- handle via `.catch(...)`

---

## Tradeoffs & Risks

Typed exception systems have real costs:

- Effect contracts can require maintenance
- Ecosystem adoption is non-trivial
- Library boundaries must declare thrown/rejected types
- Migration strategy matters
- This must be coordinated on the TypeScript roadmap
- Some advocate against this type of separation of error-handling from the happy path

Typed exceptions have been discussed in TypeScript before and marked as not planned due to adoption concerns:
https://github.com/microsoft/TypeScript/issues/13219

Introducing a new language feature in a mature ecosystem is significant.  
Once widely adopted, it is difficult to reverse ⚠️

ErrorScript exists as an experiment — not a mandate.

---

## Try It

The goal is to explore:

- Is this ergonomic in real code?
- Does it reduce bugs?
- Does it feel like TypeScript?
- Where does it break down?

You can:

- Try the playground
- Read the specification
- Contribute to the RFC discussion  
  https://github.com/JamesDHW/ErrorScript/issues/2

Feedback, edge cases, and counterexamples are especially welcome – this project is here to spark discussion.

---

*ErrorScript is a research prototype exploring what first-class, statically checked exceptions could look like in TypeSc*
