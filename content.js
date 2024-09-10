const browser = chrome || browser;

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "showTrustStatus") {
    const categorizations = message.categorization.split('-').map(c => c.trim()).join('\n- ');
    const formattedMessage = `
TrustedSource results for: ${message.url}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: ${message.status}

Categorization:
${categorizations}

Reputation: ${message.reputation}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    alert(formattedMessage);
  } else if (message.action === "showError") {
    alert(message.message);
  }
});