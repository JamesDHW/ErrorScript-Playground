import React from 'react'
import { CodeBlock } from '../components/CodeBlock'


const GITHUB_URL = 'https://github.com/JamesDHW/ErrorScript-Playground'
const BRAND_RED = '#c43333'

const CONTENT_MAX_WIDTH = 1000
const SECTION_PADDING = '4.5rem 2rem'
const SECTION_HEADING_STYLE = {
  textAlign: 'center' as const,
  fontSize: '2.5rem',
  fontWeight: 400,
  marginBottom: '2rem',
  color: '#1a1a1a',
}

const codeBlockPreStyle = {
  background: '#f5f5f5',
  borderRadius: 8,
  padding: '1rem 1.25rem',
  fontFamily: 'ui-monospace, monospace',
  fontSize: '0.85rem',
  overflow: 'auto',
  border: '1px solid rgba(0,0,0,0.1)',
  margin: 0,
} as const

const getStartedCardStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  padding: '2.75rem 2rem',
  minHeight: 200,
  background: '#fdf2f2',
  border: '1px solid rgba(196, 51, 51, 0.15)',
  borderRadius: 10,
  boxShadow: '0 2px 12px rgba(196, 51, 51, 0.08)',
  textDecoration: 'none',
  color: 'inherit',
}

type GetStartedCardProps = {
  href: string
  title: string
  description: string
  children?: React.ReactNode
  external?: boolean
}

function GetStartedCard({
  href,
  title,
  description,
  children,
  external,
}: GetStartedCardProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      style={getStartedCardStyle}
    >
      {children != null ? <div style={{ flex: 1 }}>{children}</div> : null}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.125rem', color: BRAND_RED, marginBottom: '0.35rem' }}>
            {title}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'rgba(196, 51, 51, 0.85)' }}>{description}</div>
        </div>
        <span style={{ color: BRAND_RED, fontSize: '1.25rem' }}>→</span>
      </div>
    </a>
  )
}

