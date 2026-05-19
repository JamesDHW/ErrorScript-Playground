import type { SlideEntry } from '../slideTypes'
import { SlideStaticCode } from '../components/code'
import {
  SlideActTitle,
  SlideBody,
  SlideFrame,
  SlideHero,
  SlideInterstitial,
} from '../components/layout'
import { ES, JS, TS } from './acts'

const codeThreeChannels = `function onClick() {
  const cached = readProfileFromCache("42");
  const draft = parseProfileDraft();

  saveProfile({ ...cached, ...draft });

  console.log("Saved");
}

onClick();`

const codeErrorsAsValuesCoupled = `function start() {
  const user = fetchUser();
  if (user instanceof NetworkError) return showOfflineBanner();

  const cfg = loadConfig();
  if (cfg instanceof StorageError) return showDiskWarning();
  if (cfg instanceof ParseError)   return showConfigBroken();

  renderApp(user, cfg);
}`

const codeErrorsAsExceptions = `function start() {
  try {
    const user = fetchUser();
    const cfg = loadConfig();
    renderApp(user, cfg);
  } catch (e) {
    if (user instanceof NetworkError) return showOfflineBanner();
    if (cfg instanceof StorageError) return showDiskWarning();
    if (cfg instanceof ParseError)   return showConfigBroken();
  }
}`

const codeInvisibleThrow = `class ParseError extends Error { }

type Config = { port: number };

function parseConfig(raw: string): Config {
  if (raw === "") {
    throw new ParseError("Missing");
  }
  return JSON.parse(raw) as Config;
}

const config = parseConfig("");
startServer(config.port);

declare function startServer(port: number): void;`

const codeInvisibleReject = `class NetworkError extends Error { }

type User = { id: string };

async function saveUser(user: User): Promise<void> {
  throw new NetworkError("Offline");
}

function onClick(user: User) {
  saveUser(user);
  showToast("Saved");
}

declare function showToast(message: string): void;`

const codeSyntax = `class ParseError extends Error { /* ... */ }

function parseIntStrict(input: string): number throws ParseError {
  if (!/^-?\\d+$/.test(input)) {
    throw new ParseError(input);
  }

  return Number(input);
}

try {
  const value = parseIntStrict("42");
  console.log(value);
} catch (e) {
  console.error(e.message);
}`

const splitColClass = 'flex flex-col gap-2 min-w-0 text-left items-stretch'

