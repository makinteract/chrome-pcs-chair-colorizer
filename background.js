// background.js

// Load the content script on click
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      updatePage(tab);
    });
  });
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  updatePage(tab);
});

function updatePage(tab) {
  if (tab.active && tab.status == 'complete') {
    const url = tab.url;
    const tabId = tab.id;

    if (url && url.includes('pcschair.org/venues/')) {
      // chrome.action.openPopup(); // open up the popup automatically
      // Inject the content script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });

      // Colorize the page
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
}
