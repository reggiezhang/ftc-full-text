chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (stillLoading(info.status) || notFtcStoryPage(tab.url) || containFullParam(tab.url)) return;
    // reload ftc story page in full text mode after page loading completed
    reloadStoryPageInFullText(tab);
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (notFtcStoryPage(tab.url) || containPrintParam(tab.url)) return;
    // reload ftc story page in full text mode
    reloadWithParam(tab.id, tab.url, "print=y");
});
