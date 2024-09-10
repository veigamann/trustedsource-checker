const products = [
  { id: "01-ts", name: "Trellix Real-Time Database" },
  { id: "02-ts", name: "Skyhigh Secure Web Gateway for Cloud (SWG for Cloud and SWG Hybrid)" },
  { id: "03-xl", name: "Skyhigh Secure Web Gateway Appliances (SWG for On-Prem) - On-Prem Only" },
  { id: "04-ts", name: "Skyhigh Secure Web Gateway Appliances (SWG for On-Prem) - with GTI Lookup" },
  { id: "05-ts-3", name: "Trellix Endpoint Security Web Control" },
  { id: "06-xl", name: "Trellix SmartFilter XL" },
  { id: "07-xl-1", name: "Trellix SmartFilter 4.2 (XL-1)" }
];

browser.contextMenus.create({
  id: "check-trustedsource",
  title: "Check TrustedSource",
  contexts: ["link", "selection"]
});

products.forEach(product => {
  browser.contextMenus.create({
    id: `check-trustedsource-${product.id}`,
    parentId: "check-trustedsource",
    title: product.name,
    contexts: ["link", "selection"]
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith("check-trustedsource-")) {
    let url = info.linkUrl || info.selectionText;
    let productId = info.menuItemId.split("-").slice(-2).join("-");
    if (url) {
      checkTrustedSource(url, productId, tab.id);
    }
  }
});

async function checkTrustedSource(url, productId, tabId) {
  const trustedSourceUrl = 'https://trustedsource.org/en/feedback/url';

  const formData = new FormData();
  formData.append('sid', '');
  formData.append('e', Math.floor(Date.now() / 1000) + 3600); // Current timestamp + 1 hour
  formData.append('c', generateRandomString(64));
  formData.append('p', '');
  formData.append('action', 'checksingle');
  formData.append('product', productId);
  formData.append('url', url);

  try {
    const response = await fetch(trustedSourceUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
        'Origin': 'https://trustedsource.org',
        'Referer': 'https://trustedsource.org/'
      }
    });

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const resultRow = doc.querySelector('.result-table tr:nth-child(2)');
    if (resultRow) {
      const status = resultRow.querySelector('td:nth-child(3)').textContent.trim();
      const categorization = resultRow.querySelector('td:nth-child(4)').textContent.trim().replace(/\n/g, ', ');
      const reputation = resultRow.querySelector('td:nth-child(5)').textContent.trim();

      browser.tabs.sendMessage(tabId, {
        action: "showTrustStatus",
        url: url,
        status: status,
        categorization: categorization,
        reputation: reputation
      });
    } else {
      throw new Error('Unable to find result in the response');
    }
  } catch (error) {
    console.error('Error checking TrustedSource:', error);
    browser.tabs.sendMessage(tabId, {
      action: "showError",
      message: "Error checking TrustedSource. Please try again."
    });
  }
}

function generateRandomString(length) {
  const characters = 'abcdef0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}