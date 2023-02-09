"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//import handleSubmit from './handles/handlesubmit';
//handleSubmit("Tester kobling")
//Tester kobling til Firebase. Skal komme opp under FireStore Database
var cors = require("cors");
var app = express();
app.use(cors());
app.get('/', function (req, res) {
    res.json({
        message: "Hello World!",
        success: true
    });
});
app.listen(3001, function () {
    console.log("Listening on port 3001.");
});
