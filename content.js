chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("qwrqwr" + request.action);
    if (request.action === "autofill") {
        var fields = request.fields;
        console.log("qweqweqw" + fields);
        for (var field in fields) {
            document.getElementsByName(field)[0].value = fields[field];
        }
        sendResponse({result: "success"});
    }
});