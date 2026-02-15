import React from 'react'
import { CodeBlock } from '../components/CodeBlock'

const GITHUB_URL = 'https://github.com/JamesDHW/ErrorScript-Playground'

type GetStartedCardProps = {
  href: string
  title: string
  description: string
  children?: React.ReactNode
  external?: boolean
  className?: string
}

function GetStartedCard({
  href,
  title,
  description,
  children,
  external,
  className,
}: GetStartedCardProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`flex flex-col p-5 min-h-0 bg-red-50 border border-brand/15 rounded-xl shadow-sm no-underline text-inherit hover:opacity-95 md:p-8 md:min-h-[200px] ${className ?? ''}`}
    >
      {children != null ? <div className="flex-1">{children}</div> : null}
      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <div className="font-bold text-lg text-brand mb-1">{title}</div>
          <div className="text-sm text-brand/85">{description}</div>
        </div>
        <span className="text-brand text-xl">→</span>
      </div>
    </a>
  )
}

const codeBlockPreClass =
  'bg-gray-100 rounded-lg p-6 font-mono text-[0.9rem] overflow-auto border border-black/10 m-0'

export function HomePage() {
  return (
    <main className="min-h-[calc(100vh-52px)] bg-white overflow-x-hidden max-w-[100vw]">
      <section className="bg-brand text-white px-4 py-10 pb-12 md:px-8 md:py-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-6 md:gap-8 items-center justify-center">
          <div className="w-full text-center min-w-0 md:w-auto md:flex-[1_1_400px] md:max-w-[500px] md:text-left">
            <h1 className="text-2xl font-medium mb-4 leading-tight md:text-4xl">
              ErrorScript is <strong className="font-extrabold">TypeScript with checked errors</strong>.
            </h1>
            <p className="text-base opacity-95 mb-8 max-w-full md:text-xl md:max-w-[560px]">
              Inferred throw and reject effects with call-site enforcement. Catch unhandled throws
              and promise rejections at compile time.
            </p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <a
                href="/playground"
                className="inline-block py-3 px-6 bg-white text-brand font-semibold rounded-md no-underline"
              >
                Try the Playground
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block py-3 px-6 bg-transparent text-white border-2 border-white font-semibold rounded-md no-underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="w-full min-w-0 md:flex-[1_1_400px]">
            <CodeBlock
              code={`// Unhandled throw → compile error
function throwsError(): number { throw new Error("e"); }
throwsError();
// TS18063: Unhandled thrown type: Error.

// Handled by try/catch
try { throwsError(); } catch (e) { ... }`}
              preClassName={`${codeBlockPreClass} text-[0.75rem] p-4 md:text-[0.9rem] md:p-6`}
            />
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-2 px-4 text-center text-sm">
        ErrorScript is currently unavailable. Coming to an RFC near you soon!
      </section>

      <section className="px-4 py-10 max-w-[1000px] mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-2xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          What is ErrorScript?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="text-2xl font-normal mb-7 text-[#1a1a1a] text-center">
              Checked Throws
            </h3>
            <p className="text-black/75 leading-[1.65] m-0 text-lg md:text-xl">
              Functions that throw contribute a thrown type. Call sites must handle it with
              try/catch or propagate.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-normal mb-7 text-[#1a1a1a] text-center">
              Try/catch Absorption
            </h3>
            <p className="text-black/75 text-lg leading-[1.65] m-0 md:text-xl">
              A try with a catch absorbs the try block's thrown type; only catch and finally can
              escape.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-normal mb-7 text-[#1a1a1a] text-center">
              Async and Promise Rejection
            </h3>
            <p className="text-black/75 leading-[1.65] m-0 text-lg md:text-xl">
              Promises that reject are typed; await and fire-and-forget are enforced with explicit
              ignore (void) or .catch().
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 max-w-[1000px] mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-2xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          Get Started
        </h2>
        <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 md:gap-8 md:max-w-[560px]">
          <GetStartedCard
            href="/playground"
            title="Playground"
            description="Try in your browser"
          >
            <div className="font-mono text-[0.8rem] text-brand/70 mb-5">
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

      <section className="px-4 py-10 max-w-[1000px] mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-2xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          Adopt ErrorScript Gradually
        </h2>
        <div className="flex flex-col gap-4 max-w-[760px] mx-auto text-center md:flex-row md:gap-8 md:text-left">
          <p className="text-black/75 leading-[1.65] m-0 text-[1.1rem]">
            Apply thrown types to your TypeScript project incrementally,{' '}
            <strong>each step improves editor support</strong> and surfaces unhandled exceptions.
          </p>
          <p className="text-black/75 leading-[1.65] m-0 text-[1.1rem]">
            Take incorrect TypeScript code and see how ErrorScript can{' '}
            <strong>catch unhandled throws in your editor</strong>.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 max-w-[1000px] mx-auto md:px-8 md:py-[4.5rem]">
        <div className="flex flex-col gap-6 items-center min-w-0 md:flex-row md:gap-10 md:items-center">
          <div className="w-full min-w-0 max-w-full break-words text-center md:flex-[1_1_280px] md:max-w-[1000px] md:text-left">
            <h2 className="text-center text-2xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
              Describe Your Exceptions
            </h2>
            <p className="text-black/75 leading-[1.6] m-0 break-words min-w-0">
              <strong>Describe the shape of throws and rejections in your code.</strong> Making it
              possible to see documentation and issues in your editor.
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 min-w-0 md:flex-[1_1_400px]">
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
              preClassName={codeBlockPreClass}
            />
            <CodeBlock
              code={`type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "fail") {
    throw new ValidationError("Failed")
  }
}`}
              preClassName={codeBlockPreClass}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-2xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          ErrorScript becomes TypeScript via the delete key.
        </h2>
        <div className="flex flex-col gap-6 items-stretch max-w-full mx-auto md:flex-row md:items-start md:gap-6 md:max-w-[1500px]">
          <div className="min-w-0 flex-1 flex-[1_1_0]">
            <CodeBlock
              code={`type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`}
              preClassName={codeBlockPreClass}
            />
            <div className="text-center text-sm text-black/60 mt-2">ErrorScript file.</div>
          </div>
          <div className="min-w-0 flex-1 flex-[1_1_0]">
            <CodeBlock
              highlightPhrases={[
                {
                  text: 'throws ValidationError',
                  style: { backgroundColor: 'rgba(255, 0, 0, 0.12)' },
                },
              ]}
              code={`type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`}
              preClassName={codeBlockPreClass}
            />
            <div className="text-center text-sm text-black/60 mt-2">Exceptions are removed.</div>
          </div>
          <div className="min-w-0 flex-1 flex-[1_1_0]">
            <CodeBlock
              code={`type Result = "pass" | "fail"

function verify(result: Result) {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`}
              preClassName={codeBlockPreClass}
            />
            <div className="text-center text-sm text-black/60 mt-2">TypeScript file.</div>
          </div>
        </div>
      </section>

      <footer className="bg-brand text-white px-4 py-10 mt-10 md:px-8 md:py-16 md:mt-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-6 border-b border-white/20 pb-8 text-center md:grid-cols-4 md:gap-8 md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 mb-3 md:justify-start">
              <img src="/ErrorScript.png" alt="" className="w-8 h-8 rounded" />
              <span className="font-semibold">ErrorScript</span>
            </div>
            <p className="m-0 text-sm opacity-90">Made with ❤️</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
