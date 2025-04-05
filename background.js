console.log("Background script loaded");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pageAnalysis") {
    const results = message.data;
    console.log("Received page analysis:", results);

    // Example: Send results to popup if open
    browser.runtime.sendMessage({
      action: "updatePopup",
      data: results,
    });
  }
});

// Handle the voice command
browser.commands.onCommand.addListener((command) => {
  if (command === "start_voice") {
    console.log("Voice command started!");
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: "startVoice" });
    });
  }
});
