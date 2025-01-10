export function replaceSelectedText(replacementText: string) {
  if (!window.getSelection) return '';
  const sel = window.getSelection();
  const range = sel?.getRangeAt(0);
  range?.deleteContents();
  range?.insertNode(document.createTextNode(replacementText));
}

export function getSelection() {
  return window.getSelection()?.toString();
}

export function getDocTitle() {
  return document.title;
}
