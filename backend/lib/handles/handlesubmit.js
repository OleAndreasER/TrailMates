"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firestore_1 = require("@firebase/firestore");
var firebase_1 = require("../firebase_setup/firebase");
var handleSubmit = function (testdata) {
    var ref = (0, firestore_1.collection)(firebase_1.db, "test_data"); // Firebase creates this automatically
    var data = {
        testData: testdata,
    };
    try {
        (0, firestore_1.addDoc)(ref, data);
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = handleSubmit;
