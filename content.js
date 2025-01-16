// // content.js
const DEFAULT_COLOR = '#e6e909';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'changeBgColor') {
    changeBgColor(request.tabId, request.color);
    sendResponse({ result: 'ok' });
  } else if (request.action === 'resetColor') {
    resetColor(request.tabId);
    sendResponse({ result: 'ok' });
  } else if (request.action === 'getURL') {
    sendResponse({ result: document.URL });
  } else if (request.action === 'loadInitialColor') {
    const color = await loadInitialColor(request.tabId);
    sendResponse({ result: color });
  }
});

async function loadInitialColor(tabId) {
  return new Promise((resolve, _) => {
    chrome.storage.local.get(['pcs-chair-bgcolor'], (result) => {
      // Change BG color of the popup
      const color = result['pcs-chair-bgcolor'] || DEFAULT_COLOR;
      colorize(color);
      // Change badge color
      chrome.runtime.sendMessage({
        action: 'changeBadgeColor',
        color,
        tabId,
      });
      resolve(color);
    });
  });
}

async function changeBgColor(tabId, color) {
  // Save color to storage
  await chrome.storage.local.set({ 'pcs-chair-bgcolor': color });
  // Change BG color of the popup
  colorize(color);
  // Change badge color
  chrome.runtime.sendMessage({
    action: 'changeBadgeColor',
    color,
    tabId,
  });
}

async function resetColor(tabId) {
  // Save color to storage
  await chrome.storage.local.set({ 'pcs-chair-bgcolor': '' });
  // Change BG color of the popup
  reloadPage();
  // Change badge color
  chrome.runtime.sendMessage({
    action: 'changeBadgeColor',
    color: '',
    tabId,
  });
}

function colorize(color) {
  const prevInterval = localStorage.getItem('interval');
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

function reloadPage() {
  window.location.reload();
}
