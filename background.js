var reload = function(tab) {
  chrome.tabs.reload(tab.id, {bypassCache: true});
}

// on extension icon click
chrome.browserAction.onClicked.addListener(function(tab) {
	reload(tab);
});

// on ctrl+shift+x
chrome.commands.onCommand.addListener(function(command) {
	reload(chrome.tabs.getCurrent());
});