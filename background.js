chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: ""
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? '' : 'ON';

    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    if (nextState === "ON") {
        await chrome.scripting.executeScript(
            {
                target: { tabId: tab.id, allFrames: true },
                files: ['scripts/add-string-load.js'],
            }
        );
        await chrome.scripting.insertCSS({
            files: ["focus-element.css"],
            target: { tabId: tab.id },
        });
    } else if (nextState === "") {
        await chrome.scripting.executeScript(
            {
                target: { tabId: tab.id, allFrames: true },
                files: ['scripts/add-string-unload.js'],
            }
        );
        await chrome.scripting.removeCSS({
            files: ["focus-element.css"],
            target: { tabId: tab.id },
        });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.type == "notification") {
        chrome.notifications.create('notification', request.options, function () { });
    }
    console.log(request.options);
});