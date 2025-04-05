let recognition;
let isListening = false;

// Initialize Speech Recognition
function initSpeechRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    console.log("Voice recognition started");
    isListening = true;
  };

  recognition.onresult = function(event) {
    const command = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log("Voice command: ", command);
    handleCommand(command);
  };

  recognition.onerror = function(event) {
    console.log("Error in voice recognition: ", event.error);
  };

  recognition.onend = function() {
    console.log("Voice recognition stopped");
    isListening = false;
  };
}

// Start voice recognition
chrome.commands.onCommand.addListener((command) => {
  if (command === 'start_voice' && !isListening) {
    recognition.start();
  } else if (isListening) {
    recognition.stop();
  }
});

// Handle the voice command
function handleCommand(command) {
  if (command.includes('scroll down')) {
    document.documentElement.scrollTop += 200;  // Scroll down the page
    speak("Scrolling down.");
  } else if (command.includes('scroll up')) {
    document.documentElement.scrollTop -= 200;  // Scroll up the page
    speak("Scrolling up.");
  }
//   } else if (command.includes('click')) {
//     const link = document.querySelector('a');
//     if (link) {
//       link.click();  // Click the first link on the page
//       speak("Clicking the first link.");
//     } else {
//       speak("No link found.");
//     }
//   } else {
//     speak("Command not recognized.");
//   }
}

// Provide audio feedback
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Initialize the speech recognition on load
initSpeechRecognition();
