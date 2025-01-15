// content.js
// alert('Ready');

async function colorize(color) {
  const prevInterval = await chrome.storage.local.get(['pcs-chair-bgcolor']);
  if (prevInterval) {
    clearInterval(prevInterval);
  }

  const UPDATE_INTERVAL = 100;

  const interval = setInterval(() => {
    const papers = Array.from(document.querySelectorAll('li.acPaper'));
    papers?.forEach((paper) => {
      paper.style.backgroundColor = color;
    });
  }, UPDATE_INTERVAL);
  localStorage.setItem('interval', `${interval}`);
}

async function getURL() {
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

// const DEFAULT_COLOR = '#e6e909';
const DEFAULT_COLOR = '#ff0000';
let hex = await chrome.storage.local.get(['pcs-chair-bgcolor']);
console.log('hex:', hex);
colorize(hex);
