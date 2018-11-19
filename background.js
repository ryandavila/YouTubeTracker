var countDownDate = new Date().getTime() + (1000*10)
var minutes
var seconds


// Update the count down every 1 second
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(seconds);

    chrome.runtime.sendMessage({
        greeting: "continue timer"
    });
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";


    // If the count down is over, write some text
    if (distance <= 0) {
        console.log("TRUE")
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
        chrome.tabs.insertCSS({
          file: 'change.css'
        });
        audio = new Audio();
        audio.src = "audio/beep.mp3"
        audio.play();
    }
       }, 1000);

chrome.runtime.onMessage.addListener(bgListener);

function bgListener(message, sender, sendResponse) {
    if (message.greeting == "test") {
      chrome.runtime.sendMessage({
          greeting: "continue timer"
      });
    }


    }








/** let startDate = new Date();
let elapsedTime = 0;

if (document.URL.contains("youtube.com")) { //checks if the website is YouTube

    const focus = function() {
            startDate = new Date();
    };

    const blur = function() {
        const endDate = new Date();
        const spentTime = endDate.getTime() - startDate.getTime();
        elapsedTime += spentTime;
    };

    const beforeunload = function() {
        const endDate = new Date();
        const spentTime = endDate.getTime() - startDate.getTime();
        elapsedTime += spentTime;
    }
 */

/**

chrome.runtime.onConnect.addListener(function (externalPort) {
  externalPort.onDisconnect.addListener(function () {
    console.log("onDisconnect")
    // Do stuff that should happen when popup window closes here
  })

*/


/**

chrome.runtime.onMessage.addListener(bgListener);

function bgListener(message, sender, sendResponse) {
        if (message.greeting == "continue timer") {
                sendResponse({response: "timer continued"})
        }


} */





    // if (elapsedTime > 60) {
    //     chrome.tabs.insertCSS({
    //         file: 'change.css'
    //     })
    // }
// }
        // elapsedTime contains the time spent on page in milliseconds
    // };
    //
    // window.addEventListener('focus', focus);
    // window.addEventListener('blur', blur);
    // window.addEventListener('beforeunload', beforeunload);
