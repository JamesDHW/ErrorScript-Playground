import type { ReactNode } from 'react'

export function SlideFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 min-w-0 w-full mx-auto self-stretch justify-center px-4 sm:px-10 md:px-14 py-auto gap-8 sm:gap-10 ${className}`.trim()}
    >
      {children}
    </div>
  )
}
