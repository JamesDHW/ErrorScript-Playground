/* eslint-disable react-refresh/only-export-components -- slide deck manifest */
import type { SlideEntry } from './slideTypes'
import { setupSlides } from './content/setupSlides'
import { demoSlides } from './content/demoSlides'
import { critiqueSlides } from './content/critiqueSlides'
import { closeSlides } from './content/closeSlides'

export const SLIDE_DECK: SlideEntry[] = [
  ...setupSlides,
  ...demoSlides,
  ...critiqueSlides,
  ...closeSlides,
]

export const SLIDE_COUNT = SLIDE_DECK.length
