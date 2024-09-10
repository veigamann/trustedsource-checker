# TrustedSource Link Checker

A browser extension that allows users to check the trustworthiness of URLs using TrustedSource.org's API. This extension adds a context menu item to easily check links or selected text against various TrustedSource products. It works with Firefox, Chrome, and other Chromium-based browsers like Edge.

## Features

- Right-click context menu integration for quick URL checking
- Support for multiple TrustedSource products
- Displays URL status, categorization, and reputation
- Easy to use and integrate into your browsing workflow
- Cross-browser compatibility (Firefox, Chrome, Edge, and other Chromium-based browsers)

## Installation

### Firefox

1. Clone this repository or download the source code.
2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" in the left sidebar.
4. Click on "Load Temporary Add-on" and select the `manifest.json` file from the extension directory.

### Chrome, Edge, and other Chromium-based browsers

1. Clone this repository or download the source code.
2. Open your Chromium-based browser and navigate to the extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable "Developer mode" using the toggle switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage

1. Right-click on a link or select text containing a URL.
2. Hover over "Check TrustedSource" in the context menu.
3. Select the desired TrustedSource product from the submenu.
4. View the results in the alert pop-up.

## Supported TrustedSource Products

- Trellix Real-Time Database
- Skyhigh Secure Web Gateway for Cloud (SWG for Cloud and SWG Hybrid)
- Skyhigh Secure Web Gateway Appliances (SWG for On-Prem) - On-Prem Only
- Skyhigh Secure Web Gateway Appliances (SWG for On-Prem) - with GTI Lookup
- Trellix Endpoint Security Web Control
- Trellix SmartFilter XL
- Trellix SmartFilter 4.2 (XL-1)

## Development

This extension is built using WebExtensions API, which provides cross-browser compatibility. The main components are:

- `manifest.json`: Extension metadata and permissions
- `background.js`: Handles context menu creation and API requests
- `content.js`: Displays results on the active tab

To modify the extension, edit these files and reload the extension in your browser's extension management page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is not officially affiliated with TrustedSource.org or any of the mentioned products. Use it at your own risk and ensure compliance with TrustedSource.org's terms of service.