export type PlaygroundCompilerParts = {
  target: number
  module: number
  strict: boolean
  jsx: number
}

export function buildPlaygroundCompilerOptions({
  target,
  module: moduleKind,
  strict,
  jsx,
}: PlaygroundCompilerParts): Record<string, unknown> {
  return {
    target,
    module: moduleKind,
    strict,
    jsx,
    noEmit: false,
    checkedErrors: true,
  }
}
