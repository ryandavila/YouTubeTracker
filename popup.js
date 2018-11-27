chrome.runtime.onMessage.addListener(popupListener);

chrome.runtime.sendMessage({
  greeting: "test"
});

var expired = false;

var background = chrome.extension.getBackgroundPage();

function popupListener(message, sender, sendResponse) {
  if (message.greeting == "continue timer" && !expired) {
    document.getElementById("timer").innerHTML = message.minutes + "m "
      + message.seconds + "s";
  }
  else if (message.greeting == "timePassed") {
    console.log("end of")
    document.getElementById("timer").innerHTML = "EXPIRED";;
    expired = true;
  }
}

if (expired) {
  document.getElementById("timer").innerHTML = "EXPIRED";
  document.getElementById("reset_button").className = 'show';

}