export function HomePage() {
  return (
    <main style={{ minHeight: 'calc(100vh - 52px)', backgroundColor: 'white' }}>
      <section
        style={{
          background: '#c43333',
          color: 'white',
          padding: '4rem 2rem 5rem',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ flex: '1 1 400px', maxWidth: 500, textAlign: 'left' }}>
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 500,
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              ErrorScript is{" "}
              <strong style={{ fontWeight: 800 }}>TypeScript with checked errors</strong>.
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                opacity: 0.95,
                marginBottom: '2rem',
                maxWidth: 560,
              }}
            >
              Inferred throw and reject effects with call-site enforcement. Catch
              unhandled throws and promise rejections at compile time.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="/playground"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  color: '#c43333',
                  fontWeight: 600,
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                Try the Playground
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  fontWeight: 600,
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                View on GitHub
              </a>
            </div>
          </div>
          <CodeBlock
            code={`// Unhandled throw → compile error
function throwsError(): number { throw new Error("e"); }
throwsError();
// TS18063: Unhandled thrown type: Error.

// Handled by try/catch
try { throwsError(); } catch (e) { ... }`}
            preStyle={{
              flex: '1 1 400px',
              minWidth: 0,
              margin: 0,
              background: '#f5f5f5',
              borderRadius: 8,
              padding: '1.5rem',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.9rem',
              overflow: 'auto',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </section>
      <section
        style={{
          background: '#000',
          color: 'white',
          padding: '0.5rem 1rem',
          textAlign: 'center',
          fontSize: '0.9rem',
        }}
      >
        ErrorScript is currently unavailable. Coming to an RFC near you soon!
      </section>
      <section
        style={{
          padding: SECTION_PADDING,
          maxWidth: CONTENT_MAX_WIDTH,
          margin: '0 auto',
        }}
      >
        <h2 style={SECTION_HEADING_STYLE}>What is ErrorScript?</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '1.75rem',
                color: '#1a1a1a',
                textAlign: 'center',
              }}
            >
              Checked Throws
            </h3>
            <p style={{
              color: 'rgba(0,0,0,0.75)', lineHeight: 1.65, margin: 0, fontSize: '1.25rem',
            }}>
              Functions that throw contribute a thrown type. Call sites must
              handle it with try/catch or propagate.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '1.75rem',
                color: '#1a1a1a',
                textAlign: 'center',
              }}
            >
              Try/catch Absorption
            </h3>
            <p
              style={{
                color: 'rgba(0,0,0,0.75)',
                fontSize: '1.25rem',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              A try with a catch absorbs the try block's thrown type; only
              catch and finally can escape.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '1.75rem',
                color: '#1a1a1a',
                textAlign: 'center',
              }}
            >
              Async and Promise Rejection
            </h3>
            <p style={{
              color: 'rgba(0,0,0,0.75)', lineHeight: 1.65, margin: 0, fontSize: '1.25rem',
            }}>
              Promises that reject are typed; await and fire-and-forget are
              enforced with explicit ignore (void) or .catch().
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: SECTION_PADDING,
          maxWidth: CONTENT_MAX_WIDTH,
          margin: '0 auto',
        }}
      >
        <h2 style={SECTION_HEADING_STYLE}>Get Started</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          <GetStartedCard
            href="/playground"
            title="Playground"
            description="Try in your browser"
          >
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.8rem',
                color: 'rgba(196, 51, 51, 0.7)',
                marginBottom: '1.25rem',
              }}
            >
              {`const x = throwsError()
//     Unhandled thrown type`}
            </div>
          </GetStartedCard>
          <GetStartedCard
            href={GITHUB_URL}
            title="Download"
            description="View on GitHub"
            external
          />
        </div>
      </section>

      <section
        style={{
          padding: SECTION_PADDING,
          maxWidth: CONTENT_MAX_WIDTH,
          margin: '0 auto',
        }}
      >
        <h2 style={SECTION_HEADING_STYLE}>Adopt ErrorScript Gradually</h2>
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            maxWidth: 760,
            gap: '2rem',
          }}
        >
          <p style={{ color: 'rgba(0,0,0,0.75)', lineHeight: 1.65, margin: 0, fontSize: '1.1rem', }}>
            Apply thrown types to your TypeScript project incrementally, <strong>each step improves editor support</strong> and surfaces unhandled exceptions.
          </p>
          <p style={{ color: 'rgba(0,0,0,0.75)', lineHeight: 1.65, margin: 0, fontSize: '1.1rem', }}>
            Take incorrect TypeScript code and see how ErrorScript can <strong>catch unhandled throws in your editor</strong>.
          </p>
        </div>
      </section>

      <section
        style={{
          padding: SECTION_PADDING,
          maxWidth: CONTENT_MAX_WIDTH,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0, maxWidth: 1000 }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 400,
                marginBottom: '1rem',
                color: '#1a1a1a',
              }}
            >
              Describe Your Exceptions
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.75)', lineHeight: 1.6, margin: 0 }}>
              <strong>Describe the shape of throws and rejections in your code.</strong> Making it possible to see documentation and issues in your editor.
            </p>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
            <CodeBlock
              code={`function fetchUser(): User throws NetworkError {
  const res = await fetch("/api/user")
  if (!res.ok) throw new NetworkError()
  return res.json()
}

try {
  const user = fetchUser()
} catch (e) {
  // e: NetworkError
}`}
              preStyle={codeBlockPreStyle}
            />
            <CodeBlock
              code={`type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "fail") {
    throw new ValidationError("Failed")
  }
}`}
              preStyle={codeBlockPreStyle}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          padding: SECTION_PADDING,
          margin: '0 auto',
        }}
      >
        <h2 style={SECTION_HEADING_STYLE}>
          ErrorScript becomes TypeScript via the delete key.
        </h2>
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'start',
            maxWidth: 1500,
            margin: '0 auto',
          }}
        >
          <div>
            <CodeBlock
              code={`type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`}
              preStyle={codeBlockPreStyle}
            />
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', marginTop: '0.5rem' }}>
              ErrorScript file.
            </div>
          </div>
          <div>
            <CodeBlock
              highlightPhrases={[
                { text: "throws ValidationError", style: { backgroundColor: 'rgba(255, 0, 0, 0.12)' } },
              ]}
              code={`type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`}
              preStyle={codeBlockPreStyle}
            />
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', marginTop: '0.5rem' }}>
              Exceptions are removed.
            </div>
          </div>
          <div>
            <CodeBlock
              code={`type Result = "pass" | "fail"

function verify(result: Result) {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`}
              preStyle={codeBlockPreStyle}
            />
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', marginTop: '0.5rem' }}>
              TypeScript file.
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          background: '#c43333',
          color: 'white',
          padding: '4rem 2rem 3rem',
          marginTop: '4rem',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '2rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <img src="/ErrorScript.png" alt="" style={{ width: 32, height: 32, borderRadius: 4 }} />
              <span style={{ fontWeight: 600 }}>ErrorScript</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Made with ❤️</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
