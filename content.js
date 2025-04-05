// content.js
(function () {
  // Function to check if an element matches a keyword
  function matchesKeyword(element, keywords) {
    const text = (element.textContent || "").toLowerCase().trim();
    const id = (element.id || "").toLowerCase();
    const className = (element.className || "").toLowerCase();
    const value = (element.value || "").toLowerCase(); // For input buttons

    return keywords.some(
      (keyword) =>
        text.includes(keyword) ||
        id.includes(keyword) ||
        className.includes(keyword) ||
        value.includes(keyword)
    );
  }

  // Define keywords for each action
  const actions = {
    register: ["register", "sign up", "create account", "join"],
    login: ["login", "log in", "sign in", "signin"],
    addToCart: ["add to cart", "addtocart", "cart", "add to basket"],
    pay: ["pay", "checkout", "buy now", "purchase", "payment"],
  };

  // Search for buttons, links, and inputs
  const elements = document.querySelectorAll(
    "button, a, input[type='button'], input[type='submit']"
  );

  // Object to store results
  const results = {
    register: false,
    login: false,
    addToCart: false,
    pay: false,
  };

  // Analyze each element
  elements.forEach((element) => {
    for (const [action, keywords] of Object.entries(actions)) {
      if (matchesKeyword(element, keywords)) {
        results[action] = true;
      }
    }
  });

  // Send results to background script or popup
  browser.runtime.sendMessage({
    action: "pageAnalysis",
    data: results,
  });

  // Log to console for debugging
  console.log("Page Analysis:", results);
})();

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "analyzePage") {
    // Re-run the analysis and send results
    const elements = document.querySelectorAll("button, a, input[type='button'], input[type='submit']");
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
    browser.runtime.sendMessage({
      action: "pageAnalysis",
      data: results,
    });
  }
});