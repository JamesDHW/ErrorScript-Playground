# ErrorScript

JavaScript has two channels of control flow to return a result: `return` and `throw`.

In JavaScript, neither is "safe" to use:

```js
const name = getName(); // <- typeof name could be number ⚠️
await safeMethod();     // <- safeMethod might throw ⚠️
```

TypeScript was introduced to make the `return` control flow safe by adding type-checking, but it does not do anything to make the `throw` clause safe to use. As with JavaScript, TypeScript provides no mechanism to know if the program will throw a run-time exception before the program runs.

ErrorScript is an experiment exploring what it would look like if TypeScript treated thrown and rejected errors as first-class, statically checked effects to make the `throw` keyword safe to use.

---

## The Problem

```ts
function parseIntStrict(s: string) {
  if (!/^-?\d+$/.test(s)) throw new ParseError("Not an int");
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

> 💡 In JavaScript, Exceptions are not "checked".

Secondly, inside a `catch` block:

```ts
try {
  parseIntStrict("x");
} catch (e) {
  // e: unknown
}
```

The type of `e` is `unknown` (or if misconfigured, `any`).

There’s no built-in way to know what might have been thrown.

> 💡 In JavaScript, Exceptions are not typed.

---

## Errors vs Exceptions

An **error** is a failure condition.

An **exception** is a control-flow mechanism: `throw` transfers execution non-locally until it reaches a `catch` (or crashes the program).

In JavaScript:

- Anything can be thrown (`throw null` is fine ⚠️)
- Exceptions can cross function and module boundaries
- Async failures surface as Promise rejections

Exceptions are built into the fundamental reality of the language, but are invisible to the type system in both JS and TS.

---

## What TypeScript Did for JavaScript

TypeScript added static type checking as a build-time feature.

It can tell you things like:

- If you forgot to handle a union case
- If you called a function incorrectly
- If a value might be `undefined`

But it does not check:

- Whether a function might throw
- Whether a rejection was handled
- Whether your error handling is exhaustive

There’s no equivalent of “strictNullChecks” for exceptions.

---

## Error Handling Approaches in TypeScript Today

### 1. Exceptions (Not Recommended)

Use the control flow mechanism built into JavaScript:

```ts
declare function fetchUser(): User;
declare function loadConfig(): Config;
declare function verifyPlan(user: User, cfg: Config): Plan;

function start() {
  try {
    const user = fetchUser();
    const cfg = loadConfig();
    const plan = verifyPlan(user, cfg);
    renderApp(user, cfg, plan);
  } catch (e) {
    if (e instanceof NetworkError) showOfflineBanner();
    if (e instanceof StorageError) showDiskWarning();
    if (e instanceof ParseError) showConfigBrokenMessage();
    if (e instanceof ValidationError) showUpgradePrompt();
    
  }
}
```

The "sad" path can be separated from the "happy" path, making code easier to understand, however, If you don't handle the exception, you will crash your program and there is no way to _prove_ you handled all cases. Additionally, `catch (e)` gives no type information which is less ergonomic in giving hints about which errors to handle.

In general, `throw` in your code is not safe, as it is easy to unintentionally forget to catch the resulting exception.

---

### 2. Errors as Values

As TypeScript offers type checking, returning an error instead of throwing is preferable.

```ts
declare function fetchUser(): User | NetworkError;
declare function loadConfig(): Config | StorageError | ParseError;
declare function verifyPlan(user: User, cfg: Config): Plan | ValidationError;

function start() {
  const user = fetchUser();
  if (user instanceof NetworkError) {
    return showOfflineBanner();
  }

  const cfg = loadConfig();
  if (cfg instanceof StorageError) {
    return showDiskWarning();
  }

  if (cfg instanceof ParseError) {
    return showConfigBrokenMessage();
  }

  const plan = verifyPlan(user, cfg);
  if (plan instanceof ValidationError) {
    return showUpgradePrompt();
  }

  renderApp(user, cfg, plan);
}
```

This pattern is a natural consequence of `throw` being unsafe and type checking introducing type-safety which _proves_ that all error cases are handled.

A common alternative is returning a `Result<Val, Err>`-style type.

Libraries like [ErrorE](https://errore.org/) explore this approach further and provide ergonomic helpers.

This strategy is explicit and safe — but it pushes error handling directly into the happy path:

- Every call site must check for errors and early return (or unwrap)
- Failure plumbing spreads across the codebase

In general, this is the error handling pattern I would recommend given the current constraints of TypeScript.

---

## Introducing Typed Exceptions and Checked Exceptions

Some languages (Java, Swift, Kotlin in limited form) allow functions to declare that they may throw certain error types.

This results in two independent language features:
1. _Checked_ Exceptions – i.e. don't allow my code to compile if there are unhandled exceptions.
2. _Typed_ Exceptions – i.e. correctly attach a type to the resulting exception in the `catch` to inform exactly what needs handling.

The compiler then enforces that callers handle or propagates those errors.

The idea is simple:

> Treat “may throw X” like a type-level effect that must be accounted for.

This makes it clear at _build-time_ which errors need handling where, making the `throw` keyword safe to use in your code without crashing the program.

---

## What Is ErrorScript?

ErrorScript is a fork of TypeScript that experiments with this idea — while trying to feel as "TypeScript-native" as possible.

It introduces:

- Inferred thrown types (no need to explicitly declare thrown types)
- Inferred rejected types for async functions
- Typed `catch (e)` and `.catch((e) => {})` variables
- Compile-time errors for unhandled throws or rejections
- Assignability checks to ensure declared thrown types match the inferred thrown type
- Some escape hatches and utilities for adoption

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

or allow it to propagate and handle in any callers. If `ParseError` is no handled in the catch

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

Additionally, it wraps guardrails around a dangerous JavaScript feature which is currently available for developers to use.

---

## Async Matters Too

JavaScript failures are often asynchronous.

ErrorScript treats promise rejections as typed effects in a second channel:

```ts
async function fetchJson(): Promise<string> rejects NetworkError;

