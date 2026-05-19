import type { ReactNode } from 'react'

export function SlideBody({
  children,
  className = '',
  align = 'center',
  maxContentWidth = 'default',
}: {
  children: ReactNode
  className?: string
  align?: 'start' | 'center'
  maxContentWidth?: 'default' | 'full'
}) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left'

  const widthCap = maxContentWidth === 'full' ? 'max-w-none' : 'max-w-[min(100%,100rem)]'
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 w-full ${widthCap} mx-auto px-2 sm:px-6 gap-6 sm:gap-7 ${alignClasses} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
