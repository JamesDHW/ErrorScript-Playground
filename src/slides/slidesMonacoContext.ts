import { createContext } from 'react'
import type { SlidesMonacoApi } from '../lib/loadSandbox'

export const SlidesMonacoContext = createContext<SlidesMonacoApi | null>(null)
