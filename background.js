var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20);
var expired = false;
var visitedYouTube = false;

chrome.runtime.onMessage.addListener(function (message, callback) {
    if (message.greeting == "checkVisited") {
        if (visitedYouTube) {
            sendMessageToCurrentTab({
                greeting: "visited"
            });
            chrome.tabs.insertCSS(null, {
                file: 'change.css'
            });
        }
        else {
            sendMessageToCurrentTab({
                greeting: "notvisited"
            });
        }
    }
    else if (message.greeting == "timePassed") {
        chrome.tabs.insertCSS(null, {
            file: 'change.css'
        });
        audio = new Audio();
        audio.src = "audio/beep.mp3"
        audio.play();
        expired = true;
        visitedYouTube = true;
    }

    else if (message.greeting == "storeTimes") {
        totalTime = parseInt(message.time);
        if (chrome.storage.sync.get(['total']) == null) {
            chrome.storage.sync.set({ ["total"]: totalTime }, function () {
                alert('Data input');
            });
        } else {
            originalTime = parseInt(chrome.storage.sync.get(['total']));
            chrome.storage.sync.set({ ["total"]: totalTime + originalTime }, function () {
                alert('Data updated');
            });
        }
    }
});

function sendMessageToCurrentTab(msg) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}
