document.getElementById('startVoice').addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: 'start_voice' });
    console.log("ceva");
  });
  