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

function notFtcStoryPage(url) {
    return match(url).toLowerCase() != "www.ftchinese.com"
        || url.indexOf("ftchinese.com/story") == -1;
}

function containFullParam(url) {
    return url.indexOf("full=y") > 0;
}

function containPrintParam(url) {
    return url.indexOf("print=y") > 0;
}

function stillLoading(status) {
    return status != "complete";
}
function reloadWithParam(tabId, url, param) {
    var hashStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
    var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
    var newUrl = url.substring(0, hashStart) + querySymbol + encodeURI(param) +
        url.substring(hashStart);

    chrome.tabs.update(tabId, { url: newUrl });
}
function reloadStoryPageInFullText(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "paginationCheck.js"
    }, function (results) {
        if (results > 0) {
            reloadWithParam(tab.id, tab.url, "full=y");
        }
    });
}