// content.js
(function () {
  function matchesKeyword(element, keywords) {
    const text = (element.textContent || "").toLowerCase().trim();
    const id = (element.id || "").toLowerCase();
    const className = (element.className || "").toLowerCase();
    const value = (element.value || "").toLowerCase();
    return keywords.some(
      (keyword) =>
        text.includes(keyword) ||
        id.includes(keyword) ||
        className.includes(keyword) ||
        value.includes(keyword)
    );
  }

  const actions = {
    register: ["register", "sign up", "create account", "join"],
    login: ["login", "log in", "sign in", "signin"],
    addToCart: ["add to cart", "addtocart", "cart", "add to basket"],
    pay: ["pay", "checkout", "buy now", "purchase", "payment"],
  };

  const elements = document.querySelectorAll(
    "button, a, input[type='button'], input[type='submit']"
  );

  const results = {
    register: false,
    login: false,
    addToCart: false,
    pay: false,
  };

  elements.forEach((element) => {
    for (const [action, keywords] of Object.entries(actions)) {
      if (matchesKeyword(element, keywords)) {
        results[action] = true;
      }
    }
  });

  // Debugging: Log results to console
  console.log("Content script results:", results);

  // Send results to background script
  browser.runtime.sendMessage({
    action: "pageAnalysis",
    data: results,
  });

  // Listen for popup requests
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === "analyzePage") {
      console.log("Popup requested analysis");
      browser.runtime.sendMessage({
        action: "pageAnalysis",
        data: results,
      });
    }
  });
})();