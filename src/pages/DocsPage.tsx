import { MarkdownContent } from '../components/MarkdownContent'

import specContent from '../content/spec.md?raw'

export function DocsPage() {
  return (
    <main className="min-h-[calc(100vh-52px)] bg-gray-50">
      <article className="px-4 py-8 max-w-[720px] mx-auto md:px-8 md:py-12">
        <MarkdownContent content={specContent} />
      </article>
    </main>
  )
}
