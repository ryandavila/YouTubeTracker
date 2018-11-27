var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20);

chrome.runtime.onMessage.addListener(bgListener);

function bgListener(message, sender, sendResponse) {
    if (message.greeting == "test") {
        chrome.runtime.sendMessage({
            greeting: "continue timer"
        });
    }
}

chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message.greeting== "timePassed") {
        chrome.tabs.insertCSS(null, {
            file: 'change.css'
        });
        audio = new Audio();
        audio.src = "audio/beep.mp3"
        audio.play();
    }
});