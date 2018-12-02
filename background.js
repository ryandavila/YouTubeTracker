
var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20);
var expired = false;
var visitedYouTube = false;
var times = [];
var total_time_spent = localStorage.getItem('timeSpent');

setInterval(function() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      if (tabs[0].url.includes("youtube.com")) {
        const timeSpent = localStorage.getItem('timeSpent');
        if (!timeSpent) {
          localStorage.setItem('timeSpent', 1);
        } else {
          var newval = parseInt(localStorage.getItem('timeSpent'))+1
          localStorage.setItem('timeSpent', newval)
        }
      }
  });
}, 1000);

function getTimeSpend() {
  return localStorage.getItem('timeSpent');
}


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
    else if (message.greeting == "checkTotalTime") {
      chrome.runtime.sendMessage({
          greeting: "sendtime",
          seconds: getTimeSpend().toString()
      })
    }
    else if (message.greeting == "resetTotalTime") {
        localStorage.setItem('timeSpent', 0)
    }
});


/** if (window.location.toString().includes("youtube.com")) {
  console.log("YES")
  window.onload = function onload() {
    const now = new Date();
    const lastLeave = localStorage.getItem('lastLeave');
    if (!lastLeave || now - lastLeave >= (1000*60)) {
      localStorage.setItem('lastEnter', now);
    }
  }
  window.onunload = function onunload() {
    localStorage.setItem('lastLeave', new Date());
  }
} */

/**
window.onload = function onload() {
  const now = new Date();
  const lastLeave = localStorage.getItem('lastLeave');
  if (!lastLeave || now - lastLeave >= (1000*60)) {
    localStorage.setItem('lastEnter', now);
  }
}
window.onunload = function onunload() {
  localStorage.setItem('lastLeave', new Date());
}

function getTimeSpend() {
  return new Date() - localStorage.getItem('lastEnter');
} */












function sendMessageToCurrentTab(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}
