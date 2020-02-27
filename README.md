# File URI Handler

This Chromium extension intercepts file hyperlinks and open them in a new tab.

This is useful because in Chrome and Edge Chromium, hyperlinks to files are blocked by default.


## Configuration

The `config` variables at the beginning of the two script files have some fine tuning options.

To allow file links only from white-listed hosts, modify `scripts/content.js` (e.g.):

    requireValidHost: true,
    validHosts: [
      'A:', 'S:', 'Y:', 'T:',
      'domain1.chelan',
      'bear'
    ]

To require that only hyperlinks clicked by a user be allowed, set this value:

    onlyTrustedLinks: true

To see debug messages in the console, change this value in both script files:

    debugMode: true


## Installation

### Development

With a Chrome or Edge Chromium browser in developer mode, an extension may be side-loaded.

1. Open the Extension Management page by navigating to chrome://extensions.
  - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over *More Tools* then selecting Extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory (containing this README.md).

### Enterprise

https://support.google.com/chrome/a/answer/9296680?hl=en
https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/enterprise/hosting-and-updating


## References

For info on Chromium extensions, see:

- https://developer.chrome.com/extensions
- https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/


## Credits

**Base Code by tksugimoto**
https://github.com/tksugimoto/chrome-extension_open-local-file-link

**Icon by By Viktor Ostrovsky**
(cc) Creative Commons
https://thenounproject.com/term/broken-link/659302