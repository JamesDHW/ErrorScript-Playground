# About ErrorScript

**ErrorScript** is a fork of TypeScript that adds inferred checked errors: the compiler tracks what can be thrown or rejected and requires call sites to handle or propagate those effects. This playground runs that fork in the browser so you can try the feature without installing anything.

The goal is to make exceptions and promise rejections part of the type system. Today, TypeScript gives us strong inference and static checks that prevent many runtime type errors, but there is no equivalent for exceptions. Functions can throw or reject without that fact appearing in their type, so callers have no static guarantee that they have handled failure. ErrorScript experiments with closing that gap via inference and optional `throws` / `rejects` clauses.

## Origin: the TypeScript Suggestion

While checked exceptions exist in other languages as first-class (e.g. Java/ Swift), I found the idea of a `throws` clause and typed `catch` in TypeScript was proposed in [GitHub issue #13219](https://github.com/microsoft/TypeScript/issues/13219). The suggestion was closed as "not planned." The main reason was not disagreement with the goal, but **adoption**: adding checked exceptions to an existing language and ecosystem is a large change. Existing code does not declare what it throws; libraries and callers would need to opt in gradually. ErrorScript explores whether an *inferred*, opt-in design can make adoption feasible while still giving real safety where it is used.

## Compared to "errors as values"

Another way to get type-safe error handling is to avoid exceptions and model errors as values in the return type (e.g. `User | NotFoundError`). Projects like [Errore](https://errore.org/) advocate this style: functions return unions, callers narrow with `instanceof`, and the compiler enforces that you handle each error before using the success value. No wrappers, no exceptions—just unions.

That approach is solid and works with vanilla TypeScript. The limitation is that **exceptions are not first-class in the type system**. Code that throws or rejects does not advertise it in its signature. When you call a function that throws, or `await` a promise that may reject, the type checker cannot force you to handle the failure. You get unexpected throws and unhandled rejections at runtime. Errors-as-values fixes that for code you control by not using exceptions; it does not fix the millions of APIs and libraries that do throw or reject. ErrorScript aims to make those effects visible and enforced at compile time, so that both "return an error" and "throw/reject" can be checked.

The two strategies can coexist: a library can declare `throws` for its exceptions while also returning union types for domain errors. ErrorScript is about giving exceptions and rejections the same kind of static checking we already have for other runtime behavior.

## Incremental adoption

The feature is designed so adoption can be gradual and opt-in:

- **Inference first.** You do not have to annotate every function. The compiler infers thrown/rejected types from the body. You only add `throws` or `rejects` at declaration sites when you need a contract (e.g. in `.d.ts` or at module boundaries).
- **Disable if you want.** The rule can be turned off (e.g. via a compiler option). With the feature disabled, `throws` / `rejects` are ignored and the compiler behaves like standard TypeScript. No impact on teams that prefer not to use it.
- **// @ts-expect-exception directive.** This can be used to ignore checked throws when the feature is enabled. This does not disable type checking on the next line, only exception checking.

## Current Limitations

This is a proof-of-concept. The current implementation has known gaps and trade-offs:

- **Recursion.** If the call graph has cycles, thrown type is reduced to `unknown` to avoid fixpoint analysis. So recursive or mutually recursive functions do not get precise checked effects yet.
- **Promise combinators.** Only a subset of Promise patterns are modeled (e.g. `Promise.all` rejection typing). More complex flows may not be fully tracked.
- **Playground vs. real compiler.** This site loads the ErrorScript build from your CDN. If you are using the stock playground assets, you may be running a snapshot that is behind the latest spec or has different behavior. The playground is for demonstration; for authoritative semantics see the fork and the spec.

The non-goals for the PoC are documented in the [spec](/docs). The idea is to evaluate ergonomics and viability, not to ship a complete production feature yet.

[Try the Playground](/playground) to see inferred checked errors in action, or read the project README for setup and more information.
