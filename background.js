// background.js

// Load the content script
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

(async function () {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  tabs.forEach((tab) => {
    console.log(tab);
    initialize(tab);
  });
})();

chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      initialize(tab);
    });
  });
});

chrome.tabs.onHighlighted.addListener(async function (activeInfo) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  initialize(tab);
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  initialize(tab);
});

function initialize(tab) {
  if (tab.active && tab.status == 'complete') {
    const url = tab.url;
    const tabId = tab.id;

    if (url && url.includes('pcschair.org/venues/')) {
      // chrome.action.openPopup(); // open up the popup automatically
      // Colorize if with default
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });

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
