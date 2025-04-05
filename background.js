// background.js
console.log("Background script loaded");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pageAnalysis") {
    console.log("Background received analysis:", message.data);
    // Forward to popup
    browser.runtime.sendMessage({
      action: "updatePopup",
      data: message.data,
    });
  }
});

browser.commands.onCommand.addListener((command) => {
  if (command === "start_voice") {
    console.log("Voice command started!");
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: "startVoice" });
    });
  }
});