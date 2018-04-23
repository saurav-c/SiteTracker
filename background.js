var urls = {}
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    var first = true;
    var start = 0;
    var end = 0;
    var elapsed = 0;
    var url = '';
    var new_url = '';
    var hostname = '';
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function(tab) {
            url = tab.url;
            new_url = new URL(url);
            hostname = new_url.hostname;
        });
        if (!first) {
            end = performance.now();
            elapsed = end - start;
            start =  performance.now();
            console.log(elapsed);
            console.log(hostname);
        } else {
            first = false;
            console.log(hostname);
            start = performance.now();
        }
    });
});

