// background.js

// Load the content script
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

// Listen for messages from content.js
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // console.log('request:', request, sender);
  if (request.action === 'changeBadgeColor') {
    // const tabId = await getCurrentTabId();
    setBadge(request.tabId, { text: 'ON', color: request.color });
    sendResponse({ ack: 'OK' });
  }
});

// Badge
function setBadge(tabId, { text = '', color = '' }) {
  if (!tabId) return;
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({
    tabId,
    text,
  });
}

function resetBadge(tabId) {
  setBadge(tabId, { text: '', color: '' });
}
