(() => {
    'use strict';

    const HARD_RELOAD_COMMAND = 'hard-reload';

    /**
     * Triggered on browserAction button click
     */
    chrome.browserAction.onClicked.addListener(reloadTab);

    /**
     * Triggered on configured command activation
     */
    chrome.commands.onCommand.addListener((command) => {
        if (command !== HARD_RELOAD_COMMAND)
            return;

        chrome.tabs.query({
            highlighted: true,
            currentWindow: true
        }, reloadTabs);
    });

    /**
     * Reloads a tab by its id, bypassing the cache.
     *
     * @param {Object} tab the tab to reload
     */
    function reloadTab(tab) {
        chrome.tabs.reload(tab.id, {
            bypassCache: true
        });
    }

    /**
     * Reloads tabs
     *
     * @param {Object[]} tabs active tabs
     */
    function reloadTabs(tabs) {
        tabs.forEach(reloadTab)
    }
})();