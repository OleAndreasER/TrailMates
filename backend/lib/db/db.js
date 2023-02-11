"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";
var firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCnc1CJVuxFAuNfEgaeGLYy-wXkUyEOKUA",
    authDomain: "backpacking-tdt4140.firebaseapp.com",
    databaseURL: "https://backpacking-tdt4140-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "backpacking-tdt4140",
    storageBucket: "backpacking-tdt4140.appspot.com",
    messagingSenderId: "1070204029914",
    appId: "1:1070204029914:web:1fc2f2a8b81bf022c04ee3",
    measurementId: "G-E8V7RV259H",
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
//const analytics = getAnalytics(app);
exports.default = (0, firestore_1.getFirestore)(app);
