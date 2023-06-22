// let username = ['user', 'username', 'user-name'];
// let email = ['email', 'e-mail', 'Email address'];
// let firstName = ['name', 'given-name', 'first-name', 'givenName', 'firstName', 'First name', 'fname'];
// let lastName = ['last', 'last-name', 'surname', 'lastName', 'Last name', 'lname'];
// let fullName = ['full-name', 'fullName'];
// let tel = ['tel', 'telephone', 'phone-number', 'phoneNumber', 'Phone number'];
// let day = ['day'];
// let month = ['month'];
// let year = ['year'];
// let address = ['address'];
// export let fields = {
//     username: username,
//     email: email,
//     firstName: firstName,
//     lastName: lastName,
//     fullName: fullName,
//     tel: tel,
//     day: day,
//     month: month,
//     year: year,
//     address: address
// };
//
// export let findFields = function () {
//     let results = {};
//     for (let [key, value] in Object.entries(fields)) {
//         let ids = document.querySelectorAll(value.map(e => '#' + e));
//         let names = document.querySelectorAll(value.map(e => '[name="' + e + '"]'));
//         results[key] = ids.concat(names);
//     }
//     return results;
// }