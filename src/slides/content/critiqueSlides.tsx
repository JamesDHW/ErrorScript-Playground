import type { SlideEntry } from '../slideTypes'
import { SlideStaticCode } from '../components/code'
import {
  SlideActTitle,
  SlideBody,
  SlideFrame,
  SlideHero,
  SlideInterstitial,
} from '../components/layout'
import { CRITIQUE } from './acts'


const codeESUnrelatedError = `class LowLevelException extends Error { /* ... */ }

runApp(config);`

const codePartialCatch = `class ParseError extends Error { }

type Config = { port: number };

declare function validate(obj: unknown): void;

function parseConfig(raw: string): Config throws ParseError {
  if (raw === "") {
    throw new ParseError("Missing");
  }
  const obj = JSON.parse(raw);
  validate(obj);
  return obj as Config;
}

try {
  parseConfig("{}");
} catch (e) {
  e;
}`

const codeUnknownError = `class ParseError extends Error {}
class UnknownError extends Error {}

declare function parseConfig(raw: string): unknown throws ParseError;

try {
  parseConfig("{}");
} catch (e) {
  // e: ParseError | UnknownError (hypothetical)
  if (e instanceof ParseError)   return;
  if (e instanceof UnknownError) return;
  throw e;
}`

const codeSkipRow = `class SkipRow extends Error {}

function processRow(row: string): number throws SkipRow {
  if (row === "") {
    throw new SkipRow();
  }

  return Number(row);
}

const totals: number[] = [];
let skipped = 0;

for (const row of ["1", "", "2"]) {
  try {
    totals.push(processRow(row));
  } catch {
    skipped++;
  }
}`

export const critiqueSlides: SlideEntry[] = [
  {
    act: CRITIQUE,
    content: (
      <SlideActTitle variant="errorscript" title="So, Why Not It Ship?" />
    ),
  },

  {
    act: CRITIQUE,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6 lg:gap-8" align="start" maxContentWidth="full">
          <SlideHero
            title="1. It Encourages Exceptions"
            align="start"
            className="max-w-7xl"
          />
            <div className={"flex flex-col max-w-7xl gap-2 min-w-0 text-left items-stretch"}>
              <p className="text-xl sm:text-2xl md:text-4xl font-semibold leading-snug pb-3">Non-local control flow can make it more difficult to reason about.</p>
              <p className="text-xl sm:text-2xl md:text-4xl font-semibold leading-snug pb-6">This radically changes the language incentives.</p>
              <SlideStaticCode
                language="errorscript"
                lineNumbers="on"
                markers={[
                  {
                    startLineNumber: 3,
                    startColumn: 1,
                    endLineNumber: 3,
                    endColumn: 14,
                    message: 'What the heck?! Where does this exception get thrown?',
                    severity: 'error',
                  },
                ]}
                code={codeESUnrelatedError}
              />
          </div>
        </SlideBody>
      </SlideFrame>
    ),
  },


  {
    act: CRITIQUE,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero
            title="2. Performance Incentives"
            subtitle="In V8, a thrown exception is ~100x slower than a returned value in hot paths."
          />
          <SlideStaticCode
            language="errorscript"
            lineNumbers="on"
            markers={[
              {
                startLineNumber: 5,
                startColumn: 5,
                endLineNumber: 5,
                endColumn: 25,
                message: 'Typed exceptions make this feel legitimate. The runtime disagrees.',
                severity: 'info',
              },
            ]}
            code={codeSkipRow}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: CRITIQUE,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero
            title="3. Typing Can Lie"
            subtitle="Precise about what we modelled, but not about what JS can do."
          />
          <SlideStaticCode
            language="errorscript"
            lineNumbers="on"
            markers={[
              {
                startLineNumber: 11,
                startColumn: 15,
                endLineNumber: 11,
                endColumn: 30,
                message: 'Third-party code can throw anything — not just ParseError.',
                severity: 'info',
              },
              {
                startLineNumber: 18,
                startColumn: 10,
                endLineNumber: 18,
                endColumn: 10,
                message: 'e is typed as ParseError — but a runtime RangeError would slip through narrowing.',
                severity: 'info',
              },
            ]}
            code={codePartialCatch}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

    {
      act: CRITIQUE,
      content: (
        <SlideInterstitial
          lines={['Can we just, not have trade-offs?']}
        />
      ),
    },

  {
    act: CRITIQUE,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero
            title="A Design Attempt: UnknownError"
            subtitle="What if every catch was DeclaredErrors | UnknownError?"
          />
          <SlideStaticCode
            language="errorscript"
            lineNumbers="on"
            markers={[
              {
                startLineNumber: 9,
                startColumn: 3,
                endLineNumber: 9,
                endColumn: 49,
                message: 'Not unknown — that collapses the union and kills narrowing.',
                severity: 'info',
              },
              {
                startLineNumber: 12,
                startColumn: 3,
                endLineNumber: 12,
                endColumn: 10,
                message: 'Every catch must now handle UnknownError — or it was decoration.',
                severity: 'info',
              },
            ]}
            code={codeUnknownError}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: CRITIQUE,
    content: (
      <SlideFrame>
        <SlideBody className="gap-8" align="start">
          <SlideHero
            title="A Dozen Arguments Like That One"
            subtitle="Every one is a real argument with no obviously right answer."
            align="start"
          />
          <ul className="list-disc space-y-4 pl-7 text-left text-3xl leading-snug text-zinc-950/90">
            <li>
              Should <code className="font-mono text-[0.95em]">throws</code> clauses be required, or inferred?
              <span className="ml-2 text-zinc-950/55">(Inferred.)</span>
            </li>
            <li>
              Are sync <code className="font-mono text-[0.95em]">throws</code> and async{' '}
              <code className="font-mono text-[0.95em]">rejects</code> the same channel?
              <span className="ml-2 text-zinc-950/55">(We kept them separate.)</span>
            </li>
            <li>
              What should recursive functions infer?
              <span className="ml-2 text-zinc-950/55">(We degrade to unknown.)</span>
            </li>
            <li>
              What variance do effects follow in callback positions?
              <span className="ml-2 text-zinc-950/55">(Contravariant, like parameters.)</span>
            </li>
          </ul>
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: CRITIQUE,
    content: (
      <SlideInterstitial
        lines={['Just because you can...']}
      />
    ),
  },
]
