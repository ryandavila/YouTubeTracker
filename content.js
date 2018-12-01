var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 20); //sets timer to around 3 minutes
var minutes, seconds, totalTime;
var isBadCategory = false;
var visitedYouTube = false;


chrome.runtime.onMessage.addListener(bgListener);

function bgListener(message) {
    console.log(message);
    if (message.greeting == "visited") {
        visitedYouTube = true;
        console.log("Youtube already visited, CSS injected");
    }

    if (message.greeting == "notvisited") {
        console.log("Doing stuff...");
        setTimeout(function () {
            console.log("before website check")
            if (window.location.toString().includes("youtube.com/watch")) {
                document.getElementsByClassName("more-button style-scope ytd-video-secondary-info-renderer")[0].click();
                console.log("before timeout");
                setTimeout(function () {
                    videoInfo = document.querySelector("ytd-expander ytd-metadata-row-container-renderer:nth-child(2)").innerText.trim();
                    if (videoInfo.includes("Entertainment") || videoInfo.includes("Gaming") || videoInfo.includes("Comedy")) {
                        console.log("changed the stuff");
                        isBadCategory = true;
                    }

                    if (true) { //changed to cause CSS changes for every video watched
                        // Update the count down every 1 second
                        console.log("in the countdown");
                        var x = setInterval(function () {
                            // console.log(window.location.href)
                            var now = new Date().getTime();
                            var distance = countdownDate - now;

                            // Time calculations for days, hours, minutes and seconds
                            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            seconds = Math.floor((distance % (1000 * 60)) / 1000);
                            // console.log(distance);
                            chrome.runtime.sendMessage({
                                greeting: "continue timer",
                                seconds: seconds.toString(),
                                minutes: minutes.toString()
                            });
                            // If the count down is over, write some text
                            if (distance < 0) {
                                clearInterval(x);
                                chrome.runtime.sendMessage({
                                    greeting: "timePassed",
                                    seconds: seconds,
                                    minutes: minutes.toString(),
                                    visited: "true"
                                });
                                visitedYouTube = true;
                            }
                        }, 500);
                    }
                }, 1000);
            }
        }, 2500);
    }
}




window.addEventListener("load", function () {
    if (window.location.toString().includes("youtube.com")) {
        chrome.runtime.sendMessage({
            greeting: "checkVisited"
        });
    }
}, false);
