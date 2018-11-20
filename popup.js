chrome.runtime.onMessage.addListener(popupListener);

chrome.runtime.sendMessage({
    greeting: "test"
});

var background = chrome.extension.getBackgroundPage();

function popupListener(message, sender, sendResponse) {
    if (message.greeting == "continue timer" && background.seconds >= 0) {
          document.getElementById("timer").innerHTML = background.minutes + "m " 
          + background.seconds + "s ";
        }
    if (message.greeting == "end timer") {
          document.getElementById("timer").innerHTML = "EXPIRED";;
            }
}



/* var countDownDate = new Date().getTime() + (1000*20)

// Update the count down every 1 second
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    console.log(distance);

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is over, write some text
    if (distance <= 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
        chrome.tabs.insertCSS({
          file: 'change.css'
        });
        audio = new Audio();
        audio.src = "audio/beep.mp3"
        audio.play();
    }
  }, 1000); **/
