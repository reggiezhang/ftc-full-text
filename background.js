function match(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

function reloadInFullText(tabId, url) {
    var hashStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
    var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
    var newUrl = url.substring(0, hashStart) + querySymbol + encodeURI('full=y') +
        url.substring(hashStart);

    chrome.tabs.update(tabId, { url: newUrl });
}

function noNeedProceed(url) {
    return match(url).toLowerCase() != "www.ftchinese.com"
        || url.indexOf("ftchinese.com/story") == -1
        || url.indexOf("full=y") > 0;
}

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status != "complete"
        || noNeedProceed(tab.url)) {
        return;
    }
    chrome.tabs.executeScript(tab.id, {
        file: "script.js"
    }, function (results) {
        if (results > 0) {
            reloadInFullText(tab.id, tab.url);
        }
    });
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (noNeedProceed(tab.url)) {
        return;
    }
    chrome.tabs.executeScript(tab.id, {
        file: "script.js"
    }, function (results) {
        if (results > 0) {
            reloadInFullText(tab.id, tab.url);
        }
    });
});
