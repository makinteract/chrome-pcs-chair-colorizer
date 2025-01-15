export async function changeBgColor(color: string) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id || !color) {
    chrome.action.setBadgeBackgroundColor({ color: '' });
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: '',
    });

    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: colorize,
    args: [color],
  });

  // Save color to storage
  await chrome.storage.local.get(['pcs-chair-bgcolor']);

  // Change BG color of the popup
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({
    tabId: tab.id,
    text: 'ON',
  });
}

// Helper
function colorize(color: string) {
  const prevInterval = localStorage.getItem('interval');
  if (prevInterval) {
    clearInterval(prevInterval);
  }

  const UPDATE_INTERVAL = 100;

  const interval = setInterval(() => {
    const papers = Array.from(
      document.querySelectorAll('li.acPaper') as NodeListOf<HTMLElement>
    );
    papers?.forEach((paper) => {
      paper.style.backgroundColor = color;
    });
  }, UPDATE_INTERVAL);
  localStorage.setItem('interval', `${interval}`);
}

export async function resetColor() {
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
  try {
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
  } catch (e) {
    return 'No URL found';
  }
}
