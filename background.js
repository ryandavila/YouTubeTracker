var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20);
var visitedYouTube = false;
var times = [];
var total_time_spent = localStorage.getItem('timeSpent');

var expired = false;
var intervention = true; 

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

function getTimeSpent() {
  return localStorage.getItem('timeSpent');
}


chrome.runtime.onMessage.addListener(function (message, callback) {
  console.log(message);
  if (message.greeting == "checkIntervention") {
    if (intervention) {
    chrome.runtime.sendMessage({
      greeting: "interventionOn"
    });
  }  else {
    chrome.runtime.sendMessage({
      greeting: "interventionOff"
    });
  }
} else if (message.greeting == "turnOn") {
  intervention = true;
} else if (message.greeting == "turnOff") {
  intervention = false;
}

  else if (message.greeting == "checkVisited") {
        if (visitedYouTube && intervention) {
            sendMessageToCurrentTab({
                greeting: "visited"
            });
            insertIntoTabs();
            audio.play();
        }
        else {
            sendMessageToCurrentTab({
                greeting: "notvisited"
            });
            if (typeof audio !== 'undefined') {
              audio.pause();
              audio.currentTime = 0;
            }
        }
    }
    else if (message.greeting == "timePassed" && intervention) {
        insertIntoTabs();
        audio = new Audio();
        audio.src = "audio/beep.mp3"
        audio.play();
        expired = true;
        visitedYouTube = true;
    }
    else if (message.greeting == "checkTotalTime") {
      chrome.runtime.sendMessage({
          greeting: "sendtime",
          seconds: getTimeSpent().toString()
      })
    }
    else if (message.greeting == "resetTotalTime") {
        localStorage.setItem('timeSpent', 0)
    }
});

function sendMessageToCurrentTab(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

function insertIntoTabs() {
  chrome.tabs.query({url: "https://www.youtube.com/*"}, function(tabs) {
    console.log(tabs);
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.insertCSS(tabs[i].id, {
        file: 'change.css'
    });
    }
  })
}