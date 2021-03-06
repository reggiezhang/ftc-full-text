/*
 * ftc-full-text
 * Copyright (C) 2017 Reggie Zhang <reggy.zhang@gmail.com>
 * Licensed under the terms of The GNU Lesser General Public License (LGPLv3):
 * http://www.opensource.org/licenses/lgpl-3.0.html
 * 
 */
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (loadCompleted(info.status) && isFtcStoryPage(tab.url) && notContainFullParam(tab.url)) {
        // reload ftc story page in full text mode after page loading completed
        reloadStoryPageInFullText(tab);
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (isFtcStoryPage(tab.url) && notContainPrintParam(tab.url)) {
        // reload ftc story page in full text mode
        reloadWithParam(tab.id, tab.url, "print=y");
    }
});
