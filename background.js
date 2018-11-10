let startDate = new Date();
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

    // if (elapsedTime > 60) {
    //     chrome.tabs.insertCSS({
    //         file: 'change.css'
    //     })
    // }
}
        // elapsedTime contains the time spent on page in milliseconds
    // };
    //
    // window.addEventListener('focus', focus);
    // window.addEventListener('blur', blur);
    // window.addEventListener('beforeunload', beforeunload);
