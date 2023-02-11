"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("./routes/user");
//import handleSubmit from './handles/handlesubmit';
//handleSubmit("Tester kobling")
//Tester kobling til Firebase. Skal komme opp under FireStore Database
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
(0, user_1.startUserRoutes)(app);
app.listen(3001, function () {
    console.log("Listening on port 3001.");
});
