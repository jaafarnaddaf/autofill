console.log("QWRQWRQWRQWRQWRQWDASKDFAS");
let nameStrings = ['username', 'user', 'name'];
let usernames = nameStrings.map(n => '[name="' + n + '"]').concat(nameStrings.map(n => '#' + n));
let nameInput = usernames.map(e => document.querySelectorAll(e));
console.log('qwrqwrqwr' + nameInput);
let emailInput = document.getElementById("email");
let saveButton = document.querySelector("#save");

console.log('asfrasr' + nameInput);
let data = {
    name: nameInput.value, email: emailInput.value
};
getAll();
//chrome.storage.sync.set(data);