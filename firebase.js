// Import the functions you need from the SDKs you need

import {initializeApp} from "/firebase/firebase-app.js";

//import {getAnalytics} from "/firebase/firebase-analytics.js";

import {collection, getDocs, getFirestore} from '/firebase/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyCZXIvl-yOGKwLESK96l2yrFrMMFmhHdeo",

    authDomain: "autofill-abd78.firebaseapp.com",

    projectId: "autofill-abd78",

    storageBucket: "autofill-abd78.appspot.com",

    messagingSenderId: "343479279683",

    appId: "1:343479279683:web:331e2229d389711b71b4f6",

    measurementId: "G-B108EK7P11"

};

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'test');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

const getAll = function () {
    return getCities(db);
}

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

const db = getFirestore(app);