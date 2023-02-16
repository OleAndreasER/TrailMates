"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firestore_1 = require("@firebase/firestore");
var db_1 = require("./db");
var handleSubmit = function (testdata) {
    var ref = (0, firestore_1.collection)(db_1.default, "test_data"); // Firebase creates this automatically
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