// ❌ Unhandled promise rejection type: NetworkError
await fetchJson(); 
```

You must:

- `try/catch` the `await`, or
- explicitly ignore with `void`, or
- handle via `.catch(...)`

## Extension of TypeScript

In order to help adoption, ErrorScript is designed to extend TypeScript as a superset, such that all valid TypeScript is valid ErrorScript – no syntax conflicting existing standards is introduced. All previous error handling patterns are still available and is down to the decision of the consumer of TypeScript how to use, checked exceptions only add more safety on top.

The feature can be activated/ deactivated with the compiler option `checkedErrors`, so existing codebases can ignore the new rule if desired and keep unsafe exceptions unhandled.

A new directive `// @ts-ignore-exception`, which only ignores `checkedErrors` errors, allows for any unhandled call sites in existing code to be ignored in existing projects which.

New code fixes (including wrap with try/catch) have been added to help refactoring towards safe exception handling.

---

## An Argument Against Typed, Checked Exceptions

Many people believe that this feature could/should not be added to TypeScript. 

 A good place to look for the current objections to checked/typed exceptions is in [Learning TypeScript](https://www.learningtypescript.com/articles/why-typescript-doesnt-include-a-throws-keyword) (Josh Goldberg) and [Ryan Cavanaugh’s comment](https://github.com/microsoft/TypeScript/issues/13219#issuecomment-1515037604) on the TypeScript issue.

The TS team’s position is not “don’t use try/catch” but that *static* throw types don’t fit the platform—dynamic introspection in `catch` is the right fit today. The counter is that we can still make the exception channel cleaner where it’s used, and `throw` is already available for misuse; improving the tooling is better than leaving it untyped.

### “Lack of Need” (Unions & First-Class Functions)

In languages like Java, checked exceptions partly compensate for no union return types and weaker first-class functions; JS has both, so the argument is that JS “doesn’t need” checked exceptions.

Other patterns existing doesn’t remove the need for a cleaner patterns where exceptions are used; we can improve that channel without forcing everyone to use it.

### Ecosystem Doesn’t Document Throws

Libraries rarely document what they throw (e.g. *“The Svelte documentation, over the course of 100 pages, simply says ‘throws an error’ in one occurrence”*); there are no strong exception hierarchies. So typed exceptions wouldn’t get accurate .d.ts data.

The absence of documentation is a reason to add tooling that encourages it, not to withhold the feature; adoption can be gradual, as with strict null checks.

### Unannotated Functions Break Either Default

If unannotated = “doesn’t throw”, the feature doesn’t help until every dependency has throw clauses; if unannotated = “might throw anything”, `catch (e)` stays `unknown` and the feature adds little.

A default (e.g. unannotated = “may throw”) plus gradual annotation still improves annotated code and forces no big-bang change. ErrorScript adds _inferred_ thrown types, so it's not necessary (or recommended) for every function to declare what it throws (similar to inferred function return types).

### Assignability and Propagation

Callbacks that throw, `forEach` vs `setTimeout` (rethrow vs not), getters/setters (e.g. `[].length = -1`), and “rethrows from f except X” make the type system and .d.ts authoring complex.

ErrorScript shows that assignability and callback effects are tractable; the complexity is real but addressable. ErrorScript does not introduce the concept of "rethrows", effects are propagated automatically by inference if they are not handled and any declared `throws` on outer functions must be assignable to the inferred type which propagates.

### Anything Can Throw

Property access and many built-ins can throw; JS allows throwing non-`Error` values. So “typed” exceptions are at best partial.

Unavoidable and odd throws happen with or without checked exceptions; encouraging try/catch still catches these, and typing the *known* cases improves the rest. ErrorScript has typed exceptions, which allows for checking if `null` was thrown.

### Checked Exceptions as Anti-Feature

Many language designers regard checked exceptions as a net negative; the ES spec has 400+ throw sites and no clear avoidable vs unavoidable split (e.g. `JSON.parse` vs `new RegExp`), so deciding what to check is messy.

We can scope checking to user-declared throws and leave built-ins as “may throw”; the fuzzy line doesn’t remove the value of checking where it’s explicit. These _potential_ throws exist anyway in the underlying JavaScript at runtime – even working to correctly specify the possible thrown types is difficult, but not impossible.

### Performance

In adding another feature to TypeScript, the performance in every codebase will be affected somewhat.

This would need to be tested on large codebases and use correct caching strategies to ensure it doesn't add significant overhead. Even if there is a performance impact, we shouldn't ignore the potential program correctness brought with the feature – if we follow this principle, we wouldn't use TypeScript at all and just run plain old bug-prone JavaScript.

### Pandora’s box

My personal worry.

Once a feature like this is adopted, it can’t be put back; any unintended effects on code quality have to be supported going forward.

---

## Try It

The goal is to explore:

- Is this ergonomic in real code?
- Does it reduce bugs?
- Does it feel like TypeScript?
- Where does it break down?

You can:

- [Try the playground](https://errorscript.vercel.app/playground)
- [Read the specification](https://errorscript.vercel.app/docs)
- [Contribute to the RFC discussion](https://github.com/JamesDHW/ErrorScript/issues/2)

Feedback, edge cases, and counterexamples are especially welcome – this project is here to spark discussion.

---

*ErrorScript is a research prototype exploring what first-class, statically checked exceptions could look like in TypeScript*
