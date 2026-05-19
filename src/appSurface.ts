/**
 * Shared light dot grid + brand/TS wash. One `background-image` so utilities do not override each other.
 */
export const APP_GRADIENT_BG =
  'bg-[length:24px_24px,auto] bg-[image:radial-gradient(circle_at_center,rgb(196_51_51_/_0.11)_1px,transparent_1px),linear-gradient(168deg,rgb(245_245_244)_0%,rgb(250_250_249)_22%,rgb(255_255_255)_48%,rgb(224_242_254)_78%,rgb(254_233_233)_100%)]'

/** Full-viewport column: gradient + route outlet (nav optional). */
export const APP_ROOT_SHELL_CLASS = `min-h-dvh flex w-full flex-col overflow-x-hidden ${APP_GRADIENT_BG}`

/** Slides `<main>` chrome; gradient is painted by `App` shell so it is not doubled. */
export const SLIDES_PAGE_MAIN_CLASS =
  'relative isolate flex min-h-[100dvh] w-full flex-col overflow-x-hidden text-zinc-950 outline-none'
