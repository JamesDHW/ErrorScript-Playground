import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { ChannelIllustration } from '../components/ChannelIllustration'

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

export function HomePage() {
  return (
    <main className="min-h-[calc(100vh-52px)] bg-white max-w-[100vw]">
      <section className="bg-brand text-white px-4 py-10 pb-12 md:px-8 md:py-16 md:pb-20">
        <div className="max-w-[1300px] mx-auto flex flex-wrap gap-6 md:gap-8 items-center justify-center">
          <div className="w-full text-center min-w-0 md:w-auto md:flex-[1_1_400px] md:max-w-[500px] md:text-left">
            <h1 className="text-2xl font-medium mb-4 leading-tight md:text-4xl">
              ErrorScript is <strong className="font-extrabold">TypeScript with Safe Exceptions</strong>.
            </h1>
            <p className="text-base opacity-95 mb-8 max-w-full md:text-xl md:max-w-[560px]">
              Unhandled exceptions and dropped promises become part of the type system and raise compile-time errors.
            </p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <a
                href="/playground"
                className="inline-block py-3 px-6 bg-white text-brand font-semibold rounded-md no-underline"
              >
                Try in the Playground
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
              snippet={{
                code: `declare function throwsError(): void throws Error;
throwsError(); // TS18063: Unhandled thrown type: Error.

declare async function fetchUser(): Promise<void> rejects NetworkError;
fetchUser(); // TS18064: Unhandled promise rejection type: NetworkError.

try { throwsError(); } 
catch (e: Error) { /* e is correctly typed as Error! */ }`,
                highlights: [
                  { line: 0, type: 'safe' },
                  { line: 1, type: 'unsafe' },
                  { line: 3, type: 'safe' },
                  { line: 4, type: 'unsafe' },
                  { line: 6, type: 'safe' },
                  { line: 7, type: 'safe' },
                ],
              }}
              visible
            />
          </div>
        </div>
      </section>

      <section className="bg-black sticky top-0 z-10 text-white py-2 px-4 text-center text-sm">
        ErrorScript is currently experimental. <a className="underline" href="https://github.com/JamesDHW/ErrorScript/issues/2" target="_blank" rel="noreferrer">
          Join the discussion and support the RFC!
        </a>
      </section>

      <section>
        <ChannelIllustration />
      </section>

      <section className="px-4 py-10 max-w-[1200px] mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-3xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          What is ErrorScript?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="text-2xl font-normal mb-7 text-[#1a1a1a] text-center">
              Checked Errors
            </h3>
            <p className="text-black/75 leading-[1.65] m-0 text-lg md:text-xl">
              Functions that throw contribute a thrown type. Call sites must handle it with
              try/catch or allow it to propagate. Caught errors are typed by default.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-normal mb-7 text-[#1a1a1a] text-center">
              Try/Catch Absorption
            </h3>
            <p className="text-black/75 text-lg leading-[1.65] m-0 md:text-xl">
              A catch statement absorbs the try block's thrown type.
              Errors unhandled or thrown in the catch propagate to the enclosing function.
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


      <section className="px-4 py-10 max-w-[1200px] mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-3xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          Errors as Values vs Errors as Exceptions
        </h2>
        <div className="flex flex-col gap-6 min-w-0 md:flex-row md:gap-10">
          <div className="flex flex-col w-full min-w-0 max-w-full break-words md:max-w-[1000px] md:text-left gap-3">
            <p className="text-black/75 leading-[1.6] m-0 break-words min-w-0">
              <strong>Errors as values</strong> is a pattern which TypeScript made safe to use. Instead of throwing an error, return a value that indicates an error occurred, which is checked at compile-time.
            </p>
            <p>
              This is the current state of the art approach for error handling in TypeScript, but it mixes success and failure paths in the same function.
            </p>
            <CodeBlock
              snippet={{
                code: `declare function fetchUser(): User | NetworkError;
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
}`,
                highlights: [],
              }}
              visible
            />
          </div>
          <div className="flex flex-col w-full min-w-0 max-w-full break-words md:max-w-[1000px] md:text-left gap-3">
            <p className="text-black/75 leading-[1.6] m-0 break-words min-w-0">
              <strong>Errors as exceptions</strong> is a pattern which follows the traditional exception-based error handling pattern. Instead of returning a value, throw an error.
            </p>
              <p>This is a built-in control flow mechanism to most languages, including JavaScript and TypeScript, but is currently not safe in either due to the lack of compile-time checking.</p>
            <CodeBlock
              snippet={{
                code: `declare function fetchUser(): User throws NetworkError;
declare function loadConfig(): Config throws StorageError | ParseError;
declare function verifyPlan(user: User, cfg: Config): Plan throws ValidationError;

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
    
    assertNever(e);
  }
}`,
                highlights: [],
              }}
              visible
            />
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
        <h2 className="text-center text-3xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          Adopt ErrorScript Gradually
        </h2>
        <div className="flex flex-col gap-4 mx-auto text-center md:flex-row md:gap-8 md:text-left">
          <p className="text-black/75 leading-[1.65] m-0 text-[1.1rem]">
            Apply thrown types incrementally,{' '}
            <strong>each step improves editor support</strong> and surfaces unhandled exceptions.
          </p>
          <p className="text-black/75 leading-[1.65] m-0 text-[1.1rem]">
            Use the built-in <strong className="text-brand">// @ts-expect-exception</strong> directive to suppress errors during adoption.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 mx-auto md:px-8 md:py-[4.5rem]">
        <h2 className="text-center text-3xl font-normal mb-5 text-[#1a1a1a] md:text-4xl md:mb-8">
          ErrorScript becomes TypeScript via the delete key.
        </h2>
        <div className="flex flex-col gap-6 items-stretch max-w-full mx-auto md:flex-row md:items-start md:gap-6 md:max-w-[1500px]">
          <div className="min-w-0 flex-1 flex-[1_1_0]">
            <CodeBlock
              snippet={{
                code: `type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`,
                highlights: [],
              }}
              visible
            />
            <div className="text-center text-sm text-black/60 mt-2">ErrorScript file.</div>
          </div>
          <div className="min-w-0 flex-1 flex-[1_1_0]">
            <CodeBlock
              snippet={{
                code: `type Result = "pass" | "fail"

function verify(result: Result) throws ValidationError {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`,
                highlights: [{ line: 2, type: 'unsafe' }],
              }}
              visible
            />
            <div className="text-center text-sm text-black/60 mt-2">Exceptions are removed.</div>
          </div>
          <div className="min-w-0 flex-1 flex-[1_1_0]">
            <CodeBlock
              snippet={{
                code: `type Result = "pass" | "fail"

function verify(result: Result) {
  if (result === "pass") {
    console.log("Passed")
  } else {
    throw new ValidationError("Failed")
  }
}`,
                highlights: [],
              }}
              visible
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
            <p className="m-0 text-sm opacity-90">Author:{" "}
              <a className="m-0 text-sm opacity-90 text-white underline" href="https://jameshw.dev" target="_blank" rel="noreferrer">JamesDHW</a>
            </p>

          </div>
        </div>
      </footer>
    </main>
  )
}
