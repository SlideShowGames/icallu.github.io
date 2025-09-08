chrome.app.runtime.onLaunched.addListener(function(launchData) {
    var displayDimensions = calcNaClAppResolution();
    chrome.app.window.create('index.html', {
        id: getSenetWindowId(),
        bounds: {
            width: displayDimensions.width,
            height: displayDimensions.height
        },
        resizable: false
    });
});

chrome.runtime.onInstalled.addListener(function() {
        console.log('installed');
        });

chrome.runtime.onSuspend.addListener(function() { 
        // Do some simple clean-up tasks.
        });

chrome.browserAction.onClicked.addListener(function(tab) {
    // ...
    });

chrome.action.onClicked.addListener(tab => {
    chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup" //No Address bar
        //In here you can also add constrain for the window
        //This is for manifest v3
    })
);