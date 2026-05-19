import { ReactQRCode } from '@lglab/react-qr-code'
import type { SlideEntry } from '../slideTypes'
import {
  SlideBody,
  SlideFrame,
  SlideHero,
} from '../components/layout'
import { WHY } from './acts'

const GITHUB_REPO = 'https://github.com/JamesDHW/ErrorScript'
const LINKEDIN = 'https://www.linkedin.com/in/jamesdhw/'

const questionsCode = `/*
    _______           _______  _______ __________________ _______  _        _______   _____  
   (  ___  )|\\     /|(  ____ \\(  ____ \\\\__   __/\\__   __/(  ___  )( (    /|(  ____ \\ / ___ \\ 
   | (   ) || )   ( || (    \\/| (    \\/   ) (      ) (   | (   ) ||  \\  ( || (    \\/( (   ) )
   | |   | || |   | || (__    | (_____    | |      | |   | |   | ||   \\ | || (_____  \\/  / / 
   | |   | || |   | ||  __)   (_____  )   | |      | |   | |   | || (\\ \\) |(_____  )    ( (  
   | | /\\| || |   | || (            ) |   | |      | |   | |   | || | \\   |      ) |    | |  
   | (_\\ \\ || (___) || (____/\\/\\____) |   | |   ___) (___| (___) || )  \\  |/\\____) |    (_)  
   (____\\/_)(_______)(_______/\\_______)   )_(   \\_______/(_______)|/    )_)\\_______)     *   
*/

class ParseError extends Error { }

declare function parseConfig(raw: string): unknown throws ParseError;

try {
  parseConfig("{}");
} catch (e) {
  if (e instanceof ParseError) return;
  throw e;
}`

const getQrGradient = (color: string) => {
  return {
    type: 'linear' as const,
    stops: [{ color, offset: '0%' }],
  }
}

export const closeSlides: SlideEntry[] = [
  {
    act: WHY,
    content: (
      <SlideFrame>
        <SlideBody className="gap-8" align="start">
          <SlideHero
            title="Why Build It Then?"
            align="start"
          />
          <ul className="max-w-7xl list-disc space-y-4 pl-7 text-left text-3xl leading-snug text-zinc-950/90">
            <li>
              The TypeScript codebase uses snapshot testing – TDD took a few weekends, not a few years.
            </li>
            <li>
              Working software over abstract arguments.
              You only see the trade-offs once you build the thing.
            </li>
            <li>
              It was fun!
            </li>
          </ul>
        </SlideBody>
      </SlideFrame>
    ),
  },

  {
    act: "Questions?",
    content: (
      <SlideFrame>
        <SlideBody className="gap-10" align="center" maxContentWidth="full">
          <SlideHero title="Join the Debate" />
            <div className="flex justify-center gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
                  <ReactQRCode value={GITHUB_REPO} background="#fff" gradient={getQrGradient("#000")} size={256} marginSize={0} imageSettings={{ src: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', width: 64, height: 64, excavate: true }} />
                </a>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  <ReactQRCode value={LINKEDIN} background="#0077B5" gradient={getQrGradient("#fff")} size={256} marginSize={0} imageSettings={{ src: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-white-icon.png', width: 48, height: 48, excavate: true }} />
                </a>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                <a href="https://errorscript.jameshw.dev/" target="_blank" rel="noreferrer">
                  <ReactQRCode value="https://errorscript.jameshw.dev/" background="#c43333" gradient={getQrGradient("#fff")} size={256} marginSize={0} imageSettings={{ src: '/ErrorScript.png', width: 64, height: 64, excavate: true }} />
                </a>
              </div>
            </div>
        </SlideBody>
      </SlideFrame>
    ),
    panelCode: questionsCode
  },
]


