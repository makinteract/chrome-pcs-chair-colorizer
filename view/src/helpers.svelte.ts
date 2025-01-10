function colorize(color) {
  const prevInterval = localStorage.getItem('interval');
  if (prevInterval) {
    clearInterval(prevInterval);
  }

  const interval = setInterval(() => {
    const papers = document.querySelectorAll('.paper');
    papers.forEach((paper) => {
      paper.style.backgroundColor = color;
    });
  }, 200);
  localStorage.setItem('interval', interval);
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

export async function reloadPage() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id) return 'none'; // no tab selected

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      window.location.reload();
    },
  });
}

export async function getURL(): Promise<string | undefined> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id) return 'none'; // no tab selected

  const [res] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.URL,
  });

  return res.result;
}
