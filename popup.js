
chrome.runtime.onMessage.addListener(popupListener);
var time;
var total_time;

var background = chrome.extension.getBackgroundPage();

function popupListener(message) {
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
}


if (background.expired) {
    document.getElementById("timer").innerHTML = "EXPIRED";
}

document.getElementById("time_tracker").addEventListener("click",  function(){
    chrome.runtime.sendMessage({
      greeting: "checkTotalTime"
    })
});

document.getElementById("time_reset").addEventListener("click",  function(){
    chrome.runtime.sendMessage({
      greeting: "resetTotalTime"
    })
});
