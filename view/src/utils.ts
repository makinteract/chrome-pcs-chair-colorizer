export async function setBadge({ text = '', color = '' }) {
  const tabId = await getTabId();
  if (!tabId) return;
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({
    tabId,
    text,
  });
}

export function resetBadge() {
  setBadge({ text: '', color: '' });
}

export async function getActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
}

async function getTabId() {
  const tab = await getActiveTab();
  return tab.id;
}

export async function sendMessageToContent(message: Object) {
  // Promisify the call
  const tabId = await getTabId();
  if (!tabId) return;
  return new Promise((resolve, _) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      resolve(response);
    });
  });
}

export async function getURL() {
  const tab = await getActiveTab();
  return tab.url;
}
