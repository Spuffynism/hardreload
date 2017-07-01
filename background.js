(function () {
    'use strict';

    /**
     * Reloads a tab by its id, bypassing the cache.
     *
     * @param tabId
     */
    var reload = function (tabId) {
        chrome.tabs.reload(tabId, {
            bypassCache: true
        });
    };

    /**
     * Triggered on hard-reload browserAction button click
     */
    chrome.browserAction.onClicked.addListener(function (tab) {
        reload(tab.id);
    });

    /**
     * Triggered on hard-reload configured shortcut click
     */
    chrome.commands.onCommand.addListener(function (command) {
        if (command !== 'hard-reload')
            return;

        // get all active tabs and reload them
        chrome.tabs.query({
            active: true
        }, reloadActiveTabs);

        function reloadActiveTabs(tabs) {
            tabs.forEach(function (tab) {
                reload(tab.id);
            });
        }
    });
})();