chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("qweqweqwe" + tab);
    chrome.tabs.sendMessage(tab.id, {action: "autofill", fields: {username: "myusername", password: "mypassword"}}, function(response) {
        console.log(response.result);
    });
});

const nonce = btoa(Math.random().toString()).substring(0, 8);
chrome.storage.local.set({ nonce: nonce });