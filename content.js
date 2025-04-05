// Listen for messages from the background script (like when the voice command is recognized)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "read_page") {
      // Read the entire page text using speech synthesis
      const pageText = document.body.innerText; // Get the text from the page
      speakText(pageText);
    }
  });
  
  // Function to speak the text using SpeechSynthesis
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set the language
    window.speechSynthesis.speak(utterance); // Speak the text aloud
  }
  