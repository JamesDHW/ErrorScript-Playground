export function monacoAncestorFocused(): boolean {
  const { activeElement } = document
  if (!activeElement || typeof activeElement.closest !== 'function') return false
  return Boolean(activeElement.closest('.monaco-editor'))
}
