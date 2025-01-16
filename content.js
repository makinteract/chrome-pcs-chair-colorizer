// content.js

// Dispatch messags
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'changeBgColor') {
    colorize(request.color);
  } else if (request.action === 'reloadPage') {
    reloadPage();
  } else if (request.action === 'getURL') {
    const url = window.location.href;
    sendResponse({ response: url });
  }
});

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
