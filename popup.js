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
  // Register
  document.getElementById("register").textContent = results.register ? "Found" : "Not Found";
  document.getElementById("register-icon").className = results.register
    ? "fas fa-user-plus found"
    : "fas fa-user-plus not-found";

  // Login
  document.getElementById("login").textContent = results.login ? "Found" : "Not Found";
  document.getElementById("login-icon").className = results.login
    ? "fas fa-sign-in-alt found"
    : "fas fa-sign-in-alt not-found";

  // Add to Cart
  document.getElementById("addToCart").textContent = results.addToCart ? "Found" : "Not Found";
  document.getElementById("addToCart-icon").className = results.addToCart
    ? "fas fa-cart-plus found"
    : "fas fa-cart-plus not-found";

  // Pay
  document.getElementById("pay").textContent = results.pay ? "Found" : "Not Found";
  document.getElementById("pay-icon").className = results.pay
    ? "fas fa-credit-card found"
    : "fas fa-credit-card not-found";
}