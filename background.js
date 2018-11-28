var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20);
var expired = false;

chrome.runtime.onMessage.addListener(function (message, callback) {
    if (message.greeting == "reset") {
      expired = false;
    }
    if (message.greeting == "timePassed") {
        chrome.tabs.insertCSS(null, {
            file: 'change.css'
        });
        audio = new Audio();
        audio.src = "audio/beep.mp3"
        audio.play();
        expired = true;
    }
    else if (message.greeting == "storeTimes") {
        totalTime = parseInt(message.time);
        if (chrome.storage.sync.get(['totalTime']) == null) {
            chrome.storage.sync.set({ "totalTime": totalTime }, function () {
                console.log('Value is set to ' + totalTime);
            });
        } else {
            chrome.storage.sync.set({ "totalTime": parseInt(chrome.storage.sync.get(['totalTime'])) + totalTime }, function () {
                console.log('Value increased by ' + totalTime);
            });
        }
    }
});
