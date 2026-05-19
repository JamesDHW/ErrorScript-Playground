import type { ReactNode } from 'react'

export function SlideDeckMainBody({
  slideKey,
  content,
  hasPanel,
  codeOnlyPanel,
  codeCard,
}: {
  slideKey: number
  content: ReactNode
  hasPanel: boolean
  codeOnlyPanel: boolean
  codeCard: ReactNode
}) {
  if (!hasPanel) {
    return (
      <div className="flex flex-col min-h-0 w-full my-auto overflow-y-auto overflow-x-hidden px-6 py-8 sm:px-10 sm:py-10">
        <div
          key={slideKey}
          className="flex flex-col flex-1 min-h-0 w-full max-w-none justify-center items-center"
        >
          {content ?? null}
        </div>
      </div>
    )
  }

  if (codeOnlyPanel) {
    return (
      <div className="flex-1 flex min-h-0 w-full items-center justify-center overflow-auto p-6 sm:p-8">
        {codeCard}
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto max-lg:overflow-x-hidden lg:flex-row lg:items-stretch lg:gap-12 lg:overflow-x-visible">
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-center">
        <div key={slideKey} className="mx-auto flex min-h-0 w-full flex-col justify-center lg:max-w-[min(100%,52rem)]">
          {content ?? null}
        </div>
      </div>
      <aside className="flex w-full min-h-0 min-w-0 flex-col items-center justify-center py-1 lg:w-auto lg:flex-1 lg:self-stretch lg:sticky lg:top-8 lg:px-5">
        {codeCard}
      </aside>
    </div>
  )
}
