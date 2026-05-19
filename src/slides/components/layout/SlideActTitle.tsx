import type { ReactNode } from 'react'
import { slideActTitleSurfaceClass, type SlideActTitleVariant } from '../../slideActAccent'

export type { SlideActTitleVariant }

export function SlideActTitle({
  title,
  variant,
  children,
}: {
  title: string
  variant: SlideActTitleVariant
  children?: ReactNode
}) {
  const surface = slideActTitleSurfaceClass(variant)
  return (
    <div className="relative flex w-full flex-col items-center justify-center px-8 py-16 sm:px-12">
      <div aria-hidden className={`pointer-events-none fixed inset-0 z-0 ${surface}`.trim()} />
      <h1 className="relative z-10 max-w-[min(100%,80rem)] text-white text-center text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
        {title}
      </h1>
      {children ? (
        <div className="relative z-10 mt-8 flex max-w-[min(100%,72rem)] flex-col items-center gap-4 text-center text-white">
          {children}
        </div>
      ) : null}
    </div>
  )
}
