var customParam = encodeURI('full=y');

function match(url){  
  var host = "null";  
  if(typeof url == "undefined" || null == url)  
  url = window.location.href;  
  var regex = /.*\:\/\/([^\/]*).*/;  
  var match = url.match(regex);  
  if(typeof match != "undefined" && null != match)  
  host = match[1];  
  return host;  
}  

function entry(tabId, changeInfo, tab) {  
    var url = tab.url;
    if (changeInfo.status != "complete"
      || match(url).toLowerCase() != "www.ftchinese.com"
      || url.indexOf("ftchinese.com/story") == -1 
      || url.indexOf("full=y") > 0) {
        return; 
    }
    
    var hashStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
    var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
    var newUrl = url.substring(0, hashStart) + querySymbol + customParam +
                url.substring(hashStart);

    chrome.tabs.update(tab.id, {url: newUrl});
};  

chrome.tabs.onUpdated.addListener(entry);  

chrome.browserAction.onClicked.addListener(function (tab) {
  var url = tab.url;
  var hashStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
  var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
  var newUrl = url.substring(0, hashStart) + querySymbol + customParam +
               url.substring(hashStart);

  chrome.tabs.update(tab.id, {url: newUrl});
});
