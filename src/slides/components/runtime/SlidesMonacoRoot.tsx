import { use, useMemo, type ReactNode } from 'react'
import { getSlidesMonacoEditorApi } from '../../../lib/loadSandbox'
import { SlidesMonacoContext } from '../../slidesMonacoContext'

export function SlidesMonacoRoot({ children }: { children: ReactNode }) {
  const monacoPromise = useMemo(() => getSlidesMonacoEditorApi(), [])
  const monaco = use(monacoPromise)
  return <SlidesMonacoContext.Provider value={monaco}>{children}</SlidesMonacoContext.Provider>
}
