var beginningDate = new Date();
var countdownDate = new Date().getTime() + (1000 * 30);
var minutes, seconds, totalTime;
var isBadCategory = false;
var categories = [] ;


window.addEventListener("load", function () {
    setTimeout(function() {
    console.log("before conditional")
    if (window.location.toString().includes("youtube.com/watch")) {
        document.getElementsByClassName("more-button style-scope ytd-video-secondary-info-renderer")[0].click()
        console.log("in the conditional")
        categories = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
        console.log(categories);
        console.log("checking category");
        let test = 0;
        Array.prototype.forEach.call(categories, function (category) {
            console.log(category.innerText);
            if (category.innerText == "Entertainment" || category.innerText == "Gaming" || category.innerText == "Comedy") {
                console.log("changed the stuff")
                isBadCategory = true;
            }
            console.log("looping");
        });
        // getVideoCategoryBoolean();
    }

    if (true) {
        // Update the count down every 1 second
        console.log("in the countdown");
        var x = setInterval(function () {
            console.log(window.location.href)
            var now = new Date().getTime();
            var distance = countdownDate - now;

            // Time calculations for days, hours, minutes and seconds
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
            console.log(seconds);

            chrome.runtime.sendMessage({
                greeting: "continue timer"
            });

            // If the count down is over, write some text
            if (distance <= 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
                chrome.runtime.sendMessage({
                    greeting: "end timer"
                });
                chrome.tabs.insertCSS({
                    file: 'change.css'
                });
                audio = new Audio();
                audio.src = "audio/beep.mp3"
                audio.play();
            }
        }, 1000);
    }
}, 5000);
}, false);

chrome.runtime.onMessage.addListener(bgListener);

function bgListener(message, sender, sendResponse) {
    if (message.greeting == "test") {
        chrome.runtime.sendMessage({
            greeting: "continue timer"
        });
    }
}

// function getVideoCategoryBoolean() {
//     document.getElementsByClassName("more-button style-scope ytd-video-secondary-info-renderer")[0].click()
//     categories = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
//         console.log(categories);
//         console.log("checking category");
//         Array.prototype.forEach.call(categories, function (category) {
//             console.log(category.text)
//             if (category.text == "Entertainment" || category.text == "Gaming" || category.text == "Comedy") {
//                 console.log("changed the stuff")
//                 isBadCategory = true;
//             }
//             console.log("looping");
//         });
// }

window.addEventListener("beforeunload", function (event) {
    event.preventDefault;
    var endingDate = new Date();
    totalTime = beginningDate.getTime() - endingDate.getTime();
    console.log(totalTime);
    alert("are you sure you want to leave?");
});