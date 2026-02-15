import React, { type CSSProperties } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

type HighlightPhrase = { text: string; style: CSSProperties }

type CodeBlockProps = {
  code: string
  preClassName?: string
  highlightPhrases?: HighlightPhrase[]
}

export function CodeBlock({
  code,
  preClassName = 'bg-gray-100 rounded-lg px-5 py-4 font-mono text-[0.85rem] overflow-auto border border-black/10 m-0 whitespace-pre',
  highlightPhrases = [],
}: CodeBlockProps) {
  return (
    <Highlight theme={themes.vsLight} prism={Prism} code={code} language="typescript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const normalizedCode = tokens
          .map((line) => line.map((t) => t.content).join(''))
          .join('\n')
        const ranges =
          highlightPhrases.length === 0
            ? []
            : highlightPhrases.flatMap(({ text, style }) => {
                let start = 0
                const result: Array<{ start: number; end: number; style: CSSProperties }> = []
                while (true) {
                  const i = normalizedCode.indexOf(text, start)
                  if (i === -1) break
                  result.push({ start: i, end: i + text.length, style })
                  start = i + 1
                }
                return result
              })
        let charOffset = 0
        return (
          <div className="min-w-0 max-w-full overflow-hidden">
            <pre
              className={`${className} ${preClassName}`}
              style={{
                ...style,
                margin: 0,
                width: '100%',
                minWidth: 0,
                maxWidth: '100%',
                boxSizing: 'border-box',
                overflow: 'auto',
              }}
            >
              <code className="whitespace-pre">
                {tokens.map((line, lineIdx) => {
                  const lineEl = (
                    <div key={lineIdx} {...getLineProps({ line, key: lineIdx })}>
                      {line.map((token, tokenIdx) => {
                        const tokenStart = charOffset
                        const tokenEnd = charOffset + token.content.length
                        charOffset = tokenEnd
                        const tokenProps = getTokenProps({ token, key: tokenIdx })

                        const overlapping = ranges.filter(
                          (r) => r.start < tokenEnd && r.end > tokenStart
                        )
                        if (overlapping.length === 0) {
                          return <span key={tokenIdx} {...tokenProps} />
                        }

                        const segments: Array<{
                          start: number
                          end: number
                          style?: CSSProperties
                        }> = []
                        let pos = tokenStart
                        for (const r of overlapping.sort((a, b) => a.start - b.start)) {
                          const segStart = Math.max(pos, r.start)
                          const segEnd = Math.min(tokenEnd, r.end)
                          if (segStart > pos) {
                            segments.push({ start: pos, end: segStart })
                          }
                          segments.push({ start: segStart, end: segEnd, style: r.style })
                          pos = segEnd
                        }
                        if (pos < tokenEnd) {
                          segments.push({ start: pos, end: tokenEnd })
                        }

                        return (
                          <React.Fragment key={tokenIdx}>
                            {segments.map((seg, i) => {
                              const slice = token.content.slice(
                                seg.start - tokenStart,
                                seg.end - tokenStart
                              )
                              const spanProps = { ...tokenProps, children: slice }
                              if (seg.style) {
                                return (
                                  <span
                                    key={i}
                                    {...spanProps}
                                    style={{
                                      ...(tokenProps.style as CSSProperties),
                                      ...seg.style,
                                      color: seg.style.color ?? '#c43333',
                                    }}
                                  />
                                )
                              }
                              return <span key={i} {...spanProps} />
                            })}
                          </React.Fragment>
                        )
                      })}
                    </div>
                  )
                  if (lineIdx < tokens.length - 1) charOffset += 1
                  return lineEl
                })}
              </code>
            </pre>
          </div>
        )
      }}
    </Highlight>
  )
}
