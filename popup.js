// popup.js
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "updatePopup") {
    const results = message.data;
    updateUI(results);
  }
});

// Request analysis when popup opens
browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  browser.tabs.sendMessage(tabs[0].id, { action: "analyzePage" });
});

function updateUI(results) {
  document.getElementById("register").textContent = results.register ? "Found" : "Not Found";
  document.getElementById("register").className = results.register ? "found" : "not-found";

  document.getElementById("login").textContent = results.login ? "Found" : "Not Found";
  document.getElementById("login").className = results.login ? "found" : "not-found";

  document.getElementById("addToCart").textContent = results.addToCart ? "Found" : "Not Found";
  document.getElementById("addToCart").className = results.addToCart ? "found" : "not-found";

  document.getElementById("pay").textContent = results.pay ? "Found" : "Not Found";
  document.getElementById("pay").className = results.pay ? "found" : "not-found";
}