import { Link } from 'react-router-dom'
import { MarkdownContent } from '../components/MarkdownContent'

import aboutContent from '../content/about.md?raw'

export function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-52px)] bg-gray-50">
      <article className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12 md:pt-8 pb-12 md:pb-16">
        <MarkdownContent
          content={aboutContent}
          componentOverrides={{
            a: ({ href, children }) => {
              if (href?.startsWith('/')) {
                return <Link to={href} className="text-brand no-underline font-medium">{children}</Link>
              }
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand no-underline font-medium"
                >
                  {children}
                </a>
              )
            },
          }}
        />
      </article>
    </main>
  )
}
