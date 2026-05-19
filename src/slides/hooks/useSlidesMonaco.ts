import { useContext } from 'react'
import type { SlidesMonacoApi } from '../../lib/loadSandbox'
import { SlidesMonacoContext } from '../slidesMonacoContext'

export function useSlidesMonaco(): SlidesMonacoApi {
  const monaco = useContext(SlidesMonacoContext)
  if (!monaco) {
    throw new Error('Slide static code must render under SlidesMonacoRoot')
  }
  return monaco
}