export const setupSlides: SlideEntry[] = [
  {
    content: (
      <SlideActTitle
        variant="errorscript"
        title="The TypeScript Feature That Should (Probably) Be Rejected"
      />
    ),
  },

  {
    content: (
      <SlideInterstitial
        lines={[
          'I built TypeScript with typed, checked exceptions.',
          'I am going to demonstrate the specification; why it\'s valuable.',
        ]}
      />
    ),
  },

  {
    content: (
      <SlideInterstitial
        lines={[
          'Then I am going to argue against shipping it.',
        ]}
      />
    ),
  },

  {
    content: (
      <SlideInterstitial
        lines={[
          'There will be code!',
          
        ]}
      />
    ),
  },

  {
    act: JS,
    content: (
      <SlideActTitle
        variant="javascript"
        title="JavaScript: The Wilderness"
      />
    ),
  },

  {
    act: JS,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero
            title="Three Channels"
            subtitle="JavaScript fails in three ways."
          />
          <SlideStaticCode
            language="javascript"
            lineNumbers="on"
            markers={[
              {
                startLineNumber: 2,
                startColumn: 9,
                endLineNumber: 2,
                endColumn: 15,
                message: 'Return channel: cached may be undefined.',
                severity: 'info',
              },
              {
                startLineNumber: 3,
                startColumn: 17,
                endLineNumber: 3,
                endColumn: 37,
                message: 'Exception channel: parseProfileDraft may throw.',
                severity: 'info',
              },
              {
                startLineNumber: 5,
                startColumn: 3,
                endLineNumber: 5,
                endColumn: 14,
                message: 'Rejection channel: saveProfile returns a promise that may reject.',
                severity: 'info',
              },
              {
                startLineNumber: 7,
                startColumn: 3,
                endLineNumber: 7,
                endColumn: 22,
                message: 'The success message is not evidence that the save succeeded.',
                severity: 'info',
              },
            ]}
            code={codeThreeChannels}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: JS,
    content: (
      <SlideInterstitial
        lines={['TypeScript secured return.']}
      />
    ),
  },

  {
    act: JS,
    content: (
      <SlideInterstitial
        lines={['TypeScript never secured throw.']}
      />
    ),
  },
  
  {
    act: TS,
    content: (
      <SlideActTitle
      variant="typescript"
      title="TypeScript: Guard Rails for Return"
      />
    ),
  },
  
    {
      act: TS,
      content: (
        <SlideInterstitial
          lines={['Return types are now safe, but also...']}
        />
      ),
    },

  {
    act: TS,
    content: (
      <SlideInterstitial
        lines={['We can finally handle errors safely!']}
      />
    ),
  },

  {
    act: TS,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero
            title="Errors as Values"
            subtitle="Safe, but threaded through the happy path."
          />
          <SlideStaticCode
            language="typescript"
            lineNumbers="on"
            markers={[
              {
                startLineNumber: 3,
                startColumn: 7,
                endLineNumber: 3,
                endColumn: 35,
                message: 'Error handling threaded through the happy path.',
                severity: 'info',
              },
              {
                startLineNumber: 6,
                startColumn: 7,
                endLineNumber: 6,
                endColumn: 34,
                message: 'Error handling threaded through the happy path.',
                severity: 'info',
              },
              {
                startLineNumber: 7,
                startColumn: 7,
                endLineNumber: 7,
                endColumn: 32,
                message: 'Error handling threaded through the happy path.',
                severity: 'info',
              },
            ]}
            code={codeErrorsAsValuesCoupled}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: TS,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero
            title="What If I Want to Write Code Like..."
            subtitle="Split the happy and error paths."
          />
          <SlideStaticCode
            language="typescript"
            lineNumbers="on"
            code={codeErrorsAsExceptions}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: TS,
    content: (
      <SlideInterstitial
        lines={['It\'s a trap!']}
      />
    ),
  },

  {
    act: TS,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6 lg:gap-8" align="start" maxContentWidth="full">
          <SlideHero
            title="Throws & Rejects"
            subtitle="The type checker sees nothing wrong."
            align="start"
          />
          <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className={splitColClass}>
              <h3 className="text-2xl font-semibold">Sync: throws</h3>
              <SlideStaticCode
                language="typescript"
                lineNumbers="on"
                markers={[
                  {
                    startLineNumber: 12,
                    startColumn: 16,
                    endLineNumber: 12,
                    endColumn: 31,
                    message: 'Call site sees only Config.',
                    severity: 'info',
                  },
                ]}
                code={codeInvisibleThrow}
              />
            </div>
            <div className={splitColClass}>
              <h3 className="text-2xl font-semibold">Async: rejects</h3>
              <SlideStaticCode
                language="typescript"
                lineNumbers="on"
                markers={[
                  {
                    startLineNumber: 10,
                    startColumn: 3,
                    endLineNumber: 10,
                    endColumn: 18,
                    message: 'Dropped promise – no signal.',
                    severity: 'info',
                  },
                ]}
                code={codeInvisibleReject}
              />
            </div>
          </div>
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: TS,
    content: (
      <SlideInterstitial
        lines={['But what if it was safe to write code like this?']}
      />
    ),
  },

  {
    content: (
      <SlideActTitle
        variant="errorscript"
        title="Introducing ErrorScript"
      >
      </SlideActTitle>
    ),
  },

  {
    content: (
      <SlideFrame>
        <SlideBody className="gap-8" align="start">
          <SlideHero
            title="ErrorScript"
            subtitle="TypeScript, but with checked and typed exceptions."
            align="start"
            className="max-w-4xl"
          />
          <ul className="list-disc space-y-3 pl-7 mt-10 text-left leading-snug text-zinc-950/90 text-3xl">
            <li>
              <strong>Checked</strong>: the compiler forces you to handle declared
              exceptions
            </li>
            <li>
              <strong>Typed</strong>:{' '}
              <code className="font-mono text-[0.95em]">catch (e)</code> gets a real
              type derived from the try block
            </li>
          </ul>
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: ES,
    content: (
      <SlideFrame>
        <SlideBody className="gap-6">
          <SlideHero title="Language Feels Like..." />
          <SlideStaticCode
            language="errorscript"
            lineNumbers="on"
            markers={[
              {
                startLineNumber: 3,
                startColumn: 41,
                endLineNumber: 3,
                endColumn: 65,
                message: 'Sync failures are declared in the signature.',
                severity: 'info',
              },
              {
                startLineNumber: 14,
                startColumn: 10,
                endLineNumber: 14,
                endColumn: 11,
                message: 'e is typed as ParseError – inferred from the try block.',
                severity: 'info',
              },
            ]}
            code={codeSyntax}
          />
        </SlideBody>
      </SlideFrame>
    ),
  },
]
