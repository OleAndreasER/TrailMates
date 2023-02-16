"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("firebase/auth");
var auth = (0, auth_1.getAuth)();
(0, auth_1.signInAnonymously)(auth)
    .then(function () {
    // Signed in..
})
    .catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
(0, auth_1.onAuthStateChanged)(auth, function (user) {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
    }
    else {
        // User is signed out
        // ...
    }
});
