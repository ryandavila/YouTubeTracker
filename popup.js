chrome.runtime.onMessage.addListener(popupListener);
var time;

var background = chrome.extension.getBackgroundPage();

function popupListener(message) {
  if (message.greeting == "continue timer") {
    document.getElementById("timer").innerHTML = message.minutes + "m "
      + message.seconds + "s";
    document.getElementById("reset_button").style.visibility = "hidden";
    document.getElementById("time_button").style.visibility = "hidden";
    document.getElementById("total_time").style.visibility = "hidden";
  }
  else if (message.greeting == "timePassed") {
    document.getElementById("reset_button").style.visibility = "visible";
    document.getElementById("timer").innerHTML = "EXPIRED";
    document.getElementById("time_button").style.visibility = "visible";
    document.getElementById("total_time").style.visibility = "visible";
  } 
  else if (message.greeting == "timesSent") {
    time = message.time
  }
}

if (background.expired) {
    document.getElementById("timer").innerHTML = "EXPIRED";
}

document.getElementById("reset_button").addEventListener("click",  function(){
    //window.alert("reset");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
    chrome.runtime.sendMessage({
      greeting: "reset"
    });
});

document.getElementById("time_button").addEventListener("click",  function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage("requestTimes");
    setTimeout(() => {
      document.getElementById.innerHTML = "Total Time: " + time;
    }, 1000);
  });
});
