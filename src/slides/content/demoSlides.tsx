import type { SlideEntry } from '../slideTypes'
import { SlideBody, SlideFrame, SlideHero, SlideInterstitial } from '../components/layout'
import { ES } from './acts'

/*
TARGET (speaker adds ` throws ParseError` to the declaration,
then wraps the call in try / catch to surface the typed catch).
*/
const panelDeclareAndCatch = `class ParseError extends Error { /* ... */ }

declare function parseIntStrict(input: string): number;

parseIntStrict("x");`

/*
TARGET (no edits – the inferred throws clause already errors at the call site).
*/
const panelInference = `class ParseError extends Error { /* ... */ }

function parseIntStrict(input: string): number {
  if (!/^-?\\d+$/.test(input)) {
    throw new ParseError(input);
  }
  return Number(input);
}

function computeUserId(raw: string) {
  return parseIntStrict(raw);
}

computeUserId("x");`

/*
TARGET (speaker prefixes call with \`void \`, then replaces with \`.catch(() => {})\`).
*/
const panelAsync = `class NetworkError extends Error { /* ... */ }

type User = { id: string };
declare const currentUser: User;

declare function saveUser(user: User): Promise<void> rejects NetworkError;

saveUser(currentUser);`

/*
TARGET (speaker types \` throws ParseError\` after \`void\` in risky's signature).
*/
const panelThrowsNever = `class ParseError extends Error { /* ... */ }

declare function renderSafely(
  callback: () => void throws never,
): void;

declare function risky(): void;

renderSafely(risky);`

/*
TARGET (speaker adds \`// @ts-expect-exception\` above the call).
*/
const panelMigration = `class ParseError extends Error { /* ... */ }

declare function risky(): void throws ParseError;

risky();


`

export const demoSlides: SlideEntry[] = [
  // 9 – Demo 1: Declare and Catch (live)
  {
    act: ES,
    panelCode: panelDeclareAndCatch,
    panelLanguage: 'errorscript',
    content: (
      <SlideFrame>
        <SlideBody className="gap-5">
          <SlideHero
            title="You Declare"
            subtitle="ErrorScript enforces catch"
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  // 10 – Demo 2: Inference (live)
  {
    act: ES,
    panelCode: panelInference,
    panelLanguage: 'errorscript',
    content: (
      <SlideFrame>
        <SlideBody className="gap-5">
          <SlideHero
            title="Inference"
            subtitle="Or don't declare at all!"
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: ES,
    panelCode: panelAsync,
    panelLanguage: 'errorscript',
    content: (
      <SlideFrame>
        <SlideBody className="gap-5">
          <SlideHero
            title="Async Works the Same Way"
            subtitle="Checked dropped promises."
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  // 12 – Demo 4: throws never (live)
  {
    act: ES,
    panelCode: panelThrowsNever,
    panelLanguage: 'errorscript',
    content: (
      <SlideFrame>
        <SlideBody className="gap-5">
          <SlideHero
            title="Boundaries that Forbid 'throws'"
            subtitle="APIs can refuse callbacks that may throw."
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: ES,
    panelCode: panelMigration,
    panelLanguage: 'errorscript',
    content: (
      <SlideFrame>
        <SlideBody className="gap-5">
          <SlideHero
            title="Works With Existing Code"
            subtitle={
              <ul className="list-disc space-y-3 pl-7 mt-10 text-left leading-snug text-zinc-950/90 text-3xl">
                <li><code className="font-mono text-[0.95em]">void</code>, <code className="font-mono text-[0.95em]">.catch</code>, and <code className="font-mono text-[0.95em]">@ts-expect-exception</code></li>
                <li>
                  Enabled by{' '}
                  <code className="font-mono text-[0.95em]">--checkedErrors</code>.
                </li>
              </ul>
            }
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: ES,
    content: (
      <SlideInterstitial
        lines={['Try out the playground to see all the features in action!']}
      />
    ),
  }
]
