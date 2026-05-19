import type { SandboxApi } from '../../lib/loadSandbox'

export function layoutSandboxEditor(sandbox: SandboxApi | null): void {
  if (!sandbox) return
  const editor = (sandbox as { editor?: { layout?: () => void } }).editor
  editor?.layout?.()
}
