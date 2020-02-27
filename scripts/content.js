const config = {
  debugMode: true,
  onlyTrustedLinks: false,
  requireValidHost: false,
  validHosts: [
    'A:', 'S:', 'Y:', 'T:'
  ]
}

function log() {
  if (config.debugMode) {
    for (argument of arguments) {
      console.log(argument);
    }
  }
}

// This click event applies to any element in the entire window.
window.addEventListener('click', event => {

  log("content.js : click", event);

	// Check if the event is fired by a user action.
	if (config.onlyTrustedLinks && !event.isTrusted) return;

  // Find the anchor element that wraps the clicked element.
  let target = event.target;
	while (target && target.tagName.toLowerCase() !== 'a') {
		target = target.parentElement;
  }
  
  // The originating DOM element has to be an anchor. We do not want to
  // respond to javascript events.
	if (target) {

    log("content.js : target", target);

		// Anchors in SVG objects keep their URL in the baseVal property.
    let url = target instanceof SVGAElement ? target.href.baseVal : target.href;

    // Check if the host is on the whitelist.
    if (config.requireValidHost) {
      const host = url.replace(/file:\/\/\/?([^\/]+).*/, "$1");
      log("content.js : host", host);
      if (config.validHosts.indexOf(host) === -1) return;
    }
    
    // Extract the actual file url from the url in cases where the link is a
    // JavaScript window.open command or similar.
    if (!url.startsWith('file://'))
      url = url.replace(/.*(file:\/\/[^"']+).*/gi, "$1");

    log("content.js : url", url);

    // Look for file links ony. When Chromium recognizes a file link, it will
    // rewrite the click event in the file:// format, so the browser does that
    // hard work for us.
    if (url.startsWith('file://')) {

      log("content.js : allowing", url);

      // Don't follow through with the hyperlink event.
      event.preventDefault();
      
      // Instead, the background script will open a new tab.
			try {
        // Send a message to be received by the background script.
				chrome.runtime.sendMessage({
					method: 'openLocalFile',
					localFileUrl: url,
				});
        log("content.js : openLocalFile message sent");
			} catch (e) {
        // Catch any error that trigger when the extension is reloaded.
        log("content.js : error sending openLocalFile message", e);
      }

    }
    
	}
}, {
  // Own the click event until we are done with it.
	capture: true,
});