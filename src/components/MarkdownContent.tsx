import type { Components } from 'react-markdown'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock'

export function getCodeChild(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
    return children[0]
  }
  return String(children)
}

export const baseMarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-xl font-semibold text-[#1a1a1a] mb-4 mt-0 break-words md:text-2xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold text-[#1a1a1a] mt-8 mb-3 break-words md:text-xl first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-[#1a1a1a] mt-6 mb-2 break-words md:text-lg">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-semibold text-[#1a1a1a] mt-4 mb-2 break-words md:text-base">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="leading-[1.65] text-gray-700 mb-4 last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="leading-[1.65] text-gray-700 mb-4 pl-6 list-disc">{children}</ul>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  code: ({ className, children, ...props }) => {
    const code = getCodeChild(children)
    const isFenced = Boolean(className?.startsWith('language-'))
    if (isFenced) {
      return (
        <div data-spec-fenced className="my-4">
          <CodeBlock snippet={{ code: code.trim(), highlights: [] }} visible />
        </div>
      )
    }
    return (
      <code
        className="bg-gray-200 px-1.5 py-0.5 rounded text-[#1a1a1a] font-mono text-[0.9em]"
        {...props}
      >
        {children}
      </code>
    )
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-[#1a1a1a]">{children}</strong>
  ),
}

type MarkdownContentProps = {
  content: string
  componentOverrides?: Partial<Components>
}

export function 
MarkdownContent({ content, componentOverrides = {} }: MarkdownContentProps) {
  return (
    <ReactMarkdown components={{ ...baseMarkdownComponents, ...componentOverrides }}>
      {content}
    </ReactMarkdown>
  )
}
