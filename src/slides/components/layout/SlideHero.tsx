import type { ReactNode } from 'react'

export function SlideHero({
  title,
  subtitle,
  align = 'center',
  className = '',
}: {
  title: string
  subtitle?: string | ReactNode
  align?: 'center' | 'start'
  className?: string
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-3 sm:gap-4 ${alignCls} ${className}`.trim()}>
      <h1 className="text-3xl sm:text-5xl md:text-9xl font-bold text-zinc-950 leading-[1.05] tracking-tight">
        {title}
      </h1>
      {subtitle ? (
        <p
          className={`text-xl sm:text-2xl md:text-4xl font-semibold leading-snug`.trim()}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
