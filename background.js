// background.js

// Load the content script
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (tab.active && tab.status == 'complete') {
    const url = tab.url;

    if (url && url.includes('pcschair.org/venues/')) {
      // chrome.action.openPopup(); // open up the popup automatically
      // Colorize if with default
      chrome.storage.local.get(['pcs-chair-bgcolor'], (data) => {
        const color = data['pcs-chair-bgcolor'];
        if (!color) return;
        chrome.tabs.sendMessage(tabId, { action: 'changeBgColor', color });
        chrome.action.setBadgeBackgroundColor({ color });
        chrome.action.setBadgeText({
          tabId,
          text: 'ON',
        });
      });
    }
  }
});
