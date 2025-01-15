// background.js
chrome.action.onClicked.addListener((tab) => {
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ['content.js'],
  // });
});

// Colorize the badge
// chrome.tabs.onUpdated.addListener(async (tab, changeInfo) => {
//   chrome.action.setBadgeBackgroundColor({ color: 'eee' });
//   chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: 'OFF',
//   });
// });
