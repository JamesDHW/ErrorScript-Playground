import { Link } from 'react-router-dom'

const GH_ISSUE_13219 = 'https://github.com/microsoft/TypeScript/issues/13219'
const ERRORE_ORG = 'https://errore.org/'

export function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-52px)] bg-gray-50">
      <section className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12 md:pt-8">
        <h1 className="text-xl font-semibold text-[#1a1a1a] mb-4 break-words md:text-2xl">About ErrorScript</h1>
        <p className="leading-[1.65] text-gray-700 mb-4">
          <strong>ErrorScript</strong> is a fork of TypeScript that adds inferred checked errors:
          the compiler tracks what can be thrown or rejected and requires call sites to handle or
          propagate those effects. This playground runs that fork in the browser so you can try the
          feature without installing anything.
        </p>
        <p className="leading-[1.65] text-gray-700 mb-4">
          The goal is to make exceptions and promise rejections part of the type system. Today,
          TypeScript gives us strong inference and static checks that prevent many runtime type
          errors, but there is no equivalent for exceptions. Functions can throw or reject without
          that fact appearing in their type, so callers have no static guarantee that they have
          handled failure. ErrorScript experiments with closing that gap via inference and optional{' '}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded">throws</code> /{' '}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded">rejects</code> clauses.
        </p>
      </section>

      <section className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mt-8 mb-3 break-words md:text-xl md:mt-10">
          Origin: the TypeScript Suggestion
        </h2>
        <p className="leading-[1.65] text-gray-700 mb-4">
          While checked exceptions exist in other languages as first-class (e.g. Java/ Swift), I
          found the idea of a <code className="bg-gray-200 px-1.5 py-0.5 rounded">throws</code>{' '}
          clause and typed <code className="bg-gray-200 px-1.5 py-0.5 rounded">catch</code> in
          TypeScript was proposed in{' '}
          <a href={GH_ISSUE_13219} target="_blank" rel="noreferrer" className="text-brand no-underline font-medium">
            GitHub issue #13219
          </a>
          . The suggestion was closed as "not planned." The main reason was not disagreement with
          the goal, but <strong>adoption</strong>: adding checked exceptions to an existing
          language and ecosystem is a large change. Existing code does not declare what it throws;
          libraries and callers would need to opt in gradually. ErrorScript explores whether an{' '}
          <em>inferred</em>, opt-in design can make adoption feasible while still giving real
          safety where it is used.
        </p>
      </section>

      <section className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mt-8 mb-3 break-words md:text-xl md:mt-10">
          Compared to "errors as values"
        </h2>
        <p className="leading-[1.65] text-gray-700 mb-4">
          Another way to get type-safe error handling is to avoid exceptions and model errors as
          values in the return type (e.g.{' '}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded">User | NotFoundError</code>). Projects
          like{' '}
          <a href={ERRORE_ORG} target="_blank" rel="noreferrer" className="text-brand no-underline font-medium">
            Errore
          </a>{' '}
          advocate this style: functions return unions, callers narrow with{' '}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded">instanceof</code>, and the compiler
          enforces that you handle each error before using the success value. No wrappers, no
          exceptions—just unions.
        </p>
        <p className="leading-[1.65] text-gray-700 mb-4">
          That approach is solid and works with vanilla TypeScript. The limitation is that{' '}
          <strong> exceptions are not first-class in the type system</strong>. Code that throws or
          rejects does not advertise it in its signature. When you call a function that throws, or{' '}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded">await</code> a promise that may
          reject, the type checker cannot force you to handle the failure. You get unexpected
          throws and unhandled rejections at runtime. Errors-as-values fixes that for code you
          control by not using exceptions; it does not fix the millions of APIs and libraries that
          do throw or reject. ErrorScript aims to make those effects visible and enforced at compile
          time, so that both "return an error" and "throw/reject" can be checked.
        </p>
        <p className="leading-[1.65] text-gray-700 mb-4">
          The two strategies can coexist: a library can declare{' '}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded">throws</code> for its exceptions while
          also returning union types for domain errors. ErrorScript is about giving exceptions and
          rejections the same kind of static checking we already have for other runtime behavior.
        </p>
      </section>

      <section className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mt-8 mb-3 break-words md:text-xl md:mt-10">Incremental adoption</h2>
        <p className="leading-[1.65] text-gray-700 mb-4">
          The feature is designed so adoption can be gradual and opt-in:
        </p>
        <ul className="leading-[1.65] text-gray-700 mb-4 pl-6">
          <li className="mb-2">
            <strong>Inference first.</strong> You do not have to annotate every function. The
            compiler infers thrown/rejected types from the body. You only add{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded">throws</code> or{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded">rejects</code> at declaration sites
            when you need a contract (e.g. in{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded">.d.ts</code> or at module
            boundaries).
          </li>
          <li className="mb-2">
            <strong>Disable if you want.</strong> The rule can be turned off (e.g. via a compiler
            option). With the feature disabled,{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded">throws</code> /{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded">rejects</code> are ignored and the
            compiler behaves like standard TypeScript. No impact on teams that prefer not to use it.
          </li>
          <li className="mb-2">
            <strong>// @ts-expect-error directive.</strong> This can be used to ignore checked throws
            when the feature is enabled.
          </li>
        </ul>
      </section>

      <section className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mt-8 mb-3 break-words md:text-xl md:mt-10">Current Limitations</h2>
        <p className="leading-[1.65] text-gray-700 mb-4">
          This is a proof-of-concept. The current implementation has known gaps and trade-offs:
        </p>
        <ul className="leading-[1.65] text-gray-700 mb-4 pl-6">
          <li className="mb-2">
            <strong>Recursion.</strong> If the call graph has cycles, thrown type is reduced to{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded"> unknown</code> to avoid fixpoint
            analysis. So recursive or mutually recursive functions do not get precise checked
            effects yet.
          </li>
          <li className="mb-2">
            <strong>Promise combinators.</strong> Only a subset of Promise patterns are modeled (e.g.{' '}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded">Promise.all</code> rejection
            typing). More complex flows may not be fully tracked.
          </li>
          <li className="mb-2">
            <strong>Playground vs. real compiler.</strong> This site loads the ErrorScript build
            from your CDN. If you are using the stock playground assets, you may be running a
            snapshot that is behind the latest spec or has different behavior. The playground is for
            demonstration; for authoritative semantics see the fork and the spec (e.g. the project
            BRIEF).
          </li>
          <li>
            <strong>// @ts-ignore-checked-throws directive.</strong> There is currently no
            directive to ignore checked throws when the feature is enabled.
          </li>
        </ul>
        <p className="leading-[1.65] text-gray-700 mb-4">
          The non-goals for the PoC (no mandatory annotations, no runtime enforcement, no exhaustive
          stdlib coverage) are documented in the spec. The idea is to evaluate ergonomics and
          viability, not to ship a complete production feature yet.
        </p>
      </section>

      <section className="px-4 py-8 max-w-[720px] mx-auto pb-12 md:px-8 md:py-12 md:pb-16">
        <p className="leading-[1.65] text-gray-700 mb-4">
          <Link to="/playground" className="text-brand no-underline font-medium">
            Try the Playground
          </Link>{' '}
          to see inferred checked errors in action, or read the project README for setup and more
          information.
        </p>
      </section>
    </main>
  )
}
