const config = {
  debugMode: true
}

function log() {
  if (config.debugMode) {
    for (argument of arguments) {
      console.log(argument);
    }
  }
}

log("background.js : start");

// When extension is loaded, run front-end script on open tabs.
chrome.runtime.onInstalled.addListener(() => {
  log("background.js : add listeners");
	chrome.tabs.query({
		url: '*://*/*',
	}, tabs => {
		tabs.forEach(tab => {
			chrome.tabs.executeScript(tab.id, {
				file: 'content.js',
				allFrames: true,
			}, result => {
				if (typeof result === 'undefined') {
					const message = chrome.i18n.getMessage('page_not_loaded');
					console.info(message, tab);
				}
			});
		});
	});
});

// Listen for a message from the content script triggered by a hyperlink.
chrome.runtime.onMessage.addListener((message, sender) => {
	if (message.method === 'openLocalFile') {

    log("background.js : openLocalFile message received");

    // Create a new tab for the file url after the sending tab.
    chrome.tabs.create({
      url: message.localFileUrl,
      index: sender.tab.index + 1
    });

	}
});
