// content.js

// Dispatch messags
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // console.log('Message received', request);
  if (request.action === 'changeBgColor') {
    colorize(request.color);
    sendResponse({ response: 'ok' });
  } else if (request.action === 'reloadPage') {
    reloadPage();
    sendResponse({ response: 'ok' });
  }
});

function colorize(color) {
  if (!color) return;

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
