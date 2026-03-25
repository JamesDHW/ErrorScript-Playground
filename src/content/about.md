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

The "sad" path can be separated from the "happy" path, making code easier to understand, however, if you don't handle the exception, you will crash your program and there is no way to _prove_ you handled all cases. Additionally, `catch (e)` gives no type information which is less ergonomic in giving hints about which errors to handle.

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

This strategy is explicit and safe but it pushes error handling directly into the happy path:

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

ErrorScript is a fork of TypeScript that experiments with this idea – while trying to feel as "TypeScript-native" as possible.

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

In order to help adoption, ErrorScript is designed to extend TypeScript as a superset, such that all valid TypeScript is valid ErrorScript – no syntax conflicting existing standards is introduced. All previous error handling patterns are still available and is down to the decision of the consumer of TypeScript how to use, checked exceptions only add more safety on top. Without using declared `throws`/ `rejects`, the code is _exactly_ the same, everything is inferred from existing syntax.

The feature can be activated/ deactivated with the compiler option `checkedErrors`, so existing codebases can ignore the new rule if desired and keep unsafe exceptions unhandled.

A new directive `// @ts-ignore-exception`, which only ignores `checkedErrors` errors, allows for any unhandled call sites in existing code to be ignored in existing projects which.

New code fixes (including wrap with try/catch) have been added to help refactoring towards safe exception handling.

---

## An Argument Against ErrorScript

There are some reasons to believe ErrorScript may make TypeScript worse as a language.

Adding typed, checked exceptions would signal that using `throw` for modeled program failure is a promoted pattern, which many people believe should be discouraged.

### Exceptions as Control Flow

Two views of usage of exceptions:

- Exceptions should be reserved for unexpected failures and bugs.
- Exceptions are a valid way to represent non-local failure paths and can be made safer with typing.

The objection to ErrorScript is that it strengthens the second pattern.

This may make the *happy path* of code easier to read, because error propagation is non-local and does not need to be threaded through every call. But it also makes control flow less local: handling may happen far away from the point where failure occurs, and the intent of the error path may become less obvious when reading code.

In other words, ErrorScript may improve the readability of the happy path while making the overall behaviour of the program harder to reason about.

Critics have made the comparison to Java, where it is common to see people re-throwing RuntimeException just to get the program to compile.

### Typed Exceptions Are Still Partial

JavaScript can always throw unexpected runtime failures that are outside the program’s declared error model.

ErrorScript does not attempt to type all possible runtime exceptions. It only types the failures that the developer chooses to model. Critics argue that this can be misleading: once exceptions are typed, developers may over-trust the model and assume they have captured more of reality than they actually have.

This is the same general trade-off TypeScript already makes elsewhere – but many people believe the exception channel is too unpredictable for this trade-off to be worthwhile.

ErrorScript can fall back to normal TypeScript/JavaScript behaviour where needed – for example, a developer can choose to treat a `catch` variable as `unknown` when they want to handle unexpected exceptions defensively.

### Language Incentives Matter

Even if ErrorScript is technically sound enough, adding it to the language would encourage people to structure more control flow around `throw`.

That has two possible costs:

- **Code quality cost:** more non-local control flow, more hidden failure paths, more use of exceptions where explicit value-based modeling _might_ be clearer
- **Runtime cost:** exceptions can be expensive if used heavily in ordinary control flow compared to error-as-value

So one of the strongest argument against ErrorScript is, _"TypeScript should not encourage exceptions as a first-class mechanism for modeling expected program behaviour"_.

If that premise is true, then adding typed, checked exceptions in this way adds little value and may push the ecosystem in the wrong direction.

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
