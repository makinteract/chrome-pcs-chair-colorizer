// background.js

// Load the content script
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

chrome.tabs.onUpdated.addListener(function (tabid, changeInfo, tab) {
  if (tab.active && tab.status == 'complete') {
    // console.log('Tab updated', tab);
    chrome.tabs.sendMessage(
      tabid,
      { action: 'getURL' },
      function ({ response }) {
        console.log('Response received', response);
        if (response.includes('pcschair.org/venues/')) {
          chrome.action.openPopup(); // open up the popup automatically
        }
      }
    );
  }
});
