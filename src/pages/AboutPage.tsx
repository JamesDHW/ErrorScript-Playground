import { Link } from 'react-router-dom'

const BRAND_RED = '#c43333'
const CONTENT_MAX_WIDTH = 720
const SECTION_STYLE = {
  padding: '3rem 2rem',
  maxWidth: CONTENT_MAX_WIDTH,
  margin: '0 auto',
} as const
const H2_STYLE = {
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#1a1a1a',
  marginTop: '2.5rem',
  marginBottom: '0.75rem',
} as const
const P_STYLE = {
  lineHeight: 1.65,
  color: '#333',
  marginBottom: '1rem',
} as const
const LINK_STYLE = {
  color: BRAND_RED,
  textDecoration: 'none',
  fontWeight: 500,
} as const

const GH_ISSUE_13219 = 'https://github.com/microsoft/TypeScript/issues/13219'
const ERRORE_ORG = 'https://errore.org/'

export function AboutPage() {
  return (
    <main style={{ minHeight: 'calc(100vh - 52px)', backgroundColor: '#fafafa' }}>
      <section style={{ ...SECTION_STYLE, paddingTop: '2rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '1rem',
          }}
        >
          About ErrorScript
        </h1>
        <p style={P_STYLE}>
          <strong>ErrorScript</strong> is a fork of TypeScript that adds inferred checked errors:
          the compiler tracks what can be thrown or rejected and requires call sites to handle or
          propagate those effects. This playground runs that fork in the browser so you can try
          the feature without installing anything.
        </p>
        <p style={P_STYLE}>
          The goal is to make exceptions and promise rejections part of the type system. Today,
          TypeScript gives us strong inference and static checks that prevent many runtime type
          errors, but there is no equivalent for exceptions. Functions can throw or reject without
          that fact appearing in their type, so callers have no static guarantee that they have
          handled failure. ErrorScript experiments with closing that gap via inference and
          optional <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>throws</code> / <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>rejects</code> clauses.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Origin: the TypeScript Suggestion</h2>
        <p style={P_STYLE}>
          While checked exceptions exist in other languages as first-class (e.g. Java/ Swift), I found the idea of a{" "}
          <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>throws</code> clause and typed <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>catch</code> in TypeScript was proposed in{' '}
          <a href={GH_ISSUE_13219} target="_blank" rel="noreferrer" style={LINK_STYLE}>
            GitHub issue #13219
          </a>
          . The suggestion was closed as “not planned.” The main reason was not disagreement with
          the goal, but <strong>adoption</strong>: adding checked exceptions to an existing
          language and ecosystem is a large change. Existing code does not declare what it
          throws; libraries and callers would need to opt in gradually. ErrorScript explores
          whether an <em>inferred</em>, opt-in design can make adoption feasible while still
          giving real safety where it is used.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Compared to “errors as values”</h2>
        <p style={P_STYLE}>
          Another way to get type-safe error handling is to avoid exceptions and model errors as
          values in the return type (e.g. <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>User | NotFoundError</code>). Projects like{' '}
          <a href={ERRORE_ORG} target="_blank" rel="noreferrer" style={LINK_STYLE}>
            Errore
          </a>{" "}
          advocate this style: functions return unions, callers narrow with <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>instanceof</code>, and the compiler
          enforces that you handle each error before using the success value. No wrappers, no
          exceptions—just unions.
        </p>
        <p style={P_STYLE}>
          That approach is solid and works with vanilla TypeScript. The limitation is that
          <strong> exceptions are not first-class in the type system</strong>. Code that throws
          or rejects does not advertise it in its signature. When you call a function that
          throws, or <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>await</code> a promise that may reject, the type checker cannot force you to handle
          the failure. You get unexpected throws and unhandled rejections at runtime. Errors-as-values
          fixes that for code you control by not using exceptions; it does not fix the millions of
          APIs and libraries that do throw or reject. ErrorScript aims to make those effects
          visible and enforced at compile time, so that both “return an error” and “throw/reject”
          can be checked.
        </p>
        <p style={P_STYLE}>
          The two strategies can coexist: a library can declare <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>throws</code> for its exceptions while
          also returning union types for domain errors. ErrorScript is about giving exceptions
          and rejections the same kind of static checking we already have for other runtime
          behavior.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Incremental adoption</h2>
        <p style={P_STYLE}>
          The feature is designed so adoption can be gradual and opt-in:
        </p>
        <ul style={{ ...P_STYLE, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Inference first.</strong> You do not have to annotate every function. The
            compiler infers thrown/rejected types from the body. You only add <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>throws</code> or <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>rejects</code> at declaration sites when you need a contract (e.g. in <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>.d.ts</code> or at module boundaries).
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Disable if you want.</strong> The rule can be turned off (e.g. via a
            compiler option). With the feature disabled, <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>throws</code> / <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>rejects</code> are ignored and the compiler behaves like standard TypeScript. No impact on teams that prefer not to use it.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>// @ts-expect-error directive.</strong> This can be used to ignore checked throws when the feature is enabled.
          </li>
        </ul>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Current Limitations</h2>
        <p style={P_STYLE}>
          This is a proof-of-concept. The current implementation has known gaps and trade-offs:
        </p>
        <ul style={{ ...P_STYLE, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Recursion.</strong> If the call graph has cycles, thrown type is reduced to
            <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}> unknown</code> to avoid fixpoint analysis. So recursive or mutually recursive functions do not get precise checked effects yet.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Promise combinators.</strong> Only a subset of Promise patterns are modeled
            (e.g. <code style={{ background: '#eee', padding: '0.1em 0.35em', borderRadius: 4 }}>Promise.all</code> rejection typing). More complex flows may not be fully tracked.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Playground vs. real compiler.</strong> This site loads the ErrorScript
            build from your CDN. If you are using the stock playground assets, you may be
            running a snapshot that is behind the latest spec or has different behavior. The
            playground is for demonstration; for authoritative semantics see the fork and the
            spec (e.g. the project BRIEF).
          </li>
          <li>
            <strong>// @ts-ignore-checked-throws directive.</strong> There is currently no directive to ignore checked throws when the feature is enabled.
          </li>
        </ul>
        <p style={P_STYLE}>
          The non-goals for the PoC (no mandatory annotations, no runtime enforcement, no
          exhaustive stdlib coverage) are documented in the spec. The idea is to evaluate
          ergonomics and viability, not to ship a complete production feature yet.
        </p>
      </section>

      <section style={{ ...SECTION_STYLE, paddingBottom: '4rem' }}>
        <p style={P_STYLE}>
          <Link to="/playground" style={LINK_STYLE}>Try the Playground</Link>
          {' '}to see inferred checked errors in action, or read the project README for
          setup and more information.
        </p>
      </section>
    </main>
  )
}
