chrome.runtime.onMessage.addListener(popupListener);

chrome.runtime.sendMessage({
  greeting: "test"
});


var background = chrome.extension.getBackgroundPage();

function popupListener(message, sender, sendResponse) {
  if (message.greeting == "continue timer") {
    document.getElementById("timer").innerHTML = message.minutes + "m "
      + message.seconds + "s";
    document.getElementById("reset_button").style.visibility = "hidden";
  }
  else if (message.greeting == "timePassed") {
    document.getElementById("reset_button").style.visibility = "visible";
    document.getElementById("timer").innerHTML = "EXPIRED";
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
