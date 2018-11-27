var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20);
var minutes, seconds, totalTime;
var isBadCategory = false;

chrome.runtime.onMessage.addListener(bgListener);

function bgListener(message, sender, sendResponse) {
    if (message.greeting == "test") {
        chrome.runtime.sendMessage({
            greeting: "continue timer"
        });
    }
}

window.addEventListener("load", function () {
    setTimeout(function() {
    console.log("before conditional")
    if (window.location.toString().includes("youtube.com/watch")) {
        document.getElementsByClassName("more-button style-scope ytd-video-secondary-info-renderer")[0].click();
        videoInfo = document.querySelector("ytd-expander ytd-metadata-row-container-renderer:nth-child(2)").innerText.trim();
        console.log("in the conditional");
        if (videoInfo.includes("Entertainment") || videoInfo.includes("Gaming") || videoInfo.includes("Comedy")) {
            console.log("changed the stuff");
            isBadCategory = true;
            }
    }

    if (isBadCategory) {
        // Update the count down every 1 second
        console.log("in the countdown");
        var x = setInterval(function () {
            // console.log(window.location.href)
            var now = new Date().getTime();
            var distance = countdownDate - now;

            // Time calculations for days, hours, minutes and seconds
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
            console.log(distance);
            // console.log(seconds);

            chrome.runtime.sendMessage({
                greeting: "continue timer"
            });

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                // document.getElementById("timer").innerHTML = "EXPIRED";
                chrome.runtime.sendMessage({
                    greeting: "end timer"
                });
                chrome.runtime.sendMessage({
                    greeting: "timePassed"
                });
            }
        }, 1000);
    }
}, 5000);
}, false);

window.addEventListener("beforeunload", function (event) {
    event.preventDefault;
    var endingDate = new Date();
    totalTime = beginningDate.getTime() - endingDate.getTime();
    console.log(totalTime);
    alert("are you sure you want to leave?");
});
