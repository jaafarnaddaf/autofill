chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "autofill-pdf",
        title: "Autofill PDF",
        contexts: ["link"]
    });
});
let link = '';

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "autofill-pdf") {
        link = btoa(info.linkUrl);
        chrome.tabs.create({url: 'http://localhost:8080/pdf?link=' + link + '&userId=nzFrq3OkDXuq974H3ndc'});
    }
});

let clientId = '755672971854-mks6s44kc6jfj0mglaoov4vmvmcpik1b.apps.googleusercontent.com';
let redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`;
// let clientId = '343479279683-5obp2k6nqtqhm6bq6iurqlgo6rk8e4ul.apps.googleusercontent.com';
// let redirectUri = 'http://localhost:8080/login/oauth2/code/google';
let nonce = Math.random().toString(36).substring(2, 15)

// chrome.action.onClicked.addListener(function () {
//     const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
//
//     authUrl.searchParams.set('client_id', clientId);
//     authUrl.searchParams.set('response_type', 'id_token');
//     authUrl.searchParams.set('redirect_uri', redirectUri);
//     // Add the OpenID scope. Scopes allow you to access the user’s information.
//     authUrl.searchParams.set('scope', 'openid profile email');
//     authUrl.searchParams.set('nonce', nonce);
//     // Show the consent screen after login.
//     authUrl.searchParams.set('prompt', 'consent');
//
//     chrome.identity.launchWebAuthFlow(
//         {
//             url: authUrl.href,
//             interactive: true,
//         },
//         (redirectUrl) => {
//             if (redirectUrl) {
//                 // The ID token is in the URL hash
//                 const urlHash = redirectUrl.split('#')[1];
//                 const params = new URLSearchParams(urlHash);
//                 const jwt = params.get('id_token');
//
//                 // Parse the JSON Web Token
//                 const base64Url = jwt.split('.')[1];
//                 const base64 = base64Url.replace('-', '+').replace('_', '/');
//
//                 console.error('token', atob(base64));
//                 chrome.tabs.query({active: true, currentWindow: true}).then((tab) => {
//                     chrome.scripting.executeScript({
//                         target: {tabId: tab[0].id},
//                         func: () => {
//                             console.error('123123123123');
//                             localStorage.setItem('token', base64);
//                         }
//                     });
//                 });
//                 // self.localStorage.setItem('token', base64);
//             }
//         },
//     );
// });

chrome.action.onClicked.addListener(function (activeTab) {
    // var newURL = "http://localhost:8080/";
    // chrome.tabs.create({url: newURL});
});

// chrome.identity.getAuthToken({interactive: true}, function (token) {
//     console.error(token);
// });