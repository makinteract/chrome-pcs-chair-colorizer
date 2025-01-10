function colorize(color) {
  if (document.myInerval) clearInterval(document.myInerval);

  document.myInerval = setInterval(() => {
    const papers = document.querySelectorAll('.paper');
    papers.forEach((paper) => {
      paper.style.backgroundColor = color;
    });
  }, 200);
}

export async function changeBg(color: string) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id) return 'none'; // no tab selected

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: colorize,
    args: [color],
  });
}

// Docs: https://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div

export async function replaceText(replacementText: string) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id) return;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: replaceSelectedText,
    args: [replacementText],
  });
}
