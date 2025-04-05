// popup.js
console.log("Popup script loaded");

// Request analysis when popup opens
browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log("Popup requesting analysis");
  browser.tabs.sendMessage(tabs[0].id, { action: "analyzePage" });
});

browser.runtime.onMessage.addListener((message) => {
  console.log("Popup received message:", message);
  if (message.action === "updatePopup") {
    console.log("Updating UI with:", message.data);
    updateUI(message.data);
    speakResults(message.data); // Speak the results when received
  }
});

function updateUI(results) {
  document.getElementById("register").textContent = results.register ? "Found" : "Not Found";
  document.getElementById("register-icon").className = results.register
    ? "fas fa-user-plus found"
    : "fas fa-user-plus not-found";

  document.getElementById("login").textContent = results.login ? "Found" : "Not Found";
  document.getElementById("login-icon").className = results.login
    ? "fas fa-sign-in-alt found"
    : "fas fa-sign-in-alt not-found";

  document.getElementById("addToCart").textContent = results.addToCart ? "Found" : "Not Found";
  document.getElementById("addToCart-icon").className = results.addToCart
    ? "fas fa-cart-plus found"
    : "fas fa-cart-plus not-found";

  document.getElementById("pay").textContent = results.pay ? "Found" : "Not Found";
  document.getElementById("pay-icon").className = results.pay
    ? "fas fa-credit-card found"
    : "fas fa-credit-card not-found";
}

function speakResults(results) {
  const utterance = new SpeechSynthesisUtterance();
  let text = "";
  text += `Register: ${results.register ? "Found" : "Not Found"}. `;
  text += `Login: ${results.login ? "Found" : "Not Found"}. `;
  text += `Add to Cart: ${results.addToCart ? "Found" : "Not Found"}. `;
  text += `Pay: ${results.pay ? "Found" : "Not Found"}.`;
  
  utterance.text = text;
  utterance.lang = "en-US"; // Set language
  utterance.volume = 1.0; // Volume (0.0 to 1.0)
  utterance.rate = 1.0; // Speed (0.1 to 10)
  utterance.pitch = 1.0; // Pitch (0 to 2)

  window.speechSynthesis.speak(utterance);
}

// Add event listener for the speak button (added in popup.html)
document.getElementById("speak").addEventListener("click", () => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: "analyzePage" });
  });
});