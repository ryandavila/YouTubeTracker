chrome.runtime.onMessage.addListener(popupListener);
var time;
var total_time;
var intervention = true;

var background = chrome.extension.getBackgroundPage();

chrome.runtime.sendMessage({
  greeting: "checkIntervention"
});

function popupListener(message) {
  console.log(message);
  if (message.greeting == "continue timer") {
    document.getElementById("timer").innerHTML = message.minutes + "m "
      + message.seconds + "s";
  }
  else if (message.greeting == "timePassed") {
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
  else if (message.greeting == "timesSent") {
    time = message.time
  }
  else if (message.greeting == "sendtime") {
      d = parseInt(message.seconds)
      h = Math.floor(d / 3600);
      m = Math.floor(d % 3600 / 60);
      s = Math.floor(d % 3600 % 60);
      alert(('0' + h).slice(-2) + "h " + ('0' + m).slice(-2) + "m " + ('0' + s).slice(-2) +"s")
    }
    else if (message.greeting == "interventionOn"){
      document.getElementById("interventionOn").checked = true;
      intervention = true;
    }
    else if (message.greeting == "interventionOff") {
      document.getElementById("interventionOff").checked = true;
      intervention = false;
    }
}


if (background.expired) {
    document.getElementById("timer").innerHTML = "EXPIRED";
}

document.getElementById("time_tracker").addEventListener("click",  function() {
    chrome.runtime.sendMessage({
      greeting: "checkTotalTime"
    })
});

document.getElementById("time_reset").addEventListener("click",  function() {
    chrome.runtime.sendMessage({
      greeting: "resetTotalTime"
    })
});

document.getElementById("interventionOff").addEventListener("click", function() {
    chrome.runtime.sendMessage({
      greeting: "turnOff"
    });
});

document.getElementById("interventionOn").addEventListener("click", function() {
  chrome.runtime.sendMessage({
    greeting: "turnOn"
  });
});