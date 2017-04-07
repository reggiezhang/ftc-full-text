// http://stackoverflow.com/questions/21192345/chrome-extension-api-add-parameter-to-current-url

var customParam = encodeURI('full=y');
chrome.browserAction.onClicked.addListener(function (tab) {
  var url = tab.url;
  var hashStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
  var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
  var newUrl = url.substring(0, hashStart) + querySymbol + customParam +
               url.substring(hashStart);

  chrome.tabs.update(tab.id, {url: newUrl});
});
