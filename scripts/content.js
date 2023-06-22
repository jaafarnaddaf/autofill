let clientId = '755672971854-mks6s44kc6jfj0mglaoov4vmvmcpik1b.apps.googleusercontent.com';
let redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`;
//let clientId = '343479279683-5obp2k6nqtqhm6bq6iurqlgo6rk8e4ul.apps.googleusercontent.com';
// let redirectUri = 'http://localhost:8080/login/oauth2/code/google';
let nonce = Math.random().toString(36).substring(2, 15)

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('response_type', 'id_token');
authUrl.searchParams.set('redirect_uri', redirectUri);
// Add the OpenID scope. Scopes allow you to access the user’s information.
authUrl.searchParams.set('scope', 'openid profile email');
authUrl.searchParams.set('nonce', nonce);
// Show the consent screen after login.
authUrl.searchParams.set('prompt', 'consent');
let element = document.querySelector('#login-row');
if (element) {
    element.onclick = function () {
        chrome.storage.local.clear();
        chrome.identity.launchWebAuthFlow({
            url: authUrl.href, interactive: true,
        }, (redirectUrl) => {
            if (redirectUrl) {
                // The ID token is in the URL hash
                const urlHash = redirectUrl.split('#')[1];
                const params = new URLSearchParams(urlHash);
                const jwt = params.get('id_token');

                // Parse the JSON Web Token
                const base64Url = jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const token = JSON.parse(atob(base64));

                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", 'http://localhost:8080/authentication/login', false);
                xmlHttp.send(base64);
                console.error(base64);
                let response = JSON.parse(xmlHttp.responseText);
                chrome.storage.local.set({'token': response.accessToken});
                chrome.storage.local.get('token').then(value => console.error('token', value));
                chrome.storage.local.set({'user': token.name});
                loginRow.setAttribute('hidden', 'hidden');
                profileRow.removeAttribute('hidden');
                // self.localStorage.setItem('token', base64);
            }
        },);
    }
}

let findFields = function (response, fields) {
    let results = {};
    for (let i = 0; i < response.length; i++) {
        let field = response[i];
        results[field['code']] = document.querySelectorAll(field['selectors']);
        fields[field['code']] = field['value'];
        if (field['code'] === 'dob' && results['dob'].length === 0) {
            let date = new Date(Date.parse(fields['dob']));
            results['day'] = document.querySelectorAll('input#day, input[name="day"]');
            fields['day'] = date.getDay();
            results['month'] = document.querySelectorAll('input#day, input[name="month"]');
            fields['month'] = date.getMonth() + 1;
            results['year'] = document.querySelectorAll('input#day, input[name="year"]');
            fields['year'] = date.getFullYear();
        }
    }
    return results;
}

// let email = null;
// if (localStorage.getItem('email')) {
//     email = localStorage.getItem('email');
// } else {
//     localStorage.setItem('email', email);
// }

let autofill = document.querySelector('#autofill');
let loginRow = document.querySelector('#login-row');
let profileRow = document.querySelector('#profile-row');
//autofill.onclick = function (e) {
chrome.storage.local.get('token').then(value => {
    console.error(JSON.stringify(value))
    value = value['token'];
    console.error(value);
    if (value != null) {
        loginRow.setAttribute('hidden', 'hidden');
        profileRow.removeAttribute('hidden');
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://localhost:8080/api/fields', false);
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + value);
        xmlHttp.send(null);
        console.error(xmlHttp.responseText);
        let response = JSON.parse(xmlHttp.responseText);
        let fields = {};
        let inputs = findFields(response, fields);
        console.error(JSON.stringify(inputs));
        for (const [k, v] of Object.entries(inputs)) {
            for (let i = 0; i < v.length; i++) {
                let nv;
                if (k.toString() === 'dob') {
                    nv = fields[k.toString()]//userData.data.dateOfBirth.year + '-' + (userData.data.dateOfBirth.month < 10 ? '0' + userData.data.dateOfBirth.month : userData.data.dateOfBirth.month) + '-' + (userData.data.dateOfBirth.day < 10 ? '0' + userData.data.dateOfBirth.day : userData.data.dateOfBirth.day);
                } else {
                    nv = fields[k.toString()]; //userData[k] ? userData[k] : userData.data[k] ? userData.data[k] : userData.data.dateOfBirth[k];
                }
                if (nv) {
                    v[i].value = nv;
                } else {
                    console.error(nv, k, fields[k]);
                }
                // switch (k) {
                //     case 'username':
                //     case 'email':
                //         v[i].value = userData.email;
                //         break;
                //     case 'firstName':
                //         v[i].value = userData.data.firstName;
                //         break;
                //     default:
                //         console.error(k);
                // }
            }
        }
    } else {
        profileRow.setAttribute('hidden', 'hidden');
        loginRow.removeAttribute('hidden');
    }
});
//};

window.addEventListener("load", () => {
    function sendData() {
        const XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const data = {
            firstName: document.querySelector('#first-name').value,
            lastName: document.querySelector('#last-name').value,
            email: document.querySelector('#email').value,
            phoneNumber: document.querySelector('#phone').value,
            dateOfBirth: document.querySelector('#date-of-birth').value
        };

        // Define what happens on successful data submission
        XHR.addEventListener("load", (event) => {
            alert('Saved!');
        });

        // Define what happens in case of error
        XHR.addEventListener("error", (event) => {
            alert('Oops! Something went wrong.');
        });

        // Set up our request
        //XHR.open("POST", 'http://localhost:8080/save?userId=' + user);

        XHR.setRequestHeader('Content-Type', 'application/json');

        // The data sent is what the user provided in the form
        //XHR.send(JSON.stringify(data));
    }

    // // Get the form element
    // const form = document.getElementById("autofill-profile");
    //
    // // Add 'submit' event handler
    // form.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //
    //     sendData();
    // });
});